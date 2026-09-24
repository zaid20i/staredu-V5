import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Volume2, VolumeX, ArrowUpRight, GraduationCap, Globe } from 'lucide-react';
import { toggleAudioFeedback, playCyberClick } from '../utils/audio';

interface NavbarProps {
  onOpenPortal: () => void;
  onNavigateSection: (sectionId: string) => void;
  lang?: 'en' | 'ar';
  onToggleLang?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPortal,
  onNavigateSection,
  lang = 'en',
  onToggleLang
}) => {
  const [dammamTime, setDammamTime] = useState<string>('');
  const [soundActive, setSoundActive] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const isRtl = lang === 'ar';

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat(isRtl ? 'ar-SA' : 'en-US', {
          timeZone: 'Asia/Riyadh',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setDammamTime(formatter.format(now));
      } catch {
        setDammamTime('12:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isRtl]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Initial Page Load Entrance Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.nav-logo-lockup', {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.nav-center-menu', {
        y: -15,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.7')
      .from('.nav-actions', {
        y: -15,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.7');
    });

    return () => ctx.revert();
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleAudioFeedback();
    setSoundActive(nextState);
  };

  const handleNavClick = (id: string) => {
    playCyberClick(700, 0.03);
    onNavigateSection(id);
  };

  return (
    <header
      id="main-navbar"
      className={`main-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B10]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <button
          onClick={() => handleNavClick('hero')}
          className="nav-logo-lockup group flex items-center gap-3 text-left rtl:text-right focus:outline-none hover:scale-105 hover:opacity-90 transition-all duration-300 cursor-pointer select-none"
          aria-label="Star Education Home"
        >
          {/* Pristine Logo Rendering - No mix-blend modes */}
          <img
            src="/STAREDUCATIONLOG.png"
            alt="Star Education Logo"
            className="h-10 w-auto object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
            loading="eager"
          />
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-widest uppercase text-white/90 text-base sm:text-lg transition-colors group-hover:text-white leading-tight">
              {isRtl ? 'ستار للتعليم' : 'STAR EDUCATION'}
            </span>
            <span className="text-[9px] font-mono-code uppercase tracking-widest text-[#00F0FF] leading-tight mt-0.5">
              {isRtl ? 'الدمام • اعتماد NELC' : 'DAMMAM • NELC ACCREDITED'}
            </span>
          </div>
        </button>

        {/* Center Pill Navigation */}
        <nav className="nav-center-menu hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <button
            onClick={() => handleNavClick('nelc')}
            className="px-3.5 py-1.5 text-xs font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
          >
            {isRtl ? 'المعيار الوطني' : 'The Standard'}
          </button>
          <button
            onClick={() => handleNavClick('courses')}
            className="px-3.5 py-1.5 text-xs font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
          >
            {isRtl ? 'المناهج' : 'Curriculum'}
          </button>
          <button
            onClick={() => handleNavClick('certificate')}
            className="px-3.5 py-1.5 text-xs font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
          >
            {isRtl ? 'التحقق الفوري' : 'QR Verification'}
          </button>
          <button
            onClick={() => handleNavClick('portal-cta')}
            className="px-3.5 py-1.5 text-xs font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
          >
            {isRtl ? 'بوابة المتدربين' : 'LMS Portal'}
          </button>
        </nav>

        {/* Right Info & Actions */}
        <div className="nav-actions flex items-center gap-3">
          {/* Live Dammam Time Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0F172A]/70 border border-white/10 text-xs font-mono-code text-[#94A3B8]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span>
              {isRtl ? `الدمام ${dammamTime || '12:00:00'} AST` : `DAMMAM ${dammamTime || '12:00:00'} AST`}
            </span>
          </div>

          {/* Bilingual EN / ع Toggle */}
          <button
            onClick={() => {
              playCyberClick(650, 0.03);
              if (onToggleLang) {
                onToggleLang();
              }
            }}
            title={isRtl ? 'Switch to English' : 'التحويل إلى العربية (Switch to Arabic)'}
            aria-label="Toggle language between English and Arabic"
            className="relative flex items-center p-1 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#00F0FF]/50 transition-all font-mono-code text-xs select-none"
          >
            <span
              className={`px-2 py-0.5 rounded-md transition-all font-bold text-[11px] ${
                lang === 'en'
                  ? 'bg-[#00F0FF] text-[#080B10] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              EN
            </span>
            <span className="text-[#64748B] px-0.5 text-[10px]">/</span>
            <span
              className={`px-2 py-0.5 rounded-md transition-all font-bold text-[11px] ${
                lang === 'ar'
                  ? 'bg-[#00F0FF] text-[#080B10] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              ع
            </span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            title={
              soundActive
                ? isRtl ? 'كتم التأثيرات الصوتية' : 'Mute micro-interaction audio'
                : isRtl ? 'تفعيل المؤثرات الصوتية' : 'Enable tactile audio effects'
            }
            className={`p-2 rounded-lg border transition-all ${
              soundActive
                ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'bg-white/[0.03] border-white/10 text-[#64748B] hover:text-white hover:border-white/20'
            }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Direct LMS Access Button */}
          <button
            onClick={() => {
              playCyberClick(800, 0.04);
              onOpenPortal();
            }}
            className="relative group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#080B10] font-display font-bold text-xs uppercase tracking-wider overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all duration-300 active:scale-95"
          >
            <GraduationCap className="w-4 h-4 text-[#080B10]" />
            <span className="relative z-10">{isRtl ? 'بوابة LMS' : 'LMS Portal'}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'group-hover:-translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'} transition-transform`} />
          </button>
        </div>
      </div>
    </header>
  );
};

