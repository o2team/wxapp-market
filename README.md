## wxapp-market

小程序营销组件， Marketing components for WeChatApp


## 支持营销玩法

- 大转盘
- 刮刮乐 
- 老虎机 
- 水果机 
- 九宫格翻纸牌 
- 摇一摇 
- 手势解锁


## 如何使用

### 1.拉取仓库

```
git clone git@github.com:o2team/wxapp-market.git
```

### 2.查看组件文件

- 大转盘 (Big wheel) : `/components/wheel/`
- 刮刮乐 (Scratch tickets) : `/components/scratch/`
- 老虎机 (Slot machine) : `/components/slotMachine/`
- 水果机 (Fruit machine) : `/components/fruitMachine/`
- 九宫格翻纸牌 (Grid card) : `/components/card/`
- 摇一摇 (Shake) : `/components/shake/`
- 手势解锁 (Gesture lock) : `/components/lock/`

### 3.使用引入方式

#### ➀ 使用大转盘组件

- WXSS中引用样式：`@import "../../components/wheel/wheel.wxss"`

- WXML中引用结构：`<import src="../../components/wheel/wheel.wxml"/>`

- JS中引用：`import Wheel from "../../components/wheel/wheel.js"`

- JS中实例调用：

```js
  new Wheel(this,{
    areaNumber: 8,   //抽奖间隔
    speed: 16,       //转动速度
    awardNumer: 2,   //中奖区域从1开始
    mode: 1,         //1是指针旋转，2为转盘旋转
    callback: (idx, award) => {
      //结束回调， 参数对应宫格索引，对应奖项    
    }
  })
```

#### ➁ 使用刮刮乐组件

- WXML中引用结构：`<import src="../../components/scratch/scratch.wxml"/>`

- JS中引用：`import Scratch from "../../components/scratch/scratch.js"`

- JS中实例调用：

```js
  new Scratch(this,{
    canvasWidth: 197,   //画布宽带
    canvasHeight: 72,  //画布高度
    imageResource: "./images/placeholder.png", //遮罩层图片
    r: 4, //笔触半径
    awardTxt: '中大奖', //底部抽奖文字奖项
    awardTxtColor: "#1AAD16", //底部抽奖文字颜色
    awardTxtFontSize: "24px", //底部抽奖文字大小
    maskColor: "red",  //没有图片遮罩层颜色
    callback: () => {
      //清除画布回调
    }
  })
```

> 注意：小程序无 globalCompositeOperation = "destination-out" 属性，所以采用 `clearRect` 做擦除处理


#### ➂ 使用老虎机组件

- WXSS中引用样式：`@import "../../components/slotMachine/slotMachine.wxss"`

- WXML中引用结构：`<import src="../../components/slotMachine/slotMachine.wxml"/>`

- JS中引用：`import SlotMachine from "../../components/slotMachine/slotMachine.js"`

- JS中实例调用：

```js
  new SlotMachine(this,{
     height: 40,  //单个数字高度
     len: 10,     //单个项目数字个数
     transY1: 0,  //第一列初始位置
     num1: 3,     //第一列结束数字
     transY2: 0,  //第二列初始位置
     num2: 0,     //第二列结束数字
     transY3: 0,  //第三列初始位置
     num3: 0,     //第三列结束数字
     transY4: 0,  //第四列结束数字
     num4: 1,     //第四列结束数字
     speed: 24,   //速度
     callback: (idx, award) => {
      //结束回调， 参数对应宫格索引，对应奖项    
    }
  })
```

#### ➃ 使用水果机组件

- WXSS中引用样式：`@import "../../components/fruitMachine/fruitMachine.wxss"`

- WXML中引用结构：`<import src="../../components/fruitMachine/fruitMachine.wxml"/>`

- JS中引用：`import FruitMachine from "../../components/fruitMachine/fruitMachine.js"`

- JS中实例调用：

```js 
  new FruitMachine(this,{
    len: 9, //宫格个数
    ret: 9, //抽奖结果对应值1～9   
    speed: 100,  // 速度值
    callback: (idx, award) => {
      //结束回调， 参数对应宫格索引，对应奖项    
    }
  })
``` 

