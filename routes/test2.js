/*
 *移动端图片压缩上传功能后台
 */
"use strict";
var express = require('express');
var fs = require('fs');
var router = express.Router();
//var FormParser = require("./formParser");
var formidable = require('formidable');
var path = require('path');

var checkLogin = require('../middlewares/check').checkLogin;

var fileSaveDir  = 'public/images/';

router.get('/',checkLogin, function(req, res) {
    res.render('test');
})

router.post('/',checkLogin, function(req, res) {
  if (!fs.existsSync(fileSaveDir)) {
    fs.mkdirSync(fileSaveDir)
  }

  var form = new formidable.IncomingForm();
  var responseData = [];
  form.uploadDir = fileSaveDir;
  form.type = true;
  form.keepExtensions = true;
console.log(1);
  form.parse(req, function(err, fields, files){
    if(!err) {



        // console.log(files);
      Object.keys(files).forEach(function(key){
        //   console.log(files);


        var file = files[key];
        var filename = path.basename(file.path);

        var extName = ''; //后缀名
        // console.log(files);
        switch (file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        var avatarName = '/' + Date.now() + '.' + extName;
        var newPath = form.uploadDir + avatarName;
      //   var userPath = currentUser._id + avatarName;//用户直接目录
        //   console.log(file.path);
        fs.renameSync(file.path, newPath); //重命名

        //每张图片给予一分钟保存时间
    //     setTimeout(function() {
    //       if (!fs.existsSync(newPath)) return;
      //
    //       console.log("\x1B[33m删除文件" + filename + "\x1B[0m");
    //       fs.unlinkSync(newPath);
    //   }, 20 * 1000);

        // 塞入响应数据中
        responseData.push({
          type: file.type,
          name: filename,
          path: '/public/upload/' + filename,
          size: file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB"
        });
      });
    } else {
      console.warn(err);
    }

    res.writeHead(200);
    res.end(JSON.stringify(responseData));
  });
});
module.exports = router;
