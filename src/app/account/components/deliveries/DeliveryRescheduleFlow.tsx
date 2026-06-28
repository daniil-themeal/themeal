import { useEffect, useState } from 'react';

import type { HomeMenuPlanConfig } from '../../types/account.types';
import { DeliveryRescheduleCalendar } from './DeliveryRescheduleCalendar';
import { DeliveryRescheduleFooter } from './DeliveryRescheduleFooter';
import { DeliveryRescheduleMealPreview } from './DeliveryRescheduleMealPreview';

type RescheduleStep = 'pickDate' | 'preview';

type DeliveryRescheduleFlowProps = {
  menuPlan: HomeMenuPlanConfig;
  sourceDateIso: string;
  scheduledDeliveryDates: string[];
  onConfirm: (targetDateIso: string) => void;
  resetKey?: string | number;
};

export function DeliveryRescheduleFlow({
  menuPlan,
  sourceDateIso,
  scheduledDeliveryDates,
  onConfirm,
  resetKey,
}: DeliveryRescheduleFlowProps) {
  const [step, setStep] = useState<RescheduleStep>('pickDate');
  const [pendingTargetDateIso, setPendingTargetDateIso] = useState<string | null>(null);

  useEffect(() => {
    setStep('pickDate');
    setPendingTargetDateIso(null);
  }, [resetKey, sourceDateIso]);

  const handleSelectDate = (targetDateIso: string) => {
    setPendingTargetDateIso(targetDateIso);
    setStep('preview');
  };

  const handleChangeDate = () => {
    setStep('pickDate');
    setPendingTargetDateIso(null);
  };

  const handleConfirm = () => {
    if (!pendingTargetDateIso) {
      return;
    }

    onConfirm(pendingTargetDateIso);
  };

  return (
    <div className="account-delivery-sheet__reschedule-body">
      <div className="account-delivery-sheet__scroll">
        {step === 'pickDate' ? (
          <DeliveryRescheduleCalendar
            menuPlan={menuPlan}
            sourceDateIso={sourceDateIso}
            scheduledDeliveryDates={scheduledDeliveryDates}
            onSelectDate={handleSelectDate}
          />
        ) : pendingTargetDateIso ? (
          <DeliveryRescheduleMealPreview
            menuPlan={menuPlan}
            sourceDateIso={sourceDateIso}
            targetDateIso={pendingTargetDateIso}
            scheduledDeliveryDates={scheduledDeliveryDates}
          />
        ) : null}
      </div>

      {step === 'preview' && pendingTargetDateIso ? (
        <DeliveryRescheduleFooter onChangeDate={handleChangeDate} onConfirm={handleConfirm} />
      ) : null}
    </div>
  );
}
