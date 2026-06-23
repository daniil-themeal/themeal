# Checkout: full-page вместо overlay (backlog)

Закладка на будущее. Контекст из сессии spacing/scroll (2025).

## Проблема

Сейчас checkout — `fixed inset-0` поверх лендинга (`App.tsx` + `CheckoutPage.tsx`):

- Лендинг остаётся в DOM, скроллится **окно**.
- При открытии checkout: `document.body.style.overflow = 'hidden'` — полоса scrollbar окна пропадает → визуальный зазор/сдвиг справа (gutter).
- Скролл контента checkout — **внутренний** `flex-1 overflow-y-auto` + `scrollbar-hide`.

Показ внутреннего scrollbar пробовали и **откатили** — UX не подошёл.

## Цель

Один владелец скролла (window), без nested scroll и без lock body — убрать gutter-артефакты.

## Варианты (на выбор при возврате к задаче)

### A. Условный рендер (минимальный рефакторинг)

```tsx
// App.tsx — идея
if (checkoutOpen) {
  return <CheckoutPage onClose={closeCheckout} ... />;
}
return <LandingStasPage ... />;
```

В `CheckoutPage`: убрать `fixed inset-0`, `isOpen` / `if (!isOpen) return null`, `body overflow: hidden`, modal enter/exit на корне (или упростить).

### B. Роутинг

- `/` — лендинг
- `/checkout` — checkout (URL, refresh, browser back)

## Связанные отложенные правки (не блокируют A/B)

- `CHECKOUT_DIVIDER_BLEED`: убрать `max-md:w-[calc(100%+2*var(--checkout-card-padding))]` — двойное расширение с `-mx` давало horizontal overflow на plan step (`checkoutStepPageLayoutTokens.ts`).
- Опционально: `overflow-x-hidden min-w-0` на shell checkout как страховка.
- Form steps: mobile padding на `container` (`max-md:px-[var(--checkout-card-padding)]`) — уже сделано, оставить при миграции.

## Файлы

| Файл | Роль |
|------|------|
| `src/app/App.tsx` | siblings Landing + Checkout, `checkoutOpen` |
| `src/app/components/checkout/CheckoutPage.tsx` | overlay, body lock, scroll areas |
| `src/app/landing-stas/LandingStasPage.tsx` | `checkoutOpen` только для OrderFab |

## Поиск в чате

Ключевые слова: scrollbar gutter, overlay, full-page, `scrollbar-hide`, container padding form steps.
