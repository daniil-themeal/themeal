import type { ProseListItemData } from '../components/common/ProseList';

export type ParsedListItem = {
  isSub: boolean;
  label: string;
  description: string;
};

export type LegalContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: ProseListItemData[] };

const LABEL_SKIP_PATTERN =
  /^(For example|However|Note|See|If you|When we|Under UAE|In such|This is|We will|You may|You can|By using|As noted|For instance)/i;

export function parseLabeledListItem(text: string): ParsedListItem | null {
  const trimmed = text.trim();
  const isSub = trimmed.startsWith('- ');
  const content = isSub ? trimmed.slice(2).trim() : trimmed;

  const colonIndex = content.indexOf(':');
  if (colonIndex === -1) return null;

  const label = content.slice(0, colonIndex).trim();
  const description = content.slice(colonIndex + 1).trim();

  if (!label || label.length > 72) return null;
  if (!/^[A-Z0-9"'(]/.test(label)) return null;
  if (LABEL_SKIP_PATTERN.test(label)) return null;
  if (label.split(/\s+/).length > 8) return null;

  return { isSub, label, description };
}

function shouldStartListAt(paragraphs: readonly string[], index: number): boolean {
  if (!parseLabeledListItem(paragraphs[index])) return false;

  const previous = index > 0 ? paragraphs[index - 1] : null;
  const next = index < paragraphs.length - 1 ? paragraphs[index + 1] : null;

  if (previous && previous.trimEnd().endsWith(':') && !parseLabeledListItem(previous)) {
    return true;
  }
  if (previous && parseLabeledListItem(previous)) return true;
  if (next && parseLabeledListItem(next)) return true;

  return false;
}

function collectListItems(
  paragraphs: readonly string[],
  startIndex: number,
): { items: ProseListItemData[]; nextIndex: number } {
  const items: ProseListItemData[] = [];
  let index = startIndex;

  while (index < paragraphs.length) {
    const parsed = parseLabeledListItem(paragraphs[index]);
    if (!parsed) break;

    if (parsed.isSub) {
      const parent = items.at(-1);
      if (!parent) break;

      parent.children = parent.children ?? [];
      parent.children.push({
        label: parsed.label,
        description: parsed.description,
      });
    } else {
      items.push({
        label: parsed.label,
        description: parsed.description,
      });
    }

    index += 1;
  }

  return { items, nextIndex: index };
}

export function parseLegalContentBlocks(paragraphs: readonly string[]): LegalContentBlock[] {
  const blocks: LegalContentBlock[] = [];
  let index = 0;

  while (index < paragraphs.length) {
    if (shouldStartListAt(paragraphs, index)) {
      const { items, nextIndex } = collectListItems(paragraphs, index);
      blocks.push({ type: 'list', items });
      index = nextIndex;
      continue;
    }

    blocks.push({ type: 'paragraph', text: paragraphs[index] });
    index += 1;
  }

  return blocks;
}
