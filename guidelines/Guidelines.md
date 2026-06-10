# General guidelines

* Prefer responsive layouts with flexbox and grid; use absolute positioning only when necessary.
* Keep components small; extract helpers and reusable pieces into their own files under `src/app/components/common/`.
* Use design tokens from `src/app/components/common/` instead of hardcoded colors, spacing, and typography.

# Design system guidelines

The live reference is `DesignSystemDemo` (`src/app/components/DesignSystemDemo.tsx`). Tokens are exported from `designTokens.tsx`.

## Icons

Icons are **monochrome primitives** — they do not own a color.

* SVG icons use `currentColor` for stroke/fill.
* PNG-mask icons use `bg-current` with a CSS mask.
* **Do not** hardcode `fill`/`stroke` colors inside icon components (except brand payment method PNGs).

### Color strategy (variant A: tokens + wrapper)

| Context | Token | Value |
|---------|-------|-------|
| Design System catalog | `ICON_COLOR_TOKENS.catalog` | `neutral[900]` |
| Inline / secondary UI | `ICON_COLOR_TOKENS.inline` | `neutral[500]` |
| Emphasis | `ICON_COLOR_TOKENS.emphasis` | `neutral[900]` |

**In the catalog:** always show icons at `neutral[900]` so the glyph shape is the reference.

**In product UI:** set color **only on the wrapper or container**, not on the icon component:

```tsx
// One-off usage
<span className={iconColorClassName.inline} style={iconColorStyle.inline}>
  <MapPinIcon size={20} />
</span>

// Pattern component (IconTextRow)
// Container sets --icon-text-row-icon from ICON_COLOR_TOKENS.inline
```

Use `ICON_COLOR_TOKENS` / `iconColorClassName` / `iconColorStyle` from `iconColorTokens.ts`.

### Feather icon library

Full set (287 icons × sizes **16–48**) lives in `src/app/components/common/icons/svg/` as `{slug}-{size}.svg`.

Components in `feather/` import every existing `{slug}-{size}.svg` and pick the native file via `SVG_BY_SIZE[size]`, falling back to `-20.svg` when needed.

* **React components:** `src/app/components/common/icons/feather/` — one file per icon (`ActivityIcon`, `MapPinIcon`, `TruckIcon`, …), same pattern as `BoxIcon`.
* Import: `import { SearchIcon, MapPinIcon } from './common/icons'`
* Regenerate components after manifest/import changes: `npm run icons:generate`
* Manifest: `iconManifest.ts` / `icon-manifest.json` (Figma grid order).
* Re-import SVG assets: `npm run icons:import` (also regenerates `iconNativeSizes.ts` and `nativeSizes` in manifest)
* Check native sizes: `hasNativeIconSize(slug, size)` / `getNativeIconSizes(slug)` from `iconNativeSizes.ts`
* Checkout aliases: `ClearIcon` → `XIcon`, `SuccessIcon` → `CheckCircleIcon`, `DeliveryIcon` → `TruckIcon`

### Exceptions

* **Payment method icons** are brand raster assets — they keep their own colors and are not recolored via `currentColor`.
* **PromoCodeIcon**, **RadioCheckIcon**, **DesignSystemIcon** — custom, not in Feather set.
* A dedicated `IconSlot` / `IconTone` wrapper is **deferred**; revisit if inline wrappers become repetitive.

## Neutral palette roles

See `NEUTRAL_USAGE_ROLES` in `neutralUsageTokens.ts`. Icon roles are split:

* `iconCatalog` — reference display in the DS catalog (`neutral[900]`)
* `iconInline` — icons paired with body text, hints, rows (`neutral[500]`)
