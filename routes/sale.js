var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

    router.get('/', checkLogin, function (req, res) {
      // console.log(req.session);
          var Commodity = global.dbHelper.getModel('commodity');
          Commodity.find({"uId":req.session.user._id,"imgIndex":0}, function (error, docs) {
              res.render('sale',{Commoditys:docs});
          });
    });
    router.get('/del/:id', checkLogin, function (req, res) {
      // console.log(req.session);
          var Commodity = global.dbHelper.getModel('commodity');
          Commodity.remove({"cId":req.params.id},function(error,doc){
              //成功返回1  失败返回0
              if(doc > 0){
                  res.redirect('/sale');
              }
          });
    });

module.exports = router;
