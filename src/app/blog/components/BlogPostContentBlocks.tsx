import { Fragment, type ReactNode } from 'react';

import { ProseList } from '../../components/common/ProseList';
import { PROSE_LIST_TOKENS } from '../../components/common/proseListTokens';
import {
  parseLabeledListItem,
  parseLegalContentBlocks,
  type LegalContentBlock,
} from '../../legal/parseLegalContentBlocks';
import { legalText } from '../../legal/legalTypography';
import type { BlogPostBlock } from '../types/blog.types';

function renderParagraph(text: string) {
  const labeled = parseLabeledListItem(text);
  if (labeled) {
    return (
      <p className={`legal-paragraph ${legalText.body}`}>
        <span className={PROSE_LIST_TOKENS.itemLabel.className}>{labeled.label}:</span>
        {labeled.description ? (
          <span className={PROSE_LIST_TOKENS.itemText.className}> {labeled.description}</span>
        ) : null}
      </p>
    );
  }

  return <p className={`legal-paragraph ${legalText.body}`}>{text}</p>;
}

function renderLegalBlocks(blocks: readonly LegalContentBlock[]) {
  return blocks.map((block) => {
    if (block.type === 'list') {
      return (
        <ProseList
          key={`list-${block.items[0]?.label ?? 'empty'}`}
          items={block.items}
        />
      );
    }

    return (
      <Fragment key={`p-${block.text.slice(0, 48)}`}>{renderParagraph(block.text)}</Fragment>
    );
  });
}

function BlogPostQuote({ text, cite }: { text: string; cite?: string }) {
  return (
    <figure className="blog-post__quote">
      <blockquote className={`blog-post__quote-text ${legalText.body}`}>{text}</blockquote>
      {cite ? (
        <figcaption className={`blog-post__quote-cite ${legalText.caption}`}>— {cite}</figcaption>
      ) : null}
    </figure>
  );
}

function BlogPostInlineImage({
  url,
  alt,
  caption,
}: {
  url: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="blog-post__figure">
      <div className="blog-post__inline-image-wrap">
        <img src={url} alt={alt} className="blog-post__inline-image" loading="lazy" />
      </div>
      {caption ? (
        <figcaption className={`blog-post__figure-caption ${legalText.caption}`}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function renderBlogBlock(block: BlogPostBlock, index: number): ReactNode {
  const key = `${block.type}-${index}`;

  if (block.type === 'quote') {
    return <BlogPostQuote key={key} text={block.text} cite={block.cite} />;
  }

  if (block.type === 'image') {
    return (
      <BlogPostInlineImage key={key} url={block.url} alt={block.alt} caption={block.caption} />
    );
  }

  return <Fragment key={key}>{renderLegalBlocks(parseLegalContentBlocks([block.text]))}</Fragment>;
}

export function renderBlogSectionBlocks(blocks: readonly BlogPostBlock[]) {
  const nodes: ReactNode[] = [];
  let paragraphBatch: string[] = [];
  let batchStart = 0;

  const flushParagraphBatch = () => {
    if (paragraphBatch.length === 0) return;

    nodes.push(
      <Fragment key={`paragraphs-${batchStart}`}>
        {renderLegalBlocks(parseLegalContentBlocks(paragraphBatch))}
      </Fragment>,
    );
    paragraphBatch = [];
  };

  blocks.forEach((block, index) => {
    if (block.type === 'paragraph') {
      if (paragraphBatch.length === 0) batchStart = index;
      paragraphBatch.push(block.text);
      return;
    }

    flushParagraphBatch();
    nodes.push(renderBlogBlock(block, index));
  });

  flushParagraphBatch();
  return nodes;
}
