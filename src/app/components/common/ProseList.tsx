import type { ReactNode } from 'react';

import { PROSE_LIST_TOKENS } from './proseListTokens';
import './prose-list.css';

export type ProseListItemData = {
  label: string;
  description: string;
  children?: ProseListItemData[];
};

type ProseListProps = {
  items: readonly ProseListItemData[];
  renderText?: (text: string) => ReactNode;
};

function defaultRenderText(text: string) {
  return text;
}

function ProseListItems({
  items,
  nested,
  renderText,
}: {
  items: readonly ProseListItemData[];
  nested?: boolean;
  renderText: (text: string) => ReactNode;
}) {
  return (
    <ul className={nested ? PROSE_LIST_TOKENS.nestedList.className : PROSE_LIST_TOKENS.list.className}>
      {items.map((item) => (
        <li key={`${item.label}-${item.description.slice(0, 24)}`} className={PROSE_LIST_TOKENS.item.className}>
          <span className={PROSE_LIST_TOKENS.content.className}>
            <span className={PROSE_LIST_TOKENS.itemLabel.className}>{item.label}:</span>
            {item.description ? (
              <span className={PROSE_LIST_TOKENS.itemText.className}>
                {' '}
                {renderText(item.description)}
              </span>
            ) : null}
          </span>
          {item.children && item.children.length > 0 ? (
            <ProseListItems items={item.children} nested renderText={renderText} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function ProseList({ items, renderText = defaultRenderText }: ProseListProps) {
  if (items.length === 0) return null;

  return <ProseListItems items={items} renderText={renderText} />;
}
