/**
 * Class Card
 * @class
 * @classdesc 九宫格翻纸牌组件逻辑部分
 * @author pfan
 * @todo 注意：移动端真机，不支持requestAnimationFrame.
 *
 * @example
 *  new Card(this,{
 *    data: [   //宫格信息，内联样式、是否是反面、是否运动、对应奖项
 *      {isBack: false, isMove: false, award: "一等奖"},
 *      {isBack: false, isMove: false, award: "二等奖"},
 *      {isBack: false, isMove: false, award: "三等奖"},
 *      {isBack: false, isMove: false, award: "四等奖"},
 *      {isBack: false, isMove: false, award: "五等奖"},
 *      {isBack: false, isMove: false, award: "六等奖"},
 *      {isBack: false, isMove: false, award: "七等奖"},
 *      {isBack: false, isMove: false, award: "八等奖"},
 *      {isBack: false, isMove: false, award: "九等奖"}
 *    ],
 *    callback: (idx, award) => {
 *      //结束回调， 参数对应宫格索引，对应奖项
 *    }
 *  })
 */

const Promise = require('./promise.min.js')

class Card {
    /**
   * @constructs Card构造函数
   * @param  {Object} pageContext page路由指针
   * @param  {Object} opts      组件所需参数
   * @param  {String} opts.inlineStyle  组件所需参数
   * @param  {Boolean} opts.isBack  是否是反面
   * @param  {Boolean} opts.isMove  是否运动
   * @param  {String} opts.award    对应奖项
   * @param  {Function} opts.callback    结束回调
   */

    constructor (pageContext, opts) {
        this.page = pageContext
        this.isFlip = false
        this.card = opts.data || []
        this.init()
        this.endCallBack = opts.callback
        this.page.start = this.start.bind(this)
        this.page.onClick = this.onClick.bind(this)
    }

    init () {
        const { card } = this

        for (let i = 0; i < 9; i++) {
            card[i] = { isBack: false, isMove: false, award: card[i].award }
        }
        this.page.setData({ card })
        this.card = card
    }

    start () {
        const { card } = this

        runAsync(100).then(() => {
            for (let i = 0; i < 3; i++) {
                card[i].isBack = true
            }
            this.page.setData({ card })
            return runAsync(200)
        }).then(() => {
            for (let i = 3; i < 6; i++) {
                card[i].isBack = true
            }
            this.page.setData({ card })
            return runAsync(200)
        }).then(() => {
            for (let i = 6; i <= 8; i++) {
                card[i].isBack = true
            }
            this.page.setData({ card })
            return runAsync(800)
        }).then(() => {
            for (let i = 0; i < 9; i++) {
                card[i].isBack = false
            }
            this.page.setData({ card })
            return runAsync(400)
        }).then(() => {
            for (let i = 0; i < 9; i++) {
                card[i].isMove = true
            }
            this.page.setData({ card })
            return runAsync(500)
        }).then(() => {
            for (let i = 0; i < 9; i++) {
                card[i].isMove = false
            }
            this.page.setData({ card })
            this.isFlip = true
            this.card = card
        })
    }

    reset () {
        const { card } = this
        this.isFlip = false
        for (let i = 0; i < 9; i++) {
            card[i] = { isBack: false, isMove: false, award: card[i].award }
        }
        this.card = card
        this.page.setData({ card })

        runAsync(800).then(() => {
            this.start()
        })
    }

    onClick (event) {
        const { card, isFlip, endCallBack } = this
        if (!isFlip) return
        const idx = event.currentTarget.dataset.idx
        const award = event.currentTarget.dataset.award
        card[idx].isBack = !card[idx].isBack
        this.page.setData({ card })
        runAsync(600).then(() => {
            endCallBack(idx, award)
        })
    }
}


/**
 * runAsync 延迟返回 promise 方法
 * @param  {Number} time 延迟时间
 * @return {type}   返回Promise对象
 */
function runAsync (time) {
    return new Promise(function (resolve, reject) {
        const timer = setTimeout(function () {
            resolve()
            clearTimeout(timer)
        }, time)
    })
}


export default Card
