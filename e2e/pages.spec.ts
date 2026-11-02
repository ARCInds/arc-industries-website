import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', title: /Construction & Civil Engineering Company in Bengaluru/ },
  { path: '/about', title: /About ARC Industries/ },
  { path: '/services', title: /Construction Services/ },
  { path: '/projects', title: /Projects \| ARC Industries/ },
  { path: '/clients', title: /Clients/ },
  { path: '/certifications', title: /Registrations & Credentials/ },
  { path: '/contact', title: /Contact ARC Industries/ },
];

for (const { path, title } of pages) {
  test(`${path} loads with one h1, a title and no console errors`, async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));

    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://arcinds.com${path}`,
    );

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, 'page should not scroll sideways').toBeLessThanOrEqual(0);
    expect(problems).toEqual([]);
  });
}

test('unknown routes show the 404 page and are not indexed', async ({ page }) => {
  await page.goto('/no-such-page');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('contact details are correct everywhere', async ({ page }) => {
  await page.goto('/');
  for (const link of await page.locator('a[href^="tel:"]').all()) {
    await expect(link).toHaveAttribute('href', 'tel:+919591158442');
  }
  for (const link of await page.locator('a[href^="mailto:"]').all()) {
    await expect(link).toHaveAttribute('href', /^mailto:info@arcinds\.com/);
  }
  await expect(
    page.getByRole('link', { name: /Chat with ARC Industries on WhatsApp/ }),
  ).toHaveAttribute('href', /^https:\/\/wa\.me\/919591158442\?text=/);
  await expect(page.locator('footer')).toContainText('+91 9591158442');
  await expect(page.locator('footer')).toContainText('info@arcinds.com');
});

test('temporary images are labelled as illustrative', async ({ page }) => {
  await page.goto('/projects');
  const images = page.locator('main img[alt^="Illustrative image:"]');
  await expect(images.first()).toBeVisible();
  await expect(page.getByText('Illustrative image', { exact: true }).first()).toBeVisible();
});
