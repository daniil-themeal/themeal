import { useEffect } from 'react';

const RESIZER_SCRIPT_URL = 'https://testimonial.to/js/iframeResizer.min.js';

type IFrameResizerElement = HTMLIFrameElement & {
  iFrameResizer?: { removeListeners: () => void };
};

declare global {
  interface Window {
    iFrameResize?: (
      options: {
        log: boolean;
        checkOrigin: boolean;
        onResized?: () => void;
      },
      target: string | HTMLIFrameElement,
    ) => void;
  }
}

function initIframeResizer(iframeId: string) {
  if (!window.iFrameResize) return;

  window.iFrameResize(
    {
      log: false,
      checkOrigin: false,
      onResized: () => {
        document.getElementById(iframeId)?.classList.add('loaded');
      },
    },
    `#${iframeId}`,
  );
}

function loadResizerScript(onLoad: () => void) {
  if (window.iFrameResize) {
    onLoad();
    return () => {};
  }

  const existingScript = document.querySelector(
    `script[src="${RESIZER_SCRIPT_URL}"]`,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    existingScript.addEventListener('load', onLoad);
    return () => existingScript.removeEventListener('load', onLoad);
  }

  const script = document.createElement('script');
  script.src = RESIZER_SCRIPT_URL;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);

  return () => {
    script.removeEventListener('load', onLoad);
  };
}

export function useTestimonialIframe(iframeId: string) {
  useEffect(() => {
    const iframe = document.getElementById(iframeId) as IFrameResizerElement | null;
    if (!iframe) return;

    const markLoaded = () => {
      iframe.classList.add('loaded');
      iframe.dataset.testimonialReady = '1';
    };

    const handleIframeLoad = () => {
      markLoaded();
      initIframeResizer(iframeId);
    };

    const removeScriptListener = loadResizerScript(() => initIframeResizer(iframeId));
    iframe.addEventListener('load', handleIframeLoad);
    if (iframe.dataset.testimonialReady === '1') {
      markLoaded();
      initIframeResizer(iframeId);
    }

    const fallbackShow = window.setTimeout(() => {
      if (!iframe.classList.contains('loaded')) {
        markLoaded();
        initIframeResizer(iframeId);
      }
    }, 1500);

    return () => {
      window.clearTimeout(fallbackShow);
      removeScriptListener();
      iframe.removeEventListener('load', handleIframeLoad);
      iframe.classList.remove('loaded');
      iframe.iFrameResizer?.removeListeners();
    };
  }, [iframeId]);
}
