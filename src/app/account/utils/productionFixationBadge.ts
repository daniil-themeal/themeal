function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

export function calendarDaysUntil(referenceDate: Date, deliveryDateIso: string): number {
  const from = normalizeDate(referenceDate);
  const to = normalizeDate(new Date(`${deliveryDateIso}T00:00:00`));

  return Math.round((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000));
}

/** Visible from 2 calendar days before delivery through delivery day. */
export function shouldShowProductionFixationBadge(
  deliveryDateIso: string,
  referenceDate = new Date(),
): boolean {
  const daysUntil = calendarDaysUntil(referenceDate, deliveryDateIso);
  return daysUntil >= 0 && daysUntil <= 2;
}
