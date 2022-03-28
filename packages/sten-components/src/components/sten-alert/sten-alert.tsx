import { Component, Prop, h, Method, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sten-alert',
  styleUrl: 'sten-alert.scss',
  shadow: true,
})

export class StenAlert {
  /** 是否展示关闭按钮， 默认关闭 */
  @Prop()
  dismissible: boolean = true
  /** 类型 */
  @Prop()
  type: 'default' | 'brand' | 'info' | 'warning' | 'success' | 'error' = 'default'

  /** 可显 */
  @State()
  visible: boolean = true

  /** 暴露给外部的回调 */
  @Event({ eventName: 'close' })
  onClose: EventEmitter

  /** 点击关闭 */
  @Method()
  async close() {
    this.visible = false
    this.onClose.emit('关闭~')
  }

  render() {
    const prefixCls = 'sten-alert'
    const cls = [prefixCls, `${prefixCls}-${this.type}`]
    !this.visible && cls.push(`${prefixCls}-hidden`)
    return (
      <div class={cls.join(' ')}>
        <div class={`${prefixCls}-content`}>
          <slot />
        </div>
        {
          this.dismissible && (
            <button class="c-button--close" onClick={() => this.close()}>
              &times;
            </button>
          )
        }
      </div>
    );
  }

}
