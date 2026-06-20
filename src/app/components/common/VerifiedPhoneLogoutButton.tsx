import { GhostButton } from './GhostButton';
import { LogOutIcon } from './icons/feather/LogOutIcon';

type VerifiedPhoneLogoutButtonProps = {
  phone: string;
  onClick: () => void;
  prefix?: string;
  className?: string;
};

export function VerifiedPhoneLogoutButton({
  phone,
  onClick,
  prefix = '+971 ',
  className = '',
}: VerifiedPhoneLogoutButtonProps) {
  return (
    <GhostButton
      size="small"
      variant="neutral"
      fullWidth
      rightIcon={<LogOutIcon size={16} />}
      onClick={onClick}
      aria-label="Log out"
      className={className}
    >
      {prefix}
      {phone}
    </GhostButton>
  );
}
