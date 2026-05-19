"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, ArrowLeft, Phone, Mail, Star, Quote, Menu, X } from "lucide-react";

const WHATSAPP = "https://wa.me/919970803662";
const EMAIL = "mailto:veilorastudio2006@gmail.com";

const services = [
  { id: "01", title: "Web Development", desc: "Fast, responsive websites built with Next.js and Tailwind. From landing pages to full products.", rating: 9.4, tag: "NEXT.JS · REACT" },
  { id: "02", title: "UI / UX Design", desc: "User-first interfaces that convert. Wireframes, prototypes, and pixel-perfect Figma designs.", rating: 9.1, tag: "FIGMA · UX" },
  { id: "03", title: "Brand & Graphic Design", desc: "Logos, social kits, packaging, and full brand identities that stop the scroll.", rating: 9.6, tag: "CANVA · BRAND" },
  { id: "04", title: "Marketing Design", desc: "Ad creatives, campaign kits, and event posters designed to convert and captivate.", rating: 9.2, tag: "ADS · CAMPAIGNS" },
  { id: "05", title: "Social Media Management", desc: "Content calendars, reel templates, and consistent posting strategies that grow your audience.", rating: 9.0, tag: "REELS · CONTENT" },
  { id: "06", title: "Video Editing", desc: "Professional reels, shorts, and ad edits that engage and convert. Smooth cuts, on‑trend effects.", rating: 9.3, tag: "PREMIERE · CAPCUT" },
];

