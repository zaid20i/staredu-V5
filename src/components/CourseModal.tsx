import React, { useState } from 'react';
import { Course } from '../types';
import { X, Clock, Award, Calendar, CheckCircle2, User, Building, Mail, Phone, ArrowRight, Download, ShieldCheck } from 'lucide-react';
import { playCyberClick, playSuccessChime } from '../utils/audio';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const [enrolled, setEnrolled] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    sponsorshipType: 'Corporate'
  });

  if (!course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    setEnrolled(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#0D121B] border border-[#00F0FF]/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-black overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

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

        {/* Header */}
        <div className="pr-12 mb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-wider bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF]">
              {course.badge}
            </span>
            <span className="text-xs font-mono-code text-[#94A3B8] uppercase">
              {course.level}
            </span>
            <span className="text-xs font-mono-code text-[#00F0FF]">
              • {course.seatsRemaining} Seats Remaining
            </span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
            {course.title}
          </h3>
          <p className="text-sm font-medium text-[#38BDF8]">
            {course.subtitle}
          </p>
        </div>

        {/* Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono-code mb-6">
          <div className="flex items-center gap-2 text-[#CBD5E1]">
            <Clock className="w-4 h-4 text-[#00F0FF]" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-[#CBD5E1]">
            <Calendar className="w-4 h-4 text-[#00F0FF]" />
            <span>Starts: {course.upcomingDate}</span>
          </div>
          <div className="flex items-center gap-2 text-[#CBD5E1] col-span-2 sm:col-span-1">
            <Award className="w-4 h-4 text-[#00F0FF]" />
            <span className="truncate">{course.accreditation}</span>
          </div>
        </div>

        {/* Course Modules */}
        <div className="mb-6">
          <h4 className="text-xs font-mono-code uppercase text-[#94A3B8] tracking-wider mb-3">
            Syllabus & Core Modules:
          </h4>
          <div className="space-y-2.5">
            {course.modules.map((mod, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#CBD5E1]"
              >
                <div className="w-5 h-5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center font-mono-code font-bold text-[10px] shrink-0 mt-0.5">
                  0{index + 1}
                </div>
                <span>{mod}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment or Confirmation */}
        {!enrolled ? (
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-black/60 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                Reserve Seat for Dammam Cohort
              </h4>
              <span className="text-[11px] font-mono-code text-[#00F0FF]">
                Instant Approval
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[10px] font-mono-code uppercase text-[#94A3B8] mb-1">
                  Candidate Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eng. Khalid Al-Otaibi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-code uppercase text-[#94A3B8] mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saudi Aramco / SABIC Contractor"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-code uppercase text-[#94A3B8] mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="khalid@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-code uppercase text-[#94A3B8] mb-1">
                  Phone (KSA)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+966 5x xxx xxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-[11px] text-[#64748B] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                <span>NELC certified PDU credits included</span>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-[#080B10] font-display font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-[#00F0FF]/20"
              >
                Confirm Registration
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF] text-center">
            <CheckCircle2 className="w-12 h-12 text-[#00F0FF] mx-auto mb-3" />
            <h4 className="font-display font-black text-xl text-white mb-2">
              Registration Provisional Hold Confirmed!
            </h4>
            <p className="text-xs text-[#CBD5E1] max-w-md mx-auto mb-4">
              A reservation code has been dispatched to <strong>{formData.email}</strong>. Our
              admissions coordinator in Dammam will contact you to complete institutional sponsor billing.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono-code uppercase text-white transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
