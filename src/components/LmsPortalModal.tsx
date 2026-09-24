import React, { useState } from 'react';
import { X, GraduationCap, Building2, Key, CheckCircle, ArrowRight, ShieldCheck, UserCheck, BookOpen, Clock, Award } from 'lucide-react';
import { playCyberClick, playSuccessChime } from '../utils/audio';

interface LmsPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LmsPortalModal: React.FC<LmsPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'trainee' | 'enterprise'>('trainee');
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLoginDemo = (role: string) => {
    playSuccessChime();
    setDemoLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#0B101A] border border-[#00F0FF]/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-black overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            playCyberClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!demoLoggedIn ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs font-mono-code text-[#00F0FF] uppercase tracking-widest">
                  STAR EDUCATION • LMS GATEWAY
                </div>
                <h3 className="font-display font-black text-2xl text-white">
                  Corporate Learning Management System
                </h3>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
              <button
                onClick={() => {
                  playCyberClick();
                  setActiveTab('trainee');
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-mono-code uppercase tracking-wider transition-all ${
                  activeTab === 'trainee'
                    ? 'bg-[#00F0FF] text-[#080B10] font-bold shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Trainee & Student Sign-In
              </button>
              <button
                onClick={() => {
                  playCyberClick();
                  setActiveTab('enterprise');
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-mono-code uppercase tracking-wider transition-all ${
                  activeTab === 'enterprise'
                    ? 'bg-[#00F0FF] text-[#080B10] font-bold shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Corporate HR & Audit SSO
              </button>
            </div>

            {/* Tab Body */}
            {activeTab === 'trainee' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-[#CBD5E1] space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <UserCheck className="w-4 h-4 text-[#00F0FF]" />
                    <span>Dammam Campus Individual Access</span>
                  </div>
                  <p className="text-[#94A3B8]">
                    Access your live lectures, digital safety manuals, cloud PLC simulator labs, and
                    verifiable NELC certificate portfolio.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono-code uppercase text-[#94A3B8] mb-1">
                      National ID / Iqama / Trainee ID
                    </label>
                    <input
                      type="text"
                      defaultValue="1089482910"
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono-code uppercase text-[#94A3B8] mb-1">
                      PIN / Password
                    </label>
                    <input
                      type="password"
                      defaultValue="••••••••••••"
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleLoginDemo('Trainee')}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#00F0FF] hover:bg-[#38BDF8] text-[#080B10] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00F0FF]/20"
                  >
                    <span>Launch Trainee Portal Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-[#CBD5E1] space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Building2 className="w-4 h-4 text-[#00F0FF]" />
                    <span>Enterprise HRIS & Workforce Compliance</span>
                  </div>
                  <p className="text-[#94A3B8]">
                    Single Sign-On configured for Saudi Aramco, SABIC, SEC, and regional industrial suppliers. Real-time workforce competency dashboards and audit export.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                    <div className="text-[10px] font-mono-code text-[#64748B]">DIRECT SSO</div>
                    <div className="text-xs font-bold text-white mt-1">Azure AD / Okta</div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                    <div className="text-[10px] font-mono-code text-[#64748B]">ERP CONNECTOR</div>
                    <div className="text-xs font-bold text-white mt-1">SAP / Oracle HCM</div>
                  </div>
                </div>

                <button
                  onClick={() => handleLoginDemo('HR Manager')}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#080B10] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00F0FF]/20"
                >
                  <Key className="w-4 h-4" />
                  <span>Launch Corporate Enterprise Demo</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Logged In Dashboard Simulator */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-mono-code text-emerald-400 font-bold uppercase">
                    ACTIVE SESSION: DAMMAM CLOUD LMS
                  </div>
                  <div className="text-base font-display font-bold text-white">
                    Eng. Abdulrahman Al-Ghamdi (Trainee ID #9842)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDemoLoggedIn(false)}
                className="text-xs font-mono-code text-[#94A3B8] hover:text-white"
              >
                Log Out
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-lg font-display font-extrabold text-[#00F0FF]">100%</div>
                <div className="text-[10px] font-mono-code text-[#94A3B8]">Attendance Sync</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-lg font-display font-extrabold text-white">120 hrs</div>
                <div className="text-[10px] font-mono-code text-[#94A3B8]">NELC Contact Hours</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-lg font-display font-extrabold text-emerald-400">PASSED</div>
                <div className="text-[10px] font-mono-code text-[#94A3B8]">HAZOP Examination</div>
              </div>
            </div>

            {/* Course In Progress */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-code text-[#00F0FF] uppercase">Active Credential</span>
                <span className="text-[10px] font-mono-code text-[#64748B]">NELC Verified</span>
              </div>
              <div className="font-display font-bold text-sm text-white mb-2">
                Executive Process Safety Management & Advanced HAZOP
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-2">
                <div className="bg-[#00F0FF] h-full rounded-full w-full" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span>Certificate Awarded</span>
                <span className="text-white font-medium">SE-DMM-2026-9842</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono-code uppercase text-white transition-colors"
            >
              Return to Presentation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
