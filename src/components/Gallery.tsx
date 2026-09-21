import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Download, Expand, X } from "lucide-react";

interface GalleryProps {
  images: string[];
  alt: string;
}

export default function Gallery({ images, alt }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (child) {
      container.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev === 0 ? images.length - 1 : prev - 1;
      scrollToIndex(next);
      return next;
    });
  }, [images.length, scrollToIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev === images.length - 1 ? 0 : prev + 1;
      scrollToIndex(next);
      return next;
    });
  }, [images.length, scrollToIndex]);

  // Track scroll position to update currentIndex
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const dist = Math.abs(containerCenter - childCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setCurrentIndex(closest);
  };

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, goPrev, goNext]);

  if (images.length === 0) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/60">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60">
          <Expand className="h-8 w-8 text-slate-300" />
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <>
        <div className="group relative h-[420px] overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={images[0]}
            alt={alt}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute right-3 top-3 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <a
              href={images[0]}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-soft backdrop-blur-md hover:bg-white"
            >
              <Download className="h-3.5 w-3.5" />
              Baixar
            </a>
            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-soft backdrop-blur-md hover:bg-white"
            >
              <Expand className="h-3.5 w-3.5" />
              Ampliar
            </button>
          </div>
        </div>
        {lightboxOpen && (
          <Lightbox
            images={images}
            alt={alt}
            currentIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        {/* Main scrollable gallery */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="gallery-scroll flex h-[420px] snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 snap-center bg-slate-100"
              style={{ width: "100%" }}
            >
              <img
                src={img}
                alt={`${alt} — imagem ${i + 1}`}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Nav arrows */}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-soft backdrop-blur-md transition-all hover:bg-white hover:scale-105"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-soft backdrop-blur-md transition-all hover:bg-white hover:scale-105"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Counter + expand */}
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5">
          <span className="text-xs font-medium text-slate-500">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={images[currentIndex]}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-globo-600 transition-colors hover:text-globo-700"
            >
              <Download className="h-3.5 w-3.5" />
              Baixar
            </a>
            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-globo-600 transition-colors hover:text-globo-700"
            >
              <Expand className="h-3.5 w-3.5" />
              Ampliar
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-slate-100 p-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  scrollToIndex(i);
                }}
                className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                  i === currentIndex
                    ? "border-globo-500 ring-2 ring-globo-500/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumb ${i + 1}`}
                  className="h-12 w-16 object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          alt={alt}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}

interface LightboxProps {
  images: string[];
  alt: string;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({
  images,
  alt,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
        aria-label="Próxima"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <img
        src={images[currentIndex]}
        alt={`${alt} — imagem ${currentIndex + 1}`}
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
        {currentIndex + 1} / {images.length}
      </span>
    </div>
  );
}
