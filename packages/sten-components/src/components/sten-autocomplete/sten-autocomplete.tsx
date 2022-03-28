import { Component, State, h, Prop, Method, Event, EventEmitter } from '@stencil/core';
import { IItem, IOption } from './type'
import { mockVal } from './utils'
@Component({
  tag: 'sten-autocomplete',
  styleUrl: 'sten-autocomplete.scss',
  shadow: true,
})
export class StenAutocomplete {

  @Prop()
  placeholder: string = ''

  @Prop()
  options: IOption[] = []

  @State()
  _isOpen: boolean = false

  @State()
  items: IItem[] = []

  @State()
  value: string;

  @State()
  activeItem: IItem;

  @Method()
  open() {
    this._isOpen = true
  }

  @Method()
  close() {
    this._isOpen = false
  }

  @Event({ eventName: 'filter' })
  onFilter: EventEmitter;

  connectedCallback() {
    this._isOpen = false
  }

  filter(e) {
    this.activeItem = null;
    this.value = e.target.value;
    const searchText = this.value;
    this.onFilter.emit(searchText);
    if(searchText) {
      const text = [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
      this.items = text
    }
    
  }

  render() {
    const prefixCls = 'sten-autocomplete'
    return (
      <div class={prefixCls}>
        <input
          autocomplete='off'
          type='search'
          placeholder={this.placeholder}
          onFocus={() => this.open()}
          onBlur={() => this.close()}
          onInput={(e: UIEvent) => this.filter(e)}
        />
        {
          this._isOpen && (
            <div class={`${prefixCls}-menu`}>
              {
                this.items.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.text}
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    );
  }

}
