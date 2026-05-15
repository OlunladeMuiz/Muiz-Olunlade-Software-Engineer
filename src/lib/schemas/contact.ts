import { z } from 'zod';

export const contactSubjectOptions = [
  { value: 'job', label: 'Job Opportunity' },
  { value: 'collab', label: 'Collaboration' },
  { value: 'other', label: 'Other' }
] as const;

export type ContactSubject = (typeof contactSubjectOptions)[number]['value'];

const contactSubjectValues = contactSubjectOptions.map((option) => option.value) as [
  ContactSubject,
  ...ContactSubject[]
];

export const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name should be at least 2 characters.')
      .max(100, 'Keep the name under 100 characters.'),
    email: z
      .string()
      .trim()
      .email('Enter a valid email address.')
      .max(254, 'Keep the email under 254 characters.'),
    subject: z.enum(contactSubjectValues),
    message: z
      .string()
      .trim()
      .min(10, 'Message should be at least 10 characters.')
      .max(2000, 'Keep the message under 2000 characters.'),
    honeypot: z.string().trim().max(0).default('')
  })
  .strict();

export type ContactFormData = z.infer<typeof contactSchema>;
