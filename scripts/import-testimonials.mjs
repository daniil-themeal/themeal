import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(
  projectRoot,
  'src/app/landing-stas/content/customersReviews.ts',
);

const EMBED_URL =
  'https://embed-v2.testimonial.to/carousel/all/themeal?id=18515f72-5509-4309-8a4f-cb37ce8b672c';
const API_URL = 'https://api.testimonial.to/v1/testimonials?liked=true';

const PROMO_PATTERNS = [
  /Looking to simplify your daily meals/i,
  /🍴|✨|💼🚪/,
  /\*The Meal\*/i,
];

const SOCIAL_TEXT_PATTERNS = [/@themeal/i, /@[\w.]+/];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

function detectPlatform(socialLink, text) {
  const link = (socialLink ?? '').toLowerCase();
  if (link.includes('instagram.com') || /@themeal|instagram/i.test(text ?? '')) {
    return 'instagram';
  }
  if (link.includes('twitter.com') || link.includes('x.com')) return 'twitter';
  if (link.includes('linkedin.com')) return 'linkedin';
  if (link.includes('facebook.com')) return 'facebook';
  if (SOCIAL_TEXT_PATTERNS.some((p) => p.test(text ?? ''))) return 'instagram';
  return 'other';
}

function isTextOnlyPromo(text, hasMedia) {
  if (hasMedia) return false;
  return PROMO_PATTERNS.some((pattern) => pattern.test(text));
}

function isVideoMedia(imageUrl, videoUrl) {
  if (videoUrl) return true;
  if (imageUrl?.includes('/videoThumbnail')) return true;
  if (imageUrl?.includes('image.mux.com/')) return true;
  return false;
}

function inferKind({ imageUrl, socialLink, platform, text, videoUrl }) {
  if (isVideoMedia(imageUrl, videoUrl)) return 'video';
  if (imageUrl || socialLink) return 'social';
  if (platform && platform !== 'other') return 'social';
  if (/@themeal|@[\w.]{3,}/i.test(text ?? '')) return 'social';
  return 'text';
}

function muxStreamUrl(playbackId) {
  if (!playbackId) return undefined;
  return `https://stream.mux.com/${playbackId}/high.mp4`;
}

function videoUrlFromImageUrl(imageUrl) {
  if (!imageUrl) return undefined;
  const muxThumb = imageUrl.match(/image\.mux\.com\/([A-Za-z0-9]+)\/thumbnail/);
  if (muxThumb) return muxStreamUrl(muxThumb[1]);
  return undefined;
}

function videoUrlFromEmbedHtml(html, imageUrl, videoUrlMap) {
  const fromMux = videoUrlFromImageUrl(imageUrl);
  if (fromMux) return fromMux;

  const thumb = imageUrl?.match(/testimonials\/([a-f0-9-]+)\/videoThumbnail/);
  if (!thumb) return undefined;

  const mapped = videoUrlMap?.get(thumb[1]);
  if (mapped) return mapped;

  if (!html) return undefined;

  const uuid = thumb[1];
  const imgNeedle = `testimonials/${uuid}/videoThumbnail`;
  const idx = html.indexOf(imgNeedle);
  if (idx < 0) return undefined;

  const stream = html.slice(idx, idx + 250000).match(/stream\.mux\.com\/([A-Za-z0-9]+)/);
  return stream ? muxStreamUrl(stream[1]) : undefined;
}

function buildVideoUrlMap(html) {
  const map = new Map();

  for (const match of html.matchAll(
    /<img[^>]+src="https:\/\/cdn\.testimonial\.to\/testimonials\/([a-f0-9-]+)\/videoThumbnail"/g,
  )) {
    const uuid = match[1];
    const idx = match.index ?? 0;
    const stream = html.slice(idx, idx + 250000).match(/stream\.mux\.com\/([A-Za-z0-9]+)/);
    if (stream) map.set(uuid, muxStreamUrl(stream[1]));
  }

  return map;
}

function resolveVideoUrl({ videoUrl, playbackId, muxPlaybackId, imageUrl, embedHtml, videoUrlMap }) {
  const direct = (videoUrl ?? '').trim();
  if (direct) return direct;

  const playback = (playbackId ?? muxPlaybackId ?? '').trim();
  if (playback) return muxStreamUrl(playback);

  return videoUrlFromEmbedHtml(embedHtml, imageUrl, videoUrlMap) ?? videoUrlFromImageUrl(imageUrl);
}

