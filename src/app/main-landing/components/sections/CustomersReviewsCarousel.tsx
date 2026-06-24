// @ts-nocheck
/**
 * Custom reviews carousel (preserved for future rollout).
 * To use on the landing page, replace the iframe Customers in sections2.tsx
 * with CustomersReviewsCarousel from this file.
 */
import { createElement, Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { Modal, ModalCloseOverlay } from '../../../components/common/Modal';
import { Z_INDEX_TOKENS } from '../../../components/common/zIndexTokens';
import { Icon, Stars, Social } from '../icons';
/* ---------------- Customers (horizontal carousel + modal) ---------------- */
const REVIEWS_CAROUSEL_GAP = 24;
const REVIEWS_AUTO_MS = 10000;

function useReviewsColumns() {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const mqLg = window.matchMedia('(min-width: 1024px)');
    const mqMd = window.matchMedia('(min-width: 640px)');
    const update = () => {
      if (mqLg.matches) setCols(3);
      else if (mqMd.matches) setCols(2);
      else setCols(1);
    };
    update();
    mqLg.addEventListener('change', update);
    mqMd.addEventListener('change', update);
    return () => {
      mqLg.removeEventListener('change', update);
      mqMd.removeEventListener('change', update);
    };
  }, []);

  return cols;
}

function reviewPlatformLabel(platform) {
  const labels = {
    instagram: 'Instagram',
    twitter: 'X',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    other: 'Social',
  };
  return labels[platform] ?? 'Social';
}

const REVIEW_STAR_COLOR = 'var(--orange-500)';

function isVideoReview(review) {
  return review.kind === 'video'
    || Boolean(review.videoUrl)
    || review.imageUrl?.includes('/videoThumbnail')
    || review.imageUrl?.includes('image.mux.com/');
}

function ReviewPlayIcon() {
  return createElement('svg', {
    xmlns:'http://www.w3.org/2000/svg',
    viewBox:'0 0 75 75',
    className:'reviews-card__play-icon',
    'aria-hidden':true,
  },
    createElement('circle', { cx:37.5, cy:37.5, r:37.5, fill:'rgba(75,0,126,.6)' }),
    createElement('path', {
      fill:'#fff',
      d:'M52.34 35.95L31.19 22.95c-.58-.35-1.34-.33-1.93.02-.61.34-.99.98-.99 1.67v25.87c0 .69.38 1.33.99 1.67.3.16.64.24.97.24.35 0 .69-.09 1-.27l21.15-12.89c.57-.34.92-.97.92-1.62 0-.67-.35-1.3-.92-1.64z',
    }));
}

function ReviewMedia({ review, inModal = false }) {
  const stopMediaClick = (e) => e.stopPropagation();
  const isVideo = isVideoReview(review);
  const poster = review.imageUrl;

  if (isVideo && inModal && review.videoUrl) {
    return createElement('div', { className:'reviews-card__media' },
      createElement('video', {
        key:review.videoUrl,
        className:'reviews-card__video reviews-card__video--modal',
        src:review.videoUrl,
        poster,
        controls:true,
        playsInline:true,
        preload:'metadata',
        onClick:stopMediaClick,
        onKeyDown:stopMediaClick,
      }));
  }

  if (isVideo && poster && !inModal) {
    return createElement('div', { className:'reviews-card__media reviews-card__media--video' },
      createElement('img', {
        className:'reviews-card__image',
        src:poster,
        alt:'',
        loading:'lazy',
      }),
      createElement('span', { className:'reviews-card__play' },
        createElement(ReviewPlayIcon)));
  }

  if (isVideo && poster && inModal) {
    return createElement('div', { className:'reviews-card__media' },
      createElement('img', {
        className:'reviews-card__image',
        src:poster,
        alt:'',
      }));
  }

  if (review.imageUrl) {
    return createElement('div', { className:'reviews-card__media' },
      createElement('img', {
        className:'reviews-card__image',
        src:review.imageUrl,
        alt:'',
        loading:'lazy',
      }));
  }

  return null;
}

