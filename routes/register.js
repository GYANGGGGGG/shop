var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

var cacheFolder = 'public/images/avatar/';

    router.get('/', function(req, res) {
    //   console.log('register');
        res.render('register');
    });

    router.post('/', function (req, res) {

        if (!fs.existsSync(cacheFolder)) { //检测并创建目录
            fs.mkdirSync(cacheFolder);
        }
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = cacheFolder; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 3 * 1024 * 1024; //文件大小
        form.type = true;

        form.parse(req, function(err, fields, files) {
            // console.log("2",files);
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
                var avatar = 'avatar/' + avatarName;//用户直接目录

                fs.renameSync(files.upload.path, newPath); //重命名
                // res.send(200);
                // console.log(fields.name);
                var name = fields.name;
                var password = fields.password;
                var gender = fields.gender;
                var ubio = fields.bio;
                var uDate = new Date().toLocaleString( );


                var User = global.dbHelper.getModel('user');

                var  user = {
                      name: name,
                      password: password,
                      gender: gender,
                      ubio: ubio,
                      uDate: uDate,
                      avatar :avatar
                  };

                User.findOne({name: name}, function (error, doc) {
                    if (error) {
                        res.send(500);
                        // req.session.error = '网络异常错误！';
                        // console.log(error);
                    } else if (doc) {
                        // req.session.error = '用户名已存在！';
                        res.send(500);
                    } else {
                        User.create(user, function (error, doc) {
                            if (error) {
                                res.send(500);
                                // console.log('1',error);
                            } else {
                                // req.session.error = '用户名创建成功！';
                                req.session.user=doc;
                                res.send(200);
                            }
                        });
                    }
                });


            }
        });






    });

    module.exports = router;
