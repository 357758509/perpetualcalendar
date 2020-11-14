# calendar_pro

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

用户在当天信息这里搜索的时候，比如说20150503 -> 那么我们必须把用户输入的数值转换成这种2015-5-3格式，才能传给后台去请求数据。
201803  -> 2018-3

2020,用户输入的年份，我们不用去转换数据格式，原样发送给后台就可以


vue2和vue3有什么不同？
vue2都是options API的写法 ,其实可以叫选项API,也可以叫配置项API。
什么叫options API，options API就类似于下面的选项型、配置项型的options方法。
options API也有弱点，那就是很分散，如果我的methods中有一百个方法，那么这一百个方法
对应了更改了一百个data中的数据的时候，你想一想这种切割是否合理，其实这中选项型API是有它的
弊端的，也就是说它是很分散的，不内聚它的功能，它的整个一个逻辑是不内聚的。我们经常说高内聚，
低耦合。
var options = {
    a: 1,
    b: 2,
    plus: {
        return a+b;
    }
}

所以说veu3做出了一个改变，Composition-API。Composition-API本身的意思是组合API，
vue3做出一个巨大的改善，那就是基于函数，为什么要基于函数呢，因为函数是最好抽离，最好抽象的。
而且函数是最好组合，最好用闭包的这种方式去处理我们这种作用域的问题，包括this指向的问题，我们也可以
更好的去解决。在vue3中视图要使用的数据和方法我们必须在setup中通过return暴露出去，我们Composition-API
最好的好处是什么呢，你是可以自己去做我们一些程序上的设计的，你不需要在vue2的options中去做这种多余的
操作，或者添加options，添加methods,添加computed这种操作。你只需要在setup中，把你要用到数据和方法写出来
，而且业务逻辑可以提在外面去封装。