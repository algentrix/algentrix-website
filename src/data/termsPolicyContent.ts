import type { LegalSectionContent, LegalTocItem } from '../types/legalDocument'

export const TERMS_EFFECTIVE_DATE = '19 May 2026'

export const TERMS_ABOUT_ID = 'about-these-terms'

export const TERMS_INTRO = [
  'Welcome to Algentrix. These Terms & Conditions (“Terms”) govern your access to and use of the Algentrix website, applications, and workforce management platform known as “WorkPulse”.',
  'By accessing or using our services, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, you should not use the platform.',
]

export const TERMS_SECTIONS: LegalSectionContent[] = [
  {
    id: 'definitions',
    title: 'Definitions',
    intro: 'For the purposes of these Terms:',
    lists: [
      {
        items: [
          '“Algentrix”, “we”, “our”, or “us” refers to Algentrix and its services.',
          '“Platform” refers to the WorkPulse website, mobile application, and related services.',
          '“User” refers to any individual accessing or using the Platform.',
          '“Employer” refers to any company or organization using WorkPulse for workforce management.',
          '“Employee” refers to authorized personnel using the Platform under an employer account.',
          '“Administrator” refers to authorized users managing company accounts and settings.',
        ],
      },
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    intro: 'By using the Platform, you confirm that:',
    lists: [
      {
        items: [
          'You are authorized to use the Platform by your employer or organization.',
          'You are legally capable of entering into binding agreements.',
          'All information provided by you is accurate and current.',
          'You will use the Platform only for lawful business purposes.',
        ],
      },
    ],
  },
  {
    id: 'account-responsibilities',
    title: 'Account Responsibilities',
    intro: 'Users are responsible for:',
    lists: [
      {
        items: [
          'Maintaining the confidentiality of login credentials',
          'Restricting unauthorized access to their accounts',
          'Reporting suspected unauthorized access immediately',
          'Ensuring account information remains accurate',
        ],
      },
    ],
    paragraphs: ['Users must not share login credentials with unauthorized individuals.'],
  },
  {
    id: 'acceptable-use-policy',
    title: 'Acceptable Use Policy',
    intro: 'Users agree not to:',
    lists: [
      {
        items: [
          'Submit false attendance records',
          'Use GPS spoofing or location manipulation tools',
          'Upload harmful, illegal, or misleading content',
          'Attempt unauthorized access to systems or data',
          'Reverse engineer, copy, or disrupt the Platform',
          'Use the Platform for unlawful activities',
          'Interfere with system security or performance',
        ],
      },
    ],
    paragraphs: ['Violation of these Terms may result in suspension or termination of access.'],
  },
  {
    id: 'attendance-gps-verification',
    title: 'Attendance & GPS Verification',
    intro: 'WorkPulse may require GPS/location verification during attendance-related activities such as:',
    lists: [
      {
        items: ['Check-in', 'Check-out', 'Site validation'],
      },
    ],
    paragraphs: [
      'By using the Platform, users consent to attendance verification methods used by their employer or organization.',
      'Location information is collected only for operational and attendance verification purposes as described in our Privacy Policy.',
    ],
  },
  {
    id: 'camera-uploaded-content',
    title: 'Camera & Uploaded Content',
    intro: 'The Platform may allow users to upload:',
    lists: [
      {
        items: ['Attendance photos', 'Task proof images', 'Work-related documents'],
      },
    ],
    paragraphs: [
      'Users are solely responsible for uploaded content and must ensure it does not violate applicable laws or third-party rights.',
      'Algentrix reserves the right to remove inappropriate or unauthorized content.',
    ],
  },
  {
    id: 'employer-responsibilities',
    title: 'Employer Responsibilities',
    intro: 'Employers using WorkPulse are responsible for:',
    lists: [
      {
        items: [
          'Obtaining necessary employee consents',
          'Complying with labor and employment laws',
          'Ensuring lawful workforce monitoring practices',
          'Maintaining payroll and attendance accuracy',
          'Properly managing employee access and permissions',
        ],
      },
    ],
    paragraphs: ['Algentrix is not responsible for employer misuse of the Platform.'],
  },
  {
    id: 'privacy-data-protection',
    title: 'Privacy & Data Protection',
    paragraphs: [
      'Use of the Platform is also governed by our Privacy Policy.',
      'By using the Platform, users acknowledge that certain operational, attendance, and device-related information may be collected and processed for workforce management purposes.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    intro: 'The Platform may use third-party providers including:',
    lists: [
      {
        items: [
          'Cloud hosting services',
          'SMS/OTP providers',
          'Analytics services',
          'Crash reporting tools',
        ],
      },
    ],
    paragraphs: ['These providers may process limited data necessary for their services.'],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    intro:
      'All rights, title, and interest in the Platform — including software, source code, branding, logos, user interface designs, and content and documentation — remain the exclusive property of Algentrix.',
    lists: [
      {
        title: 'Users may not:',
        items: [
          'Copy',
          'Modify',
          'Distribute',
          'Resell',
          'Reverse engineer',
          'Reproduce any portion of the Platform without written permission',
        ],
      },
    ],
  },
  {
    id: 'subscription-payments',
    title: 'Subscription & Payments',
    intro:
      'Certain features or services may require paid subscriptions. Algentrix reserves the right to:',
    lists: [
      {
        items: [
          'Modify pricing',
          'Introduce new paid plans',
          'Suspend services for non-payment',
          'Change subscription features',
        ],
      },
    ],
    paragraphs: ['Unless otherwise stated, fees paid are non-refundable.'],
  },
  {
    id: 'system-availability',
    title: 'System Availability',
    paragraphs: [
      'While we strive to maintain reliable service, Algentrix does not guarantee uninterrupted or error-free availability of the Platform.',
      'Temporary interruptions may occur due to:',
    ],
    lists: [
      {
        items: [
          'Maintenance',
          'System upgrades',
          'Internet/network failures',
          'Third-party outages',
          'Technical issues beyond our control',
        ],
      },
    ],
  },
  {
    id: 'disclaimer-of-warranties',
    title: 'Disclaimer of Warranties',
    paragraphs: [
      'The Platform is provided on an “AS IS” and “AS AVAILABLE” basis without warranties of any kind, either express or implied.',
      'Algentrix does not guarantee:',
    ],
    lists: [
      {
        items: [
          'Continuous availability',
          'Error-free operation',
          'Complete accuracy of reports or calculations',
          'Compatibility with all devices or systems',
        ],
      },
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    intro: 'To the maximum extent permitted by law, Algentrix shall not be liable for:',
    lists: [
      {
        items: [
          'Indirect or consequential damages',
          'Loss of profits or business opportunities',
          'Payroll inaccuracies caused by incorrect inputs',
          'Data loss resulting from unauthorized access',
          'Service interruptions',
          'Device or internet failures',
          'Employer misuse of the Platform',
        ],
      },
    ],
    paragraphs: [
      'Total liability shall not exceed the amount paid for services during the preceding 12 months.',
    ],
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    intro: 'Users and employers agree to indemnify and hold harmless Algentrix from any claims, liabilities, damages, or expenses arising from:',
    lists: [
      {
        items: [
          'Violation of these Terms',
          'Misuse of the Platform',
          'Violation of laws or third-party rights',
        ],
      },
    ],
  },
  {
    id: 'termination-suspension',
    title: 'Termination & Suspension',
    intro: 'Algentrix reserves the right to suspend or terminate access to the Platform if users:',
    lists: [
      {
        items: [
          'Violate these Terms',
          'Engage in fraudulent or unlawful activities',
          'Compromise system security',
          'Misuse workforce data',
        ],
      },
    ],
    paragraphs: ['Upon termination, access to certain data or services may be restricted.'],
  },
  {
    id: 'changes-to-terms',
    title: 'Changes to Terms',
    paragraphs: [
      'We may update these Terms periodically.',
      'Updated versions will be posted on this page with a revised effective date. Continued use of the Platform after updates constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    paragraphs: [
      'These Terms shall be governed by and interpreted in accordance with the laws of India.',
      'Any disputes arising from these Terms shall be subject to the jurisdiction of the courts located in Pune, Maharashtra, India.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    intro: 'If you have questions regarding these Terms & Conditions, please contact:',
    contact: true,
  },
]

export const TERMS_TOC_ITEMS: LegalTocItem[] = [
  { id: TERMS_ABOUT_ID, title: 'About these Terms' },
  ...TERMS_SECTIONS.map(({ id, title }) => ({ id, title })),
]
