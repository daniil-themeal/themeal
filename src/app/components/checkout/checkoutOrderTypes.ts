import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';
import type { TestAddress } from '../../data/testAddresses';

import {
  serializeDeliveryDetails,
  type DeliveryDetailsData,
  type SerializedDeliveryDetails,
} from './deliveryDetailsTypes';

export type CheckoutOrderSelection = {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons: number;
  ingredients: string[];
  lightMealOption: LightMealOption;
  extraMealDayKeys: string[];
};

export type CheckoutOrderDelivery = SerializedDeliveryDetails & {
  addressId: string | null;
  addressTitle: string | null;
  addressSubtitle: string | null;
};

export type CheckoutOrderPayload = {
  phone: string;
  selection: CheckoutOrderSelection;
  delivery: CheckoutOrderDelivery;
  promoCode?: string;
};

type BuildCheckoutOrderPayloadInput = {
  phone: string;
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons: number;
  ingredients: string[];
  lightMealOption: LightMealOption;
  extraMealDayKeys: string[];
  selectedAddress: TestAddress | null;
  deliveryDetails: DeliveryDetailsData;
  promoCode?: string;
};

export function buildCheckoutOrderPayload({
  phone,
  plan,
  days,
  duration,
  persons,
  ingredients,
  lightMealOption,
  extraMealDayKeys,
  selectedAddress,
  deliveryDetails,
  promoCode,
}: BuildCheckoutOrderPayloadInput): CheckoutOrderPayload {
  return {
    phone,
    selection: {
      plan,
      days,
      duration,
      persons,
      ingredients,
      lightMealOption,
      extraMealDayKeys,
    },
    delivery: {
      ...serializeDeliveryDetails(deliveryDetails),
      addressId: selectedAddress?.id ?? null,
      addressTitle: selectedAddress?.title ?? null,
      addressSubtitle: selectedAddress?.subtitle ?? null,
    },
    promoCode: promoCode || undefined,
  };
}
