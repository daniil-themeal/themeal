import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { ChevronDownIcon } from '../../components/common/icons/feather/ChevronDownIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

const COMPACT_BREAKPOINT = 880;

export type HeaderNavLink = {
  href: string;
  label: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
};

type HeaderNavProps = {
  links: HeaderNavLink[];
  textColor: string;
  onDark?: boolean;
  navigationLabel?: string;
};

function renderLinkLabel(link: HeaderNavLink) {
  if (link.className?.includes('navlink--design-system')) {
    return (
      <>
        <span className="navlink__full">{link.label}</span>
        <span className="navlink__short">DS</span>
      </>
    );
  }

  return link.label;
}

export function HeaderNav({
  links,
  textColor,
  onDark = true,
  navigationLabel = 'Navigation',
}: HeaderNavProps) {
  const measureRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= COMPACT_BREAKPOINT,
  );

  const evaluate = useCallback(() => {
    const width = window.innerWidth;
    if (width <= COMPACT_BREAKPOINT) {
      setCompact(true);
      return;
    }

    const measureNav = measureRef.current;
    const row = measureNav?.closest('.hdr-row');
    if (!measureNav || !row) return;

    const logoWidth = row.querySelector('.hdr-logo')?.getBoundingClientRect().width ?? 0;
    const actionsWidth = row.querySelector('.hdr-actions')?.getBoundingClientRect().width ?? 0;
    const rowStyles = window.getComputedStyle(row);
    const rowGap = Number.parseFloat(rowStyles.columnGap || rowStyles.gap || '0') || 0;
    const availableWidth = row.clientWidth - logoWidth - actionsWidth - rowGap * 2 - 8;

    setCompact(measureNav.scrollWidth > availableWidth);
  }, []);

  useEffect(() => {
    evaluate();

    const row = measureRef.current?.closest('.hdr-row');
    const observer = new ResizeObserver(evaluate);
    if (row) observer.observe(row);
    window.addEventListener('resize', evaluate, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', evaluate);
    };
  }, [evaluate, links]);

  const hoverColor = onDark ? '#fff' : 'var(--brand)';

  const linkStyle: CSSProperties = {
    color: textColor,
    transition: 'color .15s',
  };

  const linkHoverHandlers = {
    onMouseEnter: (event: MouseEvent<HTMLAnchorElement>) => {
      event.currentTarget.style.color = hoverColor;
    },
    onMouseLeave: (event: MouseEvent<HTMLAnchorElement>) => {
      event.currentTarget.style.color = textColor;
    },
  };

  return (
    <>
      <nav
        ref={measureRef}
        aria-hidden
        className="row hdr-nav hdr-nav--inline hdr-nav--measure"
      >
        {links.map((link) => (
          <a
            key={`measure-${link.href}-${link.label}`}
            href={link.href}
            className={`navlink${link.className ? ` ${link.className}` : ''}`}
            tabIndex={-1}
          >
            {renderLinkLabel(link)}
          </a>
        ))}
      </nav>

      {compact ? (
        <div className="hdr-nav hdr-nav--compact">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="hdr-nav-dropdown-trigger"
                style={{ color: textColor }}
                aria-label={navigationLabel}
              >
                <span>{navigationLabel}</span>
                <ChevronDownIcon size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="hdr-nav-dropdown-content">
              {links.map((link) => (
                <DropdownMenuItem key={`${link.href}-${link.label}`} asChild>
                  <a
                    href={link.href}
                    className={`hdr-nav-dropdown-link${link.className ? ` ${link.className}` : ''}`}
                    onClick={link.onClick}
                  >
                    {link.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <nav
          className="row hdr-nav hdr-nav--inline"
          style={{ fontWeight: 600, color: textColor }}
        >
          {links.map((link) => (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={`navlink${link.className ? ` ${link.className}` : ''}`}
              style={linkStyle}
              onClick={link.onClick}
              {...linkHoverHandlers}
            >
              {renderLinkLabel(link)}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
