import { useEffect, useRef, useState, type ReactNode } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Reveals children once they scroll into view. Static when reduced motion is on. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref as never}
      className={`rise-in ${className}`}
      data-visible={visible ? "true" : "false"}
      style={reduced ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * Parallax layer. Uses translate3d only (compositor thread) and bails out
 * entirely under prefers-reduced-motion, rendering a static, fully visible layer.
 */
export function ParallaxLayer({
  speed = 0.3,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translate3d(0, ${(progress * speed * -100).toFixed(2)}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: reduced ? undefined : "transform" }}>
      {children}
    </div>
  );
}

/** Kolam divider — draws once on scroll-into-view, static under reduced motion. */
export function KolamDivider({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const dots = [40, 100, 160, 220, 280];

  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg
        ref={ref}
        viewBox="0 0 320 48"
        width="320"
        height="48"
        fill="none"
        className="max-w-full text-gold"
      >
        <path
          d="M8 24 H40 M280 24 H312 M40 24 c10 -18 30 -18 40 0 c10 18 30 18 40 0 c10 -18 30 -18 40 0 c10 18 30 18 40 0 c10 -18 30 -18 40 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 460,
            strokeDashoffset: drawn ? 0 : 460,
            transition: reduced ? undefined : "stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {dots.map((cx, i) => (
          <circle
            key={cx}
            cx={cx}
            cy={24}
            r="2.5"
            fill="currentColor"
            style={{
              opacity: drawn ? 1 : 0,
              transform: drawn ? "scale(1)" : "scale(0.9)",
              transformOrigin: `${cx}px 24px`,
              transition: reduced
                ? undefined
                : `opacity 200ms ease-out ${700 + i * 40}ms, transform 200ms ease-out ${700 + i * 40}ms`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
