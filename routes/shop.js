var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

    router.get('/', checkLogin, function (req, res) {
      // console.log(req.session);
          var Commodity = global.dbHelper.getModel('commodity');
          var User = global.dbHelper.getModel('user');
          var Cart = global.dbHelper.getModel('cart');

          var commoditys = [];
          var user = [];
          var carts = [];
          var id = req.session.user._id;
          Commodity.find({} ,function (error, docs) {

              commoditys = docs;
            //   console.log(commoditys);

          });
          User.find({"_id":id} ,function (error, doc) {

                  user=doc;
                //   console.log(user);

                  Cart.find({"uId":req.session.user._id,"cStatus":false}, function (error, docs) {
                      carts=docs;
                      res.render('shop',{User:user,Commoditys:commoditys,Carts:carts});

                  });


          });



    });

module.exports = router;
