import { Course, NelcCardData, VerificationRecord } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'hse-mastery',
    category: 'HSE',
    title: 'Occupational Health, Safety & Industrial Risk Management',
    subtitle: 'Aramco & OSHA Standard Process Safety with NEBOSH Framework',
    duration: '6 Weeks (120 Contact Hours)',
    level: 'Advanced Practitioner',
    accreditation: 'NEBOSH & IOSH Certified • TVTC Approved',
    overview: 'Engineered specifically for petrochemical plants, offshore rigs, and manufacturing hubs across the Eastern Province. Master HAZOP analysis, permit-to-work protocols, dynamic risk evaluation, and emergency triage.',
    modules: [
      'Hazard Identification & Quantitative Risk Assessment (QRA)',
      'Aramco WPR (Work Permit Receiver) Protocol Compliance',
      'Process Safety Management (PSM) for High-Pressure Hydrocarbons',
      'Confined Space Entry & Hydrogen Sulfide (H2S) Critical Safety',
      'Environmental Impact Assessment & Emission Standards in KSA'
    ],
    audience: 'Safety Officers, Facility Engineers, Industrial Site Supervisors in Jubail & Dammam',
    upcomingDate: 'October 12, 2026',
    seatsRemaining: 4,
    highlightTag: 'Critical Industry Mandate',
    accentColor: '#00F0FF',
    badge: 'HSE CORE'
  },
  {
    id: 'tech-automation',
    category: 'Technical',
    title: 'PLC, SCADA & Industrial Process Automation',
    subtitle: 'Hands-on Siemens S7-1500 & Rockwell Allen-Bradley Architecture',
    duration: '8 Weeks (160 Lab Hours)',
    level: 'Professional Specialist',
    accreditation: 'NELC Licensed • ISA Aligned Standards',
    overview: 'Intensive physical and simulated laboratory training. Program, configure, diagnose, and secure programmable logic controllers, HMI dashboards, and distributed control systems (DCS) powering regional energy infrastructures.',
    modules: [
      'Ladder Logic, Function Block & Structured Text Programming',
      'SCADA Network Topology & Industrial Ethernet Communications',
      'Telemetry, Fieldbus & HART Protocol Transducer Calibration',
      'Operational Technology (OT) Cybersecurity for Industrial Assets',
      'Predictive Maintenance Telemetry & Failure Mode Diagnostics'
    ],
    audience: 'Automation Engineers, Instrumentation Technicians, Mechatronics Graduates',
    upcomingDate: 'October 19, 2026',
    seatsRemaining: 6,
    highlightTag: 'Live Hardware Labs',
    accentColor: '#38BDF8',
    badge: 'AUTOMATION'
  },
  {
    id: 'exec-leadership',
    category: 'Leadership',
    title: 'Executive Strategic Leadership & Operational Governance',
    subtitle: 'Navigating Mega-Projects & Saudi Vision 2030 Corporate Transformation',
    duration: '4 Weeks (Executive Weekend Cohort)',
    level: 'Senior Executive',
    accreditation: 'ILM Recognized • NELC Digital Benchmark',
    overview: 'Designed for C-suite leaders and plant directors steering massive capital initiatives. Master organizational resilience, Saudi labor regulatory governance, cross-cultural leadership, and agile capital deployment.',
    modules: [
      'Strategic Decision-Making under Market Volatility & Energy Transition',
      'Agile Mega-Project Governance & Stakeholder Alignment',
      'Financial Modeling, Capex Prioritization & Risk Hedging',
      'Talent Saudization Strategies & High-Performance Team Culture',
      'Corporate ESG Compliance & Sustainability Mandates in KSA'
    ],
    audience: 'Operations Directors, General Managers, Senior Project Controllers',
    upcomingDate: 'November 2, 2026',
    seatsRemaining: 3,
    highlightTag: 'C-Suite Preferred',
    accentColor: '#E2E8F0',
    badge: 'LEADERSHIP'
  },
  {
    id: 'enterprise-ai',
    category: 'Enterprise AI',
    title: 'Applied Industrial AI & Predictive Asset Analytics',
    subtitle: 'Machine Learning for Refineries, Supply Chains & Equipment Health',
    duration: '5 Weeks (100 Practical Hours)',
    level: 'Intermediate to Advanced',
    accreditation: 'NELC Accredited • Star AI Lab Certificate',
    overview: 'Deploy edge AI models and real-time computer vision for anomaly detection in oil & gas pipelines, supply chain optimization, and automated quality control for Dammam industrial manufacturers.',
    modules: [
      'Time-Series Sensor Forecasting & Vibration Anomaly Detection',
      'Computer Vision for Automated PPE & Safety Protocol Inspection',
      'Energy Consumption Optimization with Deep Reinforcement Models',
      'Enterprise LLM Deployment on Private Sovereign Cloud Infrastructure',
      'Data Governance & NCA Saudi Cyber Regulation Compliance'
    ],
    audience: 'Data Engineers, Systems Architects, Operations Optimization Leads',
    upcomingDate: 'November 16, 2026',
    seatsRemaining: 8,
    highlightTag: 'Next-Gen Edge AI',
    accentColor: '#22D3EE',
    badge: 'AI SYSTEMS'
  }
];

