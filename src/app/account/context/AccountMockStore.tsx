import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { mockAccountMealplans, mockAccountPromos } from '../mocks/account.mock';
import type { AccountMealplanRecord, HomePromoBanner } from '../types/account.types';
import {
  isRescheduleEligibleTarget,
  isRescheduleScheduleOrderAllowed,
  isRescheduleSourceAllowed,
  applyDeliveryReschedule,
} from '../utils/applyDeliveryReschedule';
import { syncMealplanHomeFromDeliveries } from '../utils/buildAccountMealplanRecord';

const ACTIVE_PERSON_INDEX = 0;

function sortDeliveriesByDate<T extends { dateIso: string }>(deliveries: T[]): T[] {
  return [...deliveries].sort((left, right) => left.dateIso.localeCompare(right.dateIso));
}

type RescheduleDeliveryParams = {
  planIndex: number;
  personIndex?: number;
  sourceDateIso: string;
  targetDateIso: string;
};

type AccountMockStoreValue = {
  promos: HomePromoBanner[];
  mealplans: AccountMealplanRecord[];
  activePlanIndex: number;
  activePlan: AccountMealplanRecord;
  activePersonIndex: number;
  setActivePlanIndex: (index: number) => void;
  rescheduleDelivery: (params: RescheduleDeliveryParams) => void;
};

const AccountMockStoreContext = createContext<AccountMockStoreValue | null>(null);

export function AccountMockStoreProvider({ children }: { children: ReactNode }) {
  const [mealplans, setMealplans] = useState<AccountMealplanRecord[]>(() =>
    structuredClone(mockAccountMealplans),
  );
  const [activePlanIndex, setActivePlanIndex] = useState(0);

  const activePlan = mealplans[activePlanIndex] ?? mealplans[0];

  const rescheduleDelivery = useCallback(
    ({ planIndex, personIndex = ACTIVE_PERSON_INDEX, sourceDateIso, targetDateIso }: RescheduleDeliveryParams) => {
      setMealplans((currentMealplans) =>
        currentMealplans.map((record, index) => {
          if (index !== planIndex) {
            return record;
          }

          const personDeliveries = record.deliveries.find(
            (entry) => entry.personIndex === personIndex,
          );
          const scheduledDeliveryDates =
            personDeliveries?.nextDeliveries.map((delivery) => delivery.dateIso) ?? [];

          if (
            !isRescheduleSourceAllowed(scheduledDeliveryDates, sourceDateIso) ||
            !isRescheduleEligibleTarget(targetDateIso) ||
            !isRescheduleScheduleOrderAllowed(
              scheduledDeliveryDates,
              sourceDateIso,
              targetDateIso,
              record.menuPlan.days,
            )
          ) {
            return record;
          }

          const deliveries = record.deliveries.map((personDeliveries) => {
            if (personDeliveries.personIndex !== personIndex) {
              return personDeliveries;
            }

            return {
              ...personDeliveries,
              nextDeliveries: sortDeliveriesByDate(
                applyDeliveryReschedule(
                  personDeliveries.nextDeliveries,
                  sourceDateIso,
                  targetDateIso,
                  record.menuPlan.days,
                ),
              ),
            };
          });

          const updatedRecord: AccountMealplanRecord = { ...record, deliveries };

          return syncMealplanHomeFromDeliveries(updatedRecord, personIndex);
        }),
      );
    },
    [],
  );

  const value = useMemo(
    (): AccountMockStoreValue => ({
      promos: [...mockAccountPromos],
      mealplans,
      activePlanIndex,
      activePlan,
      activePersonIndex: ACTIVE_PERSON_INDEX,
      setActivePlanIndex,
      rescheduleDelivery,
    }),
    [activePlan, activePlanIndex, mealplans, rescheduleDelivery],
  );

  return (
    <AccountMockStoreContext.Provider value={value}>{children}</AccountMockStoreContext.Provider>
  );
}

export function useAccountMockStore(): AccountMockStoreValue {
  const context = useContext(AccountMockStoreContext);

  if (!context) {
    throw new Error('useAccountMockStore must be used within AccountMockStoreProvider');
  }

  return context;
}
