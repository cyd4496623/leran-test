import { newE2EPage } from '@stencil/core/testing';

describe('sten-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sten-alert></sten-alert>');

    const element = await page.find('sten-alert');
    expect(element).toHaveClass('hydrated');
  });
});
