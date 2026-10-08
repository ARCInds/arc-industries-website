import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Mail } from 'lucide-react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useRef, useState } from 'react';
import { contact } from '../../data/company';
import { services } from '../../data/services';
import type { EnquiryErrors, EnquiryValues } from '../../utils/enquiry';
import { buildEnquiryMailto, validateEnquiry } from '../../utils/enquiry';

const PROJECT_TYPES = [...services.map((service) => service.title), 'Other'];

const EMPTY_VALUES: EnquiryValues = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
};

/**
 * Enquiry form UI. No submission service is connected yet, so a valid submission does
 * NOT send anything: it explains this and offers to open the visitor's email app with the
 * enquiry filled in. To connect a form service later, replace `handleValidSubmit`.
 */
export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [readyToEmail, setReadyToEmail] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setReadyToEmail(false);
  };

  const handleValidSubmit = () => {
    setReadyToEmail(true);
    // Move focus to the notice so keyboard and screen-reader users hear the outcome.
    requestAnimationFrame(() => noticeRef.current?.focus());
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setReadyToEmail(false);
      return;
    }
    handleValidSubmit();
  };

  const fieldProps = (name: keyof EnquiryValues) => ({
    name,
    value: values[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
  });

  return (
    <Box component="form" ref={formRef} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Name" required autoComplete="name" {...fieldProps('name')} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Company / Organisation"
            autoComplete="organization"
            {...fieldProps('organisation')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            type="email"
            required
            autoComplete="email"
            {...fieldProps('email')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Phone" type="tel" autoComplete="tel" {...fieldProps('phone')} />
        </Grid>
        <Grid size={12}>
          <TextField select label="Project Type" {...fieldProps('projectType')}>
            <MenuItem value="">
              <em>Select a project type</em>
            </MenuItem>
            {PROJECT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={12}>
          <TextField label="Message" required multiline minRows={5} {...fieldProps('message')} />
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 3.5,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          gap: { xs: 2, sm: 3 },
        }}
      >
        <Button type="submit" variant="contained" size="large" sx={{ flexShrink: 0 }}>
          Send Enquiry
        </Button>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Online submission is not connected yet. Send Enquiry will help you send your enquiry by
          email instead.
        </Typography>
      </Box>

      {readyToEmail && (
        <Alert
          ref={noticeRef}
          tabIndex={-1}
          severity="info"
          role="status"
          sx={{
            mt: 3.5,
            borderRadius: 0.5,
            bgcolor: 'background.muted',
            color: 'text.primary',
            borderLeft: 3,
            borderColor: 'secondary.main',
            '& .MuiAlert-icon': { color: 'secondary.dark' },
          }}
        >
          <AlertTitle>Your enquiry has not been sent yet</AlertTitle>
          <Typography variant="body2">
            Online enquiries are not available yet. Open your email app with your enquiry already
            filled in, then send it to {contact.email}. You can also call{' '}
            {contact.phoneInternational}.
          </Typography>
          <Button
            href={buildEnquiryMailto(values)}
            variant="outlined"
            size="small"
            startIcon={<Mail size={16} aria-hidden />}
            sx={{ mt: 2 }}
          >
            Email This Enquiry
          </Button>
        </Alert>
      )}
    </Box>
  );
}
