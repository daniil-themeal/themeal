import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ProseList } from '../components/common/ProseList';
import { PROSE_LIST_TOKENS } from '../components/common/proseListTokens';
import { mealContentEn } from '../main-landing/content/mealContentEn';
import { Footer } from '../main-landing/components/sections/sections3';
import { LegalHeader } from './LegalHeader';
import {
  parseLabeledListItem,
  parseLegalContentBlocks,
  type LegalContentBlock,
} from './parseLegalContentBlocks';
import { LEGAL_ROUTES } from './routes';
import { legalText, legalTypographyVars } from './legalTypography';
import { landingLayoutStyle } from '../main-landing/landingLayoutTokens';
import '../main-landing/styles/index.css';
import './legal-page.css';

type LegalSection = {
  number: string;
  title: string;
  paragraphs: readonly string[];
};

type LegalDocument = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: readonly LegalSection[];
};

type LegalDocumentPageProps = {
  document: LegalDocument;
  current: keyof typeof LEGAL_ROUTES;
};

const INLINE_LINK_PATTERNS: Array<{ pattern: RegExp; href: string }> = [
  { pattern: /Privacy Policy/g, href: LEGAL_ROUTES.privacy },
  { pattern: /Terms & conditions/gi, href: LEGAL_ROUTES.terms },
  { pattern: /Terms and Conditions/g, href: LEGAL_ROUTES.terms },
];

function linkifyText(text: string): ReactNode {
  let nodes: ReactNode[] = [text];

  for (const { pattern, href } of INLINE_LINK_PATTERNS) {
    const next: ReactNode[] = [];

    for (const node of nodes) {
      if (typeof node !== 'string') {
        next.push(node);
        continue;
      }

      let lastIndex = 0;
      for (const match of node.matchAll(pattern)) {
        const index = match.index ?? 0;
        if (index > lastIndex) {
          next.push(node.slice(lastIndex, index));
        }
        next.push(
          <Link key={`${href}-${index}`} to={href} className={legalText.link}>
            {match[0]}
          </Link>,
        );
        lastIndex = index + match[0].length;
      }

      if (lastIndex < node.length) {
        next.push(node.slice(lastIndex));
      }
    }

    nodes = next;
  }

  return nodes.length === 1 ? nodes[0] : <>{nodes}</>;
}

function renderParagraph(text: string) {
  const labeled = parseLabeledListItem(text);
  if (labeled) {
    return (
      <p className={`legal-paragraph ${legalText.body}`}>
        <span className={PROSE_LIST_TOKENS.itemLabel.className}>{labeled.label}:</span>
        {labeled.description ? (
          <span className={PROSE_LIST_TOKENS.itemText.className}>
            {' '}
            {linkifyText(labeled.description)}
          </span>
        ) : null}
      </p>
    );
  }

  return <p className={`legal-paragraph ${legalText.body}`}>{linkifyText(text)}</p>;
}

function renderContentBlocks(blocks: readonly LegalContentBlock[]) {
  return blocks.map((block) => {
    if (block.type === 'list') {
      return (
        <ProseList
          key={`list-${block.items[0]?.label ?? 'empty'}`}
          items={block.items}
          renderText={linkifyText}
        />
      );
    }

    return (
      <Fragment key={`p-${block.text.slice(0, 48)}`}>{renderParagraph(block.text)}</Fragment>
    );
  });
}

export function LegalDocumentPage({ document, current }: LegalDocumentPageProps) {
  const t = mealContentEn;
  const pageLabel = current === 'privacy' ? t.footer.privacy : t.footer.terms;
  const other =
    current === 'privacy'
      ? { href: LEGAL_ROUTES.terms, label: t.footer.terms }
      : { href: LEGAL_ROUTES.privacy, label: t.footer.privacy };

  return (
    <div
      className="main-landing legal-page min-h-screen w-full font-sans"
      style={{ ...legalTypographyVars, ...landingLayoutStyle }}
    >
      <LegalHeader t={t} />

      <main className="legal-main">
        <div className="wrap legal-main__inner">
          <nav className="legal-breadcrumbs" aria-label="Breadcrumb">
            <ol className={`legal-breadcrumbs__list ${legalText.breadcrumb}`}>
              <li className="legal-breadcrumbs__item">
                <Link to="/" className={legalText.breadcrumbLink}>
                  Home
                </Link>
              </li>
              <li
                className={`legal-breadcrumbs__item ${legalText.breadcrumbCurrent}`}
                aria-current="page"
              >
                {pageLabel}
              </li>
            </ol>
          </nav>

          <article className="legal-article">
            <header className="legal-article__head">
              <h1 className={`legal-article__title ${legalText.pageTitle}`}>
                {document.title}
              </h1>
              <p className={`legal-article__updated ${legalText.caption}`}>
                Last updated: {document.lastUpdated}
              </p>
            </header>

            <div className="legal-article__intro">
              {document.intro.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={`legal-paragraph ${legalText.body}`}>
                  {linkifyText(paragraph)}
                </p>
              ))}
            </div>

            {document.sections.map((section) => (
              <section key={section.number} className="legal-section">
                <h2 className={`legal-section__title ${legalText.sectionTitle}`}>
                  {section.number}. {section.title}
                </h2>
                <div className="legal-section__body">
                  {renderContentBlocks(parseLegalContentBlocks(section.paragraphs))}
                </div>
              </section>
            ))}
          </article>

          <p className={`legal-related ${legalText.caption}`}>
            See also{' '}
            <Link to={other.href} className={legalText.link}>
              {other.label}
            </Link>
          </p>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