const works = [
  { title: "LuxeStore", category: "E-commerce UI", year: "2024", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80" },
  { title: "BrandBloom", category: "Brand Identity", year: "2024", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80" },
  { title: "GlowKit", category: "Social Media Kit", year: "2024", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80" },
  { title: "PulseSaaS", category: "Product Website", year: "2025", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" },
];

const reviews = [
  { name: "Nadia R.", role: "Fashion Boutique Owner", text: "She gave my brand a voice I never knew it had. Every single detail was intentional and on‑point.", project: "Brand Identity" },
  { name: "Arhan M.", role: "Digital Consultant", text: "I finally saw what my business could look like online. She delivered way beyond my expectations.", project: "Web Dev" },
  { name: "Zara K.", role: "E-commerce Brand", text: "Everyone sees us differently now — and that's exactly the point. Best investment I made.", project: "Marketing" },
  { name: "Sara F.", role: "Lifestyle Content Creator", text: "My reels finally have a consistent look. She understood my aesthetic immediately. 10/10.", project: "Social Media" },
  { name: "Omar T.", role: "SaaS Startup Founder", text: "From zero to a full product website in a week. Clean, fast, and exactly what we needed.", project: "Web Dev" },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("opacity-100", "!translate-y-0", "!translate-x-0");
              el.classList.remove("exit-up", "exiting");
            }, parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScrollExit() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-exit]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            el.classList.add("exit-up");
          } else if (entry.isIntersecting) {
            el.classList.remove("exit-up");
            el.style.animation = "none";
            el.offsetHeight;
            el.style.animation = "";
          }
        });
      },
      { threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Reveal({ children, delay = 0, direction = "bottom", className = "", exit = false }) {
  const translateMap = {
    left: "-translate-x-8",
    right: "translate-x-8",
    bottom: "translate-y-8",
    top: "-translate-y-8",
  };
  const initTranslate = translateMap[direction] || "translate-y-8";

  return (
    <div
      data-reveal
      data-delay={delay}
      data-exit={exit ? "true" : undefined}
      className={`${initTranslate} opacity-0 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export default function VelouraStudio() {
  useScrollReveal();
  useScrollExit();

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const nextReview = useCallback(() => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
    setProgress(0);
  }, []);

  const prevReview = useCallback(() => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isHovered) return;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { nextReview(); return 0; }
        return prev + 2;
      });
    }, 100);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, currentReview, nextReview]);

  const handleNavClick = () => setMenuOpen(false);

  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={12} className={i < stars ? "fill-[#C8A7FF] text-[#C8A7FF]" : "text-white/20"} />
    ));
  };

  const navLinks = ["Home", "Services", "Work", "Clients", "Contact"];

  return (
    <div className="bg-[#07060D] text-[#EEE9FF] font-['DM_Mono'] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;600;700;800&display=swap');

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right { animation: slideInRight 0.45s ease forwards; }

        @keyframes exitUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-25px); }
        }
        .exit-up { animation: exitUp 0.5s ease forwards !important; }

        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .drawer-open { animation: drawerIn 0.25s ease forwards; }

        /* ── HERO TITLE ── */
        .hero-title-block {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.05;
          font-size: clamp(22px, 6.5vw, 64px);
        }

        /*
          UNFORGETTABLE — its own block so it wraps safely.
          Slightly smaller clamp so on narrow screens it
          never overflows. word-break breaks mid-word only
          as a last resort.
        */
        .hero-unforgettable {
          display: block;
          color: #C8A7FF;
          font-style: italic;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.05;
          font-size: clamp(20px, 5.5vw, 64px);
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        /*
          CTA heading — LET'S BUILD / SOMETHING GREAT.
          Two separate spans, each display:block,
          so they never fight for space on one line.
        */
        .cta-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.0;
          font-size: clamp(28px, 7.5vw, 64px);
        }
        .cta-accent {
          display: block;
          color: #C8A7FF;
          font-style: italic;
          font-size: clamp(22px, 6vw, 64px);
          word-break: break-word;
          overflow-wrap: anywhere;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07060D]/85 backdrop-blur-xl border-b border-white/5">
        <div className="relative px-5 py-3.5 flex items-center justify-between">
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all z-10"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>

          <span className="font-['Syne'] font-bold text-sm tracking-widest absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0">
            VELOURA<span className="text-[#C8A7FF]">.</span>STUDIO
          </span>

          <div className="hidden md:flex gap-7">
            {navLinks.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-[10px] tracking-[0.16em] uppercase text-white/50 hover:text-[#C8A7FF] transition-colors">
                {item}
              </a>
            ))}
          </div>

          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#C8A7FF] text-[#07060D] text-[9px] font-medium tracking-[0.16em] uppercase px-4 py-2.5 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-200">
            Start a Project <ArrowRight size={11} />
          </a>

          <div className="md:hidden w-9 flex-shrink-0" />
        </div>

        {menuOpen && (
          <div className="drawer-open md:hidden bg-[#0C0A16]/97 backdrop-blur-2xl border-t border-white/5 px-6 py-5 flex flex-col">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={handleNavClick}
                className="text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-[#C8A7FF] transition-colors py-4 border-b border-white/[0.06] last:border-0">
                {item}
              </a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={handleNavClick}
              className="mt-5 inline-flex items-center justify-center gap-2 bg-[#C8A7FF] text-[#07060D] text-[10px] font-medium tracking-[0.16em] uppercase px-6 py-3.5 rounded-full transition-opacity hover:opacity-90">
              Start a Project <ArrowRight size={12} />
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-start overflow-hidden pt-20">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07060D]/60 via-transparent to-[#07060D] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_80%,rgba(200,167,255,0.07)_0%,transparent_70%)] z-10" />

        <div className="container relative z-20 w-full max-w-7xl mx-auto px-6 pt-12 pb-20">
          <Reveal delay={0}>
            <span className="inline-block text-[9px] tracking-[0.18em] uppercase text-[#C8A7FF]/80 border border-[#C8A7FF]/20 rounded-full px-3 py-1 mb-5">
              Creative Studio · Est. 2024
            </span>
          </Reveal>

          <Reveal delay={100}>
            {/*
              WHERE BRANDS + BECOME on one line via hero-title-block.
              UNFORGETTABLE. as its own display:block span below —
              never shares a line, never clips.
            */}
            <h1 className="hero-title-block mb-6">
              WHERE BRANDS<br />
              BECOME
              <span className="hero-unforgettable">UNFORGETTABLE.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[11px] tracking-[0.09em] text-white/50 max-w-md leading-relaxed mb-8 uppercase">
              Web Dev · UI/UX · Brand Identity · Marketing · Social Media · Video Editing. All under one roof.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C8A7FF] text-[#07060D] text-[10px] font-medium tracking-[0.16em] uppercase px-6 py-3.5 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-200">
                Start a Project <ArrowRight size={13} />
              </a>
              <a href="#work" className="inline-flex items-center gap-2 border border-white/15 text-white text-[10px] tracking-[0.16em] uppercase px-5 py-3 rounded-full hover:bg-white/5 transition">
                View Work
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex gap-10">
              {[["50+","Projects"],["3+","Years Exp."],["100%","Satisfaction"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-['Syne'] text-2xl sm:text-3xl font-bold text-[#C8A7FF]">{num}</div>
                  <div className="text-[9px] tracking-[0.2em] text-white/30 uppercase mt-1">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-t border-b border-white/5 py-3.5 bg-white/[0.02] overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-flex">
          {Array(8).fill("WEB DEVELOPMENT · UI/UX DESIGN · BRAND IDENTITY · MARKETING DESIGN · SOCIAL MEDIA · VIDEO EDITING ·  ").map((t, i) => (
            <span key={i} className="text-[10px] tracking-[0.22em] text-white/20">{t}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="relative overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-25"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07060D] via-[#07060D]/80 to-transparent z-10" />

        <div className="container relative z-20 max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row justify-between gap-10">
          <Reveal className="max-w-xl">
            <span className="inline-block text-[9px] tracking-[0.18em] uppercase text-[#C8A7FF]/80 border border-[#C8A7FF]/20 rounded-full px-3 py-1 mb-4">About Veloura</span>
            <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-5">
              WELCOME TO<br /><span className="text-[#C8A7FF]">VELOURA STUDIO</span>
            </h2>
            <p className="text-[11px] tracking-[0.07em] text-white/50 leading-relaxed uppercase">
              A creative studio where design meets strategy. We build websites, craft identities, and create visuals that don't just look good — they work hard for your brand.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <div className="text-[9px] tracking-[0.25em] text-white/30 uppercase mb-4">Our Promise</div>
              {["Pixel-perfect execution","On-time delivery","Strategy-driven design","Unlimited revisions"].map((item) => (
                <div key={item} className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A7FF] flex-shrink-0" />
                  <span className="text-[11px] tracking-[0.1em] uppercase text-white/60">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* ── SERVICES ── */}
      <section id="services" className="relative py-24 bg-[#07060D] bg-[radial-gradient(ellipse_at_30%_30%,rgba(200,167,255,0.06)_0%,transparent_70%)]">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
            <Reveal>
              <span className="inline-block text-[9px] tracking-[0.18em] uppercase text-[#C8A7FF]/80 border border-[#C8A7FF]/20 rounded-full px-3 py-1 mb-2">What We Do</span>
              <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight">
                OUR<br /><span className="text-[#C8A7FF]">SERVICES</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-right group block">
                <div className="font-['Syne'] text-xl font-bold">GET</div>
                <div className="text-[9px] tracking-[0.2em] uppercase">A QUOTE</div>
                <div className="h-0.5 bg-[#C8A7FF] mt-1.5 rounded-full w-full" />
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const direction = i % 2 === 0 ? "left" : "right";
              return (
                <Reveal key={s.id} delay={i * 80} direction={direction} exit={true} className="h-full">
                  <div className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-6 h-full transition-all duration-300 hover:border-[#C8A7FF]/30 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] tracking-[0.26em] text-[#C8A7FF]/50 uppercase">{s.id}</span>
                      <span className="text-[8px] tracking-[0.18em] uppercase text-[#C8A7FF]/70 border border-[#C8A7FF]/20 rounded-full px-2.5 py-1">{s.tag}</span>
                    </div>
                    <h3 className="font-['Syne'] text-xl font-bold mb-3 leading-tight">{s.title}</h3>
                    <p className="text-[11px] tracking-[0.05em] text-white/40 leading-relaxed uppercase mb-6">{s.desc}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div>
                        <div className="text-[8px] tracking-[0.2em] text-white/20 uppercase mb-1">Rating</div>
                        <div className="flex items-center gap-1.5">
                          <div className="flex">{renderStars(s.rating)}</div>
                          <span className="font-['Syne'] text-lg font-bold text-[#C8A7FF] ml-1">{s.rating}</span>
                        </div>
                      </div>
                      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A7FF] to-purple-600 flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0">
                        <ArrowRight size={14} className="text-[#07060D]" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* ── WORK ── */}
      <section id="work" className="py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <Reveal>
            <span className="inline-block text-[9px] tracking-[0.18em] uppercase text-[#C8A7FF]/80 border border-[#C8A7FF]/20 rounded-full px-3 py-1 mb-3">Portfolio</span>
            <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-10">
              SELECTED<br /><span className="text-[#C8A7FF]">WORK</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {works.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                <div className="group relative rounded-2xl overflow-hidden border border-white/5 aspect-[4/3] hover:scale-[1.03] transition-all duration-300 hover:shadow-2xl hover:shadow-black/50">
                  <img src={w.image} alt={w.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent p-5 flex flex-col justify-end">
                    <span className="self-start text-[8px] tracking-[0.18em] uppercase text-[#C8A7FF]/80 border border-[#C8A7FF]/20 rounded-full px-2.5 py-1 mb-2">{w.category}</span>
                    <h3 className="font-['Syne'] text-lg font-bold">{w.title}</h3>
                    <span className="text-[9px] tracking-[0.2em] text-white/40 uppercase mt-1">{w.year}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* ── REVIEWS ── */}
      <section id="clients" className="py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <Reveal>
            <span className="inline-block text-[9px] tracking-[0.18em] uppercase text-[#C8A7FF]/80 border border-[#C8A7FF]/20 rounded-full px-3 py-1 mb-3">Client Love</span>
            <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-12">
              YOU HAD THE VISION.<br />
              <span className="text-[#C8A7FF]">WE MADE IT VISIBLE.</span>
            </h2>
          </Reveal>

          <div className="flex flex-col items-center justify-center gap-6">
            <div
              className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button onClick={prevReview}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-[#C8A7FF]/50 hover:bg-white/5 transition-all flex-shrink-0"
                aria-label="Previous review">
                <ArrowLeft size={15} />
              </button>

              <div className="flex-1 relative min-w-0">
                <div key={currentReview} className="slide-in-right bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 relative">
                  <Quote size={28} className="text-[#C8A7FF] mb-4" fill="currentColor" />
                  <p className="text-sm italic text-white/70 leading-relaxed mb-6 min-h-[72px]">
                    {reviews[currentReview].text}
                  </p>
                  <div className="w-full h-px bg-white/5 mb-5" />
                  <div className="flex justify-between items-end flex-wrap gap-3">
                    <div>
                      <p className="font-['Syne'] font-semibold text-sm">{reviews[currentReview].name}</p>
                      <p className="text-[9px] tracking-[0.14em] text-white/30 uppercase mt-1">{reviews[currentReview].role}</p>
                    </div>
                    <span className="text-[8px] tracking-[0.18em] uppercase text-[#C8A7FF]/70 border border-[#C8A7FF]/20 rounded-full px-2.5 py-1">
                      {reviews[currentReview].project}
                    </span>
                  </div>
                </div>
                <div className="h-0.5 w-full bg-white/5 mt-4 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8A7FF] rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <button onClick={nextReview}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-[#C8A7FF]/50 hover:bg-white/5 transition-all flex-shrink-0"
                aria-label="Next review">
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              {reviews.map((_, idx) => (
                <button key={idx}
                  onClick={() => { setCurrentReview(idx); setProgress(0); }}
                  className={`rounded-full transition-all duration-300 ${idx === currentReview ? "bg-[#C8A7FF] w-5 h-2" : "bg-white/20 w-2 h-2"}`}
                  aria-label={`Review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-[#07060D]/60 to-[#07060D] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(200,167,255,0.08)_0%,transparent_70%)] z-10" />

        <div className="container relative z-20 max-w-7xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <span className="inline-block text-[9px] tracking-[0.18em] uppercase text-[#C8A7FF]/80 border border-[#C8A7FF]/20 rounded-full px-3 py-1 mb-5">Ready to Start?</span>

            {/*
              LET'S BUILD on its own line via cta-title.
              SOMETHING GREAT. as cta-accent (display:block) below —
              smaller clamp, never clips on any screen.
            */}
            <h2 className="cta-title mb-5">
              LET'S BUILD
              <span className="cta-accent">SOMETHING GREAT.</span>
            </h2>

            <p className="text-[10px] tracking-[0.1em] text-white/30 uppercase mb-8 max-w-sm mx-auto">
              Drop us a message — we respond within a few hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C8A7FF] text-[#07060D] text-[10px] font-medium tracking-[0.16em] uppercase px-6 py-3.5 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-purple-400/30 transition-all">
                <Phone size={13} /> WhatsApp Us
              </a>
              <a href={EMAIL}
                className="inline-flex items-center gap-2 border border-white/15 text-white text-[10px] tracking-[0.16em] uppercase px-5 py-3 rounded-full hover:bg-white/5 transition">
                <Mail size={13} /> Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-7 px-6">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <span className="font-['Syne'] font-bold text-sm tracking-widest">
            VELOURA<span className="text-[#C8A7FF]">.</span>STUDIO
          </span>
          <span className="text-[9px] tracking-[0.16em] text-white/25 uppercase">© 2024 · All Rights Reserved</span>
          <div className="flex gap-5">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="text-[9px] tracking-[0.16em] text-white/30 uppercase hover:text-[#C8A7FF] transition">WhatsApp</a>
            <a href={EMAIL}
              className="text-[9px] tracking-[0.16em] text-white/30 uppercase hover:text-[#C8A7FF] transition">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}