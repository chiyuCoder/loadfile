#!/usr/bin/env node

let {stdin, stdout, stderr} = require("process"),
    {StFloderSync} = require("./class/floder");
let myFolder = new StFloderSync(__dirname);
stdin.setEncoding('utf8');

stdin.on('readable', () => {
    let chunk = stdin.read();
    if (chunk != null) {
        let result = chunk.indexOf("public_html");
        console.log(result);
        if (result > 0) {
            let stDir = chunk.substr(result);
           myFolder.mkdir(stDir);
        } else {
            myFolder.mkdir(chunk);
        }
    }
});