import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { ChevronRightIcon } from '../components/common/icons';
import { legalText } from './legalTypography';

export type LegalBreadcrumbItem =
  | { type: 'link'; to: string; label: ReactNode }
  | { type: 'current'; label: ReactNode };

type LegalBreadcrumbsProps = {
  items: readonly LegalBreadcrumbItem[];
};

export function LegalBreadcrumbs({ items }: LegalBreadcrumbsProps) {
  return (
    <nav className="legal-breadcrumbs" aria-label="Breadcrumb">
      <ol className={`legal-breadcrumbs__list ${legalText.breadcrumb}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const itemKey = item.type === 'link' ? item.to : String(item.label);

          return (
            <li
              key={itemKey}
              className={[
                'legal-breadcrumbs__item',
                item.type === 'current' ? legalText.breadcrumbCurrent : '',
              ]
                .filter(Boolean)
                .join(' ')}
              {...(item.type === 'current' ? { 'aria-current': 'page' as const } : {})}
            >
              {item.type === 'link' ? (
                <Link to={item.to} className="legal-breadcrumbs__link">
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
              {!isLast ? <ChevronRightIcon size={16} className="legal-breadcrumbs__chevron" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
