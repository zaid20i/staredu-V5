import React, { useRef } from 'react';
import { ShieldCheck, CheckCircle2, Award, Cpu, Globe2, BookOpen, Layers, Sparkles } from 'lucide-react';
import { NELC_CARDS } from '../data/courses';
import { playCyberClick } from '../utils/audio';

interface NelcSectionProps {
  onOpenPortal: () => void;
}

export const NelcSection: React.FC<NelcSectionProps> = ({ onOpenPortal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="nelc"
      ref={containerRef}
      className="nelc-section relative w-full min-h-screen bg-[#090D14] text-[#E2E8F0] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-[400px] h-[400px] bg-[#38BDF8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* LEFT PINNED HEADING & CONTEXT */}
          <div
            ref={leftColRef}
            className="nelc-left-col lg:col-span-5 lg:sticky lg:top-32 flex flex-col justify-between"
          >
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono-code text-[#00F0FF] mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>THE NELC STANDARD</span>
              </div>

              {/* Required Heading */}
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] uppercase mb-6">
                Certified <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-white">
                  Excellence
                </span>
                <span className="text-[#00F0FF]">.</span>
              </h2>

              <p className="text-base text-[#94A3B8] leading-relaxed mb-8">
                Operating under strict license from the{' '}
                <strong className="text-white font-medium">National eLearning Center (NELC)</strong>{' '}
                of Saudi Arabia. Every curriculum module, lab exercise, and executive credit is verified
                against the Kingdom's highest technical benchmarks.
              </p>

              {/* Accreditation Stamp Box */}
              <div className="p-6 rounded-2xl bg-[#0F1726]/80 border border-white/10 backdrop-blur-md relative overflow-hidden mb-8 group">
                <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#00F0FF]/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-[#00F0FF]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono-code uppercase tracking-wider text-[#00F0FF] mb-1">
                      NELC REGISTRATION
                    </div>
                    <div className="text-sm font-display font-bold text-white mb-1">
                      License #SA-NELC-8492
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Authorised digital & in-person vocational higher education institution in Eastern Province.
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Step Indicator */}
              <div className="hidden lg:flex items-center gap-6 text-xs font-mono-code text-[#64748B]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                  <span className="text-[#00F0FF]">SCRUB TO ADVANCE CARDS</span>
                </div>
                <span>[ 01 • 02 • 03 ]</span>
              </div>
            </div>
          </div>

          {/* RIGHT SLIDING CARDS (Target for GSAP ScrollTrigger slide up) */}
          <div
            ref={cardsContainerRef}
            className="nelc-cards-wrapper lg:col-span-7 flex flex-col gap-8 relative"
          >
            {NELC_CARDS.map((card, index) => {
              const icons = [
                <Globe2 key="1" className="w-6 h-6 text-[#00F0FF]" />,
                <Cpu key="2" className="w-6 h-6 text-[#38BDF8]" />,
                <ShieldCheck key="3" className="w-6 h-6 text-[#00F0FF]" />
              ];

              return (
                <div
                  key={card.id}
                  id={`nelc-card-${index}`}
                  className="nelc-card group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111827] to-[#0D121D] border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-500 shadow-2xl shadow-black/80 will-change-transform"
                >
                  {/* Glowing Top Edge Accent */}
                  <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent group-hover:via-[#00F0FF] transition-all" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        {icons[index]}
                      </div>
                      <span className="font-mono-code text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                        STANDARD {card.number}
                      </span>
                    </div>
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-white/20 group-hover:text-[#00F0FF]/30 transition-colors">
                      {card.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                    {card.title}
                  </h3>
                  <div className="text-sm font-medium text-[#38BDF8] mb-4">
                    {card.subtitle}
                  </div>

                  {/* Body description */}
                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-8">
                    {card.description}
                  </p>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
                    {card.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <div className="font-display font-black text-lg sm:text-xl text-white">
                          {m.value}
                        </div>
                        <div className="text-[10px] sm:text-xs font-mono-code text-[#64748B] uppercase mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                    {card.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code text-[#CBD5E1] bg-white/[0.03] border border-white/5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#00F0FF]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
