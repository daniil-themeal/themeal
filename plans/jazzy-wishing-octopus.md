# План: Исправление layout в HeroSection и оптимизация HeroMealsSection для мобильных устройств

## Задача 1: HeroSection - фиксированная высота с резиновым отступом

## Контекст

При вертикальном сжатии браузера в HeroSection блок с заголовком (H1Container) и блок с кнопкой действий (HeroActionBlock) наезжают друг на друга, создавая проблемы с читаемостью и пользовательским опытом.

## Анализ текущей верстки

**Критический файл:** `/src/app/components/HeroSection.tsx`

### Текущая структура (строки 182-202):

```tsx
<div className="bg-[#411864] content-stretch flex flex-col items-center 
     pt-[120px] md:pt-[180px] pb-[80px] md:pb-[80px] 
     min-h-dvh h-dvh section-spacing-x relative overflow-hidden shrink-0 w-full">
  
  <div className="relative z-[1] flex flex-col justify-between items-center size-full">
    <div className="hero-animate-1 w-full justify-center">
      <H1Container />
    </div>
    <div className="hero-animate-2 w-full justify-center">
      <HeroActionBlock onOrderClick={onOrderClick} />
    </div>
  </div>
</div>
```

### Выявленные проблемы:

1. **Жесткая высота**: Родительский контейнер имеет `h-dvh` (100vh), что фиксирует высоту секции
2. **justify-between без минимального отступа**: Внутренний flex-контейнер использует `justify-between`, что при малой высоте viewport прижимает элементы вплотную
3. **Отсутствие gap**: Между H1Container и HeroActionBlock нет явного gap
4. **Фиксированные padding**: `pt-[120px] md:pt-[180px]` и `pb-[80px]` занимают много места при малой высоте viewport

## Варианты решения

### Вариант 1: Добавить gap и использовать min-h вместо h (Рекомендуется)

**Изменения:**
- Заменить `h-dvh` на только `min-h-dvh` (убрать фиксированную высоту)
- Добавить `gap-[32px] md:gap-[48px] lg:gap-[64px]` во внутренний flex-контейнер
- Изменить `justify-between` на `justify-center` с gap

**Преимущества:**
- Контейнер может растягиваться при необходимости
- Гарантированный минимальный отступ между блоками
- Простое решение, минимальные изменения

**Недостатки:**
- На больших экранах секция может занять больше места, чем viewport

### Вариант 2: Адаптивные padding + gap

**Изменения:**
- Сделать padding адаптивным с меньшими значениями на малых высотах: `pt-[60px] sm:pt-[100px] md:pt-[140px]`
- Добавить `gap-[24px] md:gap-[40px]`
- Оставить `justify-between` но добавить медиа-запросы по высоте viewport

**Преимущества:**
- Более гибкий контроль на разных размерах экрана
- Секция остается в пределах viewport

**Недостатки:**
- Более сложная реализация
- Требует добавления CSS медиа-запросов по высоте

### Вариант 3: Использовать min-height для элементов + gap

**Изменения:**
- Добавить `min-h-[200px]` для H1Container
- Добавить `min-h-[180px]` для HeroActionBlock
- Добавить `gap-[32px]` между блоками
- Использовать `min-h-dvh` вместо `h-dvh`

**Преимущества:**
- Элементы не сжимаются меньше минимального размера
- Контролируемое поведение на всех экранах

**Недостатки:**
- Может потребовать скролл на очень маленьких экранах
- Жесткие минимальные размеры могут не подходить для всех устройств

## Финальное решение (обновлено по требованию клиента)

**Новые требования клиента:**
1. Блок HeroSection должен занимать **всю высоту viewport** (`h-dvh`)
2. Блок с заголовком (H1Container) **растягивается на всю оставшуюся высоту**
3. **Содержимое заголовка центрируется** внутри растянутого блока
4. Блок с кнопкой (HeroActionBlock) остаётся **внизу**

**Стратегия:**
- Вернуть `h-dvh` (фиксированная высота)
- Изменить `justify-between` на `flex-start` (элементы прижимаются к началу)
- Добавить `flex-1` к H1Container (растягивается на всё доступное пространство)
- Центровать содержимое внутри H1Container через `flex items-center justify-center`
- Убрать gap между элементами (не нужен, т.к. H1Container занимает всё пространство)
- Уменьшить padding через CSS `@media (max-height: ...)` для очень малых высот
- Уменьшить внутренние gap в подкомпонентах (HeroActionBlock)

## План реализации

### Шаг 1: Обновить родительский контейнер (строка 182)

**Что сейчас (после предыдущих изменений):**
```tsx
className="hero-section-container bg-[#411864] content-stretch flex flex-col items-center 
  pt-[60px] sm:pt-[100px] md:pt-[140px] lg:pt-[180px] 
  pb-[40px] sm:pb-[60px] md:pb-[80px] 
  min-h-dvh section-spacing-x relative overflow-hidden shrink-0 w-full"
```

**Что нужно изменить:**
```tsx
className="hero-section-container bg-[#411864] content-stretch flex flex-col items-center 
  pt-[60px] sm:pt-[100px] md:pt-[140px] lg:pt-[180px] 
  pb-[40px] sm:pb-[60px] md:pb-[80px] 
  h-dvh section-spacing-x relative overflow-hidden shrink-0 w-full"
```

**Изменения:**
- **Вернуть** `h-dvh` (фиксированная высота viewport)
- Убрать `min-h-dvh`
- Оставить адаптивные padding для малых экранов
- Класс `hero-section-container` остается для CSS медиа-запросов по высоте

