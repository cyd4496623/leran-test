import { newE2EPage } from '@stencil/core/testing';

describe('sten-autocomplete', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sten-autocomplete></sten-autocomplete>');

    const element = await page.find('sten-autocomplete');
    expect(element).toHaveClass('hydrated');
  });
});
