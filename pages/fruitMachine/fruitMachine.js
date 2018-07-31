import FruitMachine from '../../components/fruitMachine/fruitMachine.js'

Page({
    data: {

    },

    onLoad () {
        this.fruitMachine = new FruitMachine(this, {
            ret: 8, // 取值1～8
            speed: 100,
            callback: () => {
                wx.showModal({
                    title: '提示',
                    content: '恭喜您，中奖了',
                    showCancel: false,
                    success: res => {
                        this.fruitMachine.reset()
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
        })
    },

    onReady () {
        console.log('onReady')
    }

})
