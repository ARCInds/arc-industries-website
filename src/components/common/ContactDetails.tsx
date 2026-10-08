import { Link, Stack, Typography } from '@mui/material';
import type { LucideIcon } from 'lucide-react';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { contact } from '../../data/company';

interface ContactDetailsProps {
  /** Use light text when placed on a dark background. */
  inverse?: boolean;
}

function ContactRow({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Icon size={18} aria-hidden style={{ flexShrink: 0 }} />
      {children}
    </Stack>
  );
}

/** Official location, phone and email, with clickable phone and email links. */
export default function ContactDetails({ inverse = false }: ContactDetailsProps) {
  const linkSx = inverse
    ? { color: 'grey.300', '&:hover': { color: 'common.white' } }
    : { color: 'primary.main', fontWeight: 600 };

  return (
    <Stack component="address" spacing={1.5} sx={{ fontStyle: 'normal' }}>
      <ContactRow icon={MapPin}>
        <Typography variant="body2">{contact.location}</Typography>
      </ContactRow>
      <ContactRow icon={Phone}>
        <Link href={contact.phoneHref} variant="body2" sx={linkSx}>
          {contact.phoneInternational}
        </Link>
      </ContactRow>
      <ContactRow icon={Mail}>
        <Link href={contact.emailHref} variant="body2" sx={{ ...linkSx, wordBreak: 'break-all' }}>
          {contact.email}
        </Link>
      </ContactRow>
    </Stack>
  );
}
