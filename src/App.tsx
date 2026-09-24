import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Course } from './types';
import { SAMPLE_VERIFICATION } from './data/courses';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NelcSection } from './components/NelcSection';
import { HorizontalCourses } from './components/HorizontalCourses';
import { QrCertificateSection } from './components/QrCertificateSection';
import { MagneticCtaSection } from './components/MagneticCtaSection';
import { Footer } from './components/Footer';
import { CourseModal } from './components/CourseModal';
import { VerificationModal } from './components/VerificationModal';
import { LmsPortalModal } from './components/LmsPortalModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const lenisRef = useRef<Lenis | null>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const handleToggleLang = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return next;
    });
  };

  // Initialize Lenis and GSAP ScrollTrigger
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // 1. Initialize Lenis for heavy, fluid inertial scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5
    });
    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Set up GSAP Pinning & Scrub Animations
    const ctx = gsap.context(() => {
      // NAVBAR SCROLLTRIGGER (The GSAP Fix)
      // The top navigation bar is ONLY visible on the Hero Intro.
      // Once scrolled past 100px / leaving the Hero, smoothly fade opacity to 0 and disable pointer events.
      // Reverses smoothly when user scrolls back to the very top.
      const navTween = gsap.to('.main-navbar', {
        y: -24,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.35,
        ease: 'power2.out',
        paused: true
      });

      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top+=100 top',
        onEnter: () => navTween.play(),
        onLeaveBack: () => navTween.reverse(),
        onRefresh: (self) => {
          if (self.scroll() > 100) {
            navTween.progress(1);
          } else {
            navTween.progress(0);
          }
        }
      });

      // SECTION 1: HERO SCALING & FADE-OUT SCRUB
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      heroTl
        .to('.hero-title', {
          scale: 3.0,
          opacity: 0,
          filter: 'blur(12px)',
          ease: 'power1.inOut'
        }, 0)
        .to('.hero-badge, .hero-subcontent, .hero-scroll-btn', {
          opacity: 0,
          y: -80,
          ease: 'power1.inOut'
        }, 0)
        .to('.hero-grid', {
          opacity: 0.05,
          scale: 1.4,
          ease: 'none'
        }, 0);

      // SECTION 2: THE NELC STANDARD PINNED SECTION
      // Pinned screen. Left side holds "Certified Excellence", right side cards slide up one by one.
      const cards = gsap.utils.toArray<HTMLElement>('.nelc-card');
      if (cards.length > 0) {
        const nelcTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#nelc',
            start: 'top top',
            end: '+=2400',
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // First card stays in natural position, card 2 and card 3 slide up on top as user scrubs
        cards.forEach((card, idx) => {
          if (idx > 0) {
            nelcTl.fromTo(
              card,
              {
                yPercent: 130,
                opacity: 0.2,
                scale: 0.92
              },
              {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power2.out'
              },
              `step-${idx}`
            );
          }
        });
      }

      // SECTION 3: CURRICULUM SHOWCASE - VERTICAL REELS / CARD STACKING ANIMATION
      // Completely replaced old horizontal scroll with buttery-smooth vertical reels stacking.
      // Card 0 pins in the center of the viewport.
      // Cards 1..N slide up sequentially from the bottom along the Y-axis, overlapping previous cards.
      // Background cards subtly scale down, darken with depth overlays, and shift slightly in perspective.
      const reelCards = gsap.utils.toArray<HTMLElement>('.course-reel-card');
      const reelDots = gsap.utils.toArray<HTMLElement>('.reel-indicator-dot');

      if (reelCards.length > 0) {
        const stackTl = gsap.timeline({
          scrollTrigger: {
            id: 'courses-stack-trigger',
            trigger: '#courses',
            start: 'top top',
            end: () => `+=${(reelCards.length - 1) * 1000 + 400}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Dynamically update indicator dots to reflect active reel card
              const currentStep = Math.min(
                reelCards.length - 1,
                Math.round(self.progress * (reelCards.length - 1))
              );
              reelDots.forEach((dot, dIdx) => {
                if (dIdx === currentStep) {
                  dot.classList.add('bg-[#00F0FF]', 'w-7', 'opacity-100');
                  dot.classList.remove('bg-white/25', 'w-2', 'opacity-50');
                } else {
                  dot.classList.remove('bg-[#00F0FF]', 'w-7', 'opacity-100');
                  dot.classList.add('bg-white/25', 'w-2', 'opacity-50');
                }
              });
            }
          }
        });

        // Initialize cards:
        // Card 0 sits in the center at full scale and brightness
        // Cards 1..N start below the viewport along the Y-axis (yPercent: 120)
        reelCards.forEach((card, idx) => {
          if (idx > 0) {
            gsap.set(card, {
              yPercent: 120,
              scale: 0.96,
              opacity: 1,
              transformOrigin: '50% 15%'
            });
          } else {
            gsap.set(card, {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              transformOrigin: '50% 15%'
            });
          }
        });

        // Stacking timeline steps: each subsequent card slides up along Y-axis over the stack
        for (let i = 1; i < reelCards.length; i++) {
          const currentCard = reelCards[i];
          const prevCard = reelCards[i - 1];
          const prevOverlay = prevCard.querySelector('.card-depth-overlay');
          const stepLabel = `step-${i}`;

          // Current card slides up from bottom (Y-axis only) to 0, scaling to 1
          stackTl.to(
            currentCard,
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out'
            },
            stepLabel
          );

          // Previous card scales down, darkens, and shifts slightly upward
          stackTl.to(
            prevCard,
            {
              scale: 0.94,
              filter: 'brightness(0.6)',
              y: -14,
              duration: 1.2,
              ease: 'power2.out'
            },
            stepLabel
          );

          if (prevOverlay) {
            stackTl.to(
              prevOverlay,
              {
                opacity: 0.55,
                duration: 1.2,
                ease: 'power2.out'
              },
              stepLabel
            );
          }

          // If there are even earlier cards in the stack, push them further into 3D background
          for (let j = 0; j < i - 1; j++) {
            const olderCard = reelCards[j];
            const olderOverlay = olderCard.querySelector('.card-depth-overlay');
            const depth = i - j;
            stackTl.to(
              olderCard,
              {
                scale: Math.max(0.86, 1 - depth * 0.05),
                filter: `brightness(${Math.max(0.25, 1 - depth * 0.25)})`,
                y: -depth * 12,
                duration: 1.2,
                ease: 'power2.out'
              },
              stepLabel
            );
            if (olderOverlay) {
              stackTl.to(
                olderOverlay,
                {
                  opacity: Math.min(0.85, 0.5 + depth * 0.15),
                  duration: 1.2,
                  ease: 'power2.out'
                },
                stepLabel
              );
            }
          }
        }
      }

      // SECTION 4: THE QR CERTIFICATE REVEAL
      // Massive, realistic Training Certificate scales into the center of the screen
      const certTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#certificate',
          start: 'top 75%',
          end: 'center center',
          scrub: 1.2
        }
      });

      certTl.fromTo(
        '.certificate-card',
        {
          scale: 0.65,
          opacity: 0.25,
          y: 90,
          rotateX: 12
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotateX: 0,
          ease: 'power2.out'
        }
      );
    }, mainContainerRef);

    // Refresh ScrollTrigger after initial DOM calculations
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let rAF: number | null = null;

    const debouncedRefresh = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (rAF) cancelAnimationFrame(rAF);
      debounceTimer = setTimeout(() => {
        rAF = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, 120);
    };

    const resizeObserver = new ResizeObserver(() => {
      debouncedRefresh();
    });

    if (mainContainerRef.current) {
      resizeObserver.observe(mainContainerRef.current);
    }

    window.addEventListener('resize', debouncedRefresh);

    return () => {
      clearTimeout(refreshTimer);
      if (debounceTimer) clearTimeout(debounceTimer);
      if (rAF) cancelAnimationFrame(rAF);
      window.removeEventListener('resize', debouncedRefresh);
      resizeObserver.disconnect();
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${sectionId}`, {
        offset: 0,
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollDown = () => {
    handleNavigateSection('nelc');
  };

  const handleJumpToReel = (reelIndex: number) => {
    const trigger = ScrollTrigger.getById('courses-stack-trigger');
    if (trigger && lenisRef.current) {
      const start = trigger.start;
      const end = trigger.end;
      const targetScroll = start + (reelIndex / (4 - 1)) * (end - start);
      lenisRef.current.scrollTo(targetScroll, {
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
    }
  };

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div ref={mainContainerRef} className="star-education-app min-h-screen bg-[#080B10] text-[#E5E7EB] selection:bg-[#00F0FF] selection:text-[#080B10]">
      {/* Top Floating Navigation (Managed by GSAP ScrollTrigger to fade out past Hero) */}
      <Navbar
        onOpenPortal={() => setIsPortalOpen(true)}
        onNavigateSection={handleNavigateSection}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Flow of Pinned & Fluid Sections */}
      <main className="relative w-full">
        {/* 1. Hero Intro (Text scales up & fades out on scrub) */}
        <HeroSection onScrollDown={handleScrollDown} lang={lang} />

        {/* 2. The NELC Standard (Pinned section with 3 sliding cards on the right) */}
        <NelcSection onOpenPortal={() => setIsPortalOpen(true)} />

        {/* 3. Curriculum Showcase (Pinned Vertical Reels Card Stacking) */}
        <HorizontalCourses
          onSelectCourse={(course) => setSelectedCourse(course)}
          lang={lang}
          onJumpToReel={handleJumpToReel}
        />

        {/* 4. The QR Certificate Reveal (Background shifts to bright white, certificate scales into center) */}
        <QrCertificateSection onVerify={() => setIsVerificationOpen(true)} />

        {/* 5. Bottom CTA & Footer (Massive magnetic button + luxury corporate footer) */}
        <MagneticCtaSection onOpenPortal={() => setIsPortalOpen(true)} />

        <Footer
          onScrollToTop={handleScrollToTop}
          onNavigateSection={handleNavigateSection}
        />
      </main>

      {/* Interactive Modals */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />

      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />

      <LmsPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />
    </div>
  );
}
