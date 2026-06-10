import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(
  projectRoot,
  'src/app/components/common/icons/icon-manifest.json',
);
const svgDir = path.join(projectRoot, 'src/app/components/common/icons/svg');
const featherDir = path.join(projectRoot, 'src/app/components/common/icons/feather');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const ALL_SIZES = [16, 20, 24, 32, 40, 48];

const DEFAULT_SIZE_OVERRIDES = {
  'chevron-right': 16,
};

function slugToComponentName(slug) {
  return (
    slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Icon'
  );
}

function componentNameToMapConstant(componentName) {
  return `${componentName.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()}_SVG_BY_SIZE`;
}

function getExistingNativeSizes(slug) {
  return ALL_SIZES.filter((size) =>
    fs.existsSync(path.join(svgDir, `${slug}-${size}.svg`)),
  );
}

function createComponentFile({ slug, componentName }) {
  const defaultSize = DEFAULT_SIZE_OVERRIDES[slug] ?? 20;
  const nativeSizes = getExistingNativeSizes(slug);
  const fallbackSize = nativeSizes.includes(20) ? 20 : nativeSizes[0];
  const mapConstant = componentNameToMapConstant(componentName);

  const importLines = nativeSizes
    .map((size) => {
      const importName = `${componentName}Svg${size}`;
      return `import ${importName} from '../svg/${slug}-${size}.svg?raw';`;
    })
    .join('\n');

  const mapEntries = nativeSizes
    .map((size) => `  ${size}: ${componentName}Svg${size},`)
    .join('\n');

  const fallbackImportName = `${componentName}Svg${fallbackSize}`;

  return `${importLines}

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ${mapConstant} = {
${mapEntries}
} as const;

export function ${componentName}({ size = ${defaultSize}, className = '' }: IconProps) {
  const svg = ${mapConstant}[size] ?? ${fallbackImportName};
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
`;
}

fs.mkdirSync(featherDir, { recursive: true });

const entries = manifest.map((item) => ({
  ...item,
  componentName: slugToComponentName(item.slug),
}));

for (const entry of entries) {
  const filePath = path.join(featherDir, `${entry.componentName}.tsx`);
  fs.writeFileSync(filePath, createComponentFile(entry), 'utf8');
}

const indexLines = entries.map(
  (entry) => `export { ${entry.componentName} } from './${entry.componentName}';`,
);
fs.writeFileSync(
  path.join(featherDir, 'index.ts'),
  `${indexLines.join('\n')}\n`,
  'utf8',
);

const catalogImports = entries
  .map((entry) => `import { ${entry.componentName} } from './${entry.componentName}';`)
  .join('\n');

const catalogEntries = entries
  .map((entry) => {
    const defaultSize = DEFAULT_SIZE_OVERRIDES[entry.slug] ?? 20;
    const nativeSizes = entry.nativeSizes ?? getExistingNativeSizes(entry.slug);

    return `  { name: '${entry.componentName}', figmaName: '${entry.figmaName.replace(/'/g, "\\'")}', slug: '${entry.slug}', defaultSize: ${defaultSize} as const, nativeSizes: [${nativeSizes.join(', ')}] as const, Icon: ${entry.componentName} },`;
  })
  .join('\n');

const catalogFile = `import type { ComponentType } from 'react';

import type { IconProps } from '../iconProps';
import type { IconSize } from '../iconSize';

${catalogImports}

export type FeatherIconCatalogEntry = {
  name: string;
  figmaName: string;
  slug: string;
  defaultSize: IconSize;
  nativeSizes: readonly IconSize[];
  Icon: ComponentType<IconProps>;
};

export const FEATHER_ICON_CATALOG_ENTRIES: FeatherIconCatalogEntry[] = [
${catalogEntries}
];
`;

fs.writeFileSync(path.join(featherDir, 'iconCatalog.ts'), catalogFile, 'utf8');

const multiSizeCount = entries.filter(
  (entry) => getExistingNativeSizes(entry.slug).length > 1,
).length;

console.log(`Generated ${entries.length} icon components in ${featherDir}`);
console.log(`${multiSizeCount} components with multiple native SVG sizes`);
