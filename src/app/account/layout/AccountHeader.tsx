import { useNavigate } from 'react-router';

import { Logo } from '../../main-landing/components/icons';
import { IconButton } from '../../components/common/IconButton';
import { BellIcon } from '../../components/common/icons/feather/BellIcon';
import { LogOutIcon } from '../../components/common/icons/feather/LogOutIcon';
import { usePhoneAuth } from '../../phoneAuth/PhoneAuthProvider';

type AccountHeaderProps = {
  onNotificationsClick?: () => void;
  onDesignSystemClick?: () => void;
};

export function AccountHeader({
  onNotificationsClick,
  onDesignSystemClick,
}: AccountHeaderProps) {
  const navigate = useNavigate();
  const { resetPhoneSession } = usePhoneAuth();

  const handleLogout = () => {
    resetPhoneSession();
    navigate('/', { replace: true });
  };

  return (
    <header className="account-header">
      <div className="account-header__row">
        <Logo height={26} color="#383E48" accent="#383E48" />
        <div className="account-header__actions">
          {onDesignSystemClick ? (
            <button
              type="button"
              className="account-header__design-system"
              onClick={onDesignSystemClick}
            >
              <span className="account-header__design-system-full">Design system</span>
              <span className="account-header__design-system-short">DS</span>
            </button>
          ) : null}
          <IconButton
            variant="neutral"
            outline
            size="medium"
            className="account-header__bell"
            aria-label="Notifications"
            icon={<BellIcon size={24} />}
            onClick={onNotificationsClick}
          />
          <IconButton
            variant="neutral"
            outline
            size="medium"
            className="account-header__logout"
            aria-label="Log out"
            icon={<LogOutIcon size={24} />}
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