export const NELC_CARDS: NelcCardData[] = [
  {
    id: 'mission',
    number: '01',
    title: 'Our Mission',
    subtitle: 'Elevating Saudi Human Capital to Global Industrial Standards',
    description: 'Star Education was established in Dammam to directly bridge the capability gap between regional academic output and the exacting requirements of modern petrochemical, logistic, and automation enterprises. We cultivate operational resilience and technical mastery through world-class simulators, veteran field practitioners, and bilingual curriculum delivery.',
    metrics: [
      { label: 'Corporate Partners', value: '140+' },
      { label: 'Job Readiness Score', value: '96.8%' },
      { label: 'Dammam Campus Labs', value: '12 State-of-Art' }
    ],
    tags: ['Vision 2030 Catalyst', 'Eastern Province Focus', 'Direct Industry Placement']
  },
  {
    id: 'lms',
    number: '02',
    title: 'LMS Integration',
    subtitle: 'Frictionless Enterprise Learning Ecosystem with Real-Time HR Telemetry',
    description: 'Our enterprise LMS platform integrates seamlessly with corporate HRIS frameworks (SAP SuccessFactors, Oracle Cloud HCM, Workday). Featuring biometric attendance synchronization, micro-learning mobile modules, tamper-proof digital credentials, and granular skill-gap analytics tailored for enterprise compliance audits.',
    metrics: [
      { label: 'API Uptime SLA', value: '99.98%' },
      { label: 'Enterprise Single Sign-On', value: 'SAML / Azure AD' },
      { label: 'Automated Audit Reports', value: 'Instant One-Click' }
    ],
    tags: ['SCORM 2004 / xAPI', 'Automated Biometrics', 'Custom Corporate Portals']
  },
  {
    id: 'nelc',
    number: '03',
    title: 'NELC Compliance',
    subtitle: 'Gold-Standard Institutional Accreditation by the National eLearning Center',
    description: 'Star Education operates under full institutional and program-level accreditation from Saudi Arabia’s National eLearning Center (NELC). Every digital lecture, interactive simulation, and assessment rubric undergoes rigorous scrutiny to meet National Qualifications Framework (NQF) standards.',
    metrics: [
      { label: 'NELC License', value: '#SA-NELC-8492' },
      { label: 'NQF Level Alignment', value: 'Levels 5, 6 & 7' },
      { label: 'Audit Verification Rate', value: '100% Zero Defect' }
    ],
    tags: ['National Qualifications Framework', 'Official Saudi Certification', 'Tamper-Proof Audit']
  }
];

export const SAMPLE_VERIFICATION: VerificationRecord = {
  certificateId: 'SE-DMM-2026-9842',
  studentName: 'Eng. Abdulrahman M. Al-Ghamdi',
  nationalIdMasked: '108****491',
  courseTitle: 'Executive Process Safety Management & Advanced HAZOP Risk Assessment',
  accreditationBody: 'Star Education Institute • NELC Accredited #SA-8492',
  nelcLicenseNo: 'KSA-NELC-DMM-8492-V26',
  issueDate: 'August 28, 2026',
  validUntil: 'August 27, 2029',
  status: 'VERIFIED_ACTIVE',
  totalPduHours: 120,
  grade: 'Distinction (97.4%)',
  blockchainHash: '0x8b4f7e21a9c3d401e56b829fa012d93e56a472c1f9b304859a1c6e2849bfa813'
};
