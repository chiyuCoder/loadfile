let {stEcho} = require("./st_devtool");

class StString extends String{
    constructor(str){
        super(str);
    };
    toUnicode(str) {
        if (!str) {
            str = this.string;
        }
        let length = str.length,
            codes = [];
        for (let i = 0; i < length; i ++) {
            codes[i] = '\\u' + str.charCodeAt(i).toString(16);
        }
        return codes.join('');
    }
}
class StNum {
    constructor() {
        this.levels = ['', '十', '百', '千'];
        this.level = this.levels.length;
        this.layers = ['', '万', '亿'];
    }
    getSinoCode(num){
        num = parseInt(num);
        let sinoCodes = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        return sinoCodes[num];
    }
    sinicize(num, wholeUnit = '') {
        let levels = this.levels,
            layers = this.layers,
            numArr = num.toString().split(''),
            subIndex = numArr.length,
            numObj = this,
            levelLen = this.level,
            numStr = '',
            zeroUnicode = '零'.charCodeAt(0).toString(16),
            zeroRE = new RegExp(`(\\u${zeroUnicode})+`, 'g');
        numArr.reverse();
        while(subIndex --) {
            let levelIndex = subIndex % levelLen,
                level = levels[levelIndex],
                layerLevel = layers.length,
                curNum = numArr[subIndex];
            curNum = numObj.getSinoCode(curNum);
            if (levelIndex == 0) {
                let layerIndex = Math.floor(subIndex / levelLen);
                layerIndex = layerIndex % layerLevel + Math.floor(layerIndex / layerLevel);
                level += layers[layerIndex];                
            } else if (curNum == '零') {
                level = '';
            }
            if(curNum == '零') {
                curNum = '';
            }
            numStr +=  curNum + level;             
        }
        numStr = numStr.replace(zeroRE, '零');
        numStr += wholeUnit;
        stEcho.log(numStr);
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
myTimer.sinicize(1002003);
module.exports = {
    StTimer:StTimer,
    StNum: StNum
}