import { useEffect, useMemo, useRef, useState } from 'react';

import { Tooltip } from './Tooltip';
import { LinkIcon } from './icons/feather/LinkIcon';
import { Share2Icon } from './icons/feather/Share2Icon';
import { legalText } from '../../legal/legalTypography';
import { Social } from '../../main-landing/components/icons';

export type PageShareLabels = {
  shareLabel: string;
  copyLink: string;
  linkCopied: string;
  shareWhatsApp: string;
  shareFacebook: string;
  shareTelegram: string;
  shareNative: string;
};

type PageShareButtonsProps = {
  title: string;
  path: string;
  labels: PageShareLabels;
};

function usePageShareUrl(path: string): string {
  const [url, setUrl] = useState(`https://themeal.menu${path}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, [path]);

  return url;
}

function buildShareUrls(title: string, url: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const whatsappText = encodeURIComponent(`${title}\n${url}`);

  return {
    whatsapp: `https://wa.me/?text=${whatsappText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };
}

export function PageShareButtons({ title, path, labels }: PageShareButtonsProps) {
  const url = usePageShareUrl(path);
  const shareUrls = useMemo(() => buildShareUrls(title, url), [title, url]);
  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);
  const copyTooltipTimeoutRef = useRef<number | undefined>(undefined);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  useEffect(
    () => () => {
      if (copyTooltipTimeoutRef.current !== undefined) {
        window.clearTimeout(copyTooltipTimeoutRef.current);
      }
    },
    [],
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyTooltipOpen(true);

      if (copyTooltipTimeoutRef.current !== undefined) {
        window.clearTimeout(copyTooltipTimeoutRef.current);
      }

      copyTooltipTimeoutRef.current = window.setTimeout(() => {
        setCopyTooltipOpen(false);
        copyTooltipTimeoutRef.current = undefined;
      }, 2000);
    } catch {
      setCopyTooltipOpen(false);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return;
      }
    }
  };

  return (
    <div className="blog-share" aria-label={labels.shareLabel}>
      <p className={`blog-share__label ${legalText.caption}`}>{labels.shareLabel}</p>

      <div className="blog-share__actions">
        {canNativeShare ? (
          <button
            type="button"
            className="blog-share__button"
            aria-label={labels.shareNative}
            title={labels.shareNative}
            onClick={handleNativeShare}
          >
            <Share2Icon size={20} />
          </button>
        ) : null}

        <a
          href={shareUrls.whatsapp}
          className="blog-share__button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.shareWhatsApp}
          title={labels.shareWhatsApp}
        >
          <Social.whatsapp size={20} />
        </a>

        <a
          href={shareUrls.facebook}
          className="blog-share__button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.shareFacebook}
          title={labels.shareFacebook}
        >
          <Social.facebook size={20} />
        </a>

        <a
          href={shareUrls.telegram}
          className="blog-share__button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.shareTelegram}
          title={labels.shareTelegram}
        >
          <Social.telegram size={20} />
        </a>

        <Tooltip
          content={labels.linkCopied}
          side="top"
          open={copyTooltipOpen}
          onOpenChange={setCopyTooltipOpen}
        >
          <button
            type="button"
            className="blog-share__button"
            aria-label={labels.copyLink}
            onClick={handleCopyLink}
          >
            <LinkIcon size={20} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
