/**
 * Class Machine
 * @class
 * @classdesc 老虎机游戏逻辑部分
 * @author pfan
 *
 * @example
 *  new Machine(this,{
 *     height: 40,  //单个数字高度
 *     len: 10,     //单个项目数字个数
 *     transY1: 0,  //第一列初始位置
 *     num1: 3,     //第一列结束数字
 *     transY2: 0,  //第二列初始位置
 *     num2: 0,     //第二列结束数字
 *     transY3: 0,  //第三列初始位置
 *     num3: 0,     //第三列结束数字
 *     transY4: 0,  //第四列结束数字
 *     num4: 1,     //第四列结束数字
 *     speed: 24,   //速度
 *     callback: (idx, award) => {
 *      //结束回调， 参数对应宫格索引，对应奖项
 *    }
 *  })
 */
class Machine {
    /**
   * @constructs Machine构造函数
   * @param  {Object} pageContext page路由指针
   * @param  {Object} opts      组件所需参数
   * @param  {Number} opts.height  单个数字高度
   * @param  {Number} opts.len  单个项目数字个数
   * @param  {Number} opts.transY1  第一列初始位置
   * @param  {Number} opts.num1     第一列结束数字
   * @param  {Number} opts.transY2  第二列初始位置
   * @param  {Number} opts.num2     第二列结束数字
   * @param  {Number} opts.transY3  第三列初始位置
   * @param  {Number} opts.num3     第三列结束数字
   * @param  {Number} opts.transY4  第四列初始位置
   * @param  {Number} opts.num4     第四列结束数字
   * @param  {Number} opts.speed    速度
   * @param  {Function} opts.callback    结束回调
   */
    constructor (pageContext, opts) {
        this.page = pageContext
        this.height = opts.height
        this.len = opts.len
        this.transY1 = opts.transY1
        this.num1 = opts.num1
        this.transY2 = opts.transY2
        this.num2 = opts.num2
        this.transY3 = opts.transY3
        this.num3 = opts.num3
        this.transY4 = opts.transY4
        this.num4 = opts.num4
        this.speed = opts.speed
        this.isStart = false
        this.endCallBack = opts.callback
        this.page.start = this.start.bind(this)
    }

    start () {
        let { isStart, len, height, transY1, transY2, transY3, transY4, speed, num1, num2, num3, num4, endCallBack } = this
        if (isStart) return
        this.isStart = true
        const totalHeight = height * len
        const sRange = Math.floor(Math.random() * 2 + 2)
        const halfSpeed = speed / 2
        const endDis1 = num1 == 0 ? 10 * height : num1 * height
        const endDis2 = num2 == 0 ? 10 * height : num2 * height
        const endDis3 = num3 == 0 ? 10 * height : num3 * height
        const endDis4 = num4 == 0 ? 10 * height : num4 * height
        let i1 = 1; let i2 = 1; let i3 = 1; let i4 = 1

        this.timer = setInterval(() => {
            if (i1 <= sRange) {
                transY1 -= speed
                if (Math.abs(transY1) > totalHeight) {
                    transY1 += totalHeight
                    i1++
                }
            } else if (i1 > sRange && i1 < sRange + 2) {
                transY1 -= halfSpeed
                if (Math.abs(transY1) > totalHeight) {
                    transY1 += totalHeight
                    i1++
                }
            } else {
                if (transY1 == endDis1) return
                let dropSpeed = (endDis1 + transY1) / halfSpeed
                dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed
                transY1 -= dropSpeed
                transY1 = Math.abs(transY1) > endDis1 ? transY1 = -endDis1 : transY1
            }

            this.timer1 = setTimeout(() => {
                if (i2 <= sRange) {
                    transY2 -= speed
                    if (Math.abs(transY2) > totalHeight) {
                        transY2 += totalHeight
                        i2++
                    }
                } else if (i2 > sRange && i2 < sRange + 2) {
                    transY2 -= halfSpeed
                    if (Math.abs(transY2) > totalHeight) {
                        transY2 += totalHeight
                        i2++
                    }
                } else {
                    if (transY2 == endDis2) return
                    let dropSpeed = (endDis2 + transY2) / halfSpeed
                    dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed
                    transY2 -= dropSpeed
                    transY2 = Math.abs(transY2) > endDis2 ? transY2 = -endDis2 : transY2
                }
            }, 200)

            this.timer2 = setTimeout(() => {
                if (i3 <= sRange) {
                    transY3 -= speed
                    if (Math.abs(transY3) > totalHeight) {
                        transY3 += totalHeight
                        i3++
                    }
                } else if (i3 > sRange && i3 < sRange + 2) {
                    transY3 -= halfSpeed
                    if (Math.abs(transY3) > totalHeight) {
                        transY3 += totalHeight
                        i3++
                    }
                } else {
                    if (transY3 == endDis3) return
                    let dropSpeed = (endDis3 + transY3) / halfSpeed
                    dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed
                    transY3 -= dropSpeed
                    transY3 = Math.abs(transY3) > endDis3 ? transY3 = -endDis3 : transY3
                }
            }, 400)

            this.timer3 = setTimeout(() => {
                if (i4 <= sRange) {
                    transY4 -= speed
                    if (Math.abs(transY4) > totalHeight) {
                        transY4 += totalHeight
                        i4++
                    }
                } else if (i4 > sRange && i4 < sRange + 2) {
                    transY4 -= halfSpeed
                    if (Math.abs(transY4) > totalHeight) {
                        transY4 += totalHeight
                        i4++
                    }
                } else {
                    let dropSpeed = (endDis4 + transY4) / halfSpeed
                    if (num4 < 3) {
                        dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < .1 ? .1 : dropSpeed
                    } else if (num4 < 5 && num4 >= 3) {
                        dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < .3 ? .3 : dropSpeed
                    } else {
                        dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < .3 ? .3 : dropSpeed
                    }

                    transY4 -= dropSpeed
                    transY4 = Math.abs(transY4) > endDis4 ? transY4 = -endDis4 : transY4
                    if (Math.abs(transY4) >= endDis4) {
                        clearInterval(this.timer)
                        clearTimeout(this.timer1)
                        clearTimeout(this.timer2)
                        clearTimeout(this.timer3)
                        this.isStart = false
                        endCallBack && endCallBack()
                    }
                }
            }, 600)


            this.page.setData({
                machine: {
                    transY1,
                    transY2,
                    transY3,
                    transY4
                }
            })
        }, 1000 / 60)
    }

    reset () {
        this.transY1 = 0
        this.transY2 = 0
        this.transY3 = 0
        this.transY4 = 0

        this.page.setData({
            machine: {
                transY1: 0,
                transY2: 0,
                transY3: 0,
                transY4: 0
            }
        })
    }
}


export default Machine
