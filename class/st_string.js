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
        this.layers = ['', '万', '亿'];
    }
    getSinoCode(num){
        num = parseInt(num);
        let sinoCodes = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return sinoCodes[num];
    }
    read(num) {
        num = parseInt(num).toString().split('');
        let sinoNumArr = [];
        for (let n = 0, numLen = num.length; n < numLen; n++) {
            sinoNumArr[n] = this.getSinoCode(num[n]);
        }
        return sinoNumArr.join('');
    }
    sinicize(num, wholeUnit = '') {
        num = parseInt(num).toString().split('');
        num.reverse();
        let numLen = num.length,
            levelLen = this.levels.length,
            layerLen = this.layers.length,
            numLayerNum = Math.ceil(numLen / levelLen),
            tmpArr = [],
            numObj = this,
            numStrArr = [],
            numStr;
        for (let layer = 0; layer < numLayerNum; layer ++) {
            tmpArr[layer] = [];
            for (let level = 0; level < levelLen; level ++) {
                let subIndex = layer * levelLen + level;
                tmpArr[layer][level] = '';
                if (subIndex < numLen) {
                    let curNum = num[subIndex];
                    if (curNum == 0) {
                        if  (level == 1) {
                            if (num[subIndex + 1] != 0) {
                                tmpArr[layer][level] = '零';
                            }
                        } else if (level == 2) {
                            tmpArr[layer][level] = '零';
                        }
                    } else {
                        tmpArr[layer][level] = numObj.getSinoCode(curNum) + numObj.levels[level];
                    }                    
                }
            }
            numStrArr[layer] = tmpArr[layer].reverse().join('') +  this.layers[layer % layerLen];
        }
        numStr = numStrArr.reverse().join('');
        return numStr + wholeUnit;
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
    formatNum(num, pad = true, sinoMethod = false) {
        if (pad) {
            num = num.toString().padStart(2, '0');
        }
        if (sinoMethod) {
            num = this[sinoMethod](num);
        }
        return num;
    }
    getYear(ellipsis = false, sino = false) {
        let year = this.now.getFullYear();
        if (ellipsis) {
            year = year.toString().slice(2);
        }
        if (sino) {
            year = this.read(year);
        }
        return year;
    }
    getMonth(pad = true,sino = false) {
        let month = this.now.getMonth() + 1;
        if (sino) {
            sino = 'getSinoCode';
        }
        month = this.formatNum(month, pad, sino);
        return month;
    }
    getDate(pad = true,sino = false) {
        let date = this.now.getDate();
        if (sino) {
            sino = 'getSinoCode';
        }
        date = this.formatNum(date, pad, sino);    
        return date;
    }
    getWeekDay(sino = false) {
        let day = this.now.getDay();
        if (sino) {
            day = this.read(day);
        }
        return day;
    }
    getHour(pad = true, circle = 24, sino = false) {
        let hour = this.now.getHours();
        if (circle == 12 && hour > 12) {
            hour = hour - 12;           
        }  
        if (sino) {
            sino = 'sinicize';
        }
        hour = this.formatNum(hour, pad, sino);
        return hour;
    }
    getMinute(pad = true, sino = false) {
        let minute = this.now.getMinutes();
        if (sino) {
            sino = 'sinicize';
        }
        minute = this.formatNum(minute, pad, sino);
        return minute;
    }
    getSecond(pad = true, sino = false) {
        let second = this.now.getSeconds();
        if (sino) {
            sino = 'sinicize';
        }
        second = this.formatNum(second, pad, sino);
        return second;
    }
    getMillisecond(pad = true, sino = false) {
        let millisecond = this.now.getMilliseconds();
        if (sino) {
            sino = 'sinicize';
        }
        millisecond = this.formatNum(millisecond, pad, sino);
        return millisecond;
    }
    format(format = "Y-m-d h:i:s", time = false, pad = true, sino = false) {
        if (!time) {
            time = this;
        } else {
            time = new StTimer(time);
        }
        let symbols = {
            y: time.getYear(true, sino),
            Y: time.getYear(false, sino),
            m: time.getMonth(pad, sino),
            d: time.getDate(pad, sino),
            D: time.getWeekDay(sino),
            h: time.getHour(pad, sino),
            i: time.getMinute(pad, sino),
            s:time.getSecond(pad, sino),
            a: time.getMillisecond(pad, sino)
        };
        for (let theSymbol in symbols) {
            let reg = `(\\W|_|^)${theSymbol}(\\W|_|$)`,
                tag = 'i';
            if (theSymbol.toLowerCase() == 'y' || theSymbol.toLowerCase() == 'd') {
                tag = '';
            }
            reg = new RegExp(reg, tag);
            format = format.replace(reg, "$1" + symbols[theSymbol] + "$2");
        }
        return format;
    }
}
module.exports = {
    StTimer:StTimer,
    StNum: StNum
}