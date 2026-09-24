import React, { useRef } from 'react';
import { ChevronDown, ShieldCheck, Award, Zap, Compass, Building2 } from 'lucide-react';
import { playCyberClick } from '../utils/audio';

interface HeroSectionProps {
  onScrollDown: () => void;
  lang?: 'en' | 'ar';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown, lang = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);

  const isRtl = lang === 'ar';

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-section relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#080B10]"
    >
      {/* Background Ambience & Cyber Grid */}
      <div
        ref={gridOverlayRef}
        className="hero-grid absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-radial-glow blur-[120px] pointer-events-none" />

      {/* Industrial Coordinate Markers */}
      <div className="absolute top-28 left-6 sm:left-12 flex items-center gap-2 text-[10px] font-mono-code uppercase tracking-widest text-[#64748B] pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-[#00F0FF]" />
        <span>{isRtl ? 'ممر الدمام الصناعي • 26.4207° N, 50.0888° E' : 'DAMMAM CORRIDOR • 26.4207° N, 50.0888° E'}</span>
      </div>

      <div className="absolute top-28 right-6 sm:right-12 hidden sm:flex items-center gap-2 text-[10px] font-mono-code uppercase tracking-widest text-[#64748B] pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
        <span>{isRtl ? 'المعيار الصناعي لرؤية المملكة 2030' : 'KSA VISION 2030 INDUSTRIAL BENCHMARK'}</span>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center pt-24 pb-16">
        {/* Top Eyebrow Badge */}
        <div
          ref={heroBadgeRef}
          className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 text-xs text-[#E2E8F0] backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.1)]"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
          </span>
          <span className="font-mono-code uppercase tracking-wider text-[11px] text-[#00F0FF]">
            {isRtl ? 'ستار للتعليم' : 'Star Education'}
          </span>
          <span className="text-white/20">|</span>
          <span className="font-medium text-white/90">
            {isRtl ? 'معهد التدريب المؤسسي بالدمام' : 'Dammam Corporate Training Institute'}
          </span>
        </div>

        {/* MASSIVE TYPOGRAPHY HERO (Targeted for GSAP scale-up and fade-out scrub) */}
        <div className="hero-text-wrapper relative my-2 overflow-visible">
          {isRtl ? (
            <h1
              ref={heroTextRef}
              className="hero-title font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[1.05] uppercase text-white will-change-transform"
            >
              صناعة المستقبل <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#94A3B8]">
                لمسيرتك المهنية
              </span>{' '}
              <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#93C5FD]">
                في الدمام
                <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent" />
              </span>
              <span className="text-[#00F0FF]">.</span>
            </h1>
          ) : (
            <h1
              ref={heroTextRef}
              className="hero-title font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.95] uppercase text-white will-change-transform"
            >
              Future-Proof <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#94A3B8]">
                Your Career
              </span>{' '}
              <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#93C5FD]">
                in Dammam
                <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent" />
              </span>
              <span className="text-[#00F0FF]">.</span>
            </h1>
          )}
        </div>

        {/* Sub-hero Content */}
        <div
          ref={subContentRef}
          className="hero-subcontent max-w-3xl mx-auto mt-8 flex flex-col items-center"
        >
          <p className="text-base sm:text-xl text-[#94A3B8] font-light leading-relaxed mb-8">
            {isRtl ? (
              <>
                تمكين الكوادر الصناعية والهندسية في المنطقة الشرقية بشهادات تنفيذية معتمدة من{' '}
                <span className="text-white font-medium">المركز الوطني للتعليم الإلكتروني (NELC)</span>،
                وبروتوكولات أرامكو للصحة والسلامة والبيئة، وأحدث تقنيات التشغيل والأتمتة.
              </>
            ) : (
              <>
                Empowering the Eastern Province’s industrial and engineering workforce with{' '}
                <span className="text-white font-medium">NELC-accredited</span> executive certifications,
                Aramco-standard HSE protocols, and cutting-edge operational technology training.
              </>
            )}
          </p>

          {/* Key Metric Strip */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md mb-8">
            <div className="flex flex-col items-center justify-center p-3 border-r rtl:border-r-0 rtl:border-l border-white/5 last:border-0">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00F0FF]">
                15,000+
              </div>
              <div className="text-[11px] font-mono-code text-[#94A3B8] uppercase mt-1">
                {isRtl ? 'خريج معتمد' : 'Graduates Certified'}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-3 border-r rtl:border-r-0 rtl:border-l border-white/5 last:border-0">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                NELC #8492
              </div>
              <div className="text-[11px] font-mono-code text-[#94A3B8] uppercase mt-1">
                {isRtl ? 'ترخيص وطني' : 'National License'}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-3 border-r rtl:border-r-0 rtl:border-l border-white/5 last:border-0">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00F0FF]">
                140+
              </div>
              <div className="text-[11px] font-mono-code text-[#94A3B8] uppercase mt-1">
                {isRtl ? 'شريك صناعي' : 'Industrial Clients'}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                98.4%
              </div>
              <div className="text-[11px] font-mono-code text-[#94A3B8] uppercase mt-1">
                {isRtl ? 'معدل التوظيف والترقية' : 'Placement Velocity'}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => {
            playCyberClick(550, 0.04);
            onScrollDown();
          }}
          className="hero-scroll-btn group flex flex-col items-center gap-2 mt-4 text-[#64748B] hover:text-[#00F0FF] transition-colors focus:outline-none"
        >
          <span className="text-[10px] font-mono-code uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">
            {isRtl ? 'مرر لأسفل للاستكشاف' : 'SCROLL TO DIVE'}
          </span>
          <div className="w-8 h-12 rounded-full border border-white/20 group-hover:border-[#00F0FF] flex items-center justify-center transition-colors">
            <ChevronDown className="w-4 h-4 text-[#00F0FF] animate-bounce" />
          </div>
        </button>
      </div>

      {/* Bottom Subtle Transition Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080B10] to-transparent pointer-events-none" />
    </section>
  );
};
