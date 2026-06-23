import { GhostButton, type GhostButtonSize } from './GhostButton';
import { LogOutIcon } from './icons/feather/LogOutIcon';

type VerifiedPhoneLogoutButtonProps = {
  phone: string;
  onClick: () => void;
  prefix?: string;
  className?: string;
  size?: GhostButtonSize;
};

const LOGOUT_ICON_SIZE: Record<GhostButtonSize, number> = {
  small: 16,
  medium: 20,
  large: 20,
};

export function VerifiedPhoneLogoutButton({
  phone,
  onClick,
  prefix = '+971 ',
  className = '',
  size = 'small',
}: VerifiedPhoneLogoutButtonProps) {
  return (
    <GhostButton
      size={size}
      variant="neutral"
      fullWidth
      rightIcon={<LogOutIcon size={LOGOUT_ICON_SIZE[size]} />}
      onClick={onClick}
      aria-label="Log out"
      className={[size === 'large' ? 'font-semibold' : '', className].filter(Boolean).join(' ')}
    >
      {prefix}
      {phone}
    </GhostButton>
  );
}
