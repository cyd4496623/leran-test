import { newSpecPage } from '@stencil/core/testing';
import { StenModal } from '../sten-modal';

describe('sten-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StenModal],
      html: `<sten-modal></sten-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <sten-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sten-modal>
    `);
  });
});
