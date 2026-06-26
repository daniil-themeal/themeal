// One-off conversion: take the user's PNG meal photos, knock out the near-black
// background and write transparent AVIF files matching the rest of the meals
// in public/main-landing/assets/meals.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC_DIR = 'C:/Users/Bender/.cursor/projects/c-Users-Bender-Desktop-Landing-20-05-TEST/assets';
const DST_DIR = path.resolve(__dirname, '..', 'public', 'main-landing', 'assets', 'meals');

// Map of src filename -> dst filename. We continue from meal-15 (next free slot).
//
// NOTE on skipped entries:
//  - "evergreen_fritatta_with_toast" was a pixel-duplicate of meal-04, so the
//    meal-15 slot is left empty.
//  - "thai_coconut-lime_chicken_..." was a pixel-duplicate of meal-08, so the
//    meal-19 slot is left empty.
//  - "vip_..." (meal-21) is photographed on a soft-shadowed white surface and
//    can't be colour-keyed cleanly without a raggedy halo or a white rectangular
//    smear, so we skip it.
const MAPPING = [
  { src: 'c__Users_Bender_AppData_Roaming_Cursor_User_workspaceStorage_8b5eddf9d5577ebda98f796a9cef73ae_images_Chicken_noodle_soup-b5e5dec0-1162-4fb7-9f1b-7886e3146315.png', dst: 'meal-16.avif' },
  { src: 'c__Users_Bender_AppData_Roaming_Cursor_User_workspaceStorage_8b5eddf9d5577ebda98f796a9cef73ae_images_Chicken_and_Rice_Stuffed_Capsicum_with_Roasted_Potato_and_vegetables_-af932a45-1463-4c60-9f68-90b2bb0b31a9.png', dst: 'meal-17.avif' },
  { src: 'c__Users_Bender_AppData_Roaming_Cursor_User_workspaceStorage_8b5eddf9d5577ebda98f796a9cef73ae_images_chicken_and_zucchini_pancakes_with_yogurt_-f821c70a-024d-46be-82d6-b807d81372dd.png', dst: 'meal-18.avif' },
  { src: 'c__Users_Bender_AppData_Roaming_Cursor_User_workspaceStorage_8b5eddf9d5577ebda98f796a9cef73ae_images_Beef_shawarma_bowl_with_veggie_mix_and_farro-7d9ebf2c-d933-4427-b7a4-6b89e4f0e146.png', dst: 'meal-20.avif' },
  { src: 'c__Users_Bender_AppData_Roaming_Cursor_User_workspaceStorage_8b5eddf9d5577ebda98f796a9cef73ae_images_q_Baked_lemon_white_fish_with_rice_and_vegetables_1-385a88e4-208d-4bc4-9e5c-0f33e66e0737.png', dst: 'meal-22.avif' },
  { src: 'c__Users_Bender_AppData_Roaming_Cursor_User_workspaceStorage_8b5eddf9d5577ebda98f796a9cef73ae_images_q_Grilled_chicken_kofta_with_aromatic_brown_onion_pilaf_and_veggies_1-c0bc472a-b8ca-4989-bb93-33557515fa6e.png', dst: 'meal-23.avif' },
];

const TARGET_W = 432;
const TARGET_H = 317;
// Two thresholds, in 0–255 channel-distance from the sampled corner colour:
//  - pixels closer than BG_HARD are treated as pure background (alpha 0)
//  - pixels farther than BG_SOFT are treated as pure foreground (alpha 255)
//  - in between, alpha ramps linearly to give a feathered edge that hides
//    natural shadows around the tray instead of a raggedy hard cutoff.
const BG_HARD = 22;
const BG_SOFT = 70;

