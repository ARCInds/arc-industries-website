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

/*
 * Enquiries are delivered by Web3Forms (https://web3forms.com) to the inbox registered for this
 * access key (info@arcinds.com). The key only identifies where to deliver submissions; it is
 * safe to publish and grants no access to the mailbox.
 */
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '862e067f-3832-4d9f-9e7c-c3035c7d6464';

/**
 * Sends the enquiry by email. Resolves only when Web3Forms confirms delivery; throws otherwise.
 * `botcheck` is the honeypot field: real visitors never fill it, so bots that do are rejected.
 */
export async function sendEnquiry(values: EnquiryValues, botcheck: string): Promise<void> {
  const fields: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Website enquiry from ${values.name.trim()}`,
    from_name: 'ARC Industries Website',
    // Web3Forms sets the reply-to address to `email`, so replies go straight to the visitor.
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || 'Not provided',
    'Company / Organisation': values.organisation.trim() || 'Not provided',
    'Project type': values.projectType || 'Not specified',
    message: values.message.trim(),
    botcheck,
  };
  // FormData is sent as a "simple" request, so the browser needs no cross-origin preflight.
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) body.append(key, value);
  const response = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body });
  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  if (!response.ok || !result?.success) {
    throw new Error('The enquiry could not be sent.');
  }
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
