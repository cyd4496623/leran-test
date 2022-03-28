import { newSpecPage } from '@stencil/core/testing';
import { StenAlert } from '../sten-alert';

describe('sten-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StenAlert],
      html: `<sten-alert></sten-alert>`,
    });
    expect(page.root).toEqualHtml(`
      <sten-alert>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sten-alert>
    `);
  });
});
