export const PRIVACY_EFFECTIVE_DATE = '19 May 2026'

export type PrivacyListBlock = {
  title?: string
  items: string[]
}

export type PrivacySectionContent = {
  id: string
  title: string
  intro?: string
  paragraphs?: string[]
  lists?: PrivacyListBlock[]
}

export const PRIVACY_INTRO = [
  'Algentrix (“we”, “our”, or “us”) values your privacy and is committed to protecting your personal information.',
  'This Privacy Policy explains how our Attendance and Performance Management System (“WorkPulse”) collects, uses, stores, and protects user information.',
]

export const PRIVACY_SECTIONS: PrivacySectionContent[] = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    intro: 'Our application may collect the following information:',
    lists: [
      {
        title: 'Personal Information',
        items: ['Name', 'Mobile number', 'Employee ID', 'Company information', 'User role'],
      },
      {
        title: 'Attendance & Work Information',
        items: [
          'Attendance records',
          'Check-in/check-out timestamps',
          'Site assignment details',
          'Task completion information',
        ],
      },
      {
        title: 'Location Information',
        items: [
          'The application collects GPS/location information during attendance check-in and check-out to verify attendance at assigned work sites.',
        ],
      },
      {
        title: 'Camera & Uploaded Media',
        items: ['Attendance photos', 'Task proof photos', 'Uploaded work-related documents'],
      },
      {
        title: 'Device Information',
        items: [
          'Device model',
          'Operating system',
          'App version',
          'Device identifiers (if required for security purposes)',
        ],
      },
    ],
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Information',
    intro: 'Collected information is used for:',
    lists: [
      {
        items: [
          'Attendance verification',
          'Site validation',
          'Task management',
          'Salary and payroll calculations',
          'Performance tracking',
          'Security and fraud prevention',
          'Customer support',
          'System improvement and analytics',
        ],
      },
    ],
  },
  {
    id: 'location-usage',
    title: 'Location Usage',
    intro: 'Location access is used only during attendance-related actions such as:',
    lists: [
      {
        items: ['Check-in', 'Check-out', 'Site validation'],
      },
    ],
    paragraphs: [
      'We do not continuously track user location in the background during the entire work shift unless explicitly stated by the employer.',
    ],
  },
  {
    id: 'camera-usage',
    title: 'Camera Usage',
    intro: 'Camera access is used for:',
    lists: [
      {
        items: ['Attendance photo capture', 'Task proof uploads', 'Work documentation'],
      },
    ],
    paragraphs: ['Photos are stored securely and used only for operational purposes.'],
  },
  {
    id: 'data-storage-security',
    title: 'Data Storage & Security',
    intro: 'We implement reasonable security measures to protect user information, including:',
    lists: [
      {
        items: [
          'HTTPS encrypted communication',
          'Access controls',
          'Secure authentication',
          'Role-based authorization',
          'Secure server infrastructure',
        ],
      },
    ],
    paragraphs: ['However, no system can guarantee complete security.'],
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    paragraphs: ['We do not sell personal information.'],
    intro: 'Information may be shared only:',
    lists: [
      {
        items: [
          'With the user’s employer/company',
          'With authorized administrators',
          'When legally required',
        ],
      },
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    paragraphs: [
      'Attendance records, uploaded photos, and related operational data may be retained for a limited period based on company policy and legal/business requirements.',
      'Some records may be automatically deleted after the retention period.',
    ],
  },
  {
    id: 'user-responsibilities',
    title: 'User Responsibilities',
    intro: 'Users are responsible for:',
    lists: [
      {
        items: [
          'Maintaining confidentiality of login credentials',
          'Using the application only for authorized business purposes',
          'Providing accurate attendance and task information',
        ],
      },
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    intro: 'The application may use third-party services including:',
    lists: [
      {
        items: [
          'SMS/OTP providers',
          'Cloud hosting providers',
          'Analytics or crash reporting services',
        ],
      },
    ],
    paragraphs: [
      'These providers may process limited data necessary for their services.',
    ],
  },
  {
    id: 'childrens-privacy',
    title: 'Children’s Privacy',
    paragraphs: [
      'This application is intended for business/workforce usage and is not designed for children under 13 years of age.',
    ],
  },
  {
    id: 'changes-to-policy',
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically. Continued use of the application after updates constitutes acceptance of the revised policy.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    intro: 'For questions or concerns regarding this Privacy Policy, please contact:',
  },
]

export const PRIVACY_ABOUT_ID = 'about-this-policy'

export const PRIVACY_TOC_ITEMS = [
  { id: PRIVACY_ABOUT_ID, title: 'About this Policy' },
  ...PRIVACY_SECTIONS.map(({ id, title }) => ({ id, title })),
]
