import React from 'react';
import { Sparkles, MapPin, Mail, Phone, ArrowUp, ShieldCheck, Award, Globe, ExternalLink } from 'lucide-react';
import { playCyberClick } from '../utils/audio';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigateSection }) => {
  return (
    <footer id="footer" className="relative bg-[#05070B] text-[#94A3B8] pt-20 pb-12 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-[#00F0FF]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Dammam HQ Column */}
          <div className="lg:col-span-5 text-start">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/STAREDUCATIONLOGO.png"
                alt="Star Education Logo"
                className="h-10 w-auto object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                loading="lazy"
              />
              <div className="flex flex-col text-start">
                <span className="font-display font-bold tracking-widest uppercase text-lg sm:text-xl text-white leading-tight">
                  STAR EDUCATION
                </span>
                <span className="text-[9px] font-mono-code uppercase tracking-widest text-[#00F0FF] leading-tight mt-0.5">
                  CORPORATE TRAINING INSTITUTE • DAMMAM
                </span>
              </div>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md mb-8">
              Pioneering corporate executive training, technical industrial automation, and HSE certifications
              tailored to Saudi Aramco, SABIC, and regional industrial supply chain requirements across the Eastern Province.
            </p>

            <div className="space-y-3 text-xs font-mono-code text-[#CBD5E1]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <span>King Fahd Road, Golden Belt District, Dammam 32415, Eastern Province, KSA</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>+966 13 890 4200 / +966 50 123 9842</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>corporate@stareducation.sa</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3">
            <div className="text-xs font-mono-code uppercase font-bold text-white tracking-widest mb-6">
              NAVIGATION
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => {
                    playCyberClick();
                    onNavigateSection('hero');
                  }}
                  className="hover:text-[#00F0FF] transition-colors"
                >
                  Future-Proof Hero
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playCyberClick();
                    onNavigateSection('nelc');
                  }}
                  className="hover:text-[#00F0FF] transition-colors"
                >
                  The NELC Standard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playCyberClick();
                    onNavigateSection('courses');
                  }}
                  className="hover:text-[#00F0FF] transition-colors"
                >
                  Dynamic Course Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playCyberClick();
                    onNavigateSection('certificate');
                  }}
                  className="hover:text-[#00F0FF] transition-colors"
                >
                  QR Certificate Verification
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playCyberClick();
                    onNavigateSection('portal-cta');
                  }}
                  className="hover:text-[#00F0FF] transition-colors"
                >
                  Enterprise LMS Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Accreditations & Compliance Column */}
          <div className="lg:col-span-4">
            <div className="text-xs font-mono-code uppercase font-bold text-white tracking-widest mb-6">
              ACCREDITATIONS & RECOGNITION
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-bold text-white mb-1">NELC Certified</div>
                <div className="text-[10px] font-mono-code text-[#00F0FF]">
                  Lic. #SA-NELC-8492
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-bold text-white mb-1">TVTC Authorized</div>
                <div className="text-[10px] font-mono-code text-[#00F0FF]">
                  Vocational Registry
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-bold text-white mb-1">ISO 9001:2015</div>
                <div className="text-[10px] font-mono-code text-[#00F0FF]">
                  Quality Certified
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-bold text-white mb-1">NEBOSH / IOSH</div>
                <div className="text-[10px] font-mono-code text-[#00F0FF]">
                  Accredited Centre
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00F0FF] shrink-0" />
              <div className="text-[11px] text-[#E2E8F0]">
                All curricula mapped to the National Qualifications Framework (NQF) & Saudi Vision 2030 human capability goals.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code">
          <div className="text-[#64748B] text-center sm:text-left">
            © {new Date().getFullYear()} Star Education Institute (Dammam). All rights reserved. Registered under Ministry of Education & NELC regulations.
          </div>

          <button
            onClick={() => {
              playCyberClick(900, 0.04);
              onScrollToTop();
            }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-[#00F0FF]/15 border border-white/10 hover:border-[#00F0FF]/50 text-white hover:text-[#00F0FF] transition-all"
          >
            <span className="text-[11px] tracking-wider uppercase">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