### Шаг 2: Внутренний flex-контейнер (строка ~215)

**Что сейчас (после предыдущих изменений):**
```tsx
className="relative z-[1] flex flex-col justify-between items-center size-full gap-[16px] sm:gap-[24px] md:gap-[32px]"
```

**Что нужно:**
```tsx
className="relative z-[1] flex flex-col items-center size-full"
```

**Изменения:**
- **Убрать** `justify-between` (элементы больше не распределяются равномерно)
- **Убрать** все gap (не нужен, т.к. H1Container растянется на всё пространство)
- Оставить только базовые классы для flex-колонки

### Шаг 3: CSS медиа-запросы по высоте viewport

**Что сейчас (после предыдущих изменений):**
```css
@media (max-height: 700px) {
  .hero-section-container {
    padding-top: 40px !important;
    padding-bottom: 30px !important;
  }
}

@media (max-height: 500px) {
  .hero-section-container {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
  }
}
```

**Что нужно изменить:**
Сделать более агрессивное уменьшение padding для очень малых высот:

```css
@media (max-height: 650px) {
  .hero-section-container {
    padding-top: 32px !important;
    padding-bottom: 24px !important;
  }
}

@media (max-height: 500px) {
  .hero-section-container {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
}

@media (max-height: 400px) {
  .hero-section-container {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
}
```

**Логика:**
- При высоте < 650px: уменьшаем padding до 32px/24px
- При высоте < 500px: еще сильнее - 16px/16px
- При высоте < 400px: минимальные отступы 8px/8px

### Шаг 4: Обновить H1Container - добавить растягивание и центрирование (строка 119-133)

**НОВЫЙ ШАГ** для реализации требования о растягивании заголовка.

**Что сейчас:**
```tsx
function H1Container() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <h1 className="hero-title-block ...">
          {/* контент */}
        </h1>
      </div>
    </div>
  );
}
```

**Что нужно:**
```tsx
function H1Container() {
  return (
    <div className="relative flex-1 w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="hero-title-block ...">
          {/* контент */}
        </h1>
      </div>
    </div>
  );
}
```

**Изменения:**
- **Убрать** `shrink-0` (не должен сжиматься)
- **Добавить** `flex-1` (растягивается на всю доступную высоту)
- **Добавить** `flex items-center justify-center` (центрирование содержимого по вертикали и горизонтали)
- **Убрать** `size-full` из внутреннего div (не нужен)

### Шаг 5: Уменьшить gap в HeroActionBlock (опционально)

В компоненте `HeroActionBlock` (строка 163) можно уменьшить gap между кнопкой и тезисами:

**Что сейчас (после предыдущих изменений):**
```tsx
className="content-stretch flex flex-col gap-[24px] md:gap-[32px] lg:gap-[44px] items-center..."
```

**Что можно изменить:**
```tsx
className="content-stretch flex flex-col gap-[16px] sm:gap-[24px] md:gap-[32px] items-center..."
```

**Изменения:**
- Начинать с минимального gap 16px на мобильных
- Постепенно увеличивать: 16px → 24px → 32px
- Убрать большой gap 44px для lg

**Примечание:** Этот шаг может быть не нужен, если растягивание H1Container решит проблему с вертикальным пространством.

---

## Задача 2: HeroMealsSection - оптимизация для мобильных (ожидается уточнение)

**Требование клиента:**
- В мобильном виде: 3 ряда × 3 блюда
- Крайние блюда выходят за пределы экрана
- Не использовать дублирование изображений

**Текущее состояние:**
- 2 ряда: Row A (7 блюд) + Row B (8 блюд) = 15 уникальных изображений
- Адаптивные размеры: `w-[120px] sm:w-[200px] lg:w-[230px] xl:w-[264px]`
- Все блюда видны на всех экранах

**Ожидается уточнение:**
Задан вопрос клиенту о точной раскладке:
- Ровно 3 блюда полностью видимы?
- Или 5 блюд (1 центральное + по 2 с каждой стороны обрезаны)?
- Или 4 блюда (2 центральных + по 1 с каждой стороны обрезаны)?

После получения ответа будет разработан детальный план реализации.

---

## Проверка (Задача 1 - HeroSection)

1. Открыть приложение в браузере
2. Проверить на нормальной высоте viewport (800px+):
   - Секция занимает ровно 100vh
   - **Заголовок центрирован вертикально** в верхней части
   - Кнопка действий внизу
   - Между ними достаточно пространства
3. Уменьшить высоту viewport до минимальной (400-500px):
   - Секция по-прежнему занимает 100vh
   - **Заголовок остаётся центрирован** в доступном пространстве
   - Кнопка действий внизу
   - Padding уменьшается через CSS медиа-запросы
   - Элементы не наезжают друг на друга
4. Проверить на разных высотах viewport (400px, 600px, 800px, 1000px)
5. Проверить на разных ширинах (xs, sm, md, lg, xl)

## Файлы для изменения

**Задача 1:**
- `/src/app/components/HeroSection.tsx`
  - Строка 182: родительский контейнер (вернуть `h-dvh`)
  - Строки 183-210: CSS медиа-запросы (обновить)
  - Строка ~215: внутренний flex-контейнер (убрать `justify-between` и gap)
  - Строки 119-133: H1Container (добавить `flex-1` и центрирование)
  - Строка 163 (опционально): HeroActionBlock (уменьшить gap)

**Задача 2 (после уточнения):**
- `/src/app/components/HeroMealsSection.tsx`
