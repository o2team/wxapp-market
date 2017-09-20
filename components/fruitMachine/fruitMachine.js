/**
 * Class FruitMachine
 * @class
 * @classdesc 水果机游戏逻辑部分
 * @author pfan
 * 
 * @example
 *  new FruitMachine(this,{
 *    len: 9, //宫格个数
 *    ret: 9, //抽奖结果对应值1～9   
 *    speed: 100  // 速度值
 *    callback: (idx, award) => {
 *      //结束回调， 参数对应宫格索引，对应奖项    
 *    }
 *  })
 */
 class FruitMachine {

  /**
   * @constructs FruitMachine构造函数
   * @param  {Object} pageContext page路由指针
   * @param  {Object} opts      组件所需参数
   * @param  {Number} opts.len  宫格个数
   * @param  {Number} opts.ret  抽奖结果对应值1～9
   * @param  {Number} opts.speed  速度值
   * @param  {Function} opts.callback  结束回调
   */  
  constructor (pageContext, opts) {
    this.page = pageContext
    this.len = opts.len || 8
    this.ret = opts.ret
    this.speed = opts.speed
    this.isStart = false
    this.endCallBack = opts.callback
    this.page.start = this.start.bind(this)
  }

  start () {

    let { idx, ret, len, speed, isStart } = this
    if(isStart)return
    this.isStart = true
    let range = Math.floor(Math.random()*2 + 2)
    let count = 0
    let spd2 = speed*2
    !(function interval(self){
      setTimeout( () => {
        count++
        if(count > range * len){
          speed = spd2
        }
        if(count != (range + 1) * len + ret ){
          interval(self)
        }else{
          self.isStart = false
          self.endCallBack && self.endCallBack()
        }

        self.page.setData({
          machine: {
            idx: count % 8  == 0 ? 8 : count % 8
          }
        })
        
      }, speed)
    })(this)
  }

  reset () {
     this.page.setData({
      machine: {
        idx: ''
      }
    })   
  }

}

export default FruitMachine