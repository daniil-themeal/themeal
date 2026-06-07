import { useEffect, useReducer } from 'react';

export type CheckoutStep = 'plan' | 'verification' | 'delivery' | 'payment';
export type DeliveryStep = 'address' | 'details';

type CheckoutFlowState = {
  checkoutStep: CheckoutStep;
  deliveryStep: DeliveryStep;
  isPhoneVerified: boolean;
  summaryVisible: boolean;
  menuOpen: boolean;
};

type CheckoutFlowAction =
  | {
      type: 'reset';
      checkoutStep: CheckoutStep;
      deliveryStep: DeliveryStep;
      isOpen: boolean;
    }
  | { type: 'setSummaryVisible'; value: boolean }
  | { type: 'setMenuOpen'; value: boolean }
  | { type: 'continueFromPlan' }
  | { type: 'smsContinue' }
  | { type: 'addressContinue' }
  | { type: 'changeAddress' }
  | { type: 'deliveryDetailsContinue' }
  | { type: 'changeNumber' }
  | { type: 'back' };

function createInitialState(
  checkoutStep: CheckoutStep,
  deliveryStep: DeliveryStep,
): CheckoutFlowState {
  return {
    checkoutStep,
    deliveryStep,
    isPhoneVerified: false,
    summaryVisible: false,
    menuOpen: false,
  };
}

function checkoutFlowReducer(
  state: CheckoutFlowState,
  action: CheckoutFlowAction,
): CheckoutFlowState {
  switch (action.type) {
    case 'reset':
      return {
        ...state,
        checkoutStep: action.checkoutStep,
        deliveryStep: action.deliveryStep,
        menuOpen: false,
        summaryVisible: action.isOpen && action.checkoutStep !== 'plan',
      };

    case 'setSummaryVisible':
      return { ...state, summaryVisible: action.value };

    case 'setMenuOpen':
      return { ...state, menuOpen: action.value };

    case 'continueFromPlan':
      if (state.isPhoneVerified) {
        return {
          ...state,
          checkoutStep: 'delivery',
          deliveryStep: 'address',
          menuOpen: false,
          summaryVisible: true,
        };
      }

      return {
        ...state,
        checkoutStep: 'verification',
        menuOpen: false,
        summaryVisible: true,
      };

    case 'smsContinue':
      return {
        ...state,
        isPhoneVerified: true,
        checkoutStep: 'delivery',
        deliveryStep: 'address',
      };

    case 'addressContinue':
      return { ...state, deliveryStep: 'details' };

    case 'changeAddress':
      return {
        ...state,
        checkoutStep: 'delivery',
        deliveryStep: 'address',
      };

    case 'deliveryDetailsContinue':
      return { ...state, checkoutStep: 'payment' };

    case 'changeNumber':
      return {
        ...state,
        checkoutStep: 'plan',
        menuOpen: false,
        summaryVisible: false,
      };

    case 'back':
      if (state.checkoutStep === 'payment') {
        return {
          ...state,
          checkoutStep: 'delivery',
          deliveryStep: 'details',
        };
      }

      if (state.checkoutStep === 'delivery') {
        if (state.deliveryStep === 'details') {
          return { ...state, deliveryStep: 'address' };
        }

        if (state.isPhoneVerified) {
          return {
            ...state,
            checkoutStep: 'plan',
            menuOpen: false,
            summaryVisible: false,
          };
        }

        return { ...state, checkoutStep: 'verification' };
      }

      if (state.checkoutStep === 'verification') {
        return {
          ...state,
          checkoutStep: 'plan',
          menuOpen: false,
          summaryVisible: false,
        };
      }

      return { ...state, checkoutStep: 'plan' };

    default:
      return state;
  }
}

export function useCheckoutFlow({
  isOpen,
  initialCheckoutStep,
  initialDeliveryStep,
}: {
  isOpen: boolean;
  initialCheckoutStep: CheckoutStep;
  initialDeliveryStep: DeliveryStep;
}) {
  const [state, dispatch] = useReducer(
    checkoutFlowReducer,
    createInitialState(initialCheckoutStep, initialDeliveryStep),
  );

  useEffect(() => {
    dispatch({
      type: 'reset',
      checkoutStep: initialCheckoutStep,
      deliveryStep: initialDeliveryStep,
      isOpen,
    });
  }, [isOpen, initialCheckoutStep, initialDeliveryStep]);

  const headerStep =
    state.checkoutStep === 'plan'
      ? 'plan'
      : state.checkoutStep === 'payment'
        ? 'payment'
        : 'delivery';

  return {
    ...state,
    headerStep,
    setSummaryVisible: (value: boolean) =>
      dispatch({ type: 'setSummaryVisible', value }),
    setMenuOpen: (value: boolean) => dispatch({ type: 'setMenuOpen', value }),
    continueFromPlan: () => dispatch({ type: 'continueFromPlan' }),
    smsContinue: () => dispatch({ type: 'smsContinue' }),
    addressContinue: () => dispatch({ type: 'addressContinue' }),
    changeAddress: () => dispatch({ type: 'changeAddress' }),
    deliveryDetailsContinue: () =>
      dispatch({ type: 'deliveryDetailsContinue' }),
    changeNumber: () => dispatch({ type: 'changeNumber' }),
    back: () => dispatch({ type: 'back' }),
  };
}
