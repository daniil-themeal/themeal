# Plan: Payment Success Page with Semantic Naming

## Context
The user imported a Figma design for a payment success page with a delivery calendar. The auto-generated code has generic names (Frame59, Frame60, Truck1, Truck2, etc.). The user wants the page laid out with semantic, logical names for all containers and elements, with all icons in SVG.

## What the page contains (top to bottom)
1. **Header** — white bar with a close/dismiss button (X icon)
2. **Success section** — green checkmark circle, "Payment successful!" title, subtitle, purple "Go to main page" button
3. **Delivery calendar** — legend row (meal days / delivery days), weekday headers (Mon–Sun), 5 rows of date cells (Jul 7 – Aug 10); purple-highlighted cells = meal days, truck icon = delivery day
4. **Rules section** — "Please, read our rules" heading + 6 rule items, each with a colored circle icon (SVG), title and description
5. **Contact section** — text + WhatsApp and Telegram icon buttons
6. **Social follow section** — "Follow us" text + 4 social icon buttons (Facebook, TikTok, Instagram, YouTube)

## Approach

### Files to create/modify
- `src/styles/fonts.css` — add `@import url(...)` for Quicksand (Bold, Regular, Medium) from Google Fonts
- `src/app/components/PaymentSuccessPage.tsx` — full semantic component
- `src/app/App.tsx` — render `<PaymentSuccessPage />`

### SVG strategy
- Import `svgPaths` from `../../imports/14401920/svg-p2146qmwl2` to reuse all existing SVG path data
- All icons rendered as inline `<svg>` elements with `<path d={svgPaths.xxx} ...>` — no external images
- The green checkmark and close (X) icon are built inline without path data (simple SVG geometry)

### Semantic component structure in PaymentSuccessPage.tsx

```
<PageLayout>                          // bg-[#f3f4f7], full height, column flex
  <PageHeader>                        // white bar
    <CloseButton>                     // X icon SVG
  <PageContent>                       // centered column, max-w 680px
    <SuccessSection>                  // checkmark + text + button
      <CheckmarkCircle>               // green circle SVG with white checkmark path
      <SuccessHeading>                // "Payment successful!"
      <SuccessSubheading>             // "Thank you for choosing us!"
      <GoToMainButton>                // purple button
    <DeliveryCalendarSection>
      <CalendarLegend>
        <LegendItem icon="meal-swatch">  Meal days
        <LegendItem icon="truck-svg">    Delivery days
      <WeekdayHeaderRow>              // Mon Tue Wed Thu Fri Sat Sun
      <CalendarGrid>
        <CalendarWeekRow> × 5        // each row = 7 cells
          <CalendarDayCell>          // props: day, month, isMealDay, isDeliveryDay, isDisabled
            <DayNumber>
            <MonthLabel>
            <DeliveryTruckIcon?>     // conditional truck SVG
    <RulesSection>
      <RulesHeading>                 // "Please, read our rules"
      <RulesList>
        <RuleItem> × 6              // icon circle + title + description
          <RuleIconCircle>           // colored circle with SVG icon
          <RuleContent>
            <RuleTitle>
            <RuleDescription>
    <ContactSection>
      <ContactText>
      <ContactButtons>
        <WhatsAppButton>             // white card with WhatsApp SVG
        <TelegramButton>             // white card with Telegram SVG
    <SocialSection>
      <SocialHeading>               // "Follow us"
      <SocialIconRow>
        <SocialIconButton> × 4     // Facebook, TikTok, Instagram, YouTube
```

### Calendar data
Hardcode the 5-week rows as data arrays (not 35 separate components):
```ts
type CalendarDay = { day: number; month: string; isMealDay: boolean; isDeliveryDay: boolean; isDisabled: boolean }
```

Row 1: Jul 7(disabled), 8(disabled), 9(meal+delivery), 10(meal), 11(meal), 12, 13(delivery)  
Row 2: Sep 14(meal), Jul 15(meal), 16(meal+delivery), 17(meal), 18(meal), 19, 20(delivery)  
Row 3: JUL 21(meal), Jul 22(meal), 23(meal+delivery), 24(meal), 25(meal), 26, 27(delivery)  
Row 4: JUL 28(meal), Jul 29(meal), 30(meal+delivery), 31(meal), 1Aug(meal), 2Aug, 3Aug(delivery)  
Row 5: AUG 4(meal), 5(meal), 6(meal), 7(disabled), 8(disabled), 9(disabled), 10(disabled)

### Rules data
```ts
const rules = [
  { iconBg: '#FBD759', iconKey: 'calendar', title: 'Fixed Delivery Days', desc: '...' },
  { iconBg: '#F354B9', iconKey: 'pause',    title: 'Delivery Pause',      desc: '...' },
  { iconBg: '#F06428', iconKey: 'meal',     title: 'Set Menu',            desc: '...' },
  { iconBg: '#AE60F2', iconKey: 'clock',    title: 'Order Changes Deadline', desc: '...' },
  { iconBg: '#78CBE2', iconKey: 'snow',     title: 'Storage Instructions', desc: '...' },
  { iconBg: '#A8E278', iconKey: 'recycle',  title: 'Return the Box',      desc: '...' },
]
```
Each icon rendered as a dedicated named SVG component (CalendarIcon, PauseIcon, MealIcon, ClockIcon, SnowflakeIcon, RecycleIcon) using paths from svgPaths.

## Verification
- Open the app preview and visually compare to the screenshot (`image-0.png`)
- Check: checkmark visible, calendar grid 5×7, truck icons on correct cells, purple highlights correct, rules list 6 items with colored circles, contact + social sections visible
- Check font loads (Quicksand Bold/Regular)
