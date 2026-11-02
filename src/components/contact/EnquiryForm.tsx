import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { CircleCheck, Mail, Send } from 'lucide-react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useRef, useState } from 'react';
import { contact } from '../../data/company';
import { services } from '../../data/services';
import { visuallyHidden } from '../../utils/a11y';
import type { EnquiryErrors, EnquiryValues } from '../../utils/enquiry';
import { buildEnquiryMailto, sendEnquiry, validateEnquiry } from '../../utils/enquiry';
import { SHORT_SCREEN } from '../../theme/theme';

const PROJECT_TYPES = [...services.map((service) => service.title), 'Other'];

const EMPTY_VALUES: EnquiryValues = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Enquiry form. A valid submission is emailed to ARC Industries via Web3Forms; the visitor sees
 * a confirmation only after delivery is confirmed. If sending fails, they can email the
 * enquiry from their own email app instead.
 */
export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [botcheck, setBotcheck] = useState('');
  const [sentValues, setSentValues] = useState<EnquiryValues | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  const focusNotice = () => {
    // Move focus to the outcome so keyboard and screen-reader users hear it.
    requestAnimationFrame(() => noticeRef.current?.focus());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await sendEnquiry(values, botcheck);
      setSentValues(values);
      setValues(EMPTY_VALUES);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
    focusNotice();
  };

  const fieldProps = (name: keyof EnquiryValues) => ({
    name,
    value: values[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    disabled: status === 'sending',
  });

  if (status === 'sent') {
    return (
      <Alert
        ref={noticeRef}
        tabIndex={-1}
        role="status"
        icon={<CircleCheck size={22} aria-hidden />}
        sx={{
          borderRadius: 1,
          bgcolor: 'background.muted',
          color: 'text.primary',
          borderLeft: 3,
          borderColor: 'success.main',
          '& .MuiAlert-icon': { color: 'success.main' },
        }}
      >
        <AlertTitle>
          Thank you{sentValues ? `, ${sentValues.name.trim()}` : ''}. Your enquiry has been sent.
        </AlertTitle>
        <Typography variant="body2">
          ARC Industries will get back to you at {sentValues?.email.trim() ?? 'your email address'}.
          For anything urgent, call {contact.phoneInternational}.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => {
            setStatus('idle');
            setSentValues(null);
          }}
        >
          Send Another Enquiry
        </Button>
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      // Slimmer fields on short screens so the form fits beside the contact details.
      sx={{ [SHORT_SCREEN]: { '& .MuiOutlinedInput-input': { py: 1.4 } } }}
      ref={formRef}
      noValidate
      onSubmit={(event: SubmitEvent<HTMLFormElement>) => {
        void handleSubmit(event);
      }}
    >
      {/* Spam trap: hidden from people and assistive technology; only bots fill it in. */}
      <Box aria-hidden sx={visuallyHidden}>
        <label>
          Leave this field empty
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            value={botcheck}
            onChange={(event) => {
              setBotcheck(event.target.value);
            }}
          />
        </label>
      </Box>

      <Grid container spacing={2.5} sx={{ [SHORT_SCREEN]: { '--Grid-rowSpacing': '12px' } }}>
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
          <TextField label="Message" required multiline minRows={3} {...fieldProps('message')} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3.5 }}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          disabled={status === 'sending'}
          endIcon={
            status === 'sending' ? (
              <CircularProgress size={16} color="inherit" aria-hidden />
            ) : (
              <Send size={16} aria-hidden />
            )
          }
        >
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
        </Button>
      </Box>

      {status === 'error' && (
        <Alert
          ref={noticeRef}
          tabIndex={-1}
          severity="error"
          role="alert"
          sx={{ mt: 3.5, borderRadius: 1 }}
        >
          <AlertTitle>Your enquiry could not be sent</AlertTitle>
          <Typography variant="body2">
            Please check your internet connection and try again. You can also email your enquiry
            directly to {contact.email} or call {contact.phoneInternational}.
          </Typography>
          <Button
            href={buildEnquiryMailto(values)}
            variant="outlined"
            color="inherit"
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
