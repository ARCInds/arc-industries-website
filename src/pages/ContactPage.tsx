import { Box, Button, Grid, Link, Stack, Typography } from '@mui/material';
import type { LucideIcon } from 'lucide-react';
import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import GridPattern from '../components/common/GridPattern';
import PageHero from '../components/common/PageHero';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import EnquiryForm from '../components/contact/EnquiryForm';
import { company, contact } from '../data/company';
import { pageHeroImages } from '../data/images';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

interface DetailRow {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
}

const details: DetailRow[] = [
  { label: 'Company', value: company.name, icon: Building2 },
  { label: 'Phone', value: contact.phoneInternational, href: contact.phoneHref, icon: Phone },
  { label: 'Email', value: contact.email, href: contact.emailHref, icon: Mail },
  { label: 'Location', value: contact.location, icon: MapPin },
];

export default function ContactPage() {
  usePageMeta(pageMeta.contact);

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        background={pageHeroImages.contact}
        eyebrow="Contact ARC Industries"
        title="Have a project in mind?"
        subtitle="We welcome enquiries for Government, PSU, commercial, residential and other construction projects."
      />

      <Section labelledBy="enquiry-heading" fill>
        <Grid container spacing={{ xs: 8, md: 10 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <SectionHeading
              id="enquiry-heading"
              eyebrow="Enquiry"
              title="Send an Enquiry"
              subtitle="Tell us about your project and requirements."
              dense
            />
            <EnquiryForm />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <Box
                component="section"
                aria-labelledby="details-heading"
                sx={(theme) => ({
                  position: 'relative',
                  overflow: 'hidden',
                  p: { xs: 3, md: 4 },
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.brand.cardShadowHover,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    insetInline: 0,
                    top: 0,
                    height: 4,
                    backgroundImage: theme.brand.gradient,
                  },
                })}
              >
                <Typography
                  id="details-heading"
                  variant="h5"
                  component="h2"
                  sx={{ color: 'primary.main', mb: 1 }}
                >
                  Contact Details
                </Typography>
                <Box
                  component="address"
                  sx={{
                    fontStyle: 'normal',
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(2, minmax(0, 1fr))',
                      lg: 'auto auto',
                    },
                    columnGap: { md: 3, lg: 2.5 },
                  }}
                >
                  {details.map(({ label, value, href, icon: Icon }) => (
                    <Box
                      key={label}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        py: { xs: 2, md: 1.75 },
                        borderBottom: 1,
                        borderColor: 'divider',
                        '&:last-of-type': { borderBottom: 0, pb: 0 },
                        // In the two-column layout the last row has no divider.
                        '&:nth-last-of-type(2)': { borderBottom: { md: 0 }, pb: { md: 0 } },
                      }}
                    >
                      <Box sx={{ color: 'secondary.dark', display: 'flex', pt: 0.5 }}>
                        <Icon size={20} strokeWidth={1.5} aria-hidden />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="overline"
                          component="p"
                          sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                        >
                          {label}
                        </Typography>
                        {href ? (
                          <Link
                            href={href}
                            sx={{
                              fontWeight: 600,
                              color: 'primary.main',
                              // Phone and email stay on one line on large screens; the columns size to fit them.
                              whiteSpace: { lg: 'nowrap' },
                              wordBreak: 'break-word',
                            }}
                          >
                            {value}
                          </Link>
                        ) : (
                          <Typography sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {value}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                component="section"
                aria-labelledby="direct-heading"
                sx={(theme) => ({
                  position: 'relative',
                  overflow: 'hidden',
                  p: { xs: 3, md: 4 },
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  backgroundImage: theme.brand.deepGradient,
                  color: 'common.white',
                  boxShadow: theme.brand.glow,
                })}
              >
                <GridPattern size={48} />
                <Box sx={{ position: 'relative' }}>
                  <Typography
                    id="direct-heading"
                    variant="h5"
                    component="h2"
                    sx={{ color: 'common.white' }}
                  >
                    Prefer to speak directly?
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'grey.400' }}>
                    Call or email ARC Industries to discuss your requirement.
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
                    spacing={1.5}
                    sx={{ mt: 3 }}
                  >
                    <Button
                      href={contact.phoneHref}
                      variant="contained"
                      color="secondary"
                      startIcon={<Phone size={16} aria-hidden />}
                    >
                      Call {contact.phoneInternational}
                    </Button>
                    <Button
                      href={contact.emailHref}
                      variant="outlined"
                      startIcon={<Mail size={16} aria-hidden />}
                      sx={{
                        color: 'common.white',
                        borderColor: 'grey.500',
                        '&:hover': { borderColor: 'common.white' },
                      }}
                    >
                      Email Us
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Section>
    </>
  );
}
