import { expect, test } from '@playwright/test';

test.describe('desktop navigation', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop only');

  test('header links open each page and mark it as current', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });
    for (const label of ['About', 'Services', 'Projects', 'Clients']) {
      await nav.getByRole('link', { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/${label.toLowerCase()}$`));
      await expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      );
    }
  });

  test('on the homepage the highlighted tab follows the scroll position', async ({ page }) => {
    await page.goto('/');
    const current = page.locator('header .spy-current');
    await expect(current).toHaveText('Home');

    const sections: [string, string][] = [
      ['about-heading', 'About'],
      ['services-heading', 'Services'],
      ['projects-heading', 'Projects'],
      ['clients-heading', 'Clients'],
    ];
    for (const [id, label] of sections) {
      // Re-scroll until it settles: images loading above can shift the section after a scroll.
      await expect(async () => {
        await page.evaluate((headingId) => {
          const section = document.querySelector(`section[aria-labelledby="${headingId}"]`);
          if (section) {
            window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY - 100);
          }
        }, id);
        await expect(current).toHaveText(label, { timeout: 2500 });
      }).toPass({ timeout: 20_000 });
    }
  });
});

test.describe('mobile navigation', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile only');

  test('menu opens, navigates, and closes with Escape', async ({ page }) => {
    await page.goto('/');
    const openButton = page.getByRole('button', { name: 'Open navigation menu' });
    await openButton.click();
    const drawer = page.locator('#mobile-navigation');
    await drawer.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(drawer).toBeHidden();

    await openButton.click();
    await expect(drawer.getByRole('link', { name: 'Projects' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(openButton).toBeFocused();
  });
});

test('direct visits and refreshes work on inner pages', async ({ page }) => {
  await page.goto('/clients');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Client relationships.');
});
