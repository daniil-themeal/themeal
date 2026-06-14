# План: размеры h1/h2 из старого лендинга

**Статус:** согласован baseline (2026-06-14). Реализация поэтапно; каждый этап можно отменить отдельным revert.

**Scope:** только размеры (font-size, line-height, letter-spacing из старых правил). Цвета не меняем.

---

## Источник истины (старый лендинг)

Типографика старой версии сохранилась в [`src/styles/index.css`](../src/styles/index.css) (компоненты вроде `HeroSection.tsx` удалены, CSS — нет).

**H1 — `.hero-title-block` / `.hero-title`**

| Breakpoint | font-size |
|---|---|
| mobile | `clamp(3.75rem, 5.291vw + 2.46rem, 5rem)` → **60–80px** |
| md+ (768px) | `clamp(5rem, 1.786vw + 4.143rem, 5.75rem)` → **80–92px** |

Дополнительно: `line-height: 1.3`, `letter-spacing: -0.2rem`.

**H2 — `.h2-title`**

| Breakpoint | font-size |
|---|---|
| mobile | `clamp(3rem, 3.175vw + 2.226rem, 3.75rem)` → **48–60px** |
| md+ | `clamp(3.75rem, 2.976vw + 2.321rem, 5rem)` → **60–80px** |

Дополнительно: `line-height: 1.2`, `letter-spacing: -0.1rem` / `-0.2rem` на md+.

## Текущее состояние (новый landing-stas)

Файл [`src/app/landing-stas/styles/landing-stas.css`](../src/app/landing-stas/styles/landing-stas.css):

- `.h2` и `#top .hero-title`: `clamp(50px, 8.4vw, 64px)` — меньше старых значений.

**Где используются заголовки:**

| Элемент | Файл | Класс |
|---|---|---|
| Hero h1 | `sections1.tsx` | `hero-title` |
| Compare, How, Customers, Fresh, Gallery, Benefits, Delivery, FAQ, Final | sections1–3 | `h2` |
| Menu title | `sections2.tsx` | `menu-head-title` (inline CSS, дублирует h2) |
| Lead capture | `sections2.tsx` | `lead-title` (28–40px, **не трогаем**) |

**Решения:**

- **Compare:** общий `.h2` (48–80px), не отдельный 32–40px.
- **Lead capture:** не меняем (`FormSectionHeading` в старом = 25px).

---

## Этап 1 — Токены (без видимых изменений)

**Файл:** `landing-stas.css`

Добавить в `.landing-stas`:

```css
--landing-h1-fs: clamp(3.75rem, 5.291vw + 2.46rem, 5rem);
--landing-h1-lh: 1.3;
--landing-h1-tracking: -0.2rem;

--landing-h2-fs: clamp(3rem, 3.175vw + 2.226rem, 3.75rem);
--landing-h2-lh: 1.2;
--landing-h2-tracking: -0.1rem;
```

И `@media (min-width: 768px)` с md-значениями из `index.css`.

**Проверка:** визуально без изменений.

---

## Этап 2 — H2 для всех секций

- Подключить `.h2` к `--landing-h2-*`.
- Убрать `font-size` у `.menu-head-title` в `sections2.tsx` (inline style).
- Упростить mobile override `.menu-section .menu-head-title`.

**Секции:** `#why`, `#how`, `#menu`, `#customers`, `#fresh`, `#gallery`, `#benefits`, `#delivery`, `#faq`, final CTA.

---

## Этап 3 — H1 в Hero

- `#top .hero-title` → `--landing-h1-*`.
- `.hero-title__offer` → `font-size: inherit`.
- `hero-title__was` / `hero-title__cur` — без изменений.

---

## Этап 4 — Чистка и регрессия

- `npm run build`.
- DevTools: 375 / 768 / 1280px.
- Не трогать: цвета, `lead-title`, checkout, design system.

---

## Что не входит

- Цвета
- `lead-title`
- Checkout / Design System Demo

## Порядок работы

Этап 1 → проверка → Этап 2 → … Каждый этап — отдельный коммит по запросу.

## Откат

- До начала реализации: удалить/не применять этот план.
- После этапов: `git revert` коммита соответствующего этапа.
