var express = require('express');
var router = express.Router();
var fs = require('fs');

var checkLogin = require('../middlewares/check').checkLogin;

    router.get('/', checkLogin, function (req, res) {
      // console.log(req.session);
          var Commodity = global.dbHelper.getModel('commodity');
          Commodity.find({"uId":req.session.user._id}, function (error, docs) {
              res.render('sale',{Commoditys:docs});
          });
    });
    router.get('/del/:id', checkLogin, function (req, res) {
      // console.log(req.session);z
          var Commodity = global.dbHelper.getModel('commodity');
          var CImg = global.dbHelper.getModel('cImg');

          CImg.find({"cId":req.params.id},function(error,docs){
                    // console.log(docs);
                    for(var i in docs){
                        // console.log(docs[i].imgSrc);
                        fs.unlink('public/images/'+docs[i].imgSrc);
                    }
          });

          Commodity.remove({"cId":req.params.id},function(error,docs){
              //成功返回1  失败返回0
            //   if(docs > 0){
            //       res.redirect('/sale');
            //   }
          });

          CImg.remove({"cId":req.params.id},function(error,docs){
              //成功返回1  失败返回0
              if(docs > 0){
                  res.redirect('/sale');
              }
          });
    });

module.exports = router;
