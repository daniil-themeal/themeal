import { NavLink } from 'react-router';

import { HomeIcon } from '../../components/common/icons/feather/HomeIcon';
import { TruckIcon } from '../../components/common/icons/feather/TruckIcon';
import { UserIcon } from '../../components/common/icons/feather/UserIcon';
import {
  ACCOUNT_TAB_ROUTES,
  type AccountTabId,
} from '../navigation/accountRoutes';

const TABS: { id: AccountTabId; label: string; Icon: typeof HomeIcon }[] = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'deliveries', label: 'Deliveries', Icon: TruckIcon },
  { id: 'profile', label: 'Profile', Icon: UserIcon },
];

export function AccountBottomTabs() {
  return (
    <nav className="account-bottom-tabs" aria-label="Account navigation">
      {TABS.map(({ id, label, Icon }) => (
        <NavLink
          key={id}
          to={ACCOUNT_TAB_ROUTES[id]}
          end={id === 'home'}
          className={({ isActive }) =>
            [
              'account-bottom-tabs__tab',
              isActive ? 'account-bottom-tabs__tab--active' : '',
            ].join(' ')
          }
        >
          <span className="account-bottom-tabs__icon" aria-hidden>
            <Icon size={16} />
          </span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
