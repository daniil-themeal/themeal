import { describe, expect, it } from 'vitest';

import type { DeliveryListEntry } from '../types/account.types';
import {
  applyDeliveryReschedule,
  buildForwardCascadeDates,
  getFreeDeliverySlotsBetweenNeighbors,
  isRescheduleEligibleTarget,
  isRescheduleTargetSelectable,
} from './applyDeliveryReschedule';

const TODAY = new Date('2026-06-01T12:00:00');

function deliveryEntry(dateIso: string): DeliveryListEntry {
  const date = new Date(`${dateIso}T00:00:00`);

  return {
    id: `next-${dateIso}-p0`,
    personIndex: 0,
    scope: 'next',
    dateIso,
    day: date.getDate(),
    month: 'Jun',
    timeSlot: '7AM – 11AM',
    address: 'Sample address',
  };
}

describe('isRescheduleEligibleTarget', () => {
  it('requires target to be at least one day after today', () => {
    expect(isRescheduleEligibleTarget('2026-06-01', TODAY)).toBe(false);
    expect(isRescheduleEligibleTarget('2026-06-02', TODAY)).toBe(true);
  });
});

describe('getFreeDeliverySlotsBetweenNeighbors', () => {
  it('returns unscheduled delivery days between prev and next/source', () => {
    const scheduled = ['2026-06-08', '2026-06-18'];

    expect(
      getFreeDeliverySlotsBetweenNeighbors(scheduled, '2026-06-18', 'weekdays', TODAY),
    ).toEqual(['2026-06-11', '2026-06-15']);
  });
});

describe('isRescheduleTargetSelectable', () => {
  const scheduled = ['2026-06-08', '2026-06-18'];

  it('allows occupied forward targets', () => {
    expect(
      isRescheduleTargetSelectable(
        ['2026-06-08', '2026-06-11', '2026-06-18'],
        '2026-06-08',
        '2026-06-11',
        'weekdays',
        TODAY,
      ),
    ).toBe(true);
  });

  it('allows free slots between neighbors', () => {
    expect(
      isRescheduleTargetSelectable(scheduled, '2026-06-18', '2026-06-15', 'weekdays', TODAY),
    ).toBe(true);
  });

  it('rejects the source date and same-day targets', () => {
    expect(
      isRescheduleTargetSelectable(scheduled, '2026-06-18', '2026-06-18', 'weekdays', TODAY),
    ).toBe(false);
    expect(
      isRescheduleTargetSelectable(scheduled, '2026-06-18', '2026-06-01', 'weekdays', TODAY),
    ).toBe(false);
  });
});

describe('buildForwardCascadeDates', () => {
  it('cascades forward for occupied targets', () => {
    expect(
      buildForwardCascadeDates(
        ['2026-06-08', '2026-06-11', '2026-06-18'],
        '2026-06-08',
        '2026-06-11',
        'weekdays',
        TODAY,
      ),
    ).toEqual(['2026-06-11', '2026-06-15', '2026-06-18']);
  });

  it('cascades from a free slot target', () => {
    expect(
      buildForwardCascadeDates(
        ['2026-06-08', '2026-06-18'],
        '2026-06-18',
        '2026-06-15',
        'weekdays',
        TODAY,
      ),
    ).toEqual(['2026-06-08', '2026-06-15']);
  });
});

describe('applyDeliveryReschedule', () => {
  it('updates delivery entries using cascade rules', () => {
    const deliveries = [deliveryEntry('2026-06-08'), deliveryEntry('2026-06-18')];
    const updated = applyDeliveryReschedule(
      deliveries,
      '2026-06-18',
      '2026-06-15',
      'weekdays',
      TODAY,
    );

    expect(updated.map((entry) => entry.dateIso)).toEqual(['2026-06-08', '2026-06-15']);
  });
});
