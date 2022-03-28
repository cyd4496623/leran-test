import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'sten-modal',
  styleUrl: 'sten-modal.css',
  shadow: true,
})
export class StenModal {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
