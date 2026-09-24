export interface Course {
  id: string;
  category: 'HSE' | 'Technical' | 'Leadership' | 'Enterprise AI';
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  accreditation: string;
  overview: string;
  modules: string[];
  audience: string;
  upcomingDate: string;
  seatsRemaining: number;
  highlightTag: string;
  accentColor: string;
  badge: string;
}

export interface NelcCardData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface VerificationRecord {
  certificateId: string;
  studentName: string;
  nationalIdMasked: string;
  courseTitle: string;
  accreditationBody: string;
  nelcLicenseNo: string;
  issueDate: string;
  validUntil: string;
  status: 'VERIFIED_ACTIVE' | 'EXPIRED' | 'PENDING';
  totalPduHours: number;
  grade: string;
  blockchainHash: string;
}
