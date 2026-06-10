import { useEffect } from "react";

const IFRAME_ID = "testimonialto-18515f72-5509-4309-8a4f-cb37ce8b672c";
const IFRAME_SELECTOR = `#${IFRAME_ID}`;
const EMBED_ID = "18515f72-5509-4309-8a4f-cb37ce8b672c";
const RESIZER_SCRIPT_URL = "https://testimonial.to/js/iframeResizer.min.js";

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

function initIframeResizer() {
  if (!window.iFrameResize) return;

  window.iFrameResize(
    {
      log: false,
      checkOrigin: false,
      onResized: () => {
        document.getElementById(IFRAME_ID)?.classList.add("loaded");
      },
    },
    IFRAME_SELECTOR,
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
    existingScript.addEventListener("load", onLoad);
    return () => existingScript.removeEventListener("load", onLoad);
  }

  const script = document.createElement("script");
  script.src = RESIZER_SCRIPT_URL;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);

  return () => {
    script.removeEventListener("load", onLoad);
  };
}

export default function CustomersSection() {
  useEffect(() => {
    const iframe = document.getElementById(IFRAME_ID) as IFrameResizerElement | null;
    if (!iframe) return;

    const handleIframeLoad = () => {
      initIframeResizer();
    };

    const removeScriptListener = loadResizerScript(handleIframeLoad);
    iframe.addEventListener("load", handleIframeLoad);

    return () => {
      removeScriptListener();
      iframe.removeEventListener("load", handleIframeLoad);
      iframe.classList.remove("loaded");
      iframe.iFrameResizer?.removeListeners();
    };
  }, []);

  return (
    <div className="bg-[#FCDE02] relative shrink-0 w-full section-spacing-y section-spacing-x justify-center flex">
      <style>{`
        .testimonial-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        #testimonialto-18515f72-5509-4309-8a4f-cb37ce8b672c {
          width: 100%;
          height: 60rem;
          max-height: 60rem;
          overflow: hidden;
          border: 0;
          display: block;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        #testimonialto-18515f72-5509-4309-8a4f-cb37ce8b672c.loaded {
          opacity: 1;
        }
      `}</style>

      <div className="content-stretch flex flex-col gap-[32px] md:gap-[48px] lg:gap-[64px] items-center relative size-full maxWidth">
        <h2 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-quicksand-bold not-italic relative shrink-0 text-[#383e48] h2-title text-center w-full">
          What our customers say
        </h2>

        <div className="testimonial-wrapper">
          <iframe
            id={IFRAME_ID}
            src={`https://embed-v2.testimonial.to/carousel/all/themeal?id=${EMBED_ID}`}
            frameBorder="0"
            scrolling="no"
            width="100%"
            height="960"
          />
        </div>
      </div>
    </div>
  );
}
