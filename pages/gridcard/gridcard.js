import Card from '../../components/card/card.js'

Page({
    data: {
    },

    onLoad () {
        this.count = 0
        this.card = new Card(this, {
            data: [
                { inlineStyle: '', isBack: false, isMove: false, award: '一等奖' },
                { inlineStyle: '', isBack: false, isMove: false, award: '二等奖' },
                { inlineStyle: '', isBack: false, isMove: false, award: '三等奖' },
                { inlineStyle: '', isBack: false, isMove: false, award: '四等奖' },
                { inlineStyle: '', isBack: false, isMove: false, award: '五等奖' },
                { inlineStyle: '', isBack: false, isMove: false, award: '六等奖' },
                { inlineStyle: '', isBack: false, isMove: false, award: '七等奖' },
                { inlineStyle: '', isBack: false, isMove: false, award: '八等奖' },
                { inlineStyle: '', isBack: false, isMove: false, award: '九等奖' }
            ],
            callback: (idx, award) => {
                wx.showModal({
                    title: '提示',
                    content: `您点击了第${idx + 1}个方块，中${award}`,
                    showCancel: false,
                    success: res => {
                        // this.card.reset()
                        // if (res.confirm) {
                        //   console.log('用户点击确定')
                        // } else if (res.cancel) {
                        //   console.log('用户点击取消')
                        // }
                    }
                })
            }
        })
    },

    onReady () {
        console.log('onReady')
    },

    onStart () {
        this.count++
        if (this.count != 0) {
            this.card.reset()
        } else {
            this.card.start()
        }
    }
})
