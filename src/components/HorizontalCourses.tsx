import React, { useRef } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/courses';
import { Clock, Award, Users, Calendar, Sparkles, ChevronRight, Layers, ArrowDown, ChevronDown, Check } from 'lucide-react';
import { playCyberClick } from '../utils/audio';

interface HorizontalCoursesProps {
  onSelectCourse: (course: Course) => void;
  lang?: 'en' | 'ar';
  onJumpToReel?: (index: number) => void;
}

export const HorizontalCourses: React.FC<HorizontalCoursesProps> = ({
  onSelectCourse,
  lang = 'en',
  onJumpToReel
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === 'ar';

  const handleIndicatorClick = (index: number) => {
    playCyberClick(800, 0.03);
    if (onJumpToReel) {
      onJumpToReel(index);
    }
  };

  return (
    <section
      id="courses"
      ref={containerRef}
      className="courses-stacked-section relative w-full h-screen bg-[#070A0F] text-[#E2E8F0] overflow-hidden flex flex-col justify-between py-5 sm:py-6 lg:py-8 select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-[#00F0FF]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#38BDF8]/4 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Section Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0 z-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono-code text-[#00F0FF] mb-2.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{isRtl ? 'عرض البطاقات المتتالية • ريلز' : 'REELS VERTICAL STACK'}</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
              {isRtl ? 'معرض' : 'Curriculum'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#38BDF8]">
                {isRtl ? 'المناهج' : 'Showcase'}
              </span>
              <span className="text-[#00F0FF]">.</span>
            </h2>
          </div>

          {/* Reel Indicators & Scrub Hint */}
          <div className="flex items-center gap-4 text-xs font-mono-code text-[#94A3B8]">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
              <ArrowDown className="w-3.5 h-3.5 text-[#00F0FF] animate-bounce" />
              <span className="text-[11px] text-[#CBD5E1]">
                {isRtl ? 'اسحب للأسفل لاستكشاف البطاقات' : 'SCROLL DOWN TO STACK REELS'}
              </span>
            </div>

            {/* Indicator dots for the 4 tracks */}
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="text-[10px] text-[#64748B] mr-1">
                {isRtl ? 'المسارات:' : 'TRACKS:'}
              </span>
              {COURSES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleIndicatorClick(idx)}
                  className={`reel-indicator-dot h-2 rounded-full transition-all duration-300 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-[#00F0FF] ${
                    idx === 0 ? 'bg-[#00F0FF] w-7 opacity-100' : 'bg-white/25 w-2 opacity-50'
                  }`}
                  data-index={idx}
                  title={`Jump to Track 0${idx + 1}`}
                  aria-label={`Jump to Track 0${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CENTRAL STAGE: VERTICAL CARD STACK (GSAP ScrollTrigger Target) */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 min-h-0 flex items-center justify-center my-auto z-10">
        <div className="relative w-full h-[76vh] sm:h-[78vh] lg:h-[80vh] min-h-[520px] max-h-[740px] flex items-center justify-center">
          {COURSES_DATA.map((course, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={course.id}
                id={`course-reel-${index}`}
                data-reel-index={index}
                className="course-reel-card absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0D121B] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden transition-shadow select-none will-change-transform"
                style={{
                  zIndex: 10 + index,
                }}
              >
                {/* 3D Depth Darkening Overlay (Controlled by GSAP when card goes behind) */}
                <div className="card-depth-overlay absolute inset-0 bg-black/75 pointer-events-none opacity-0 transition-opacity duration-300 rounded-3xl z-30" />

                {/* Ambient Category Color Aura */}
                <div
                  className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 transition-opacity duration-700"
                  style={{ backgroundColor: course.accentColor }}
                />

                {/* Card Watermark Number in background */}
                <div className="absolute right-6 bottom-16 sm:right-10 sm:bottom-20 text-[100px] sm:text-[140px] font-display font-black text-white/[0.025] select-none pointer-events-none leading-none z-0">
                  0{index + 1}
                </div>

                {/* CARD CONTENT WRAPPER */}
                <div className="relative z-10 overflow-y-auto pr-1" data-lenis-prevent>
                  {/* Top Bar: Badge, Level, Highlight Tag, Track Number */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className="px-3.5 py-1.5 rounded-full text-xs font-mono-code font-bold uppercase tracking-wider border shadow-sm"
                        style={{
                          backgroundColor: `${course.accentColor}18`,
                          borderColor: `${course.accentColor}55`,
                          color: course.accentColor
                        }}
                      >
                        {course.badge}
                      </span>
                      <span className="text-xs font-mono-code text-[#94A3B8] uppercase px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/5">
                        {course.level}
                      </span>
                      <span className="hidden sm:inline-flex text-[11px] font-mono-code text-[#38BDF8] px-2.5 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20">
                        {course.highlightTag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono-code text-xs text-[#64748B]">
                      <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: course.accentColor }} />
                      <span className="text-white font-bold">
                        {isRtl ? `المسار 0${index + 1}` : `REEL 0${index + 1}`}
                      </span>
                      <span>// 04</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-display font-extrabold text-xl sm:text-3xl lg:text-4xl text-white leading-tight mb-2 sm:mb-3">
                    {course.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-base font-semibold text-[#38BDF8] mb-4 sm:mb-6">
                    {course.subtitle}
                  </p>

                  {/* Key Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/5 mb-4 sm:mb-6 text-xs font-mono-code">
                    <div className="flex items-center gap-2.5 text-[#CBD5E1]">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                        <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#64748B] uppercase">{isRtl ? 'المدة' : 'Duration'}</div>
                        <div className="font-medium truncate">{course.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-[#CBD5E1]">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                        <Award className="w-3.5 h-3.5 text-[#00F0FF]" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#64748B] uppercase">{isRtl ? 'الاعتماد' : 'Accreditation'}</div>
                        <div className="font-medium truncate">{course.accreditation}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-[#CBD5E1]">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                        <Users className="w-3.5 h-3.5 text-[#00F0FF]" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#64748B] uppercase">{isRtl ? 'الفئة المستهدفة' : 'Audience'}</div>
                        <div className="font-medium truncate">{course.audience}</div>
                      </div>
                    </div>
                  </div>

                  {/* Overview snippet */}
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6">
                    {course.overview}
                  </p>

                  {/* Core Modules Sample */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4">
                    <div className="text-[11px] font-mono-code uppercase tracking-wider text-[#64748B] flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>{isRtl ? 'الوحدات المعتمدة' : 'CORE CURRICULUM MODULES'}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.modules.slice(0, 3).map((mod, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-start gap-2.5 text-xs text-[#CBD5E1] bg-white/[0.02] border border-white/5 rounded-xl px-3 py-2"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: course.accentColor }}
                          />
                          <span className="line-clamp-1">{mod}</span>
                        </div>
                      ))}
                      {course.modules.length > 3 && (
                        <div className="flex items-center gap-2 text-xs font-mono-code text-[#00F0FF]/90 px-3 py-2 bg-[#00F0FF]/5 rounded-xl border border-[#00F0FF]/20">
                          <span>+ {course.modules.length - 3} {isRtl ? 'وحدات تخصصية إضافية' : 'more specialized technical modules'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action Bar */}
                <div className="relative z-10 pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-auto">
                  <div className="flex items-center gap-3 text-xs font-mono-code text-[#94A3B8]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>{isRtl ? 'الدفعة:' : 'Cohort:'} {course.upcomingDate}</span>
                    </div>
                    <span className="text-[#64748B]">•</span>
                    <div className="flex items-center gap-1.5 text-[#00F0FF] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{course.seatsRemaining} {isRtl ? 'مقاعد متبقية' : 'seats left'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        playCyberClick(750, 0.04);
                        onSelectCourse(course);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#080B10] font-display font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#00F0FF]/20 hover:shadow-[#00F0FF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn"
                    >
                      <span>{isRtl ? 'عرض تفاصيل المنهج' : 'View Full Syllabus'}</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section Footer Strip */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0 z-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-white/5 text-[11px] font-mono-code text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            <span>
              {isRtl
                ? 'تأثير التكديس الرأسي ثلاثي الأبعاد • متوافق مع نظام لينيس السلس'
                : '3D VERTICAL REELS STACK • GSAP SCROLLTRIGGER + LENIS ACCELERATED'}
            </span>
          </div>
          <div>
            <span>{isRtl ? 'الدمام • المملكة العربية السعودية' : 'DAMMAM, KINGDOM OF SAUDI ARABIA'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

