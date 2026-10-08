import { contact } from '../data/company';

export interface EnquiryValues {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please describe your requirement (at least 10 characters).';
  }
  return errors;
}

/** Builds a mailto: link that opens the visitor's email app with the enquiry filled in. */
export function buildEnquiryMailto(values: EnquiryValues): string {
  // Optional fields are skipped when empty; the blank line separates details from the message.
  const lines = [
    `Name: ${values.name}`,
    values.organisation ? `Company / Organisation: ${values.organisation}` : null,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    values.projectType ? `Project type: ${values.projectType}` : null,
    '',
    values.message,
  ].filter((line) => line !== null);
  const subject = `Project enquiry from ${values.name}`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
