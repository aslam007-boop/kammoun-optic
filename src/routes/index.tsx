import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram, Facebook, MapPin, Phone, Clock, MessageCircle, Eye, Ruler, Wrench, HeartHandshake, Star, Menu, X, ScanFace, ArrowRight, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import logo from "@/assets/kammoun-optic-logo.jpg.asset.json";
import imgVue from "@/assets/collection-vue.jpg";
import imgSol from "@/assets/collection-solaires.jpg";
import imgLen from "@/assets/collection-lentilles.jpg";
import imgEssai from "@/assets/essayage.jpg";
import pClassique from "@/assets/lunettes-classique.webp.asset.json";
import pTitane from "@/assets/lunettes-titane.webp.asset.json";
import pAcetate from "@/assets/lunettes-acetate.webp.asset.json";
import { AuroraBackground, BlurText, ShimmerButton, AnimatedTooltip, Counter, useSmoothScroll } from "@/components/effects";

const TITLE = "Kammoun Optic (OKO) — Opticien à Sfax";
const DESC = "Lunettes de vue, solaires et lentilles chez Kammoun Optic, Immeuble Donia, Avenue du 14 Janvier, Sfax. Votre vision, notre priorité.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const IG = "https://www.instagram.com/kammounopticoko";
const FB = "https://www.facebook.com/KammounOpticoko";
const WA = "https://wa.me/21622978655";
const TEL = "tel:+21622978655";
const PHONE = "22 978 655";
const categories = [
  ["Lunettes de vue", "#catalogue"], ["Lunettes solaires", "#collections"], ["Lentilles de contact", "#collections"],
] as const;
const links = [
  ["Accueil", "#accueil"], ["Collections", "#collections"], ["Services", "#services"],
  ["Essayage", "#essayage"], ["Avis", "#avis"], ["Contact", "#contact"],
] as const;

