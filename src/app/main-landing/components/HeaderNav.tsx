import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { ChevronDownIcon } from '../../components/common/icons/feather/ChevronDownIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { BREAKPOINTS } from '../../components/common/breakpoints';

const MIN_LINK_PADDING_PX = 8;
const MAX_LINK_PADDING_PX = 24;

type HeaderNavCssVariables = CSSProperties & {
  '--hdr-nav-link-padding-inline': string;
};

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
  const [hidden, setHidden] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < BREAKPOINTS.md,
  );
  const [compact, setCompact] = useState(false);
  const [linkPadding, setLinkPadding] = useState(MAX_LINK_PADDING_PX);

  const evaluate = useCallback(() => {
    const width = window.innerWidth;
    if (width < BREAKPOINTS.md) {
      setHidden(true);
      return;
    }

    setHidden(false);

    const measureNav = measureRef.current;
    const row = measureNav?.closest('.hdr-row');
    if (!measureNav || !row) return;

    const logoWidth = row.querySelector('.hdr-logo')?.getBoundingClientRect().width ?? 0;
    const actionsWidth = row.querySelector('.hdr-actions')?.getBoundingClientRect().width ?? 0;
    const rowStyles = window.getComputedStyle(row);
    const rowGap = Number.parseFloat(rowStyles.columnGap || rowStyles.gap || '0') || 0;
    const availableWidth = row.clientWidth - logoWidth - actionsWidth - rowGap * 2 - 8;
    const linkCount = links.length;

    if (linkCount === 0) {
      setCompact(false);
      setLinkPadding(MAX_LINK_PADDING_PX);
      return;
    }

    const widthAtMaxPadding = measureNav.scrollWidth;
    const textWidth =
      widthAtMaxPadding - 2 * MAX_LINK_PADDING_PX * linkCount;
    const minRequiredWidth = textWidth + 2 * MIN_LINK_PADDING_PX * linkCount;

    if (minRequiredWidth > availableWidth) {
      setCompact(true);
      return;
    }

    const fitPadding = Math.floor((availableWidth - textWidth) / (2 * linkCount));
    setLinkPadding(Math.max(MIN_LINK_PADDING_PX, Math.min(MAX_LINK_PADDING_PX, fitPadding)));
    setCompact(false);
  }, [links]);

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

  const inlineNavStyle: HeaderNavCssVariables = {
    fontWeight: 600,
    color: textColor,
    '--hdr-nav-link-padding-inline': `${linkPadding}px`,
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

      {hidden ? null : compact ? (
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
          style={inlineNavStyle}
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
