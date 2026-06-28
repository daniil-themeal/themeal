import type { AccountMealplanContext, AccountMealplanRecord, HomeMenuPlanConfig, HomePlan } from '../types/account.types';
import { buildDeliveriesScreenData } from './buildDeliveriesScreenData';
import {
  buildDeliveryMenuDays,
  homeDeliveryFromListEntry,
  syncPersonHomeFromDeliveries,
} from './buildHomeScreenData';

export const DEFAULT_FEATURED_DELIVERY_LIST_INDEX = 0;

type BuildAccountMealplanRecordOptions = {
  mealplan: AccountMealplanContext;
  menuPlan: HomeMenuPlanConfig;
  plan: HomePlan;
  featuredDeliveryListIndex?: number;
};

export function buildAccountMealplanRecord({
  mealplan,
  menuPlan,
  plan,
  featuredDeliveryListIndex = DEFAULT_FEATURED_DELIVERY_LIST_INDEX,
}: BuildAccountMealplanRecordOptions): AccountMealplanRecord {
  const deliveriesData = buildDeliveriesScreenData({ mealplan, menuPlan });

  const persons = deliveriesData.persons.map((personDeliveries, personIndex) => {
    const listIndex = Math.min(
      featuredDeliveryListIndex,
      personDeliveries.nextDeliveries.length - 1,
    );
    const featuredEntry = personDeliveries.nextDeliveries[listIndex];

    if (!featuredEntry) {
      return {
        personIndex,
        delivery: {
          index: 1,
          total: personDeliveries.nextDeliveries.length,
          dateIso: '',
          day: 0,
          month: '',
          weekday: '',
          timeSlot: '',
          address: '',
          leaveAtDoor: false,
        },
        menuDays: [],
      };
    }

    const delivery = homeDeliveryFromListEntry(featuredEntry, menuPlan, {
      index: listIndex + 1,
      total: personDeliveries.nextDeliveries.length,
    });

    return {
      personIndex,
      delivery,
      menuDays: buildDeliveryMenuDays(menuPlan, delivery),
    };
  });

  return {
    mealplan,
    menuPlan,
    plan,
    persons,
    deliveries: deliveriesData.persons,
    featuredDeliveryListIndex,
  };
}

export function syncMealplanHomeFromDeliveries(
  record: AccountMealplanRecord,
  personIndex: number,
): AccountMealplanRecord {
  const personDeliveries = record.deliveries.find((entry) => entry.personIndex === personIndex);

  if (!personDeliveries) {
    return record;
  }

  const listIndex = Math.min(
    record.featuredDeliveryListIndex,
    personDeliveries.nextDeliveries.length - 1,
  );

  const persons = record.persons.map((person) => {
    if (person.personIndex !== personIndex) {
      return person;
    }

    return syncPersonHomeFromDeliveries(
      person,
      personDeliveries.nextDeliveries,
      record.menuPlan,
      listIndex,
    );
  });

  return { ...record, persons };
}
