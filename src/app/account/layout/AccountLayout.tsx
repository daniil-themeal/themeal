import { Outlet } from 'react-router';

import { AccountMockStoreProvider } from '../context/AccountMockStore';
import { AccountBottomTabs } from './AccountBottomTabs';
import { AccountHeader } from './AccountHeader';
import '../styles/account.css';

type AccountLayoutProps = {
  onDesignSystemClick?: () => void;
};

export function AccountLayout({ onDesignSystemClick }: AccountLayoutProps) {
  return (
    <AccountMockStoreProvider>
      <div className="account-shell">
        <AccountHeader onDesignSystemClick={onDesignSystemClick} />
        <main className="account-shell__content">
          <Outlet />
        </main>
        <AccountBottomTabs />
      </div>
    </AccountMockStoreProvider>
  );
}