function Logo({ className = "h-10" }: { className?: string }) {
  return <img src={logo.url} alt="Kammoun Optic" className={`${className} w-auto rounded-md object-contain`} />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-navy/70 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3">
        <a href="#accueil"><Logo /></a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([l, h]) =>
            h === "#collections" ? (
              <div key={h} className="group relative">
                <button className="flex items-center gap-1 text-sm text-cream/80 transition-colors hover:text-gold">
                  {l} <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="w-56 rounded-xl border border-gold/30 bg-navy p-2 shadow-2xl">
                    {categories.map(([cl, ch]) => (
                      <a key={cl} href={ch} className="block rounded-lg px-4 py-2.5 text-sm text-cream/85 hover:bg-gold/10 hover:text-gold">{cl}</a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={h} href={h} className="text-sm text-cream/80 transition-colors hover:text-gold">{l}</a>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href={TEL} className="flex items-center gap-2 text-sm text-cream/85 hover:text-gold"><Phone size={16} className="text-gold" />{PHONE}</a>
          <ShimmerButton href={WA} className="px-5 py-2.5">Prendre rendez-vous</ShimmerButton>
        </div>
        <button className="text-cream lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto border-t border-gold/15 bg-navy px-5 py-6 lg:hidden">
          {links.map(([l, h]) =>
            h === "#collections" ? (
              <div key={h}>
                <button onClick={() => setSub(!sub)} aria-expanded={sub} className="flex w-full items-center justify-between text-cream/90">
                  {l} <ChevronDown size={16} className={`transition-transform ${sub ? "rotate-180" : ""}`} />
                </button>
                {sub && (
                  <div className="mt-3 flex flex-col gap-3 border-l border-gold/30 pl-4">
                    {categories.map(([cl, ch]) => (
                      <a key={cl} href={ch} onClick={() => setOpen(false)} className="text-sm text-cream/75">{cl}</a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a key={h} href={h} onClick={() => setOpen(false)} className="text-cream/90">{l}</a>
            ),
          )}
          <a href={TEL} className="flex items-center gap-2 text-gold"><Phone size={18} /> {PHONE}</a>
          <a href={WA} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gold"><MessageCircle size={18} /> Prendre rendez-vous</a>
        </nav>
      )}
    </header>
  );
}

const products = [
  { id: "classique-elegant", name: "Modèle Classique Élégant", brand: "Marque à venir", price: "— DT", image: pClassique.url },
  { id: "moderne-titane", name: "Modèle Moderne Titane", brand: "Marque à venir", price: "— DT", image: pTitane.url },
  { id: "acetate-premium", name: "Modèle Acétate Premium", brand: "Marque à venir", price: "— DT", image: pAcetate.url },
];

function Catalogue() {
  return (
    <section id="catalogue" className="relative bg-navy px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Catalogue" title="Lunettes de vue" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((p) => (
            <article key={p.id} className="product-card group flex flex-col overflow-hidden rounded-2xl border border-gold/25 bg-cream/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold/70 hover:shadow-[0_0_40px_-8px_var(--gold)]">
              <div className="aspect-square overflow-hidden bg-cream">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">{p.brand}</p>
                <h3 className="mt-2 text-2xl text-cream">{p.name}</h3>
                <p className="mt-1 font-display text-lg text-cream/70">{p.price}</p>
                <a
                  href={`${WA}?text=${encodeURIComponent(`Bonjour, je suis intéressé par ${p.name}`)}`}
                  target="_blank" rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
                >
                  <MessageCircle size={16} /> Demander ce modèle
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="accueil">
      <AuroraBackground>
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center">
          <div className="hero-in mb-8 rounded-2xl border border-gold/25 p-2"><Logo className="h-20 sm:h-24" /></div>
          <p className="hero-in mb-5 text-xs uppercase tracking-[0.35em] text-gold">Votre vision, notre priorité</p>
          <BlurText text="Voyez le monde autrement" className="text-5xl font-medium leading-[1.05] text-cream sm:text-7xl md:text-8xl" />
          <p className="hero-in mt-6 max-w-xl text-base text-cream/70 sm:text-lg">
            Opticien expert — Immeuble Donia, Avenue du 14 Janvier, Sfax
          </p>
          <div className="hero-in mt-10 flex flex-col gap-4 sm:flex-row">
            <ShimmerButton href="#catalogue">Découvrir la collection <ArrowRight size={16} /></ShimmerButton>
            <ShimmerButton href={WA} variant="outline">Prendre rendez-vous</ShimmerButton>
          </div>
          <a href="#collections" aria-label="Défiler" className="hero-in mt-16 flex flex-col items-center gap-2 text-cream/50">
            <span className="flex h-10 w-6 justify-center rounded-full border border-gold/40 pt-2">
              <span className="h-2 w-1 rounded-full bg-gold [animation:scrolldot_1.6s_ease-out_infinite]" />
            </span>
            <ChevronDown size={14} />
          </a>
        </div>
      </AuroraBackground>
    </section>
  );
}

function Marquee() {
  const t = "Lunettes de vue • Solaires • Lentilles • Grandes marques • ";
  return (
    <div className="overflow-hidden border-y border-gold/30 bg-gold py-4 text-navy">
      <div className="animate-marquee flex w-max whitespace-nowrap font-display text-xl italic sm:text-2xl">
        {Array.from({ length: 8 }).map((_, i) => <span key={i} className="px-2">{t}</span>)}
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title, dark = true }: { kicker: string; title: string; dark?: boolean }) {
  return (
    <div className="reveal mb-14 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">{kicker}</p>
      <h2 className={`text-4xl sm:text-5xl ${dark ? "text-cream" : "text-navy"}`}>{title}</h2>
    </div>
  );
}

function Collections() {
  const items = [
    { t: "Lunettes de vue", d: "Montures raffinées, verres de haute précision.", img: imgVue },
    { t: "Solaires", d: "Protection UV et élégance signée grandes marques.", img: imgSol },
    { t: "Lentilles de contact", d: "Confort au quotidien, adaptation sur mesure.", img: imgLen },
  ];
  return (
    <section id="collections" className="relative bg-cream px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Collections" title="L'art de bien voir" dark={false} />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((c) => (
            <article key={c.t} className="reveal group overflow-hidden rounded-2xl border border-gold/30 bg-navy shadow-xl transition-transform duration-500 hover:-translate-y-3">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={c.img} alt={c.t} loading="lazy" width={896} height={1152} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-7">
                <h3 className="text-2xl text-cream">{c.t}</h3>
                <p className="mt-2 text-sm text-cream/70">{c.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Essayage() {
  return (
    <section id="essayage" className="relative overflow-hidden bg-navy px-5 py-28">
      <div className="dot-pattern absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="reveal">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">Essayage virtuel</p>
          <h2 className="text-4xl text-cream sm:text-5xl">Essayez avant de choisir</h2>
          <p className="mt-6 text-lg text-cream/75">
            Essayez vos montures avant d'acheter grâce à notre essayage virtuel en magasin. Comparez les styles,
            visualisez le rendu sur votre visage et choisissez en toute confiance.
          </p>
          <ul className="mt-8 space-y-3 text-cream/85">
            {["Scan du visage en quelques secondes", "Des centaines de montures à comparer", "Conseils personnalisés de nos opticiens"].map((x) => (
              <li key={x} className="flex items-center gap-3"><ScanFace className="text-gold" size={20} />{x}</li>
            ))}
          </ul>
          <div className="mt-10"><ShimmerButton href={WA}>Réserver un essayage</ShimmerButton></div>
        </div>
        <div className="reveal parallax relative">
          <div className="absolute -inset-4 rounded-3xl bg-gold/20 blur-3xl" />
          <img src={imgEssai} alt="Essayage virtuel en magasin" loading="lazy" width={1280} height={960} className="relative rounded-2xl border border-gold/30 shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

function Services() {
  const s = [
    { i: Eye, t: "Examen de vue", tip: "Bilan visuel complet", d: "Un contrôle précis de votre acuité visuelle." },
    { i: Ruler, t: "Ajustement personnalisé", tip: "Confort sur mesure", d: "Des montures ajustées à la morphologie de votre visage." },
    { i: Wrench, t: "Réparation de montures", tip: "Rapide et soigné", d: "Vis, plaquettes, branches : nous redonnons vie à vos lunettes." },
    { i: HeartHandshake, t: "Suivi client", tip: "À vos côtés", d: "Un accompagnement attentif, avant comme après l'achat." },
  ];
  return (
    <section id="services" className="bg-cream px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Services" title="Une expertise à votre service" dark={false} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.map(({ i: Icon, t, tip, d }) => (
            <AnimatedTooltip key={t} label={tip}>
              <div className="reveal h-full rounded-2xl border border-gold/30 bg-navy p-8 transition-transform duration-500 hover:-translate-y-2">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold"><Icon size={24} /></div>
                <h3 className="text-xl text-cream">{t}</h3>
                <p className="mt-3 text-sm text-cream/70">{d}</p>
              </div>
            </AnimatedTooltip>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-gold/20 bg-navy-soft px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 text-center md:grid-cols-3">
        <div className="reveal"><p className="font-display text-5xl text-gold"><Counter to={9400} suffix="+" /></p><p className="mt-2 text-cream/70">abonnés Facebook</p></div>
        <div className="reveal"><p className="font-display text-5xl text-gold"><Counter to={14} /></p><p className="mt-2 text-cream/70">Avenue du 14 Janvier</p></div>
        <div className="reveal"><p className="font-display text-5xl text-gold"><Counter to={100} suffix="%" /></p><p className="mt-2 text-cream/70">engagement qualité</p></div>
      </div>
    </section>
  );
}

function Avis() {
  const a = [
    { n: "Sarra B.", t: "Accueil chaleureux et conseils précieux. J'ai trouvé la monture parfaite grâce à l'essayage virtuel !" },
    { n: "Mohamed K.", t: "Un vrai professionnel. Examen minutieux, lunettes prêtes rapidement et parfaitement ajustées." },
    { n: "Ines T.", t: "Très beau choix de solaires de grandes marques. Service après-vente impeccable, je recommande." },
  ];
  return (
    <section id="avis" className="relative overflow-hidden bg-navy px-5 py-28">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle kicker="Avis clients" title="Ils nous font confiance" />
        <div className="grid gap-6 md:grid-cols-3">
          {a.map((x) => (
            <figure key={x.n} className="reveal rounded-2xl border border-gold/25 bg-cream/5 p-8 backdrop-blur-md">
              <div className="mb-4 flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <blockquote className="text-cream/85">« {x.t} »</blockquote>
              <figcaption className="mt-6 font-display text-gold">{x.n}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Merci ! Nous vous recontactons très vite.");
    e.currentTarget.reset();
  };
  const field = "w-full rounded-xl border border-gold/30 bg-cream px-4 py-3 text-navy placeholder:text-navy/50 focus:outline-none focus:ring-2 focus:ring-gold";
  return (
    <section id="contact" className="bg-cream px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Contact" title="Venez nous rendre visite" dark={false} />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="reveal space-y-5 rounded-2xl border border-gold/30 bg-navy p-8 text-cream">
            <p className="flex gap-3"><MapPin className="shrink-0 text-gold" />Immeuble Donia, Avenue du 14 Janvier, Sfax 3027, Tunisie</p>
            <a href={TEL} className="flex gap-3 hover:text-gold"><Phone className="shrink-0 text-gold" />{PHONE}</a>
            <div className="flex gap-3"><Clock className="shrink-0 text-gold" /><div><p>Lundi – Samedi : 09h00 – 19h00</p><p className="text-cream/60">Dimanche : fermé</p></div></div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={IG} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm hover:bg-gold/10"><Instagram size={16} /> Instagram</a>
              <a href={FB} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm hover:bg-gold/10"><Facebook size={16} /> Facebook</a>
              <ShimmerButton href={WA} className="px-5 py-2"><MessageCircle size={16} /> WhatsApp</ShimmerButton>
            </div>
            <iframe title="Carte Kammoun Optic" src="https://www.google.com/maps?q=PQQ3%2BX7M+Sfax&output=embed" className="mt-4 h-64 w-full rounded-xl border border-gold/30" loading="lazy" />
          </div>
          <form onSubmit={submit} className="reveal space-y-5 rounded-2xl border border-gold/30 bg-card/0 p-8">
            <h3 className="text-3xl text-navy">Prendre rendez-vous</h3>
            <input required name="nom" placeholder="Nom" className={field} />
            <input required name="tel" type="tel" placeholder="Téléphone" className={field} />
            <textarea required name="message" rows={6} placeholder="Votre message" className={field} />
            <button type="submit" className="w-full rounded-full bg-navy px-6 py-4 font-semibold text-gold transition-colors hover:bg-navy-soft">Envoyer</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-navy px-5 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <Logo className="h-12" />
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map(([l, h]) => <a key={h} href={h} className="text-sm text-cream/70 hover:text-gold">{l}</a>)}
        </nav>
        <div className="flex gap-4 text-cream/80">
          <a href={FB} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold"><Facebook /></a>
          <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold"><Instagram /></a>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-cream/50">© 2026 KAMMOUN OPTIC — Sfax. Immeuble Donia, Av. du 14 Janvier.</p>
    </footer>
  );
}

function Index() {
  useSmoothScroll();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-in", { y: 30, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.6 });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.from(".product-card", {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: "#catalogue", start: "top 75%" },
      });
      gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
        gsap.to(el, { yPercent: -10, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <main className="bg-navy">
      <Navbar />
      <Hero />
      <Marquee />
      <Catalogue />
      <Collections />
      <Essayage />
      <Services />
      <Stats />
      <Avis />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
}
