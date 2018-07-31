/**
 * Class Scratch
 * @class
 * @classdesc 九宫格翻纸牌组件逻辑部分
 * @author pfan
 * @todo 1.drawImage 与 clearRect 清除展示移动端和模拟器不一致
 * @todo 2.小程序无globalCompositeOperation = 'destination-out'属性
 * @todo 3.小程序无getImageData获取像素点对比擦除范围
 * @todo 4.使用 downloadFile 这种方式来先加载图片再绘制
 *
 * @example
 *  new Scratch(this,{
 *    canvasWidth: 197,   //画布宽带
 *    canvasHeight: 72,  //画布高度
 *    imageResource: './images/placeholder.png', //遮罩层图片
 *    r: 4, //笔触半径
 *    awardTxt: '中大奖', //底部抽奖文字奖项
 *    awardTxtColor: "#1AAD16", //底部抽奖文字颜色
 *    awardTxtFontSize: "24px", //底部抽奖文字大小
 *    maskColor: "red",  //没有图片遮罩层颜色
 *    callback: () => {
 *      //清除画布回调
 *    }
 *  })
 */
class Scratch {
    /**
   * @constructs Scratch构造函数
   * @param  {Object} pageContext page路由指针
   * @param  {Object} opts      组件所需参数
   * @param  {Number} opts.canvasWidth  画布宽带
   * @param  {Number} opts.canvasHeight  画布高度
   * @param  {String} opts.imageResource  遮罩层图片
   * @param  {Number} opts.r    笔触半径
   * @param  {String} opts.awardTxt    底部抽奖文字奖项
   * @param  {String} opts.awardTxtColor    底部抽奖文字颜色
   * @param  {String} opts.awardTxtFontSize    底部抽奖文字大小
   * @param  {String} opts.maskColor     没有图片遮罩层颜色
   * @param  {Function} opts.callback    结束回调
   */
    constructor (pageContext, opts) {
        this.page = pageContext
        this.canvasWidth = opts.canvasWidth
        this.canvasHeight = opts.canvasHeight
        this.imageResource = opts.imageResource
        this.maskColor = opts.maskColor
        // this.canvasId = opts.canvasId
        this.r = opts.r || 4
        this.endCallBack = opts.callback
        this.lastX = 0
        this.lastY = 0
        this.minX = ''
        this.minY = ''
        this.maxX = ''
        this.maxY = ''
        this.isStart = false
        this.init()

        this.page.touchStart = this.touchStart.bind(this)
        this.page.touchMove = this.touchMove.bind(this)
        this.page.touchEnd = this.touchEnd.bind(this)
        this.page.imgOnLoad = this.imgOnLoad.bind(this)

        this.page.setData({
            scratch: {
                'awardTxt': opts.awardTxt,
                'awardTxtColor': opts.awardTxtColor,
                'awardTxtFontSize': opts.awardTxtFontSize,
                'awardTxtLineHeight': opts.canvasHeight,
                'width': opts.canvasWidth,
                'height': opts.canvasHeight,
                'imageResource': opts.imageResource
            },
            'isScroll': true
        })
    }

    init () {
        const { canvasWidth, canvasHeight, imageResource, maskColor } = this
        const self = this
        this.ctx = wx.createCanvasContext('scratch')
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        if (imageResource && imageResource != '') {
            wx.downloadFile({
                url: imageResource,
                success: res => {
                    self.ctx.drawImage(res.tempFilePath, 0, 0, canvasWidth, canvasHeight)
                    self.ctx.draw()
                }
            })
        } else {
            self.ctx.setFillStyle(maskColor)
            self.ctx.fillRect(0, 0, canvasWidth, canvasHeight)
            self.ctx.draw()
        }
    }

    drawRect (x, y) {
        const { r, minX, minY, maxX, maxY } = this
        const x1 = x - r > 0 ? x - r : 0
        const y1 = y - r > 0 ? y - r : 0
        if ('' != minX) {
            this.minX = minX > x1 ? x1 : minX
            this.minY = minY > y1 ? y1 : minY
            this.maxX = maxX > x1 ? maxX : x1
            this.maxY = maxY > y1 ? maxY : y1
        } else {
            this.minX = x1
            this.minY = y1
            this.maxX = x1
            this.maxY = y1
        }
        this.lastX = x1
        this.lastY = y1

        return [x1, y1, 2 * r]
    }

    start () {
        this.isStart = true
        this.page.setData({
            'isScroll': false
        })
    }

    restart () {
        this.init()
        this.lastX = 0
        this.lastY = 0
        this.minX = ''
        this.minY = ''
        this.maxX = ''
        this.maxY = ''
        this.isStart = true
        this.page.setData({
            'isScroll': false
        })
    }

    touchStart (e) {
        if (!this.isStart) return
        const pos = this.drawRect(e.touches[0].x, e.touches[0].y)
        this.ctx.clearRect(pos[0], pos[1], pos[2], pos[2])
        this.ctx.draw(true)
    }

    touchMove (e) {
        if (!this.isStart) return
        const pos = this.drawRect(e.touches[0].x, e.touches[0].y)
        this.ctx.clearRect(pos[0], pos[1], pos[2], pos[2])
        this.ctx.draw(true)
    }

    touchEnd (e) {
        if (!this.isStart) return
        // 自动清楚采用点范围值方式判断
        const { canvasWidth, canvasHeight, minX, minY, maxX, maxY } = this
        if (maxX - minX > .7 * canvasWidth && maxY - minY > .7 * canvasHeight) {
            this.ctx.draw()
            this.endCallBack && this.endCallBack()
            this.isStart = false
            this.page.setData({
                'isScroll': true
            })
        }
    }

    reset () {
        this.init()
    }

    imgOnLoad () {

    }
}

export default Scratch
