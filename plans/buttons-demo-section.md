# План: Добавление секции Primary кнопок на демо-страницу

## Контекст

Пользователь хочет добавить демонстрацию Primary кнопки в различных состояниях (default, hover, disabled) на страницу DesignSystemDemo.

## Требования (уточнено с пользователем)

Добавить **только Primary кнопку** в трёх состояниях:
1. Default
2. Hover (визуально показать hover состояние)
3. Disabled

## Анализ существующих кнопок

Из `/src/app/components/checkout/DeliveryDetailsScreen.tsx`:

```tsx
<button
  type="button"
  onClick={onContinue}
  className="mt-[8px] flex h-[56px] w-full items-center justify-center rounded-[12px] bg-[#F029A8] font-['Quicksand'] text-[18px] font-bold leading-none text-white transition-colors hover:bg-[#DA2599]"
>
  Continue
</button>
```

**Стили Primary кнопки:**
- Фон: `bg-[#F029A8]`
- Hover: `hover:bg-[#DA2599]`
- Высота: `h-[56px]`
- Padding: `px-[32px]` (или `w-full`)
- Шрифт: `font-['Quicksand'] text-[18px] font-bold`
- Цвет текста: `text-white`
- Скругление: `rounded-[12px]`
- Transition: `transition-colors`

## Текущая структура DesignSystemDemo

Файл: `/src/app/components/DesignSystemDemo.tsx`

- `DemoSection` компонент уже существует
- Grid layout: `lg:grid-cols-2`
- Секции: FormLabel, TextInput, TextArea

## Решение

Добавить новую секцию `<DemoSection title="Buttons">` с тремя вариантами Primary кнопки.

### Варианты кнопок:

1. **Primary Default**
   ```tsx
   <button
     type="button"
     className="flex h-[56px] w-full items-center justify-center rounded-[12px] bg-[#F029A8] font-['Quicksand'] text-[18px] font-bold leading-none text-white transition-colors hover:bg-[#DA2599]"
   >
     Primary Button
   </button>
   ```

2. **Primary Hover State** (визуально)
   ```tsx
   <button
     type="button"
     className="flex h-[56px] w-full items-center justify-center rounded-[12px] bg-[#DA2599] font-['Quicksand'] text-[18px] font-bold leading-none text-white"
   >
     Primary Button (Hover)
   </button>
   ```

3. **Primary Disabled**
   ```tsx
   <button
     type="button"
     disabled
     className="flex h-[56px] w-full items-center justify-center rounded-[12px] bg-[#F029A8] font-['Quicksand'] text-[18px] font-bold leading-none text-white opacity-50 cursor-not-allowed"
   >
     Primary Button (Disabled)
   </button>
   ```

## План реализации

### Шаг 1: Добавить секцию Buttons в DesignSystemDemo

В файле `/src/app/components/DesignSystemDemo.tsx`:

Добавить новую `<DemoSection title="Buttons">` после секции TextArea, внутри `<main>` grid:

```tsx
<DemoSection title="Buttons">
  <div className="flex flex-col gap-[12px]">
    <div>
      <p className="mb-[8px] font-['Quicksand'] text-[14px] font-semibold text-[#8594AC]">
        Default
      </p>
      <button
        type="button"
        className="flex h-[56px] w-full items-center justify-center rounded-[12px] bg-[#F029A8] font-['Quicksand'] text-[18px] font-bold leading-none text-white transition-colors hover:bg-[#DA2599]"
      >
        Primary Button
      </button>
    </div>

    <div>
      <p className="mb-[8px] font-['Quicksand'] text-[14px] font-semibold text-[#8594AC]">
        Hover State
      </p>
      <button
        type="button"
        className="flex h-[56px] w-full items-center justify-center rounded-[12px] bg-[#DA2599] font-['Quicksand'] text-[18px] font-bold leading-none text-white"
      >
        Primary Button
      </button>
    </div>

    <div>
      <p className="mb-[8px] font-['Quicksand'] text-[14px] font-semibold text-[#8594AC]">
        Disabled
      </p>
      <button
        type="button"
        disabled
        className="flex h-[56px] w-full items-center justify-center rounded-[12px] bg-[#F029A8] font-['Quicksand'] text-[18px] font-bold leading-none text-white opacity-50 cursor-not-allowed"
      >
        Primary Button
      </button>
    </div>
  </div>
</DemoSection>
```

### Расположение

Добавить после последней секции TextArea в grid. Grid автоматически разместит секцию в доступной ячейке.

## Файлы для изменения

- `/src/app/components/DesignSystemDemo.tsx` (строки ~168, после секции TextArea)

## Проверка

1. Открыть демо-страницу через кнопку user в header
2. Убедиться, что секция "Buttons" отображается
3. Проверить все три варианта:
   - Default кнопка с hover эффектом при наведении
   - Hover state кнопка (визуально показывает hover цвет)
   - Disabled кнопка с opacity 50% и без возможности клика
4. Проверить responsive layout на разных экранах (mobile, tablet, desktop)
