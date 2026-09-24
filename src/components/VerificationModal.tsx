import React, { useEffect, useState } from 'react';
import { SAMPLE_VERIFICATION } from '../data/courses';
import { X, CheckCircle2, ShieldCheck, Download, ExternalLink, Copy, Check, Lock, Award, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime, playCyberClick } from '../utils/audio';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setVerifying(true);
      const timer = setTimeout(() => {
        setVerifying(false);
        playSuccessChime();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F0FF', '#38BDF8', '#10B981', '#F59E0B']
          });
        } catch {
          // Confetti fallback
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyHash = () => {
    playCyberClick(900, 0.03);
    navigator.clipboard.writeText(SAMPLE_VERIFICATION.blockchainHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-[#090E17] border border-[#00F0FF]/40 rounded-3xl p-6 sm:p-8 text-white shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00F0FF]/15 rounded-full blur-3xl pointer-events-none" />

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

        {verifying ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-[#00F0FF] animate-spin" />
              <ShieldCheck className="w-8 h-8 text-[#00F0FF] absolute inset-0 m-auto" />
            </div>
            <div className="font-display font-bold text-lg text-white mb-2">
              Querying National eLearning Center Registry...
            </div>
            <div className="text-xs font-mono-code text-[#00F0FF]">
              Resolving Certificate ID: {SAMPLE_VERIFICATION.certificateId}
            </div>
          </div>
        ) : (
          <div>
            {/* Header Status Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#10B981] px-2.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30">
                    VERIFIED & ACTIVE
                  </span>
                  <span className="text-xs font-mono-code text-[#64748B]">
                    NELC TIMESTAMPED
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-xl text-white mt-1">
                  Official Verification Record
                </h3>
              </div>
            </div>

            {/* Recipient Card Details */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 mb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-mono-code text-[#64748B] uppercase">
                    CREDENTIAL HOLDER
                  </div>
                  <div className="text-base font-display font-bold text-white">
                    {SAMPLE_VERIFICATION.studentName}
                  </div>
                  <div className="text-xs font-mono-code text-[#94A3B8]">
                    National ID: {SAMPLE_VERIFICATION.nationalIdMasked}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono-code text-[#64748B] uppercase">
                    CERTIFICATE ID
                  </div>
                  <div className="text-base font-mono-code font-bold text-[#00F0FF]">
                    {SAMPLE_VERIFICATION.certificateId}
                  </div>
                  <div className="text-xs font-mono-code text-[#94A3B8]">
                    Grade: {SAMPLE_VERIFICATION.grade}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="text-[10px] font-mono-code text-[#64748B] uppercase">
                  ACCREDITED PROGRAM
                </div>
                <div className="text-sm font-semibold text-[#E2E8F0] mt-0.5">
                  {SAMPLE_VERIFICATION.courseTitle}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs font-mono-code">
                <div>
                  <div className="text-[10px] text-[#64748B]">ISSUED DATE</div>
                  <div className="text-white font-medium">{SAMPLE_VERIFICATION.issueDate}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#64748B]">VALID UNTIL</div>
                  <div className="text-[#10B981] font-medium">{SAMPLE_VERIFICATION.validUntil}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#64748B]">PDU CREDITS</div>
                  <div className="text-white font-medium">{SAMPLE_VERIFICATION.totalPduHours} Hours</div>
                </div>
              </div>
            </div>

            {/* Cryptographic Proof Hash */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-code uppercase text-[#64748B] flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#00F0FF]" />
                  <span>IMMUTABLE LEDGER HASH</span>
                </span>
                <button
                  onClick={handleCopyHash}
                  className="text-[10px] font-mono-code text-[#00F0FF] hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'COPIED' : 'COPY HASH'}</span>
                </button>
              </div>
              <div className="text-[11px] font-mono-code text-[#94A3B8] break-all">
                {SAMPLE_VERIFICATION.blockchainHash}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-[#64748B] font-mono-code">
                Issuer: Star Education Institute Dammam (#SA-8492)
              </div>
              <button
                onClick={() => {
                  playCyberClick();
                  alert(`Official PDF transcript for ${SAMPLE_VERIFICATION.studentName} generated with digital NELC seal.`);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00F0FF] hover:bg-[#38BDF8] text-[#080B10] font-display font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#00F0FF]/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Verified PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
