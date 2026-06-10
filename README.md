# Landing_20.05_TEST

Code bundle for the Landing_20.05_TEST project. Original design: [Figma](https://www.figma.com/design/Llf91lQuUCQ5elhJYa7Nqv/Landing_20.05_TEST).

## Running the code

```bash
npm i
npm run dev
```

## Design system

Interactive catalog: run the dev server and open the **Design System Demo** (`DesignSystemDemo`).

Guidelines and conventions: [guidelines/Guidelines.md](guidelines/Guidelines.md).

**Icons:** components are colorless (`currentColor`). The catalog shows them at `neutral[900]`; product UI applies color via a wrapper or container using `ICON_COLOR_TOKENS` from `src/app/components/common/iconColorTokens.ts`.
