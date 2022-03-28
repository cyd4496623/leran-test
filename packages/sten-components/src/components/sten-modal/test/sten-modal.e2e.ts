import { newE2EPage } from '@stencil/core/testing';

describe('sten-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sten-modal></sten-modal>');

    const element = await page.find('sten-modal');
    expect(element).toHaveClass('hydrated');
  });
});
