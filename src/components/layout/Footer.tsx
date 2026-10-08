import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';
import { company } from '../../data/company';
import { footerNavigation } from '../../data/navigation';
import ContactDetails from '../common/ContactDetails';
import Logo from '../common/Logo';

function FooterHeading({ children }: { children: string }) {
  return (
    <Typography variant="overline" component="h2" sx={{ color: 'secondary.light', mb: 2.5 }}>
      {children}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'primary.dark', color: 'grey.300', pt: { xs: 8, md: 10 }, pb: 4 }}
    >
      <Container>
        <Grid container spacing={{ xs: 6, md: 8 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Logo inverse />
            <Typography variant="body2" sx={{ mt: 3, maxWidth: 380 }}>
              {company.summary}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <FooterHeading>Explore</FooterHeading>
            <Box component="nav" aria-label="Footer">
              <Stack component="ul" spacing={1.25} sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {footerNavigation.map((item) => (
                  <li key={item.path}>
                    <Link
                      component={RouterLink}
                      to={item.path}
                      variant="body2"
                      sx={{ color: 'grey.300', '&:hover': { color: 'common.white' } }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 7, md: 4 }}>
            <FooterHeading>Contact</FooterHeading>
            <ContactDetails inverse />
          </Grid>
        </Grid>

        <Box
          sx={(theme) => ({
            mt: { xs: 7, md: 9 },
            pt: 3,
            borderTop: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 1,
          })}
        >
          <Typography variant="caption">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </Typography>
          <Typography variant="caption">
            {company.registration} · {company.location}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
