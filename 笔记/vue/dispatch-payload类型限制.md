

## 关于dispatch中，对payload的类型进行限制的解决方法

有这么一个**action**，我想限制**payload**的类型为**IGetPagePayload**

```tsx
const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    ......
    actions: {
        getPageListAction({ commit }, payload: IGetPagePayload) {
            console.log(payload);
        }
    }
};
```

以下是**IGetPagePayload**的类型定义

```tsx
export interface IQueryInfo {
    offset: number;
    size: number;
}
export interface IGetPagePayload {
    pageUrl: string;
    queryInfo?: IQueryInfo;
}
```

现在我要在某个地方通过**store.dispatch**，调用上面的**getPageListAction**方法并期望dispatch中第二个对象参数**payload**的类型被限制为**IGetPagePayload**，所以编写如下代码。

```tsx
store.dispatch("system/getPageListAction", {
    pageUrl: "/user/list",
    queryInfo: {
        offset: 0,
        size: 10
    }
});
```

但查看queryInfo的类型，发现并不是所期望的**IQueryInfo**，而是自推导的**{offset:number;size:number;}**类型，说明payload的类型并没有得到限制。

<img src='C:\Users\GG\AppData\Roaming\Typora\typora-user-images\image-20221202182203647.png' style='zoom:70%;margin-left:0;'>

查看源码中dispatch方法的类型定义，发现它的类型是**Dispatch**(定义如下)

```tsx
dispatch: Dispatch;

export interface Dispatch {
  (type: string, payload?: any, options?: DispatchOptions): Promise<any>;
  <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
}
```

可以看出dispatch方法有两种传递参数的方式，第一种分别接收

1. type:string
2. payload?:any
3. options?:DispatchOptions

以上三个参数，其中**payload**类型为**any**，显然没有任何方法能在此处做类型限制，所以考虑第二种传参方式

1. 接收一个**泛型P**继承自 **Payload**

2. payloadWithType: P
3. options?: DispatchOptions

看一下**Payload**的类型定义

```tsx
export interface Payload {
  type: string;
}
```

也就是说，第二种传参方式需要接收一个含有**type**属性的泛型，并且会把该泛型赋给第一个参数**payloadWithType**，不难看出此处便可以通过构造一个**含有type，并且包含原所需数据类型的接口**来实现我们对payload的类型限制。

因此，修改接口**IGetPagePayload**将type属性纳入其中，随后修改dispatch的调用方法以泛型方式传入该类型。

```tsx
export interface IGetPagePayload {
    type: string;
    pageUrl: string;
    queryInfo?: IQueryInfo;
}

store.dispatch<IGetPagePayload>({
    type: "system/getPageListAction",
    pageUrl: "/user/list",
    queryInfo: {
        offset: 0,
        size: 10
    }
});
```

再次查看**queryInfo**的类型，可以看到此处已被限制为**IQueryInfo | undefined **的可选类型，至此，对dispatch中payload的类型限制问题解决。

<img src='C:\Users\GG\AppData\Roaming\Typora\typora-user-images\image-20221202183607638.png' style='zoom:70%;margin-left:0;'>