function ReviewPlatformBadge({ platform }) {
  const IconComp =
    platform === 'instagram' ? Social.instagram
    : platform === 'facebook' ? Social.facebook
    : null;

  return createElement('span', { className:'reviews-card__platform' },
    IconComp ? createElement(IconComp, { size:14 }) : null,
    reviewPlatformLabel(platform ?? 'other'));
}

function ReviewCardBody({ review, compact, inModal = false }) {
  const initial = review.n?.trim()?.charAt(0)?.toUpperCase() ?? '?';
  const isVideo = isVideoReview(review);
  const isSocial = !isVideo && (review.kind === 'social' || Boolean(review.imageUrl || review.platform));
  const textClass = compact && isSocial && !inModal
    ? 'reviews-card__text reviews-card__text--social'
    : inModal
      ? 'reviews-card__text reviews-card__text--modal'
      : 'reviews-card__text';

  if (isVideo) {
    return createElement(Fragment, null,
      createElement(ReviewMedia, { review, inModal }),
      createElement('footer', { className:'reviews-card__meta reviews-card__meta--video' },
        createElement('strong', { className:'reviews-card__name' }, review.n),
        review.c ? createElement('span', { className:'reviews-card__subtitle' }, review.c) : null,
        review.r
          ? createElement('div', { className:'reviews-card__stars' },
            createElement(Stars, { n:review.r, size:16, color:REVIEW_STAR_COLOR }))
          : null));
  }

  if (isSocial) {
    return createElement(Fragment, null,
      createElement('header', { className:'reviews-card__head' },
        review.avatarUrl
          ? createElement('img', {
            className:'reviews-card__avatar-img',
            src:review.avatarUrl,
            alt:'',
            loading:'lazy',
          })
          : createElement('div', { className:'reviews-card__avatar', 'aria-hidden':true }, initial),
        createElement('div', { className:'reviews-card__head-text' },
          createElement('strong', { className:'reviews-card__name' }, review.n),
          review.c ? createElement('span', { className:'reviews-card__subtitle' }, review.c) : null,
          createElement(ReviewPlatformBadge, { platform: review.platform ?? 'other' }))),
      createElement(ReviewMedia, { review, inModal }),
      createElement('blockquote', { className:textClass }, review.q),
      review.r
        ? createElement('div', { className:'reviews-card__stars' },
          createElement(Stars, { n:review.r, size:16, color:REVIEW_STAR_COLOR }))
        : null);
  }

  return createElement(Fragment, null,
    createElement('div', { className:'reviews-card__avatar', 'aria-hidden':true }, initial),
    createElement('div', { className:'reviews-card__stars' },
      createElement(Stars, { n:review.r, size:18, color:REVIEW_STAR_COLOR })),
    createElement('blockquote', { className:textClass }, review.q),
    createElement('footer', { className:'reviews-card__meta' },
      createElement('strong', { className:'reviews-card__name' }, review.n),
      review.c ? createElement('span', { className:'reviews-card__subtitle' }, review.c) : null));
}

function ReviewCard({ review, compact = true, onOpen }) {
  const isVideo = isVideoReview(review);
  const isSocial = !isVideo && (review.kind === 'social' || Boolean(review.imageUrl || review.platform));

  return createElement('article', {
    className:`reviews-card${isVideo ? ' reviews-card--video' : ''}${isSocial ? ' reviews-card--social' : ''}${onOpen ? ' reviews-card--clickable' : ''}`,
    onClick: onOpen,
    onKeyDown: onOpen
      ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }
      : undefined,
    role: onOpen ? 'button' : undefined,
    tabIndex: onOpen ? 0 : undefined,
    'aria-label': onOpen
      ? (isVideo && review.videoUrl ? `Play video review by ${review.n}` : `Open review by ${review.n}`)
      : undefined,
  },
    createElement(ReviewCardBody, { review, compact }));
}

