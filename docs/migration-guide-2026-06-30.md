# Migration Guide — правки и нововведения 30.06.2026

Документ для переноса изменений из репозитория `Landing_20.05_TEST` в другой проект.  
Production (на момент дня): https://themeal-test.vercel.app · ветка `feature/next`

**Статус блоков:**

| Блок | Статус | Коммиты |
|------|--------|---------|
| Checkout plan scroll + layout | ✅ задеплоен | `dc45abe`, `b48376b`, `02d670d` |
| Full Menu header gap | ✅ задеплоен | `3321ea6` |
| Site metadata hook | ✅ задеплоен | `030f2d6` |
| Letter-spacing tokens | ⏳ локально, не в prod | uncommitted |
| Blog модуль | ⏳ локально, не в prod | uncommitted |
| Legal breadcrumbs | ⏳ локально, не в prod | uncommitted |
| SEO (убрать noindex) | ⏳ локально, не в prod | uncommitted |

---

## Оглавление

1. [Checkout — plan step scroll](#1-checkout--plan-step-scroll)
2. [Checkout — layout и spacing](#2-checkout--layout-и-spacing)
3. [Order Summary — токены отступов](#3-order-summary--токены-отступов)
4. [Full Menu — отступ под хедером](#4-full-menu--отступ-под-хедером)
5. [Site metadata (title / description)](#5-site-metadata-title--description)
6. [Letter-spacing design tokens](#6-letter-spacing-design-tokens)
7. [Blog модуль](#7-blog-модуль)
8. [Legal breadcrumbs — рефакторинг](#8-legal-breadcrumbs--рефакторинг)
9. [SEO — снятие noindex](#9-seo--снятие-noindex)
10. [Чеклист переноса](#10-чеклист-переноса)
11. [Сводный промпт для AI / другого репо](#11-сводный-промпт-для-ai--другого-репо)

---

## 1. Checkout — plan step scroll

**Цель:** убрать JS scroll chaining между колонками plan step, перейти на нативный sticky (как в HTML-макете `meals_plan_step_v2.html`).

**Коммит:** `dc45abe`

### Что было

- Хук `usePlanStepScrollChaining.ts` перехватывал `wheel`, делал smooth scroll через `requestAnimationFrame`, связывал `scrollTop` левой и правой колонок.
- Правая колонка имела inner scroll: `md:max-h-[calc(100svh-56px)]`, `md:overflow-y-hidden`.

### Что стало

- Один scroll container (`bodyRef` / main scroll area checkout).
- Правая колонка: `position: sticky`, без inner scroll.
- Mobile **не менялся**: один вертикальный скролл, `BottomFloatTotalBlock`, `IntersectionObserver`.

### Шаги переноса

1. **Удалить** `src/app/components/checkout/usePlanStepScrollChaining.ts`.

2. В `CheckoutPage.tsx`:
   - убрать import и вызов `usePlanStepScrollChaining({ enabled: isOpen && checkoutStep === 'plan', bodyRef, rightRef })`;
   - у правой колонки (`ref={rightRef}`) **оставить**: `md:sticky md:top-0 md:self-start`, padding, width constraints;
   - **убрать** с desktop: `md:max-h-[calc(100svh-56px)]`, `md:min-h-0`, `md:overflow-x-hidden`, `md:overflow-y-hidden`.

3. **Не трогать:** `bodyRef` с `overflow-y-auto`, grid layout, `BottomFloatTotalBlock`, `handleScrollToSummary`, `IntersectionObserver`, горизонтальный скролл карусели блюд.

### Проверка

- Desktop: один нативный скролл над обеими колонками, summary липнет.
- Mobile: без регрессий.
- `npm run build` проходит.

### ⚠️ Отменённая работа (НЕ переносить)

Попытка «остановки» sticky summary по макету (`top: 16px`, перенос sticky на inner wrapper) была **откачена** по запросу «отмена». В prod только native sticky из этого блока.

---

## 2. Checkout — layout и spacing

**Коммит:** `b48376b`

### 2.1. Левая колонка — padding-top 40px на md+

В `CheckoutPage.tsx`, div левой колонки (PlanSelector, Ingredients, Days, Duration):

```tsx
// было
md:pt-[56px]

// стало
md:pt-[40px]
```

Mobile padding через `--checkout-step-header-pt` не менять.

### 2.2. Правая колонка — выравнивание с плашкой Light

Верх карточки Order Summary должен быть на одном уровне с первой plan-карточкой (Light), а не с заголовком «Choose your plan».

**`checkoutSpacing.ts`:**

```ts
export const CHECKOUT_PLAN_SUMMARY_ALIGN_OFFSET_CLAMP = '20px';
// только gap между заголовком PlanSelector и карточками (без высоты заголовка)
```

**`CheckoutPage.tsx`**, правая колонка (не trial):

```tsx
style={{ '--checkout-plan-summary-align-offset': CHECKOUT_PLAN_SUMMARY_ALIGN_OFFSET_CLAMP }}
className="... md:pt-[calc(56px+var(--checkout-plan-summary-align-offset))]"
```

Для **trial** оставить `md:pt-[56px]` — там нет плашки Light.  
Mobile: `max-md:pt-0`.

---

## 3. Order Summary — токены отступов

**Коммиты:** `b48376b`, `02d670d` (+ локальная правка section gap)

### 3.1. Токены в `checkoutSpacing.ts`

```ts
/** Order summary section horizontal inset — 25% narrower than card padding, multiples of 4px. */
export const CHECKOUT_ORDER_SUMMARY_SECTION_PADDING_CLAMP =
  'clamp(16px, calc(16px + (100vw - 20rem) * 8 / 448), 24px)';
// было 20→32px

/** Order summary card vertical inset */
export const CHECKOUT_ORDER_SUMMARY_CARD_PADDING_Y_CLAMP = '24px';
// b48376b: 20px; 02d670d: увеличено до 24px

export const CHECKOUT_ORDER_SUMMARY_CARD_PADDING_Y_MOBILE_CLAMP = '12px';
// было 16px

/** Order summary divider / section vertical gap */
export const CHECKOUT_ORDER_SUMMARY_SECTION_GAP_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 4 / 448), 20px)';
// b48376b: max 24px; локально: max 20px

export const CHECKOUT_ORDER_SUMMARY_INNER_GAP_MD_CLAMP = '12px';  // было 16px
export const CHECKOUT_ORDER_SUMMARY_INNER_GAP_SM_CLAMP = '4px';   // было 8px
```

### 3.2. Подключение в `OrderSummary.tsx` и `TrialOrderSummary.tsx`

- CSS-переменная `--order-summary-section-padding` → секции: `px-[length:var(--order-summary-section-padding)]`
- Card `pt`/`pb` через vars из `CHECKOUT_ORDER_SUMMARY_CARD_PADDING_Y_*`
- Section gap через `CHECKOUT_ORDER_SUMMARY_SECTION_GAP_CLAMP`
- Inner flex gaps 16→12px, 8→4px через vars
- Fade width карусели и `CheckoutScrollEdgeGutter` — тот же section padding token
- Carousel `px` в `TrialOrderSummary` — тот же token

**Не трогать:** `scroll-mb-[72px]`, `--checkout-plan-column-pb-mobile`, глобальный `CHECKOUT_SECTION_GAP_CLAMP`, full-bleed dividers, delivery/payment layout, `FullMenuPanel`.

---

## 4. Full Menu — отступ под хедером

**Коммит:** `3321ea6`

**Проблема:** пропал отступ между ModalHeader «Full menu» и контентом — у day picker случайно стояло `pt-0`.

**`FullMenuPanel.tsx`:**

```tsx
// Day picker block
className="shrink-0 px-[length:var(--checkout-card-padding)] pt-[12px] pb-0"

// Trial (day picker скрыт): отступ на meals outer container
className={[mealsOuterClassName, isTrial && !isEmbedded ? 'pt-[12px]' : ''].filter(Boolean).join(' ')}
```

---

## 5. Site metadata (title / description)

**Коммит:** `030f2d6`

Динамическое обновление `<title>` и `<meta name="description">` на клиенте.

### Новые файлы

**`src/app/config/siteMetadata.ts`**

```ts
export const siteMetadata = {
  title: 'TheMeal – Meal plan in UAE for only 999 AED per month.',
  description: 'Enjoy nutritious and delicious food delivered fresh to your doorstep!',
} as const;
```

**`src/app/hooks/useSiteMetadata.ts`**

```ts
export function useSiteMetadata({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    // создаёт/обновляет meta[name="description"]
  }, [title, description]);
}
```

### Интеграция

**`App.tsx`:**

```tsx
import { siteMetadata } from './config/siteMetadata';
import { useSiteMetadata } from './hooks/useSiteMetadata';

export default function App() {
  useSiteMetadata(siteMetadata);
  // ...
}
```

**`index.html`:** дефолтные `<title>` и `<meta name="description">` должны совпадать с `siteMetadata` (single source при деплое — config).

Страницы с кастомным SEO (blog, legal) вызывают `useSiteMetadata({ title, description })` локально.

---

## 6. Letter-spacing design tokens

**Статус:** uncommitted — системная унификация negative letter-spacing по всему проекту.

### 6.1. Новые файлы

**`src/app/components/common/letterSpacingTokens.ts`**

```ts
export const LETTER_SPACING_TOKENS = {
  display: '-0.24rem',        // hero h1 — было -0.2rem
  headingLg: '-0.24rem',      // h2 md+ — было -0.2rem
  headingMd: '-0.12rem',      // h2 mobile — было -0.1rem
  headingSm: '-0.015em',      // h3 — было -0.01em
  displayEm: '-0.03em',       // .display — было -0.025em
  displayTight: '-0.06em',    // 404 — было -0.05em
  headingCompact: '-0.06rem', // compact h2 — было -0.05rem
  title32: '-0.76px',         // ~32px bold — было -0.64px
  title25: '-0.9px',          // card titles — было -0.75px
  title25Bold: '-0.6px',      // account 25px bold — было -0.5px
  title25Light: '-0.3px',     // account day number — было -0.25px
  body20: '-0.48px',          // ~20px — было -0.4px
  label16: '-0.19px',         // 16px bold UI — было -0.16px
  label16Medium: '-0.38px',   // 16px medium — было -0.32px
  label14: '-0.17px',         // 14px badges — было -0.14px
  label12: '-0.14px',         // 12px labels — было -0.12px
  label12Bold: '-0.44px',     // 12px bold — было -0.36px
} as const;

export const LETTER_SPACING_CSS_VARS = /* --letter-spacing-{name} map */;
```

**`src/styles/letter-spacing-tokens.css`**

```css
/* KEEP_IN_SYNC(src/app/components/common/letterSpacingTokens.ts) */
:root {
  --letter-spacing-display: -0.24rem;
  /* ... все 17 переменных ... */
}
```

### 6.2. Подключение CSS

**`src/styles/index.css`:**

```css
@import "./letter-spacing-tokens.css";
```

### 6.3. Экспорт из design system

**`designTokens.tsx`** — добавить re-export `LETTER_SPACING_TOKENS`, `LETTER_SPACING_CSS_VARS`, types.

**`typographyTokens.ts`** — заменить hardcoded tracking:
- `pageTitle`: `tracking-[length:var(--letter-spacing-title32)]`
- `sectionTitle`: `tracking-[length:var(--letter-spacing-label16)]`
- `typographyRoleStyle` spread `LETTER_SPACING_CSS_VARS`

**`DesignSystemDemo.tsx`** — новая секция «Letter spacing tokens» с `LetterSpacingTokenRow`.

### 6.4. Файлы с заменой hardcoded → CSS vars

| Область | Файл | Примеры замен |
|---------|------|---------------|
| Global typography | `src/styles/index.css` | `.h2-title`, `.hero-title`, `.compare-card-title-text` |
| Landing | `main-landing/styles/base.css` | `--landing-h1-tracking`, `--landing-h2-tracking` |
| Landing | `main-landing/styles/typography.css` | `.display`, `.h3` |
| Landing | `main-landing/styles/sections/hero.css` | hero price, title |
| Landing | `sections3.tsx` | убран inline `letterSpacing:'-0.05rem'` у FinalOffer h2 |
| Account | `account/styles/account.css` | все `letter-spacing: -0.XXpx` → `var(--letter-spacing-*)` |
| Checkout | `checkoutStepPageLayoutTokens.ts` | `headerTitle` → `--letter-spacing-title32` |
| Checkout | `MenuDaySelector.tsx`, `FullMenuPanel.tsx`, `BottomFloatTotalBlock.tsx` | label16, label12 |
| Checkout | `success/SuccessContactSection.tsx` | `--letter-spacing-body20` |
| 404 | `not-found-page.css` | `--letter-spacing-displayTight` |

### 6.5. Tailwind-синтаксис

```tsx
// было
tracking-[-0.16px]

// стало
tracking-[length:var(--letter-spacing-label16)]
```

```css
/* было */
letter-spacing: -0.5px;

/* стало */
letter-spacing: var(--letter-spacing-title25Bold);
```

### 6.6. Правило синхронизации

Комментарий `KEEP_IN_SYNC` в CSS — значения в `.ts` и `.css` должны совпадать. При изменении токена обновлять оба файла.

---

## 7. Blog модуль

**Статус:** uncommitted — полноценный раздел `/blog` на базе legal page layout.

### 7.1. Структура файлов (скопировать целиком)

```
src/app/blog/
├── index.ts                          # public exports
├── routes.ts                         # BLOG_ROUTES
├── blog-page.css                     # blog-specific styles
├── types/
│   └── blog.types.ts                 # BlogPost, BlogPostBlock, BlogPostSection
├── content/
│   └── posts.ts                      # blogListMeta, blogPosts[], getters
├── components/
│   ├── BlogPostCard.tsx              # card for list page
│   └── BlogPostContentBlocks.tsx     # paragraph/quote/image renderer
└── pages/
    ├── BlogListPage.tsx              # /blog
    └── BlogPostPage.tsx              # /blog/:slug
```

**Дополнительно (legal refactor для breadcrumbs):**

```
src/app/legal/LegalBreadcrumbs.tsx    # новый компонент
```

### 7.2. Маршруты

**`routes.ts`:**

```ts
export const BLOG_ROUTES = {
  index: '/blog',
  post: (slug: string) => `/blog/${slug}`,
} as const;
```

**`App.tsx`:**

```tsx
import { BlogListPage, BlogPostPage, BLOG_ROUTES } from './blog';

<Route path={BLOG_ROUTES.index} element={<BlogListPage />} />
<Route path={`${BLOG_ROUTES.index}/:slug`} element={<BlogPostPage />} />
```

### 7.3. Типы контента

```ts
type BlogPostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; url: string; alt: string; caption?: string };

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  publishedAt: string;  // ISO date
  intro: string;        // \n\n separated paragraphs
  sections: readonly BlogPostSection[];
};
```

### 7.4. Контент

3 демо-статьи в `posts.ts`:
- `healthy-meal-prep-uae`
- `food-delivery-sustainability`
- `ready-to-eat-meals-busy-lifestyle`

Изображения — Unsplash URLs (можно заменить на локальные assets).

**API контента:**

```ts
getAllPosts(): BlogPost[]           // sorted by publishedAt desc
getPostBySlug(slug: string): BlogPost | undefined
```

### 7.5. Зависимости модуля

Blog переиспользует существующую инфраструктуру — **убедиться, что в целевом репо есть:**

| Зависимость | Путь |
|-------------|------|
| Legal layout | `LegalHeader`, `legal-page.css`, `legalTypography` |
| Landing shell | `main-landing/styles/index.css`, `landingLayoutStyle`, `Footer` |
| UI | `Chip`, `ChevronRightIcon` |
| Prose | `ProseList`, `parseLegalContentBlocks`, `parseLabeledListItem` |
| Hooks | `useSiteMetadata` |
| 404 | `NotFoundPage` для unknown slug |

### 7.6. Layout страниц

Обе страницы используют оболочку legal page:

```tsx
<div
  className="main-landing legal-page blog-page min-h-screen w-full font-sans"
  style={{ ...legalTypographyVars, ...landingLayoutStyle }}
>
  <LegalHeader t={t} />
  <main className="legal-main">...</main>
  <Footer t={t} />
</div>
```

List page дополнительно: `blog-page--list`.

### 7.7. SEO

```tsx
// BlogListPage
useSiteMetadata({ title: blogListMeta.title, description: blogListMeta.description });

// BlogPostPage
useSiteMetadata({ title: `${post.title} | TheMeal`, description: post.excerpt });
```

### 7.8. Навигация и i18n

**`mealContentEn.ts`:**

```ts
siteNav: { ..., blog: "Blog" }
footer: { ..., blog: "Blog" }
blog: {
  readArticle: "Read article",
  backToBlog: "Back to blog",
  notFoundDescription: "The blog article you are looking for does not exist or may have been moved."
}
```

**`SiteNavDrawer.tsx`:**

```tsx
import { BLOG_ROUTES } from '../../blog/routes';
// legalItems:
{ label: t.siteNav.blog, href: BLOG_ROUTES.index, isRoute: true }
```

**`sections3.tsx` Footer:**

```tsx
[t.footer.blog, '/blog']
```

### 7.9. Стили (`blog-page.css`)

Ключевые решения:
- Grid 1 col на mobile, gap через `--blog-grid-gap` (= `--legal-gap-2xl`)
- Card image aspect-ratio 16/10, hover scale 1.03
- Post hero 16/9, inline images 16/10
- Quote block: purple left border + light purple bg
- Responsive padding-top list page: `calc(var(--hdr-h) + var(--legal-gap-xl))` → `3xl` на md+

---

## 8. Legal breadcrumbs — рефакторинг

**Статус:** uncommitted — вынесен в компонент, улучшен UX.

### 8.1. Новый компонент `LegalBreadcrumbs.tsx`

```tsx
export type LegalBreadcrumbItem =
  | { type: 'link'; to: string; label: ReactNode }
  | { type: 'current'; label: ReactNode };

export function LegalBreadcrumbs({ items }: { items: readonly LegalBreadcrumbItem[] })
```

- Разделитель: `ChevronRightIcon` (16px) вместо `/`
- Ссылки: pill-style с hover/focus (`min-height: 36px`, purple tint bg)
- `aria-current="page"` на current item

### 8.2. CSS (`legal-page.css`)

Удалено:

```css
.legal-breadcrumbs__item:not(:last-child)::after { content: '/'; }
```

Добавлено: `.legal-breadcrumbs__chevron`, `.legal-breadcrumbs__link` (+ hover/focus-visible).

### 8.3. Использование

**`LegalDocumentPage.tsx`:**

```tsx
<LegalBreadcrumbs
  items={[
    { type: 'link', to: '/', label: 'Home' },
    { type: 'current', label: pageLabel },
  ]}
/>
```

**`BlogPostPage.tsx`:**

```tsx
<LegalBreadcrumbs
  items={[
    { type: 'link', to: '/', label: 'Home' },
    { type: 'link', to: BLOG_ROUTES.index, label: t.footer.blog },
    { type: 'current', label: post.title },
  ]}
/>
```

---

## 9. SEO — снятие noindex

**Статус:** uncommitted

**`index.html`** — удалить строку:

```html
<meta name="robots" content="noindex, nofollow" />
```

Применять только когда сайт готов к индексации.

---

## 10. Чеклист переноса

### Фаза A — Checkout (задеплоено, приоритет 1)

- [ ] Удалить `usePlanStepScrollChaining.ts`
- [ ] CheckoutPage: native sticky, убрать inner scroll у summary
- [ ] CheckoutPage: левая колонка `md:pt-[40px]`
- [ ] CheckoutPage: правая колонка align offset + CSS var
- [ ] `checkoutSpacing.ts`: все ORDER_SUMMARY_* токены (см. §3)
- [ ] OrderSummary + TrialOrderSummary: подключить токены
- [ ] FullMenuPanel: `pt-[12px]` под хедером + trial fallback
- [ ] `npm run build` + smoke test plan step desktop/mobile

### Фаза B — Metadata (задеплоено)

- [ ] `siteMetadata.ts` + `useSiteMetadata.ts`
- [ ] App.tsx: `useSiteMetadata(siteMetadata)`
- [ ] index.html title/description синхронизированы

### Фаза C — Design tokens (локально)

- [ ] `letterSpacingTokens.ts` + `letter-spacing-tokens.css`
- [ ] import в `index.css`
- [ ] re-export в `designTokens.tsx`
- [ ] `typographyTokens.ts` + DesignSystemDemo секция
- [ ] Миграция hardcoded values (§6.4)
- [ ] Visual QA: hero, h2, account, checkout headers

### Фаза D — Blog + Legal (локально)

- [ ] Скопировать `src/app/blog/**`
- [ ] `LegalBreadcrumbs.tsx` + CSS
- [ ] Роуты в App.tsx
- [ ] i18n keys в mealContentEn
- [ ] Footer + SiteNavDrawer links
- [ ] `useSiteMetadata` на blog pages
- [ ] Проверить `/blog`, `/blog/healthy-meal-prep-uae`, 404 slug

### Фаза E — SEO (локально, по готовности)

- [ ] Убрать `noindex, nofollow` из index.html

---

## 11. Сводный промпт для AI / другого репо

```
Перенеси все изменения TheMeal от 30.06.2026 из migration-guide-2026-06-30.md.

=== ФАЗА A: CHECKOUT (задеплоено) ===

1) PLAN SCROLL: удали usePlanStepScrollChaining. Правая колонка — md:sticky md:top-0, без md:max-h/min-h/overflow-y-hidden. Mobile не трогать.

2) PLAN LAYOUT:
   - левая колонка md:pt-[40px]
   - правая (не trial): md:pt-[calc(56px+var(--checkout-plan-summary-align-offset))], offset = CHECKOUT_PLAN_SUMMARY_ALIGN_OFFSET_CLAMP = '20px'

3) ORDER SUMMARY TOKENS (checkoutSpacing.ts):
   SECTION_PADDING: clamp(16px…24px)
   CARD_PADDING_Y: 24px, mobile 12px
   SECTION_GAP: clamp(20px…20px)
   INNER_GAP_MD: 12px, INNER_GAP_SM: 4px
   Подключи в OrderSummary.tsx и TrialOrderSummary.tsx.

4) FULL MENU: FullMenuPanel — pt-[12px] у day picker; для trial pt-[12px] на meals outer.

=== ФАЗА B: METADATA ===

5) siteMetadata.ts + useSiteMetadata hook, вызов в App.tsx.

=== ФАЗА C: LETTER-SPACING TOKENS ===

6) Создай letterSpacingTokens.ts (17 токенов) + letter-spacing-tokens.css (KEEP_IN_SYNC).
   Import в index.css. Re-export из designTokens.tsx.
   Замени hardcoded letter-spacing в: index.css, base.css, typography.css, hero.css,
   account.css, checkoutStepPageLayoutTokens, MenuDaySelector, FullMenuPanel,
   BottomFloatTotalBlock, SuccessContactSection, not-found-page.css, typographyTokens, DesignSystemDemo.

=== ФАЗА D: BLOG ===

7) Модуль src/app/blog/ (routes, types, posts, BlogPostCard, BlogPostContentBlocks, BlogListPage, BlogPostPage, blog-page.css).
   LegalBreadcrumbs.tsx + legal-page.css chevron links.
   App routes /blog и /blog/:slug.
   i18n: siteNav.blog, footer.blog, blog.readArticle/backToBlog/notFoundDescription.
   Footer и SiteNavDrawer — ссылка на /blog.

=== ФАЗА E: SEO ===

8) Убери <meta name="robots" content="noindex, nofollow"> из index.html.

НЕ переносить отменённый sticky stop alignment (top:16px inner wrapper).

npm run build, commit.
```

---

## Приложение A — полный список файлов

### Задеплоено (коммиты за 30.06)

```
src/app/components/checkout/CheckoutPage.tsx
src/app/components/checkout/OrderSummary.tsx
src/app/components/checkout/TrialOrderSummary.tsx
src/app/components/checkout/checkoutSpacing.ts
src/app/components/checkout/FullMenuPanel.tsx
src/app/components/checkout/usePlanStepScrollChaining.ts  (DELETE)
src/app/config/siteMetadata.ts                              (NEW)
src/app/hooks/useSiteMetadata.ts                            (NEW)
src/app/App.tsx
index.html
```

### Локально (uncommitted)

```
src/app/components/common/letterSpacingTokens.ts            (NEW)
src/styles/letter-spacing-tokens.css                        (NEW)
src/app/components/common/designTokens.tsx
src/app/components/common/typographyTokens.ts
src/app/components/DesignSystemDemo.tsx
src/styles/index.css
src/app/account/styles/account.css
src/app/components/BottomFloatTotalBlock.tsx
src/app/components/checkout/MenuDaySelector.tsx
src/app/components/checkout/checkoutStepPageLayoutTokens.ts
src/app/components/checkout/success/SuccessContactSection.tsx
src/app/main-landing/styles/base.css
src/app/main-landing/styles/typography.css
src/app/main-landing/styles/sections/hero.css
src/app/main-landing/components/sections/sections3.tsx
src/app/main-landing/content/mealContentEn.ts
src/app/main-landing/components/SiteNavDrawer.tsx
src/app/not-found-page.css
src/app/legal/LegalBreadcrumbs.tsx                          (NEW)
src/app/legal/LegalDocumentPage.tsx
src/app/legal/legal-page.css
src/app/blog/**                                             (NEW — 9 files)
index.html                                                  (remove noindex)
```

---

## Приложение B — порядок коммитов за день

```
dc45abe  Simplify checkout plan scroll to native sticky behavior
b48376b  Refine checkout plan column padding and order summary spacing tokens
3321ea6  Restore full menu header spacing above day picker and meals
030f2d6  Add themeal.menu page metadata and tune order summary divider spacing
02d670d  Increase order summary card vertical padding to 24px
```

---

*Документ: `docs/migration-guide-2026-06-30.md` · дополняет `docs/prompts-2026-06-30.md` (промпты по checkout)*
