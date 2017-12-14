let FileSystem = require("fs"),
    Path = require("path"),
    OperateSystem = require("os");

class StFloderSync{
    constructor(root) {
        if (!root) {
            root = __dirname;
        } 
        this.root = root;
        if (OperateSystem.platform().toLowerCase().indexOf("win") > 0) {            
            this.os = "linux";
            this.sperator = "/";
        } else {
            this.os = "win";
            this.sperator = "\\";
        }
    }
    getFullPath(path, isRelative = true) {
        if (isRelative) {
            path = Path.resolve(this.root, path);
        }
        return path;
    }
    exists(path, isRelative = true) {
        path = this.getFullPath(path, isRelative);
        return FileSystem.existsSync(path);
    }
    mkdir(path, needTimeSymbol = true,isRelative = true) {
        console.log(path);
        console.log(this.os);
        path = this.getFullPath(path, isRelative);
        let floder = this,
            dirs = path.split(floder.sperator),
            len = dirs.length,
            curDir = '';
        if (needTimeSymbol) {
            let {StTimer} = require("./timer");
        }
        if (dirs[len - 1] == '\r\n') {
            dirs.pop();
            len = dirs.length;
        }
        for (let i = 0; i < len; i++) {
            curDir = Path.resolve(curDir, dirs[i]);
            if (floder.exists(curDir)) {
                console.log(`${curDir} exists `);
            } else {                
                console.log(`${curDir} has created successfully`);
            }
        }
    }
}

module.exports = {
    StFloderSync: StFloderSync
};