function ReviewDetailModal({ review, onClose }) {
  if (!review) return null;

  return createElement(Modal, {
    isOpen: true,
    onClose,
    ariaLabel: `Review by ${review.n}`,
    showHeader: false,
    zIndex: Z_INDEX_TOKENS.modal,
    panelClassName: 'review-modal-panel w-full rounded-t-[24px] bg-white shadow-[0_-16px_48px_rgba(34,10,56,0.18)] md:mx-[20px] md:max-w-[560px] md:rounded-[var(--r-2xl)] md:shadow-2xl',
    innerClassName: 'review-modal__content',
    bodyClassName: 'relative flex min-h-0 flex-1 flex-col',
  }, (requestClose) => createElement(Fragment, null,
    createElement(ModalCloseOverlay, {
      onClose: requestClose,
      'aria-label': 'Close review',
      closeColors: {
        '--circular-close-bg': 'var(--cream)',
        '--circular-close-bg-hover': 'var(--brand-soft)',
      },
      iconClassName: 'text-[var(--plum-700)]',
    }),
    createElement('article', {
      className:`reviews-card${
        isVideoReview(review) ? ' reviews-card--video' : ''
      }${
        !isVideoReview(review) && (review.kind === 'social' || review.imageUrl || review.platform)
          ? ' reviews-card--social'
          : ''
      } reviews-card--modal`,
    },
      createElement(ReviewCardBody, { review, compact:false, inModal:true }))));
}

