var express = require('express');
var router = express.Router();

    router.get('/', function(req, res) {
      console.log('register');
        res.render('register');
    });

    router.post('/', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname,
            user = {
              name: uname,
              password: req.body.upwd
            }
        User.findOne({name: uname}, function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
                console.log(error);
            } else if (doc) {
                req.session.error = '用户名已存在！';
                res.send(500);
            } else {
                User.create(user, function (error, doc) {
                    if (error) {
                        res.send(500);
                        console.log(error);
                    } else {
                        req.session.error = '用户名创建成功！';
                        res.send(200);
                    }
                });
            }
        });
    });

    module.exports = router;
