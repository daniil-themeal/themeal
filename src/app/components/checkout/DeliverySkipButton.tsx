import { Button } from '../common/Button';

type DeliverySkipButtonProps = {
  onSkip: () => void;
  className?: string;
};

export function DeliverySkipButton({ onSkip, className = '' }: DeliverySkipButtonProps) {
  return (
    <div className={['flex justify-center', className].filter(Boolean).join(' ')}>
      <Button type="button" variant="neutral" size="small" onClick={onSkip}>
        Skip
      </Button>
    </div>
  );
}