#### ➄ 使用九宫格翻纸牌组件

- WXSS中引用样式：`@import "../../components/card/card.wxss"`

- WXML中引用结构：`<import src="../../components/card/card.wxml"/>`

- JS中引用：`import Card from "../../components/card/card.js"`

- JS中实例调用：

```js 
  new Card(this,{
    data: [   //宫格信息，内联样式、是否是反面、是否运动、对应奖项
      {isBack: false, isMove: false, award: "一等奖"},    
      {isBack: false, isMove: false, award: "二等奖"},
      {isBack: false, isMove: false, award: "三等奖"},
      {isBack: false, isMove: false, award: "四等奖"},
      {isBack: false, isMove: false, award: "五等奖"},
      {isBack: false, isMove: false, award: "六等奖"},
      {isBack: false, isMove: false, award: "七等奖"},
      {isBack: false, isMove: false, award: "八等奖"},
      {isBack: false, isMove: false, award: "九等奖"}
    ],
    callback: (idx, award) => {
      //结束回调， 参数对应宫格索引，对应奖项    
    }
  })
```

#### ➅ 使用摇一摇组件

- WXSS中引用样式：`@import "../../components/shake/shake.wxss"`

- WXML中引用结构：`<import src="../../components/shake/shake.wxml"/>`

- JS中引用：`import Shake from "../../components/shake/shake.js"`

- JS中实例调用：

```js 
  new Shake(this,{
    shakeThreshold: 70, //阈值
    callback: (idx, award) => {
      //结束回调， 参数对应宫格索引，对应奖项    
    }
  })
```

#### ➆ 使用手势解锁组件

 - WXSS中引用样式：`@import "../../components/lock/lock.wxss"`

- WXML中引用结构：`<import src="../../components/lock/lock.wxml"/>`

- JS中引用：`import Lock from "../../components/lock/lock.js"`

- JS中实例调用：

```js 
  new Lock(this,{
    canvasWidth: 300,   //canvas画布宽度 px
    canvasHeight: 300,  //canvas画布高度 px 
    canvasId: "canvasLock", //canvas画布id
    drawColor: "#3985ff"  //绘制颜色
  })
```  

文档详情，请[查阅](https://o2team.github.io/wxapp-market/index.html)

## 件体验二维码

![营销组件体验二维码](http://img.pfan123.com/qrcode.jpg)

## 效果图展示

![支持营销](http://img.pfan123.com/wx_market_0.gif?t=1112&imageView2/1/w/356/h/634)
![大转盘组件](http://img.pfan123.com/wx_market_1.gif?t=1112&imageView2/1/w/356/h/634)
![刮刮乐组件](http://img.pfan123.com/wx_market_2.gif?t=1112&imageView2/1/w/356/h/634) 
![老虎机组件](http://img.pfan123.com/wx_market_3.gif?t=1112&imageView2/1/w/356/h/634) 
![水果机组件](http://img.pfan123.com/wx_market_4.gif?t=11122&imageView2/1/w/356/h/634) 
![九宫格翻纸组件](http://img.pfan123.com/wx_market_5.gif?t=1221112&imageView2/1/w/356/h/634) 
![摇一摇组件](http://img.pfan123.com/wx_market_6.gif?t=1112&imageView2/1/w/356/h/634)  ![手势解锁组件](http://img.pfan123.com/wx_market_7.gif?t=11112&imageView2/1/w/356/h/634) 

## 更新记录

- [x] 优化文件目录结构                 2017-09-18
- [x] 手势解锁组件                    2017-09-17
- [x] 摇一摇组件                     2017-09-16
- [x] 九宫格翻纸组件                  2017-09-16
- [x] 增加老虎机组件、水果机组件         2017-09-02
- [x] 增加刮刮乐组件                  2017-08-29
- [x] 增加大转盘组件                  2017-08-27
- [x] create wx-market repository  2017-08-26

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。


## 贡献

如果你有好的意见或建议，欢迎给我们提 [Issue](https://github.com/o2team/wxapp-market/issues) 或 [PR](https://github.com/o2team/wxapp-market/compare)，为优化 [wxapp-market](https://github.com/o2team/wxapp-market) 贡献力量。