function normalizeReview(raw) {
  const text = (raw.text ?? raw.testimonial ?? '').trim();
  const name = (raw.name ?? '').trim();
  if (!text) return null;

  const imageUrl = (raw.imageUrl ?? raw.attachedImageURL ?? '').trim() || undefined;
  const avatarUrl = (raw.avatarUrl ?? raw.avatarURL ?? '').trim() || undefined;
  const socialLink = (raw.socialLink ?? '').trim() || undefined;
  const videoUrl = resolveVideoUrl({
    videoUrl: raw.videoUrl,
    playbackId: raw.playbackId ?? raw.muxPlaybackId,
    imageUrl,
    embedHtml: raw.embedHtml,
    videoUrlMap: raw.videoUrlMap,
  });
  const platform = raw.platform ?? detectPlatform(socialLink, text);
  const hasMedia = Boolean(imageUrl || avatarUrl || socialLink || videoUrl);

  if (!name && !hasMedia && isTextOnlyPromo(text, false)) return null;
  if (!name) return null;
  if (!hasMedia && isTextOnlyPromo(text, false)) return null;

  const subtitle = (raw.subtitle ?? raw.title ?? '').trim() || undefined;
  const rating =
    typeof raw.rating === 'number' && raw.rating >= 1 && raw.rating <= 5
      ? raw.rating
      : 5;
  const kind = raw.kind ?? inferKind({ imageUrl, socialLink, platform, text, videoUrl });

  const review = {
    id: raw.id ?? `${slugify(name)}-${slugify(text.slice(0, 40))}`,
    kind,
    text,
    name,
    rating,
  };

  if (subtitle) review.subtitle = subtitle;
  if (platform && platform !== 'other') review.platform = platform;
  else if (kind === 'social') review.platform = platform;
  if (imageUrl) review.imageUrl = imageUrl;
  if (videoUrl) review.videoUrl = videoUrl;
  if (avatarUrl) review.avatarUrl = avatarUrl;
  if (socialLink) review.socialLink = socialLink;

  return review;
}

function dedupeReviews(reviews) {
  const seen = new Set();
  const result = [];

  for (const review of reviews) {
    const key = `${review.name.toLowerCase()}|${review.text.slice(0, 80).toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(review);
  }

  return result;
}

function mapApiItems(payload) {
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.testimonials)
      ? payload.testimonials
      : Array.isArray(payload?.data)
        ? payload.data
        : [];

  return dedupeReviews(
    items
      .map((item) =>
        normalizeReview({
          id: item.id ?? item._id,
          text: item.testimonial ?? item.text ?? item.message,
          name: item.name,
          subtitle: item.title ?? item.jobTitle,
          rating: item.rating,
          imageUrl: item.attachedImageURL ?? item.attachedImageUrl,
          avatarUrl: item.avatarURL ?? item.avatarUrl,
          socialLink: item.socialLink,
          videoUrl: item.videoUrl,
          playbackId: item.playbackId ?? item.muxPlaybackId,
        }),
      )
      .filter(Boolean),
  );
}

async function fetchFromApi(apiKey) {
  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${await response.text()}`);
  }

  const payload = await response.json();
  const reviews = mapApiItems(payload);

  if (!reviews.length) {
    throw new Error('API returned no liked testimonials');
  }

  return reviews;
}

function stripHtml(htmlFragment) {
  return htmlFragment
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitNameSubtitle(nameLine) {
  const trimmed = nameLine.trim();
  const commaIdx = trimmed.indexOf(',');
  if (commaIdx > 0 && commaIdx < trimmed.length - 2) {
    const left = trimmed.slice(0, commaIdx).trim();
    const subtitle = trimmed.slice(commaIdx + 1).trim();
    const dotIdx = left.indexOf('.');
    if (dotIdx > 0 && dotIdx < left.length - 2) {
      return {
        name: left.slice(0, dotIdx).trim(),
        subtitle: `${left.slice(dotIdx + 1).trim()}, ${subtitle}`.trim(),
      };
    }
    return { name: left, subtitle };
  }

  const dotIdx = trimmed.indexOf('.');
  if (dotIdx > 0 && dotIdx < trimmed.length - 2 && trimmed.split(' ').length <= 4) {
    return {
      name: trimmed.slice(0, dotIdx).trim(),
      subtitle: trimmed.slice(dotIdx + 1).trim(),
    };
  }

  return { name: trimmed };
}

function extractImageFromBlock(block) {
  const imgMatch = block.match(/<img[^>]+src="([^"]+)"/i);
  if (!imgMatch) return undefined;
  const src = imgMatch[1]
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
  if (src.includes('data:') || /star|widget-svg/i.test(src)) {
    return undefined;
  }
  return src;
}

