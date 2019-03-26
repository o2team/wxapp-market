import Shake from '../../components/shake/shake.js'

Page({
    data: {

    },

    onLoad () {
        this.shake = new Shake(this, {
            shakeThreshold: 100, // 阈值
            callback: () => {
                wx.showModal({
                    title: '提示',
                    content: '恭喜您，中奖了',
                    showCancel: false,
                    success: res => {
                        if (res.confirm) {
                            this.shake.isStart = true
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                            this.shake.isStart = true
                        }
                    }
                })
            }
        })
    },

    onUnload () {
        wx.stopAccelerometer()
    },

    onReady () {
        console.log('onReady')
    }

})
