/**
 * Class Shake
 * @class
 * @classdesc 摇一摇组件逻辑部分
 * @author pfan
 *
 * @example
 *  new Shake(this,{
 *    shakeThreshold: 70, //阈值
 *    callback: (idx, award) => {
 *      //结束回调， 参数对应宫格索引，对应奖项
 *    }
 *  })
 */
class Shake {
    /**
   * @constructs Shake构造函数
   * @param  {Object} pageContext page路由指针
   * @param  {Object} opts      组件所需参数
   * @param  {Number} opts.shakeThreshold  频率阈值
   * @param  {Function} opts.callback    结束回调
   */
    constructor (pageContext, opts) {
        this.page = pageContext
        this.shakeThreshold = opts.shakeThreshold || 80
        this.lastX = 0
        this.lastY = 0
        this.lastZ = 0
        this.lastUpdate = 0
        this.isStart = true
        this.endCallBack = opts.callback
        this.page.audioCtx = wx.createAudioContext('shakeAudio')
        this.start()
    }

    start () {
        let { shakeThreshold, lastX, lastY, lastZ, lastUpdate } = this
        wx.onAccelerometerChange(res => {
            const curTime = new Date().getTime()
            if ((curTime - lastUpdate) > 100) {
                const curX = res.x
                const curY = res.y
                const curZ = res.z
                const speed = Math.abs(curX + curY + curZ - lastX - lastY - lastZ) / (curTime - lastUpdate) * 10000
                if (speed > shakeThreshold && this.isStart) {
                    this.page.audioCtx.play()
                    this.update()
                }
                lastUpdate = curTime
                lastX = curX
                lastY = curY
                lastZ = curZ
            }
        })
    }

    update () {
        this.page.setData({
            anim: true
        })
        this.isStart = false
        setTimeout(() => {
            this.page.setData({
                anim: false
            })
            this.endCallBack && this.endCallBack()
        }, 2000)
    }

    reset () {

    }
}


export default Shake
