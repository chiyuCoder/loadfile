let FileSystem = require("fs"),
    Path = require("path"),
    OperateSystem = require("os"),
    { stEcho } = require("./st_devtool");

class StFloderSync {
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
    pathJoin(parent, himSelf) {     
        parent = parent.trim().replace(/(\\|\/)$/, '');
        himSelf = himSelf.trim().replace(/^(\\|\/)|(\\|\/)$/g, '');
        let sperator = this.sperator,
            path = parent + sperator + himSelf;
        path = path.replace(/\\|\//g, sperator);
        return path;
    }
    getFullPath(path, parent, needTimeSymbol = false) {
        if (!parent) {
            parent = this.root;
        } else {
            parent = parent.trim();
        }
        if (needTimeSymbol) {
            let { StTimer } = require("./st_string"),
                timer = new StTimer(),
                sym = timer.format("Y_m_d");
            parent = this.pathJoin(parent, sym);
        }
        let testRootRE = new RegExp("^(\/|(\\w)+\\:)"),
            theRoot = "/";
        if (this.os == 'win') {
            theRoot = this.root;
            theRoot = theRoot.slice(0, theRoot.indexOf(":") + 2);
        }
        if (!parent.match(testRootRE)) {
            parent = this.pathJoin(theRoot, parent);
        } else {
            parent = parent.replace(testRootRE, theRoot);
        }
        path = this.pathJoin(parent, path);
        return path;
    }
    exists(path) {
        return FileSystem.existsSync(path);
    }
    mkdir(path, needTimeSymbol = true) {        
        path = this.getFullPath(path, "transport", needTimeSymbol);
        let nowFolderObj = this,
            pathArr = path.split(nowFolderObj.sperator),
            pathLen = pathArr.length,
            pathTraver = pathArr[0];
        for (let p = 1; p < pathLen; p ++) {
            pathTraver = pathTraver + nowFolderObj.sperator + pathArr[p];
            console.log(pathTraver);
            if (nowFolderObj.exists(pathTraver)) {
                stEcho.info(`${pathTraver}已存在`);
            } else {
                FileSystem.mkdirSync(pathTraver);
                stEcho.info(`${pathTraver}创建成功`);
            }
        }
    }
}

module.exports = {
    StFloderSync: StFloderSync
};