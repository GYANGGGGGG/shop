//使用formidable对formData数据进行解析并上传到服务器

var express = require('express');
var router = express.Router();
// var multer  = require('multer')
var fs = require('fs');
var formidable = require('formidable');
var checkLogin = require('../middlewares/check').checkLogin;

var cacheFolder = 'public/images/'; //图片上传目录

router.get('/',checkLogin, function(req, res) {
    res.render('addcommodity');
})

router.post('/',checkLogin, function(req, res) {
    // console.log(req.session);
    var currentUser = req.session.user;
    var userDirPath = cacheFolder + currentUser._id; //用户图片上传目录
    if (!fs.existsSync(userDirPath)) { //检测并创建目录
        fs.mkdirSync(userDirPath);
    }
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;

    var displayUrl;
    // var files = [];

    // form.on('file', function(filed, file) {
    //     files.push([filed, file]);
    // }); //whenever a file is received, this will add the file info to the array

    // console.log(files);

    form.parse(req, function(err, fields, files) {
        // console.log(fields);
        // console.log(fields);
        if (err) {
            res.send(err);
            return;
        }
        var extName = ''; //后缀名
        // console.log(files);
        switch (files.upload.type) {
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
        if (extName.length === 0) {
            res.send({
                code: 202,
                msg: '只支持png和jpg格式图片'
            });
            return;
        } else {
            var avatarName = '/' + Date.now() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            var userPath = currentUser._id + avatarName;//用户直接目录

            fs.renameSync(files.upload.path, newPath); //重命名
            // res.send(200);
            var Commodity = global.dbHelper.getModel('commodity');
            console.log(req.session.user._id);
            var uId = req.session.user._id;
            var cId = fields.id;
            var cname = fields.cname;
            var price = fields.cprice;
            var imgSrc = userPath;
            var imgIndex = fields.imgIndex;
            var commodity = {
              uId: uId,
              cId: cId,
              cname: cname,
              price: price,
              imgSrc: imgSrc,
              imgIndex :imgIndex
            };

            Commodity.create(commodity, function (error, doc) {
                if (doc) {
                    // res.send(200);
                    // res.redirect('./home');
                }else{
                    res.send(error);
                }



            });


        }
    });

});




module.exports = router;
