class StNum{
    constructor() {
        this.level = 4;
    }
    getSinoCode(num){
        num = parseInt(num);
        let sinoCodes = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        return sinoCodes[num];
    }
    sinicize(num, wholeUnit = '') {
        let levels = ['', '十', '百', '千'],
            layers = ['', '万', '亿'],
            numArr = num.toString().split(''),
            subIndex = numArr.length,
            numObj = this,
            levelLen = this.level,
            numStr = '';
        numArr.reverse();
        while(subIndex --) {
            let levelIndex = subIndex % levelLen,
                level = levels[levelIndex];
            if (levelIndex == 0) {
                let layerIndex = Math.floor(subIndex / levelLen);
                if (layerIndex > layers.length) {
                    
                }
                level += layers[layerIndex];
            }
            numStr += numObj.getSinoCode(numArr[subIndex]) +  level;
        }
        numStr += wholeUnit;
        console.log(numStr);
        return numStr;
    }
}


class StTimer extends StNum{
    constructor (now) {
        super();
        if (!now) {
            this.now = new Date();
        } else {
            if (typeof now == 'object') {
                this.now = now;
            } else {
                this.now = new Date(now);
            }
        }
        this.timestamp = this.now.getTime();
        this.time = this.timestamp;
    }
    update(){
        let timer = this;
        timer = new StTimer();
        return timer;
    }
    getMonth(sino = true) {
        
    } 
}
let myTimer = new StTimer();
myTimer.sinicize(321987654321);
module.exports = {
    StTimer:StTimer,
    StNum: StNum
}