function extractAvatarFromBlock(block) {
  const avatarMatch = block.match(
    /rounded-full[\s\S]{0,400}?<img[^>]+src="([^"]+)"/i,
  );
  if (!avatarMatch) return undefined;
  return avatarMatch[1];
}

function parseNamedCards(html, videoUrlMap) {
  const reviews = [];
  const cardPattern =
    /font-bold not-italic text-left text-lg">([^<]+)<\/span>([\s\S]{0,8000}?)tweet-text text-lg"><div>([\s\S]*?)<\/div><\/div>([\s\S]{0,4000}?)(?=font-bold not-italic text-left text-lg">|$)/g;

  for (const match of html.matchAll(cardPattern)) {
    const block = match[0];
    const { name, subtitle } = splitNameSubtitle(match[1]);
    const text = stripHtml(match[3]);
    const imageUrl = extractImageFromBlock(block);
    const avatarUrl = extractAvatarFromBlock(block);

    const review = normalizeReview({
      id: slugify(`${name}-${text.slice(0, 24)}`),
      name,
      subtitle,
      text,
      imageUrl,
      avatarUrl,
      embedHtml: html,
      videoUrlMap,
    });
    if (review) reviews.push(review);
  }

  return reviews;
}

function isWeakName(name) {
  const weak = new Set([
    'Customer',
    'With',
    'The',
    'As',
    'Very',
    'This',
    'Looking',
    'Food',
    'Quality Taste',
    'Packed',
    'themeal_uae',
  ]);
  return !name || name.length < 2 || weak.has(name);
}

function mergeReviews(reviews) {
  const byPrefix = new Map();

  for (const review of reviews) {
    const key = review.text.slice(0, 55).toLowerCase().replace(/\s+/g, ' ').trim();
    const existing = byPrefix.get(key);
    if (!existing) {
      byPrefix.set(key, { ...review });
      continue;
    }

    const keepExisting = !isWeakName(existing.name) || isWeakName(review.name);
    const winner = keepExisting ? { ...existing } : { ...review };
    const loser = keepExisting ? review : existing;

    if (loser.imageUrl && !winner.imageUrl) winner.imageUrl = loser.imageUrl;
    if (loser.videoUrl && !winner.videoUrl) winner.videoUrl = loser.videoUrl;
    if (loser.avatarUrl && !winner.avatarUrl) winner.avatarUrl = loser.avatarUrl;
    if (loser.socialLink && !winner.socialLink) winner.socialLink = loser.socialLink;
    if (loser.platform && loser.platform !== 'other') winner.platform = loser.platform;
    if (loser.subtitle && !winner.subtitle) winner.subtitle = loser.subtitle;

    if (isVideoMedia(winner.imageUrl, winner.videoUrl)) {
      winner.kind = 'video';
    } else if (winner.imageUrl || winner.socialLink || winner.platform === 'instagram') {
      winner.kind = 'social';
    }

    byPrefix.set(key, winner);
  }

  return [...byPrefix.values()];
}

function parseOrphanSocialPosts(html, namedReviews, videoUrlMap) {
  const namedPrefixes = namedReviews.map((r) =>
    r.text.slice(0, 50).toLowerCase().replace(/\s+/g, ' ').trim(),
  );
  const reviews = [];

  for (const match of html.matchAll(
    /tweet-text text-lg"><div>([\s\S]*?)<\/div><\/div>/g,
  )) {
    const idx = match.index ?? 0;
    const before = html.slice(Math.max(0, idx - 6000), idx);
    if (/font-bold not-italic text-left text-lg">[^<]+<\/span>/.test(before)) {
      continue;
    }

    const text = stripHtml(match[1]);
    if (!text || text.length < 40) continue;

    const prefix = text.slice(0, 50).toLowerCase().replace(/\s+/g, ' ').trim();
    if (
      namedPrefixes.some(
        (p) => prefix.startsWith(p) || p.startsWith(prefix) || prefix.includes(p.slice(0, 30)),
      )
    ) {
      continue;
    }

    const block = html.slice(idx, idx + 5000);
    const imageUrl = extractImageFromBlock(block);
    const lines = text.split(/\s{2,}/);
    const nameCandidate = lines.find((l) => /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3}$/.test(l.trim()));
    const name =
      nameCandidate?.trim() ??
      (text.includes('@themeal') ? 'themeal_uae' : undefined);

    const review = normalizeReview({
      id: slugify(`social-${text.slice(0, 32)}`),
      name: name ?? 'Customer',
      text,
      imageUrl,
      platform: detectPlatform(undefined, text),
      embedHtml: html,
      videoUrlMap,
    });
    if (review) reviews.push(review);
  }

  return reviews;
}

