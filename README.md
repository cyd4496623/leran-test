# leran-test
leran test
## Stencil 来构建 Web Components 组件几大优势
1. 虚拟DOM
2. Async rendering (inspired by React Fiber) fiber 的性能优势 像Fiber一样的调度模式
3. Reactive data-binding 单向数据流
4. TypeScript
5. 组件懒加载
6. JSX TSX支持
7. 无依赖组件
8. 静态网站生成(SSG)

## Stencil 常用装饰器 类似AOP编程
Stencil 提供装饰中类有8种，丰富了我们的所有使用场景 

### @Component()
用来定义 Stencil 组件的装饰器， 每个组件都应声明这个装饰器
文档地址 https://stenciljs.com/docs/component#component-decorator
```js
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
```
@Component() 一般会带有 options 来声明一些组件的特性和配置。 必填的是 tag 字段，必须是一个由‘-’连接的字符串，用于声明当前组件应该匹配到那个 tag 标签下
可以看出 @Component 装饰器是用来声明当前 class 是一个 Stencil 组件的关键装饰器，只有声明后，编译脚本才会正确识别编译，是一个必需的装饰器。

### @Prop()
是用来定义声明当前 Stencil 组件 element 元素上的属性和继承数据。它可以自动解析出这些数据，并声明成当前组件 class 的一个变量，允许我们开发使用，其实类似于 Vue 和 React。它的作用就是用来获取继承的数据并加以使用。
```jsx
export class MyComponent {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string; 

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>World! I'm {this.getText()}</div>;
  }
}

// index.html
<my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>
```
@Prop() 也可以携带配置来进行相关props的预处理。例如
```ts
  // 把 tag 里面的 complete 映射到组件里的 isComplete
@Prop({ attribute: 'complete' }) isComplete: boolean;

// 声明当前 props 不可变更
@Prop({ mutable: true }) thingToDo: string;

// reflect 可以决定当前的属性是不是在 tag 上可访问
@Prop({ reflect: true }) timesCompletedInPast: number = 2;

```

### @State()
与 react state一样， 改变可以触发更新， 如果是引用类型 必须改变其地址
```tsx 
@State() items: string[];
 // our original array
this.items = ['ionic', 'stencil', 'webcomponents'];
 // update the array
this.items = [
  ...this.items,
  'awesomeness'
]

```

### @Watch()
@Watch() 的使用也是比较直观，用于监控 prop/state 的更新, 类似于 useEffect + 依赖项
```tsx
export class LoadingIndicator {
  @Prop() activated: boolean;
  @State() busy: boolean;

  @Watch('activated')
  watchPropHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of activated is: ', newValue);
  }


  @Watch('busy')
  watchStateHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of busy is: ', newValue);
  }
}
```

### @Element()
@Element() 其实是为了提供在组件内访问当前 host element 示例的能力。当我们在组件内部定义了 @Element() el: HTMLElement 的时候，在组件初始化过程中会把当前的 HTMLElement 实例 return 到 el 这个变量上，让我们可以访问当前的 element，比如获取属性，外包围的信息等。 可以说它是连接了组件内部和具体挂载 ELement 的一个桥梁。
```tsx
export class TodoList {

  @Element() el: HTMLElement;

  getListHeight(): number {
    return this.el.getBoundingClientRect().height;
  }
}
```

### @Method()
@Method() 的作用是声明当前的 function 可以在组件的外部访问到，类似于 class 的 public 属性。 相当于挂载实例上的方法
```tsx
@Method()
  async showPrompt() {
    // show a prompt
  }
await customElements.whenDefined('todo-list');
const todoListElement = document.querySelector('todo-list');
await todoListElement.showPrompt();
```
注意: 值得注意的是，我们并不推荐一个组件对外暴露过多的 methods，因为它会使组件的数据流动变的不可控或难以维护，我们应该尽量使用 props 来控制一些组件的内部逻辑

### @Event()
@Event() 装饰器的作用是用来声明 DOM event，并提供了 emit 的方法来触发
```tsx
export class TodoList {
  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
// jsx
<todo-list onTodoCompleted={ev => this.someMethod(ev)} />
// js
Element.addEventListener('todoCompleted', event => {
    console.log(event.detail.value);
});
```
Event() 还有几个可选的 options 如下：
```ts
@Event({
    eventName: 'todoCompleted', // 事件名称
    composed: true, // 冒泡事件是否逃逸出当前的 shadowdom
    cancelable: true, // 事件是否可以被取消
    bubbles: true, // 事件是否冒泡到父级
  }) todoCompleted: EventEmitter<Todo>;
```
@Event() 可以说你连接了DOM事件，可以在组件中快速的声明，使用 DOM 事件的特性，最终还是编译回到原生的 DOM 事件。

### @Listen()
Listen 的作用就是监听子组件冒泡上传的 DOM 事件，和一些公共的事件，比如 scroll、keydown、mousemove 等。
```jsx
@Listen('keydown')
  handleKeyDown(ev: KeyboardEvent){
 // xxx
}

export interface ListenOptions {
  target?: 'body' | 'document' | 'window';
  capture?: boolean;
  passive?: boolean;
}


 @Listen('scroll', { target: 'window' })
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }

```