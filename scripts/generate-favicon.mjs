import sharp from 'sharp';
import { writeFileSync } from 'fs';
import svgPaths from '../src/imports/svgPaths.ts';

const M_PATH = svgPaths.p257cc080;
const BG = '#FCDE02';
const FG = '#411864';

const minX = 8.79666;
const minY = 1.95941;
const maxX = 37.0805;
const maxY = 25.6598;
const pw = maxX - minX;
const ph = maxY - minY;
const size = 32;
const pad = 3;
const cornerRadius = 5;
const scale = Math.min((size - pad * 2) / pw, (size - pad * 2) / ph) * 0.95;
const sw = pw * scale;
const sh = ph * scale;
const tx = (size - sw) / 2 - minX * scale;
const ty = (size - sh) / 2 - minY * scale;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="theMeal">
  <rect width="32" height="32" rx="${cornerRadius}" ry="${cornerRadius}" fill="${BG}"/>
  <path fill="${FG}" transform="translate(${tx.toFixed(4)} ${ty.toFixed(4)}) scale(${scale.toFixed(6)})" d="${M_PATH}"/>
</svg>`;

writeFileSync('public/favicon.svg', svg);

const buf = Buffer.from(svg);
const sharpSvg = sharp(buf, { density: 300 });

await sharpSvg.clone().resize(32, 32).png().toFile('public/favicon-32x32.png');
await sharpSvg.clone().resize(16, 16).png().toFile('public/favicon-16x16.png');
await sharpSvg.clone().resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharpSvg.clone().resize(32, 32).png().toFile('public/favicon.ico');

console.log(`Favicon generated (scale=${scale.toFixed(4)}, tx=${tx.toFixed(2)}, ty=${ty.toFixed(2)})`);
