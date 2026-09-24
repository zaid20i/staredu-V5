import React, { useRef } from 'react';
import { ShieldCheck, QrCode, Sparkles, CheckCircle, ExternalLink, Award, FileCheck, Lock } from 'lucide-react';
import { SAMPLE_VERIFICATION } from '../data/courses';
import { playCyberClick, playSuccessChime } from '../utils/audio';

interface QrCertificateSectionProps {
  onVerify: () => void;
}

export const QrCertificateSection: React.FC<QrCertificateSectionProps> = ({ onVerify }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const certCardRef = useRef<HTMLDivElement>(null);

  const handleScanClick = () => {
    playSuccessChime();
    onVerify();
  };

  return (
    <section
      id="certificate"
      ref={sectionRef}
      className="qr-certificate-section relative w-full min-h-screen py-24 sm:py-36 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden transition-colors duration-700 bg-white text-[#0F172A]"
    >
      {/* Subtle Guilloche & Radial Gradient in background */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-cyan-100/50 via-sky-50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        {/* Verification Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono-code font-bold uppercase tracking-wider mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-cyan-600" />
          <span>TAMPER-PROOF VERIFICATION ENGINE</span>
        </div>

        {/* Required Headline Text */}
        <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#090D16] tracking-tight uppercase leading-[1.05] mb-4">
          Scan. Verify.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700">
            Succeed.
          </span>
        </h2>

        {/* Required Subtitle Text */}
        <p className="font-display font-medium text-lg sm:text-2xl text-slate-600 max-w-3xl mb-12">
          Instant QR Verification for Employers.
        </p>

        {/* THE MASSIVE REALISTIC TRAINING CERTIFICATE (Target for GSAP scale-in scrub) */}
        <div
          ref={certCardRef}
          className="certificate-card relative w-full max-w-4xl p-6 sm:p-12 rounded-3xl bg-white border-2 border-slate-200 shadow-[0_30px_90px_rgba(15,23,42,0.15)] overflow-hidden transition-all duration-500 hover:shadow-[0_35px_110px_rgba(6,182,212,0.25)] will-change-transform text-left"
        >
          {/* Certificate Inner Double-Security Border (Guilloche style) */}
          <div className="relative p-6 sm:p-10 border-2 border-cyan-800/20 rounded-2xl bg-gradient-to-b from-slate-50/70 via-white to-slate-50/70">
            <div className="absolute inset-1.5 border border-dashed border-cyan-600/30 rounded-xl pointer-events-none" />

            {/* Corner Filigree Accents */}
            <div className="absolute top-3 left-3 text-cyan-700/40 text-xs font-mono-code">✦ SE-DMM</div>
            <div className="absolute top-3 right-3 text-cyan-700/40 text-xs font-mono-code">NELC-KSA ✦</div>
            <div className="absolute bottom-3 left-3 text-cyan-700/40 text-xs font-mono-code">✦ VERIFIED</div>
            <div className="absolute bottom-3 right-3 text-cyan-700/40 text-xs font-mono-code">SECURE-QR ✦</div>

            {/* Certificate Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#090D16] text-white flex items-center justify-center shadow-md">
                  <Award className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl text-slate-900 tracking-wider">
                    STAR EDUCATION INSTITUTE
                  </div>
                  <div className="text-xs font-mono-code text-cyan-700 uppercase tracking-widest font-semibold">
                    Dammam • Kingdom of Saudi Arabia
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono-code font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NELC ACCREDITED #SA-8492</span>
                </div>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="text-center py-2 mb-8">
              <div className="text-xs font-mono-code uppercase tracking-[0.25em] text-slate-500 mb-2">
                OFFICIAL CERTIFICATE OF EXECUTIVE COMPETENCE
              </div>
              <div className="text-xs text-slate-400 mb-4">
                This is to officially certify that
              </div>

              {/* Graduate Name */}
              <h3 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mb-4">
                Abdulrahman M. Al-Ghamdi
              </h3>

              <div className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed mb-4">
                has successfully demonstrated professional mastery and fulfilled all competency rubrics for
              </div>

              {/* Course Title */}
              <div className="inline-block px-6 py-2 rounded-xl bg-cyan-950 text-white font-display font-bold text-sm sm:text-lg tracking-wide shadow-md">
                Executive Process Safety Management & Advanced HAZOP
              </div>
            </div>

            {/* Certificate Footer Row with QR Code and Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-slate-200 pt-8 mt-6">
              {/* Signatures and Authority */}
              <div className="md:col-span-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[11px] font-mono-code text-slate-400 uppercase">
                    CREDENTIAL ID
                  </div>
                  <div className="text-sm font-mono-code font-bold text-slate-900">
                    SE-DMM-2026-9842
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Issued: Aug 28, 2026 • Valid to 2029
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono-code text-slate-400 uppercase">
                    ACCREDITATION COUNCIL
                  </div>
                  <div className="text-sm font-bold text-slate-900 font-display">
                    National eLearning Center (NELC)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    National Qualifications Framework L7
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-4 pt-2">
                  {/* Holographic Embossed Seal */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-100 to-amber-400 border-2 border-amber-400 shadow-inner flex items-center justify-center shrink-0">
                    <div className="w-12 h-12 rounded-full border border-dashed border-amber-700/50 flex items-center justify-center text-[8px] font-bold text-amber-900 uppercase text-center leading-tight">
                      SEAL OF <br /> QUALITY
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 leading-tight">
                    <span className="font-semibold text-slate-800">
                      Cryptographically Signed & Timestamped
                    </span>
                    <br />
                    Compliant with Saudi Aramco & SABIC corporate contractor qualification criteria.
                  </div>
                </div>
              </div>

              {/* PROMINENT HIGH-DENSITY QR CODE */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900 text-white shadow-xl relative group">
                <div className="relative p-3 bg-white rounded-xl shadow-md cursor-pointer" onClick={handleScanClick}>
                  {/* Realistic high-density SVG QR Code representation */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-32 h-32 text-slate-900 group-hover:scale-105 transition-transform"
                    fill="currentColor"
                  >
                    {/* Top-left position marker */}
                    <rect x="5" y="5" width="26" height="26" fill="black" rx="3" />
                    <rect x="9" y="9" width="18" height="18" fill="white" rx="2" />
                    <rect x="13" y="13" width="10" height="10" fill="black" />

                    {/* Top-right position marker */}
                    <rect x="69" y="5" width="26" height="26" fill="black" rx="3" />
                    <rect x="73" y="9" width="18" height="18" fill="white" rx="2" />
                    <rect x="77" y="13" width="10" height="10" fill="black" />

                    {/* Bottom-left position marker */}
                    <rect x="5" y="69" width="26" height="26" fill="black" rx="3" />
                    <rect x="9" y="73" width="18" height="18" fill="white" rx="2" />
                    <rect x="13" y="77" width="10" height="10" fill="black" />

                    {/* QR Code data modules matrix */}
                    <rect x="36" y="8" width="5" height="5" />
                    <rect x="44" y="8" width="5" height="5" />
                    <rect x="52" y="8" width="5" height="5" />
                    <rect x="60" y="8" width="5" height="5" />
                    <rect x="36" y="16" width="5" height="5" />
                    <rect x="48" y="16" width="5" height="5" />
                    <rect x="60" y="16" width="5" height="5" />
                    <rect x="36" y="24" width="5" height="5" />
                    <rect x="44" y="24" width="5" height="5" />
                    <rect x="56" y="24" width="5" height="5" />

                    {/* Middle grid */}
                    <rect x="8" y="36" width="5" height="5" />
                    <rect x="16" y="36" width="5" height="5" />
                    <rect x="24" y="36" width="5" height="5" />
                    <rect x="36" y="36" width="5" height="5" />
                    <rect x="44" y="36" width="5" height="5" />
                    <rect x="52" y="36" width="5" height="5" />
                    <rect x="64" y="36" width="5" height="5" />
                    <rect x="76" y="36" width="5" height="5" />
                    <rect x="84" y="36" width="5" height="5" />

                    <rect x="12" y="44" width="5" height="5" />
                    <rect x="24" y="44" width="5" height="5" />
                    <rect x="36" y="44" width="5" height="5" />
                    <rect x="48" y="44" width="5" height="5" />
                    <rect x="68" y="44" width="5" height="5" />
                    <rect x="80" y="44" width="5" height="5" />

                    <rect x="8" y="52" width="5" height="5" />
                    <rect x="20" y="52" width="5" height="5" />
                    <rect x="32" y="52" width="5" height="5" />
                    <rect x="44" y="52" width="5" height="5" />
                    <rect x="56" y="52" width="5" height="5" />
                    <rect x="72" y="52" width="5" height="5" />
                    <rect x="88" y="52" width="5" height="5" />

                    <rect x="16" y="60" width="5" height="5" />
                    <rect x="28" y="60" width="5" height="5" />
                    <rect x="40" y="60" width="5" height="5" />
                    <rect x="52" y="60" width="5" height="5" />
                    <rect x="64" y="60" width="5" height="5" />
                    <rect x="76" y="60" width="5" height="5" />

                    {/* Bottom-right matrix */}
                    <rect x="36" y="72" width="5" height="5" />
                    <rect x="48" y="72" width="5" height="5" />
                    <rect x="60" y="72" width="5" height="5" />
                    <rect x="72" y="72" width="5" height="5" />
                    <rect x="84" y="72" width="5" height="5" />
                    <rect x="40" y="80" width="5" height="5" />
                    <rect x="56" y="80" width="5" height="5" />
                    <rect x="68" y="80" width="5" height="5" />
                    <rect x="80" y="80" width="5" height="5" />
                    <rect x="36" y="88" width="5" height="5" />
                    <rect x="48" y="88" width="5" height="5" />
                    <rect x="64" y="88" width="5" height="5" />
                    <rect x="76" y="88" width="5" height="5" />
                    <rect x="88" y="88" width="5" height="5" />

                    {/* Center Star glyph */}
                    <polygon points="50,45 52,49 56,50 52,51 50,55 48,51 44,50 48,49" fill="#0284C7" />
                  </svg>
                </div>

                <div className="mt-3 text-center">
                  <div className="text-xs font-mono-code font-bold text-cyan-400">
                    SCAN TO VERIFY
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Direct NELC Registry Lookup
                  </div>
                </div>

                <button
                  onClick={handleScanClick}
                  className="mt-3 w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Simulate Scan</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Benefit Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 w-full max-w-4xl text-left">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <div className="font-display font-bold text-slate-900 text-sm mb-1">
              Zero Forgery Guarantee
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              Every certificate has a unique cryptographic hash registered on our sovereign ledger.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-display font-bold text-slate-900 text-sm mb-1">
              NELC Instant Lookup
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              HR teams and Aramco vendor managers verify credentials within 2 seconds without phone calls.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <div className="font-display font-bold text-slate-900 text-sm mb-1">
              LinkedIn & HRIS Sync
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              Instant 1-click credential badge export to employee LinkedIn and enterprise ERP databases.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
