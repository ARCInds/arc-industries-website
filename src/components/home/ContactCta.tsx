import { Box, Button, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router';
import { paths } from '../../routes/paths';
import ContactDetails from '../common/ContactDetails';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

const DEFAULT_SUBTITLE =
  "Let's discuss how ARC Industries can support your next civil or infrastructure project.";

interface ContactCtaProps {
  subtitle?: string;
}

/** Closing navy call-to-action, shared by the homepage and inner pages. */
export default function ContactCta({ subtitle = DEFAULT_SUBTITLE }: ContactCtaProps) {
  return (
    <Section labelledBy="cta-heading" tone="dark" withGrid>
      <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <SectionHeading
            id="cta-heading"
            eyebrow="Contact"
            title="Have a project in mind?"
            subtitle={subtitle}
            inverse
            dense
          />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to={paths.contact}
            endIcon={<ArrowRight size={18} aria-hidden />}
            sx={{ mt: 2 }}
          >
            Get in Touch
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={(theme) => ({
              p: { xs: 3, md: 4 },
              border: `1px solid ${alpha(theme.palette.common.white, 0.16)}`,
              bgcolor: alpha(theme.palette.common.white, 0.03),
              color: 'grey.300',
            })}
          >
            <ContactDetails inverse />
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
