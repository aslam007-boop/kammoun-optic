import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      e.preventDefault();
      lenis.scrollTo(a.getAttribute("href")!, { offset: -72 });
    };
    document.addEventListener("click", onClick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);
}

export function AuroraBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-aurora absolute -left-1/4 -top-1/4 h-[70vh] w-[70vw] rounded-full bg-gold/20 blur-[120px]" />
        <div className="animate-aurora absolute -bottom-1/4 right-[-10%] h-[60vh] w-[60vw] rounded-full bg-navy-soft blur-[100px] [animation-delay:-7s]" />
        <div className="animate-aurora absolute left-1/3 top-1/3 h-[40vh] w-[40vw] rounded-full bg-gold-glow/10 blur-[110px] [animation-delay:-3s]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function BlurText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const words = ref.current?.querySelectorAll("span");
    if (!words) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      words,
      { opacity: 0, y: 40, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.2 },
    );
  }, []);
  return (
    <h1 ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block">
          {w}
        </span>
      ))}
    </h1>
  );
}

export function ShimmerButton({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  const base =
    variant === "gold"
      ? "bg-gold text-navy shadow-[0_10px_40px_-10px_var(--gold)]"
      : "border border-gold/50 text-cream hover:bg-gold/10";
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors ${base} ${className}`}
    >
      {variant === "gold" && (
        <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-cream/40 blur-sm [animation:shimmer_2.8s_ease-in-out_infinite]" />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
}

export function AnimatedTooltip({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div
        className={`pointer-events-none absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-gold/40 bg-navy px-3 py-1.5 text-xs text-gold transition-all duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: to,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.round(obj.v).toLocaleString("fr-FR") + suffix;
          },
        }),
    });
    return () => st.kill();
  }, [to, suffix]);
  return <span ref={ref}>{to.toLocaleString("fr-FR") + suffix}</span>;
}
