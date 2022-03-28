import { newSpecPage } from '@stencil/core/testing';
import { StenAutocomplete } from '../sten-autocomplete';

describe('sten-autocomplete', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StenAutocomplete],
      html: `<sten-autocomplete></sten-autocomplete>`,
    });
    expect(page.root).toEqualHtml(`
      <sten-autocomplete>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sten-autocomplete>
    `);
  });
});
