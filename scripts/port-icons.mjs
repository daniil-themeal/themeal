import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(process.env.TEMP, 'themeal-v4-extract/TheMeal-v4-source/redesign/icons.jsx'), 'utf8');
let out = src
  .replace(/^\/\*[\s\S]*?\*\/\s*/, '')
  .replace(/React\.createElement/g, 'createElement')
  .replace(/src:`assets\//g, 'src:`/main-landing/assets/')
  .replace(/window\.Icon = Icon; window\.Logo = Logo; window\.Stars = Stars;\s*/g, '')
  .replace(/window\.Social = Social;\s*/g, '');

out = `import { createElement } from 'react';

${out}

export { Icon, Logo, Stars, Social };
`;

fs.writeFileSync(path.join(__dirname, '../src/app/main-landing/components/icons.tsx'), out);
console.log('icons done');