function parseEmbedHtml(html) {
  const videoUrlMap = buildVideoUrlMap(html);
  const named = parseNamedCards(html, videoUrlMap);
  const orphans = parseOrphanSocialPosts(html, named, videoUrlMap);
  return mergeReviews(dedupeReviews([...named, ...orphans]));
}

async function fetchFromEmbed() {
  const response = await fetch(EMBED_URL);
  if (!response.ok) {
    throw new Error(`Embed ${response.status}`);
  }

  const html = await response.text();
  const reviews = parseEmbedHtml(html);

  if (!reviews.length) {
    throw new Error('Could not parse testimonials from embed page');
  }

  return reviews;
}

function readExistingReviews() {
  if (!fs.existsSync(outputPath)) return null;

  const source = fs.readFileSync(outputPath, 'utf8');
  const match = source.match(/export const customersReviews[\s\S]*?=\s*(\[[\s\S]*?\]);/);
  if (!match) return null;

  try {
    return JSON.parse(match[1].replace(/,\s*}/g, '}').replace(/'/g, '"'));
  } catch {
    return null;
  }
}

function writeReviewField(lines, key, value) {
  if (value !== undefined && value !== null && value !== '') {
    lines.push(`    ${key}: ${JSON.stringify(value)},`);
  }
}

function writeReviewsFile(reviews, source) {
  const body = reviews
    .map((review) => {
      const lines = [
        '  {',
        `    id: ${JSON.stringify(review.id)},`,
        `    kind: ${JSON.stringify(review.kind)},`,
        `    text: ${JSON.stringify(review.text)},`,
        `    name: ${JSON.stringify(review.name)},`,
      ];

      writeReviewField(lines, 'subtitle', review.subtitle);
      lines.push(`    rating: ${review.rating ?? 5},`);
      writeReviewField(lines, 'platform', review.platform);
      writeReviewField(lines, 'imageUrl', review.imageUrl);
      writeReviewField(lines, 'videoUrl', review.videoUrl);
      writeReviewField(lines, 'avatarUrl', review.avatarUrl);
      writeReviewField(lines, 'socialLink', review.socialLink);
      lines.push('  },');
      return lines.join('\n');
    })
    .join('\n');

  const content = `/** Auto-generated by npm run reviews:import — do not edit manually. */
/** Source: ${source} */

export type ReviewPlatform = 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'other';

export type CustomerReview = {
  id: string;
  kind: 'text' | 'social' | 'video';
  text: string;
  name: string;
  subtitle?: string;
  rating?: number;
  platform?: ReviewPlatform;
  imageUrl?: string;
  videoUrl?: string;
  avatarUrl?: string;
  socialLink?: string;
};

export const customersReviews: CustomerReview[] = [
${body}
];
`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`Wrote ${reviews.length} reviews to ${path.relative(projectRoot, outputPath)} (${source})`);
}

async function main() {
  const apiKey = process.env.TESTIMONIAL_API_KEY?.trim();

  if (apiKey) {
    try {
      const reviews = await fetchFromApi(apiKey);
      writeReviewsFile(reviews, 'testimonial.to API');
      return;
    } catch (error) {
      console.warn(`API import failed: ${error.message}`);
      console.warn('Falling back to embed parsing…');
    }
  } else {
    console.log('TESTIMONIAL_API_KEY not set — using embed fallback');
  }

  try {
    const reviews = await fetchFromEmbed();
    writeReviewsFile(reviews, 'testimonial.to embed');
    return;
  } catch (error) {
    console.warn(`Embed import failed: ${error.message}`);
  }

  const existing = readExistingReviews();
  if (existing?.length) {
    console.log(`Keeping existing ${existing.length} reviews in ${path.relative(projectRoot, outputPath)}`);
    return;
  }

  throw new Error('No testimonials available from API, embed, or existing file');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
