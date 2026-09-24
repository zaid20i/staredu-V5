import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, GraduationCap, Sparkles, Building, Lock, Users, Shield } from 'lucide-react';
import { playCyberClick } from '../utils/audio';

interface MagneticCtaSectionProps {
  onOpenPortal: () => void;
}

export const MagneticCtaSection: React.FC<MagneticCtaSectionProps> = ({ onOpenPortal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [textOffset, setTextOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Magnetic pull factor
    const pullStrength = 0.35;
    const textStrength = 0.18;

    setPosition({
      x: deltaX * pullStrength,
      y: deltaY * pullStrength
    });

    setTextOffset({
      x: deltaX * textStrength,
      y: deltaY * textStrength
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    setTextOffset({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playCyberClick(900, 0.03);
  };

  return (
    <section
      id="portal-cta"
      className="magnetic-cta-section relative w-full bg-[#080B10] text-white py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10"
    >
      {/* Background Neon Energy Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 text-xs font-mono-code text-[#00F0FF] uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENTERPRISE LEARNING GATEWAY</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight max-w-4xl leading-tight mb-4">
          Ready to Elevate Your Organization's{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-white">
            Human Capital
          </span>
          ?
        </h2>

        <p className="text-sm sm:text-lg text-[#94A3B8] max-w-2xl font-light mb-14">
          Direct institutional access for registered trainees, corporate HR partners, and
          industrial audit directors across the Kingdom.
        </p>

        {/* MAGNETIC BUTTON CONTAINER TRIGGER ZONE */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full max-w-4xl py-6 flex items-center justify-center relative cursor-pointer"
        >
          {/* THE MASSIVE FULL-WIDTH MAGNETIC BUTTON */}
          <button
            ref={buttonRef}
            onClick={() => {
              playCyberClick(950, 0.05);
              onOpenPortal();
            }}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              transition: isHovered
                ? 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
                : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="group relative w-full py-10 sm:py-14 px-8 rounded-3xl bg-gradient-to-r from-[#00F0FF] via-[#0284C7] to-[#00F0FF] bg-[length:200%_auto] hover:bg-[position:right_center] text-[#080B10] shadow-[0_0_60px_rgba(0,240,255,0.35)] hover:shadow-[0_0_90px_rgba(0,240,255,0.6)] flex items-center justify-between overflow-hidden will-change-transform"
          >
            {/* Animated Light Sweep Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Left Icon Pill */}
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-[#080B10]/15 backdrop-blur-md items-center justify-center text-[#080B10]">
              <GraduationCap className="w-9 h-9 group-hover:rotate-12 transition-transform duration-300" />
            </div>

            {/* Center Required Text with magnetic parallax */}
            <span
              ref={textRef}
              style={{
                transform: `translate3d(${textOffset.x}px, ${textOffset.y}px, 0)`,
                transition: isHovered
                  ? 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
                  : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider uppercase mx-auto flex items-center gap-4 text-[#080B10]"
            >
              Access LMS Portal
            </span>

            {/* Right Diagonal Arrow */}
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-[#080B10] text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform duration-300 shadow-lg">
              <ArrowUpRight className="w-8 h-8" />
            </div>
          </button>
        </div>

        {/* Feature Highlights Below CTA */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 w-full max-w-4xl text-left border-t border-white/10 pt-10">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono-code uppercase font-bold text-white">
                NELC Secure SSO
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                SAML 2.0 & Azure AD corporate directory login
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono-code uppercase font-bold text-white">
                HR Manager Portal
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                Real-time cohort telemetry & compliance audits
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono-code uppercase font-bold text-white">
                Digital Credentials
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                Verifiable certificates and PDU transcripts
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono-code uppercase font-bold text-white">
                Dammam Virtual Lab
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                Cloud PLC simulators & hazardous scenario runs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
