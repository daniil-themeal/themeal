import { useState, useMemo } from 'react';
import type { CSSProperties } from 'react';

import type { DayOption, Duration } from '../../data/checkoutPricing';
import type { TestAddress } from '../../data/testAddresses';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import { COLOR_TOKENS } from '../common/colorTokens';
import { Divider } from '../common/Divider';
import { Dropdown } from '../common/Dropdown';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TextArea } from '../common/TextArea';
import { TextInput } from '../common/TextInput';

// ─── Date utilities ──────────────────────────────────────────────────────────

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getUpcomingDeliveryDates(count = 6): Date[] {
  const dates: Date[] = [];
  const cursor = addDays(new Date(), 2);
  cursor.setHours(0, 0, 0, 0);

  while (dates.length < count) {
    const dow = cursor.getDay();
    if (dow === 3 || dow === 0) dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

function getSubscriptionDays(duration: Duration): number {
  if (duration === 'weekly') return 7;
  if (duration === 'monthly') return 28;
  return 56;
}

function getCalendarWeeks(startDate: Date, duration: Duration): Date[][] {
  const totalDays = getSubscriptionDays(duration);
  const dow = startDate.getDay();
  const daysBack = dow === 0 ? 6 : dow - 1;
  const monday = addDays(startDate, -daysBack);
  const weeksCount = Math.min(Math.ceil((totalDays + daysBack) / 7) + 1, 8);

  const weeks: Date[][] = [];
  const cursor = new Date(monday);
  for (let w = 0; w < weeksCount; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function isInPeriod(date: Date, start: Date, end: Date): boolean {
  return date >= start && date < end;
}

function isMealDay(date: Date, days: DayOption): boolean {
  const dow = date.getDay();
  if (days === 'weekdays') return dow >= 1 && dow <= 5;
  if (days === 'weekdays+sat') return dow >= 1 && dow <= 6;
  return true;
}

function isDeliveryDay(date: Date): boolean {
  const dow = date.getDay();
  return dow === 3 || dow === 0;
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIME_SLOTS = ['07:00 – 11:00', '12:00 – 16:00', '18:00 – 22:00'];

// ─── Icons ───────────────────────────────────────────────────────────────────

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 1.667A5.833 5.833 0 0 0 4.167 7.5C4.167 12.083 10 18.333 10 18.333s5.833-6.25 5.833-10.833A5.833 5.833 0 0 0 10 1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="10" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1" y="3.5" width="8.5" height="6" rx="1" fill="currentColor" />
      <path d="M9.5 5.5H12L13.5 7.5V10H9.5V5.5Z" fill="currentColor" />
      <circle cx="3.5" cy="10.5" r="1.5" fill="white" />
      <circle cx="11" cy="10.5" r="1.5" fill="white" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="9" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}


// ─── Sub-components ───────────────────────────────────────────────────────────

function DatePill({ date, selected, onClick }: { date: Date; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 flex flex-col items-center justify-center w-[56px] h-[64px] rounded-[16px] border-2 transition-colors"
      style={{
        backgroundColor: selected ? COLOR_TOKENS.primary[50] : COLOR_TOKENS.base.white,
        borderColor: selected ? COLOR_TOKENS.primary[500] : COLOR_TOKENS.neutral[100],
      }}
    >
      <span
        className="font-['Quicksand'] text-[18px] font-bold leading-none"
        style={{ color: selected ? COLOR_TOKENS.primary[700] : COLOR_TOKENS.neutral[900] }}
      >
        {date.getDate()}
      </span>
      <span
        className="font-['Quicksand'] text-[12px] font-semibold leading-none mt-[4px]"
        style={{ color: selected ? COLOR_TOKENS.primary[500] : COLOR_TOKENS.neutral[500] }}
      >
        {MONTH_ABBR[date.getMonth()]}
      </span>
    </button>
  );
}

function CalendarCell({
  date,
  startDate,
  endDate,
  dayOption,
}: {
  date: Date;
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
}) {
  const inPeriod = isInPeriod(date, startDate, endDate);
  const deliveryDay = inPeriod && isDeliveryDay(date);
  const mealDay = inPeriod && !deliveryDay && isMealDay(date, dayOption);

  let bg = 'transparent';
  let textColor = COLOR_TOKENS.neutral[300];

  if (deliveryDay) {
    bg = COLOR_TOKENS.primary[75];
    textColor = COLOR_TOKENS.primary[800];
  } else if (mealDay) {
    bg = COLOR_TOKENS.primary[50];
    textColor = COLOR_TOKENS.primary[700];
  } else if (inPeriod) {
    textColor = COLOR_TOKENS.neutral[400];
  }

  return (
    <div
      className="flex flex-col items-center justify-center rounded-[8px] py-[4px] min-h-[44px] gap-[1px]"
      style={{ backgroundColor: bg }}
    >
      {deliveryDay ? (
        <span style={{ color: COLOR_TOKENS.primary[600] }}>
          <TruckIcon />
        </span>
      ) : null}
      <span
        className="font-['Quicksand'] text-[12px] font-bold leading-none"
        style={{ color: textColor }}
      >
        {date.getDate()}
      </span>
      <span
        className="font-['Quicksand'] text-[10px] font-medium leading-none"
        style={{ color: deliveryDay ? COLOR_TOKENS.primary[500] : COLOR_TOKENS.neutral[300] }}
      >
        {MONTH_ABBR[date.getMonth()]}
      </span>
    </div>
  );
}

function DeliveryCalendar({
  startDate,
  duration,
  dayOption,
}: {
  startDate: Date;
  duration: Duration;
  dayOption: DayOption;
}) {
  const weeks = useMemo(() => getCalendarWeeks(startDate, duration), [startDate, duration]);
  const endDate = useMemo(
    () => addDays(startDate, getSubscriptionDays(duration)),
    [startDate, duration],
  );

  return (
    <div className="flex flex-col gap-[4px]">
      {/* Column headers */}
      <div className="grid grid-cols-7 gap-[4px]">
        {WEEKDAY_SHORT.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center py-[4px]"
          >
            <span
              className="font-['Quicksand'] text-[11px] font-semibold"
              style={{ color: COLOR_TOKENS.neutral[400] }}
            >
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Weeks */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-[4px]">
          {week.map((date, di) => (
            <CalendarCell
              key={di}
              date={date}
              startDate={startDate}
              endDate={endDate}
              dayOption={dayOption}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function InfoBox() {
  return (
    <div
      className="flex items-start gap-[12px] rounded-[12px] p-[16px]"
      style={{ backgroundColor: COLOR_TOKENS.warning[50] }}
    >
      <span className="shrink-0 mt-[1px]" style={{ color: COLOR_TOKENS.warning[700] }}>
        <InfoIcon />
      </span>
      <p
        className="font-['Quicksand'] text-[13px] font-semibold leading-[150%]"
        style={{ color: COLOR_TOKENS.warning[800] }}
      >
        To keep your meals fresh in the UAE's hot climate, please place them in the refrigerator
        immediately after delivery.
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type DeliveryDetailsScreenProps = {
  selectedAddress: TestAddress | null;
  onChangeAddress: () => void;
  days: DayOption;
  duration: Duration;
  onContinue?: () => void;
};

type DeliveryDetailsScreenCssVariables = CSSProperties & {
  '--dd-title-fs': string;
  '--dd-section-title-fs': string;
  '--dd-address-title-fs': string;
  '--dd-address-sub-fs': string;
  '--dd-change-fs': string;
};

const screenStyle: DeliveryDetailsScreenCssVariables = {
  '--dd-title-fs': FONT_SIZE_TOKENS[32],
  '--dd-section-title-fs': FONT_SIZE_TOKENS[16],
  '--dd-address-title-fs': FONT_SIZE_TOKENS[15],
  '--dd-address-sub-fs': FONT_SIZE_TOKENS[13],
  '--dd-change-fs': FONT_SIZE_TOKENS[14],
};

export function DeliveryDetailsScreen({
  selectedAddress,
  onChangeAddress,
  days,
  duration,
  onContinue,
}: DeliveryDetailsScreenProps) {
  const [apartment, setApartment] = useState('');
  const [instructions, setInstructions] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const deliveryDates = useMemo(() => getUpcomingDeliveryDates(6), []);
  const [selectedDate, setSelectedDate] = useState<Date>(deliveryDates[0]);

  const addressTitle = selectedAddress?.title ?? 'Delivery address';
  const addressSub = selectedAddress?.subtitle ?? 'Select your delivery address';

  return (
    <div
      className="min-h-full"
      style={{ ...screenStyle, backgroundColor: COLOR_TOKENS.neutral[50] }}
    >
      <div className="mx-auto flex w-full max-w-[620px] flex-col px-[20px] py-[32px] md:px-[32px] md:py-[48px]">
        <h1
          className="mb-[24px] text-center font-['Quicksand'] text-[length:var(--dd-title-fs)] font-bold leading-[130%] tracking-[-0.64px]"
          style={{ color: COLOR_TOKENS.neutral[900] }}
        >
          Where do we deliver?
        </h1>

        <div
          className="rounded-[18px] p-[20px] md:p-[32px]"
          style={{ backgroundColor: COLOR_TOKENS.base.white }}
        >
          <div className="flex flex-col gap-[24px]">

            {/* Address block */}
            <div
              className="flex items-center justify-between gap-[12px] rounded-[12px] border px-[16px] py-[14px]"
              style={{
                backgroundColor: COLOR_TOKENS.base.white,
                borderColor: COLOR_TOKENS.neutral[100],
              }}
            >
              <span className="shrink-0" style={{ color: COLOR_TOKENS.primary[600] }}>
                <PinIcon />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                <p
                  className="truncate font-['Quicksand'] text-[length:var(--dd-address-title-fs)] font-bold leading-[130%]"
                  style={{ color: COLOR_TOKENS.neutral[900] }}
                >
                  {addressTitle}
                </p>
                <p
                  className="font-['Quicksand'] text-[length:var(--dd-address-sub-fs)] font-medium leading-[140%]"
                  style={{ color: COLOR_TOKENS.neutral[500] }}
                >
                  {addressSub}
                </p>
              </div>
              <button
                type="button"
                onClick={onChangeAddress}
                className="shrink-0 font-['Quicksand'] text-[length:var(--dd-change-fs)] font-bold leading-[130%]"
                style={{ color: COLOR_TOKENS.primary[600] }}
              >
                Change
              </button>
            </div>

            {/* Personal details fields */}
            <TextInput
              id="delivery-apartment"
              label="Apartment / villa number *"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              placeholder="67"
            />

            <TextArea
              id="delivery-instructions"
              label="How can the courier find you?"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="E.g. Tower B, gate 2 from main road, blue door at end of hallway"
              rows={3}
            />

            <TextInput
              id="delivery-full-name"
              label="Full name *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ahmed"
            />

            <TextInput
              id="delivery-email"
              label="E-mail *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@themeal.menu"
            />

            {/* Divider */}
            <Divider color={COLOR_TOKENS.neutral[75]} />

            {/* Delivery date section */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[4px]">
                <p
                  className="font-['Quicksand'] text-[length:var(--dd-section-title-fs)] font-bold leading-[130%]"
                  style={{ color: COLOR_TOKENS.neutral[900] }}
                >
                  Choose the preferred first delivery date
                </p>
                <p
                  className="font-['Quicksand'] text-[13px] font-medium leading-[140%]"
                  style={{ color: COLOR_TOKENS.neutral[500] }}
                >
                  We deliver Wednesdays and Sundays — pick your start date
                </p>
              </div>

              {/* Date pills */}
              <div className="flex gap-[8px] overflow-x-auto pb-[4px] scrollbar-hide">
                {deliveryDates.map((date, i) => (
                  <DatePill
                    key={i}
                    date={date}
                    selected={isSameDay(date, selectedDate)}
                    onClick={() => setSelectedDate(date)}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-[20px]">
                <div className="flex items-center gap-[6px]">
                  <div
                    className="w-[14px] h-[14px] rounded-[3px]"
                    style={{ backgroundColor: COLOR_TOKENS.primary[50] }}
                  />
                  <span
                    className="font-['Quicksand'] text-[12px] font-semibold"
                    style={{ color: COLOR_TOKENS.neutral[600] }}
                  >
                    Meal days
                  </span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span style={{ color: COLOR_TOKENS.primary[600] }}>
                    <TruckIcon />
                  </span>
                  <span
                    className="font-['Quicksand'] text-[12px] font-semibold"
                    style={{ color: COLOR_TOKENS.neutral[600] }}
                  >
                    Delivery days
                  </span>
                </div>
              </div>

              {/* Calendar */}
              <DeliveryCalendar
                startDate={selectedDate}
                duration={duration}
                dayOption={days}
              />
            </div>

            {/* Divider */}
            <Divider color={COLOR_TOKENS.neutral[75]} />

            {/* Delivery time */}
            <Dropdown
              id="delivery-time-slot"
              label="Delivery time"
              options={TIME_SLOTS.map((slot) => ({ value: slot, label: slot }))}
              value={selectedTimeSlot}
              onChange={setSelectedTimeSlot}
              placeholder="Select timeslot"
            />

            {/* Leave at door */}
            <Checkbox
              id="leave-at-door"
              checked={leaveAtDoor}
              onChange={setLeaveAtDoor}
              label="Leave the bag at the door"
            />

            {/* Info box */}
            <InfoBox />

            <Button
              type="button"
              variant="primary"
              size="48"
              fullWidth
              className="mt-[4px]"
              onClick={onContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
