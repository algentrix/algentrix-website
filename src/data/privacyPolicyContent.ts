export const PRIVACY_EFFECTIVE_DATE = '27 September 2026'

export type PrivacyListBlock = {
  title?: string
  items: string[]
  note?: string
}

export type PrivacySectionContent = {
  id: string
  title: string
  intro?: string
  paragraphs?: string[]
  lists?: PrivacyListBlock[]
  closing?: string[]
}

export const PRIVACY_INTRO = [
  'Algentrix (“we”, “our”, or “us”) provides WorkPulse, workforce-management software for businesses, including small and medium businesses.',
  'The customer company creates and manages employee accounts and workforce data in WorkPulse. Employees use the application under their employer’s company account. Algentrix processes that information to operate WorkPulse.',
  'This Privacy Policy explains what WorkPulse collects, how it is used, where it is stored, and how to ask a privacy or deletion question.',
]

export const PRIVACY_SECTIONS: PrivacySectionContent[] = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    intro:
      'WorkPulse collects the information below when a company and its employees use the application.',
    lists: [
      {
        title: 'Account information',
        items: [
          'Name',
          'Mobile number',
          'Email address, when provided',
          'Employee code',
          'User ID',
          'Company and tenant information',
          'Role',
          'Permissions',
        ],
        note: 'The customer company creates and manages employee accounts.',
      },
      {
        title: 'Attendance and work information',
        items: [
          'Check-in and check-out timestamps',
          'Attendance status',
          'Site assignment details',
          'Task information',
        ],
      },
      {
        title: 'Location',
        items: [
          'Precise GPS when marking attendance',
          'GPS when setting up or validating a work site',
        ],
        note: 'Location is used for attendance and site functionality. It is not collected continuously in the background.',
      },
      {
        title: 'Photos, audio, and files',
        items: [
          'Attendance selfie or photo',
          'Task photos',
          'Task voice notes',
          'Expense or bill photos',
          'Other uploaded work files',
        ],
        note: 'These files are used for workforce and work-operation tasks.',
      },
      {
        title: 'Employee documents',
        items: [
          'Aadhaar',
          'PAN',
          'Bank passbook',
          'Medical certificates',
          'Licences',
          'Other employment or work-related documents',
        ],
        note: 'A company may upload these when its own requirements call for them. WorkPulse does not require every employee to provide every document.',
      },
      {
        title: 'Payroll and bank details',
        items: [
          'Salary',
          'Payroll records',
          'Allowances',
          'Deductions',
          'Overtime',
          'Bank name, if provided',
          'Bank account number, if provided',
        ],
        note: 'These are used for payroll and workforce management inside WorkPulse. Bank details are optional, and not every user provides them. WorkPulse does not send salary or bank information to a bank or payment gateway.',
      },
      {
        title: 'Device and sign-in information',
        items: [
          'Device manufacturer',
          'Device model',
          'Android version',
          'App version',
          'Android device ID',
          'IP address associated with OTP requests',
          'OTP authentication information',
        ],
        note: 'This information supports authentication, security, device and session management, and app functionality.',
      },
    ],
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Information',
    intro: 'WorkPulse uses this information to:',
    lists: [
      {
        items: [
          'Verify attendance and keep attendance proof',
          'Set up and validate work sites',
          'Manage tasks, expenses, and work files',
          'Store employee documents the company chooses to collect',
          'Run payroll for the customer company',
          'Sign users in, protect accounts, and operate the app',
          'Provide customer support',
        ],
      },
    ],
  },
  {
    id: 'location-usage',
    title: 'Location Usage',
    intro:
      'Precise GPS is used for workforce, attendance, and site functionality. WorkPulse does not collect location continuously in the background.',
    lists: [
      {
        title: 'Location is used when someone:',
        items: [
          'Checks in or checks out',
          'Sets up a work site',
          'Validates a work site',
        ],
      },
    ],
  },
  {
    id: 'photos-voice-and-documents',
    title: 'Photos, Voice Notes & Documents',
    intro:
      'An attendance selfie or photo is collected as attendance verification and proof. The photo is uploaded to WorkPulse.',
    paragraphs: [
      'Authorized users in the same company can access attendance evidence. Attendance photos are not public.',
      'Task photos, task voice notes, expense or bill photos, and other work files are used for workforce and work-operation functionality.',
      'Employee documents, such as Aadhaar, PAN, a bank passbook, medical certificates, or licences, are collected only when the company’s configured requirements call for them.',
    ],
    closing: [
      'Attendance photos are not automatically deleted after 45 days. WorkPulse does not currently enforce that deletion.',
    ],
  },
  {
    id: 'data-storage-security',
    title: 'Data Storage & Security',
    intro: 'WorkPulse information may be stored:',
    lists: [
      {
        items: [
          'On the user’s device, for limited app functionality and cache',
          'On WorkPulse servers operated by Algentrix',
          'In database records',
          'In uploaded files, photos, voice notes, and documents',
        ],
      },
      {
        title: 'We protect this information with:',
        items: [
          'HTTPS encrypted communication',
          'Access controls',
          'Secure authentication',
          'Role-based authorization',
          'Secure server infrastructure',
        ],
      },
    ],
    closing: ['No system can guarantee complete security.'],
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    intro: 'We do not sell personal information.',
    lists: [
      {
        title: 'Information may be shared:',
        items: [
          'With the user’s employer or company',
          'With authorized users in that same company',
          'With the service providers named in this policy, only as needed to provide WorkPulse',
          'When legally required',
        ],
      },
    ],
    closing: [
      'If you choose the action yourself, WorkPulse can open WhatsApp, the phone dialer, or the Android share sheet. WorkPulse does not automatically send employee data to WhatsApp.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    intro:
      'WorkPulse uses the services below to deliver the product. It does not use an advertising SDK, an advertising ID, an analytics SDK, or a crash-reporting SDK in the mobile application.',
    paragraphs: [
      'Google Analytics on the public Algentrix website is separate. It is not part of the WorkPulse mobile application.',
    ],
    lists: [
      {
        items: [
          'MSG91, to send OTP SMS. WorkPulse sends the mobile number and OTP delivery information to MSG91.',
          'Google Maps, for map and location functionality.',
          'Google Geocoding, to convert coordinates and addresses for site and location functionality.',
          'Google Places, for location and place search.',
          'Google Fonts, to display fonts.',
        ],
      },
    ],
    closing: [
      'These services are not advertising. They process only the information needed for the function above.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    intro:
      'How long information is kept depends on the type of data and on business or legal requirements.',
    lists: [
      {
        title: 'Default periods we apply today:',
        items: [
          'OTP request records: about 7 days',
          'Temporary uploads that are not linked to a record: about 6 hours',
        ],
      },
    ],
    closing: [
      'Other business records, including attendance, photos, documents, tasks, and payroll, are kept while the customer company needs them and as required for business or legal reasons.',
      'Attendance photos are not automatically deleted after 45 days.',
    ],
  },
  {
    id: 'account-access',
    title: 'Account Access, Deactivation & Deletion',
    intro:
      'Logging out does not delete information stored on WorkPulse servers. The app does not have a Delete Account button.',
    lists: [
      {
        items: [
          'Logout signs you out on that device. Server records remain.',
          'User deactivation is managed by the company and turns off that person’s access. It does not by itself delete all server data.',
          'Worker profile deletion is a company action that removes a worker profile. It is separate from logout and from deactivation.',
          'Company deactivation stops that customer company’s access to WorkPulse.',
          'A data-deletion request can be emailed to support@algentrix.com. Include the company name and what you want reviewed.',
        ],
      },
    ],
    closing: [
      'The customer company manages employee records, so a request about an employee account may need to be confirmed with that company.',
    ],
  },
  {
    id: 'user-responsibilities',
    title: 'User Responsibilities',
    intro: 'Users are responsible for:',
    lists: [
      {
        items: [
          'Keeping login credentials and OTP codes private',
          'Using WorkPulse only for authorized business purposes',
          'Providing accurate attendance and task information',
        ],
      },
    ],
  },
  {
    id: 'childrens-privacy',
    title: 'Children’s Privacy',
    paragraphs: [
      'WorkPulse is a business and workforce-management application. It is not directed toward children. Accounts are created and managed by business customers. It is not designed for children under 13.',
    ],
  },
  {
    id: 'changes-to-policy',
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. The date at the top of this page is the effective date of the current version.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    intro:
      'For privacy questions, or to request deletion of personal information, contact:',
  },
]

export const PRIVACY_ABOUT_ID = 'about-this-policy'

export const PRIVACY_TOC_ITEMS = [
  { id: PRIVACY_ABOUT_ID, title: 'About this Policy' },
  ...PRIVACY_SECTIONS.map(({ id, title }) => ({ id, title })),
]
