import { useState, useEffect, useRef, useCallback } from "react";
import img1 from "../../imports/gallery___1_.jpg";
import img2 from "../../imports/gallery___2_.jpg";
import img3 from "../../imports/gallery___3_.jpg";
import img4 from "../../imports/gallery___5_.jpg";
import img5 from "../../imports/gallery___6_.jpg";

const images = [
  { src: img3, alt: "Gallery 1" },
  { src: img2, alt: "Gallery 2" },
  { src: img1, alt: "Gallery 3" },
  { src: img4, alt: "Gallery 4" },
  { src: img5, alt: "Gallery 5" },
];

const extended = [images[images.length - 1], ...images, images[0]];
const total = extended.length;

export default function GallerySection() {
  const [index, setIndex] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);

  const realIndex = index === 0 ? images.length - 1 : index === total - 1 ? 0 : index - 1;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimated(true);
      setIndex(prev => prev + 1);
    }, 10000);
  }, []);

  const handleTransitionEnd = () => {
    if (index === 0) { setAnimated(false); setIndex(images.length); }
    else if (index === total - 1) { setAnimated(false); setIndex(1); }
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handleNav = (i: number) => {
    setAnimated(true);
    setIndex(i);
    resetTimer();
  };

  const isDraggingRef = useRef(false);

  // Drag handlers — unified for mouse and touch
  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
    setAnimated(false);
  };

  const onDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    const width = trackRef.current?.offsetWidth ?? 1;
    const delta = clientX - dragStartX.current;
    setDragOffset(delta / width * 100);
  }, []);

  const onDragEnd = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    const width = trackRef.current?.offsetWidth ?? 1;
    const delta = clientX - dragStartX.current;
    const threshold = width * 0.2;

    isDraggingRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    setAnimated(true);

    if (delta < -threshold) {
      setIndex(prev => prev + 1);
    } else if (delta > threshold) {
      setIndex(prev => prev - 1);
    }
    resetTimer();
  }, [resetTimer]);

  // Нативные touch-обработчики с passive:false чтобы preventDefault работал
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      onDragStart(e.touches[0].clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      onDragMove(e.touches[0].clientX);
    };
    const onTouchEnd = (e: TouchEvent) => {
      onDragEnd(e.changedTouches[0].clientX);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onDragMove, onDragEnd]);

  return (
    <div className="bg-[#1a0a2e] relative shrink-0 w-full section-spacing-y section-spacing-x flex justify-center">
      <div className="flex flex-col items-center rounded-[inherit] size-full maxWidth">
        <div className="content-stretch flex flex-col gap-[24px] items-center relative size-full">

          {/* Slides */}
          <div
            ref={trackRef}
            className="relative w-full overflow-hidden rounded-[12px] cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: "pan-y" }}
            onMouseDown={e => onDragStart(e.clientX)}
            onMouseMove={e => onDragMove(e.clientX)}
            onMouseUp={e => onDragEnd(e.clientX)}
            onMouseLeave={e => isDragging && onDragEnd(e.clientX)}
          >
            <div
              className={[
                'flex w-full',
                animated && !isDragging ? 'transition-transform duration-500 ease-in-out' : '',
              ].join(' ')}
              style={{ transform: `translateX(calc(-${index * 100}% + ${dragOffset}%))` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extended.map((img, i) => (
                <div key={i} className="aspect-[16/9] min-w-full shrink-0 basis-full">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover block pointer-events-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Prev / Next arrows */}
            <button
              type="button"
              onMouseDown={e => e.stopPropagation()}
              onClick={() => handleNav(index - 1)}
              className="group absolute left-0 top-0 bottom-0 w-[80px] flex items-center justify-start pl-[12px] cursor-pointer"
              aria-label="Previous"
            >
              <div className="bg-white/20 group-hover:bg-white/40 transition-colors rounded-full w-[40px] h-[40px] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            <button
              type="button"
              onMouseDown={e => e.stopPropagation()}
              onClick={() => handleNav(index + 1)}
              className="group absolute right-0 top-0 bottom-0 w-[80px] flex items-center justify-end pr-[12px] cursor-pointer"
              aria-label="Next"
            >
              <div className="bg-white/20 group-hover:bg-white/40 transition-colors rounded-full w-[40px] h-[40px] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-[8px] items-center">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => handleNav(i + 1)}
                className={`rounded-full transition-all duration-300 ${i === realIndex ? "bg-[#9A38EF] w-[32px] h-[12px]" : "bg-white/40 w-[12px] h-[12px]"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