export function CustomersReviewsCarousel({ t }) {
  const reviews = t.customers.items;
  const cols = useReviewsColumns();
  const [position, setPosition] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const SWIPE_THRESHOLD = 48;
  const maxIndex = Math.max(0, reviews.length - cols);
  const loopPadding = cols;
  const canLoop = reviews.length > 0;

  const slides = useMemo(() => {
    if (!canLoop) return [];
    if (reviews.length <= loopPadding) {
      return [...reviews, ...reviews];
    }
    return [
      ...reviews.slice(-loopPadding),
      ...reviews,
      ...reviews.slice(0, loopPadding),
    ];
  }, [reviews, loopPadding, canLoop]);

  useEffect(() => {
    setPosition(loopPadding);
    setEnableTransition(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnableTransition(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [cols, reviews.length, loopPadding]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;

    const measure = () => {
      const width = el.clientWidth;
      const slideW = (width - REVIEWS_CAROUSEL_GAP * (cols - 1)) / cols;
      setSlideWidth(slideW);
      setStepPx(slideW + REVIEWS_CAROUSEL_GAP);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cols]);

  const logicalIndex = (() => {
    if (!canLoop) return 0;
    const raw = position - loopPadding;
    if (raw < 0) return maxIndex;
    if (raw > maxIndex) return 0;
    return raw;
  })();

  const settleLoop = () => {
    if (!canLoop || reviews.length <= loopPadding) {
      if (position >= reviews.length) {
        setEnableTransition(false);
        setPosition(position % reviews.length);
      } else if (position < 0) {
        setEnableTransition(false);
        setPosition(reviews.length + position);
      }
      return;
    }

    if (position > loopPadding + maxIndex) {
      setEnableTransition(false);
      setPosition(loopPadding);
    } else if (position < loopPadding) {
      setEnableTransition(false);
      setPosition(loopPadding + maxIndex);
    }
  };

  useEffect(() => {
    if (enableTransition) return undefined;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnableTransition(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [enableTransition, position]);

  const onTrackTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return;
    settleLoop();
  };

  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!canLoop || selectedReview) return;
    if (maxIndex < 1 && reviews.length <= loopPadding) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    timerRef.current = setInterval(() => {
      setPosition((p) => p + 1);
    }, REVIEWS_AUTO_MS);
  };

  useEffect(() => {
    startAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [maxIndex, selectedReview, cols, reviews.length, loopPadding]);

  useEffect(() => {
    if (!enableTransition) return;
    const track = trackRef.current;
    if (!track) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      settleLoop();
      return undefined;
    }
    const id = window.setTimeout(settleLoop, 600);
    return () => window.clearTimeout(id);
  }, [position, enableTransition]);

  const go = (delta) => {
    if (!canLoop) return;
    setPosition((p) => p + delta);
    startAuto();
  };

  const onCarouselTouchStart = (e) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const onCarouselTouchEnd = (e) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX == null) return;
    const endX = e.changedTouches[0]?.clientX;
    if (endX == null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    go(delta > 0 ? -1 : 1);
  };

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const showNav = canLoop && (maxIndex > 0 || reviews.length > loopPadding);

  return createElement(Fragment, null,
    createElement('section', { className:'section section--yellow', id:'reviews', style:{ paddingBottom:'clamp(var(--space-48), 6vw, var(--space-80))' } },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'center reveal section-intro' },
          createElement('div', { className:'eyebrow', style:{ color:'var(--plum-700)' } }, t.customers.eyebrow),
          createElement('h2', { className:'h2', style:{ margin:0, color:'var(--plum-800)' } }, t.customers.title)
        )
      ),
      createElement('div', { className:'reviews-carousel-outer reveal', style:{ marginTop:'var(--space-32)' } },
        createElement('div', {
          className:'reviews-carousel-wrap bleed-x',
          onTouchStart: onCarouselTouchStart,
          onTouchEnd: onCarouselTouchEnd,
        },
          createElement('div', { className:'reviews-carousel-shell' },
            showNav && createElement('button', {
              type:'button',
              className:'reviews-carousel-nav reviews-carousel-nav--prev',
              'aria-label':'Previous reviews',
              onClick:() => go(-1),
            },
              createElement('span', { className:'reviews-carousel-nav__icon' },
                createElement(Icon.arrow, { size:20, style:{ transform:'scaleX(-1)' } }))),
            createElement('div', {
              className:'reviews-carousel-viewport gutter-x',
              'aria-live':'polite',
            },
              createElement('div', {
                ref: viewportRef,
                className:'reviews-carousel-clip',
              },
                createElement('div', {
                  ref: trackRef,
                  className:'reviews-carousel-track',
                  onTransitionEnd: onTrackTransitionEnd,
                  style:{
                    gap:`${REVIEWS_CAROUSEL_GAP}px`,
                    transform: stepPx ? `translateX(-${position * stepPx}px)` : undefined,
                    transition: reducedMotion || !enableTransition ? 'none' : 'transform 0.55s var(--ease)',
                  },
                },
                  slides.map((review, slideIndex) => createElement('div', {
                    key:`${review.id ?? review.n}-${slideIndex}`,
                    className:'reviews-carousel-slide',
                    style: slideWidth ? { width: slideWidth, flex: `0 0 ${slideWidth}px` } : undefined,
                  },
                    createElement(ReviewCard, {
                      review,
                      compact:true,
                      onOpen:() => setSelectedReview(review),
                    })))))),
            showNav && createElement('button', {
              type:'button',
              className:'reviews-carousel-nav reviews-carousel-nav--next',
              'aria-label':'Next reviews',
              onClick:() => go(1),
            },
              createElement('span', { className:'reviews-carousel-nav__icon' },
                createElement(Icon.arrow, { size:20 })))
          )
        ),
        showNav && maxIndex > 0 && createElement('div', { className:'reviews-carousel-dots', role:'tablist', 'aria-label':'Review positions' },
          Array.from({ length: maxIndex + 1 }).map((_, i) => createElement('button', {
            key:i,
            type:'button',
            role:'tab',
            'aria-selected': i === logicalIndex,
            'aria-label': `Position ${i + 1}`,
            className:`reviews-carousel-dot${i === logicalIndex ? ' is-active' : ''}`,
            onClick:() => { setPosition(loopPadding + i); startAuto(); },
          })))
      )
    ),
    createElement(ReviewDetailModal, {
      review: selectedReview,
      onClose: () => setSelectedReview(null),
    }));
