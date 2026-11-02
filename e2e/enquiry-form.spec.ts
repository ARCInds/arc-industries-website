import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

/*
 * The Web3Forms request is intercepted in every test, so running the suite never sends a
 * real email to info@arcinds.com.
 */
const WEB3FORMS = 'https://api.web3forms.com/submit';

// The form tests do not need the remote header photos; skipping them keeps the tests fast.
test.beforeEach(async ({ page }) => {
  await page.route('https://images.unsplash.com/**', (route) => route.abort());
});

async function fillValidEnquiry(page: Page) {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Name').fill('Playwright Test');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Message').fill('Automated test enquiry for the contact form.');
}

test('shows validation errors and focuses the first invalid field', async ({ page }) => {
  let requests = 0;
  await page.route(WEB3FORMS, (route) => {
    requests++;
    return route.abort();
  });
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Send Enquiry' }).click();

  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await expect(page.getByText('Please enter your email address.')).toBeVisible();
  await expect(page.getByLabel('Name')).toBeFocused();

  await page.getByLabel('Name').fill('Test');
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByRole('button', { name: 'Send Enquiry' }).click();
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  expect(requests, 'invalid forms must not be submitted').toBe(0);
});

test('a successful submission shows the confirmation only after delivery', async ({ page }) => {
  let submitted: string | null = null;
  await page.route(WEB3FORMS, async (route) => {
    submitted = route.request().postData();
    await route.fulfill({ json: { success: true, message: 'Form submitted successfully!' } });
  });
  await fillValidEnquiry(page);
  await page.getByRole('button', { name: 'Send Enquiry' }).click();

  await expect(page.getByText('Your enquiry has been sent.')).toBeVisible();
  expect(submitted).toContain('862e067f-3832-4d9f-9e7c-c3035c7d6464');
  expect(submitted).toContain('Playwright Test');
  expect(submitted).toContain('test@example.com');

  await page.getByRole('button', { name: 'Send Another Enquiry' }).click();
  await expect(page.getByLabel('Name')).toHaveValue('');
});

test('a failed submission keeps the details and offers the email fallback', async ({ page }) => {
  await page.route(WEB3FORMS, (route) =>
    route.fulfill({ status: 500, json: { success: false, message: 'Server error' } }),
  );
  await fillValidEnquiry(page);
  await page.getByRole('button', { name: 'Send Enquiry' }).click();

  await expect(page.getByText('Your enquiry could not be sent')).toBeVisible();
  await expect(page.getByText('Your enquiry has been sent.')).toHaveCount(0);
  await expect(page.getByLabel('Name')).toHaveValue('Playwright Test');
  await expect(page.getByRole('link', { name: 'Email This Enquiry' })).toHaveAttribute(
    'href',
    /^mailto:info@arcinds\.com\?subject=/,
  );
});
