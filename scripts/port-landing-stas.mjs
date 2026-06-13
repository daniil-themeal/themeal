import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const base = path.join(process.env.TEMP || '/tmp', 'themeal-v4-extract/TheMeal-v4-source/redesign4');
const outDir = path.join(root, 'src/app/landing-stas/components/sections');

function transform(name, exports) {
  let src = fs.readFileSync(path.join(base, name), 'utf8');
  src = src.replace(/^\/\*[\s\S]*?\*\/\s*/, '');
  src = src.replace(/const \{ useState, useEffect, useRef \} = React;\s*/g, '');
  src = src.replace(/Object\.assign\(window, \{[^}]+\}\);?\s*/g, '');
  src = src.replace(/React\.createElement/g, 'createElement');
  src = src.replace(/React\.useState/g, 'useState');
  src = src.replace(/React\.useEffect/g, 'useEffect');
  src = src.replace(/React\.useRef/g, 'useRef');
  src = src.replace(/React\.Fragment/g, 'Fragment');
  src = src.replace(/src:`assets\//g, 'src:`/landing-stas/assets/');
  src = src.replace(/'assets\//g, "'/landing-stas/assets/");
  src = src.replace(/"assets\//g, '"/landing-stas/assets/');
  src = src.replace(/url\('assets\//g, "url('/landing-stas/assets/");

  const header = `import { createElement, Fragment, useState, useEffect, useRef } from 'react';
import { Icon, Logo, Stars, Social } from '../icons';

`;
  const footer = `\nexport { ${exports.join(', ')} };\n`;
  fs.writeFileSync(path.join(outDir, name.replace('.jsx', '.tsx')), header + src + footer);
}

fs.mkdirSync(outDir, { recursive: true });
transform('sections1.jsx', ['Header', 'Hero', 'Compare', 'HowItWorks']);
transform('sections2.jsx', ['Menu', 'Customers', 'Fresh', 'LeadCapture']);
transform('sections3.jsx', ['Benefits', 'Delivery', 'FAQ', 'FinalOffer', 'Footer']);
console.log('done');