async function convert({ src, dst }) {
  // Use forward slashes throughout. The combined Windows path is >260 chars
  // which triggers MAX_PATH issues on the path.join (backslash) form, so we
  // also pass it through the long-path prefix when needed.
  let srcPath = `${SRC_DIR}/${src}`;
  const dstPath = path.join(DST_DIR, dst);

  if (!fs.existsSync(srcPath)) {
    console.warn('skip (missing):', srcPath);
    return;
  }

  // sharp on Windows may fail on long paths; pre-read into a buffer to bypass.
  const inputBuffer = fs.readFileSync(srcPath);

  // Resize to match the standard 432x317 canvas of the existing meals while
  // keeping the original aspect ratio (the user's PNGs are 4:3-ish so this is
  // effectively a downscale).
  const resized = await sharp(inputBuffer)
    .resize({ width: TARGET_W, height: TARGET_H, fit: 'inside', withoutEnlargement: false })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = resized;
  const { width, height, channels } = info;
  const out = Buffer.from(data); // mutable copy

  const total = width * height;

  // Sample the four corners and pick the median per channel as the reference
  // background colour. Works for both black-backdrop and white-backdrop PNGs.
  const cornerSamples = [
    0,
    width - 1,
    (height - 1) * width,
    (height - 1) * width + (width - 1),
  ];
  const median = (arr) => arr.slice().sort((a, b) => a - b)[Math.floor(arr.length / 2)];
  const bg = [0, 1, 2].map((c) => median(cornerSamples.map((i) => data[i * channels + c])));

  // Per-pixel "background-ness": Chebyshev distance to bg colour. 0 = identical
  // to bg, 255 = completely different. We then split into:
  //  - hardBg (dist <= BG_HARD): pure background, will be flooded from edges
  //  - softBg (BG_HARD < dist <= BG_SOFT): feather candidate, alpha ramps in
  //  - foreground (dist > BG_SOFT): kept fully opaque
  const dist = new Uint8Array(total);
  for (let i = 0; i < total; i++) {
    const o = i * channels;
    const d = Math.max(
      Math.abs(data[o] - bg[0]),
      Math.abs(data[o + 1] - bg[1]),
      Math.abs(data[o + 2] - bg[2]),
    );
    dist[i] = d;
  }

  // Flood-fill the "definitely background" region (dist <= BG_HARD) from the
  // image border. Anything not reached is preserved at full opacity even if it
  // happens to look like the bg colour (e.g. a white tray rim).
  const reach = new Uint8Array(total); // 1 = connected to border via hard bg
  const stack = [];
  const seed = (i) => { if (!reach[i] && dist[i] <= BG_HARD) { reach[i] = 1; stack.push(i); } };
  for (let x = 0; x < width; x++) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    seed(y * width);
    seed(y * width + (width - 1));
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % width;
    const y = (i / width) | 0;
    if (x > 0) seed(i - 1);
    if (x < width - 1) seed(i + 1);
    if (y > 0) seed(i - width);
    if (y < height - 1) seed(i + width);
  }

  // Extend reach into the soft band by another flood, so the feather only
  // applies to pixels that are actually attached to the background — never
  // through holes inside the food.
  const inSoftBand = (i) => dist[i] <= BG_SOFT;
  const stack2 = [];
  for (let i = 0; i < total; i++) if (reach[i]) stack2.push(i);
  while (stack2.length) {
    const i = stack2.pop();
    const x = i % width;
    const y = (i / width) | 0;
    const tryGrow = (n) => {
      if (!reach[n] && inSoftBand(n)) { reach[n] = 1; stack2.push(n); }
    };
    if (x > 0) tryGrow(i - 1);
    if (x < width - 1) tryGrow(i + 1);
    if (y > 0) tryGrow(i - width);
    if (y < height - 1) tryGrow(i + width);
  }

  // Compute alpha:
  //   reach + dist<=BG_HARD            → 0     (pure bg)
  //   reach + BG_HARD<dist<=BG_SOFT    → ramp  (feather)
  //   otherwise                         → 255   (foreground / interior)
  for (let i = 0; i < total; i++) {
    const o = i * channels;
    let alpha = 255;
    if (reach[i]) {
      const d = dist[i];
      if (d <= BG_HARD) {
        alpha = 0;
      } else if (d <= BG_SOFT) {
        alpha = Math.round(((d - BG_HARD) / (BG_SOFT - BG_HARD)) * 255);
      }
    }
    if (alpha === 0) {
      out[o] = 0;
      out[o + 1] = 0;
      out[o + 2] = 0;
    } else if (alpha < 255) {
      // Pre-darken by removing the bg colour contribution, so the visible
      // colour against any backdrop matches the original tray edge instead of
      // showing a bg-coloured halo. C_out = (C_in - bg*(1-a)) / a (clamped).
      const a = alpha / 255;
      for (let c = 0; c < 3; c++) {
        const v = (data[o + c] - bg[c] * (1 - a)) / a;
        out[o + c] = Math.max(0, Math.min(255, Math.round(v)));
      }
    }
    out[o + 3] = alpha;
  }

  await sharp(out, { raw: { width, height, channels } })
    .toFormat('avif', { quality: 55, effort: 4 })
    .toFile(dstPath);

  const stat = fs.statSync(dstPath);
  console.log('wrote', dst, `${width}x${height}`, `${stat.size}B`);
}

(async () => {
  for (const m of MAPPING) {
    try {
      await convert(m);
    } catch (e) {
      console.error('failed', m.dst, e);
    }
  }
})();
