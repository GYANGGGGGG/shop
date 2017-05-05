var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;
    router.get('/', checkNotLogin, function(req,res){
      // console.log('login');
        res.render('login');
    });

    router.post('/', function (req, res) {
      // console.log(req.body);
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname;
        User.findOne({name: uname}, function (error, doc) {
          // console.log(doc);
            if (error) {
                res.send(500);
                console.log(error);
            } else if (!doc) {
                req.session.error = '用户名不存在！';
                res.send(404);
            } else {
               if(req.body.upwd != doc.password){
                   req.session.error = "密码错误!";
                   res.send(404);
               }else{
                   req.session.user=doc;
                   res.send(200);
               }
            }
        });
    });

module.exports = router;
