var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

    router.get('/', checkLogin, function (req, res) {
      // console.log(req.session);
    //   res.redirect('home');

    var User = global.dbHelper.getModel('user');
    var Cart = global.dbHelper.getModel('cart');
    var id = req.session.user._id;
    var carts = [];
    var user = [];

    User.find({"_id":id} ,function (error, doc) {

            user=doc;
          //   console.log(user);

            Cart.find({"uId":req.session.user._id,"cStatus":false}, function (error, docs) {
                carts=docs;
                res.render('single-product',{User:user,Carts:carts});

            });


    });

    });
    router.get('/single/:id', checkLogin, function (req, res) {
      // console.log(req.session);
          var CImg = global.dbHelper.getModel('cImg');
          var Commodity = global.dbHelper.getModel('commodity');
          var User = global.dbHelper.getModel('user');
          var Cart = global.dbHelper.getModel('cart');

          var commoditys = [];
          var user = [];
          var carts = [];
          var cImag =[];
          var id = req.session.user._id;

          CImg.find({"cId": req.params.id}, function (error, docs) {

              cImag=docs;
              console.log(cImag);
          });

          Commodity.find({"cId": req.params.id} ,function (error, docs) {


                  commoditys=docs;

              console.log(commoditys,'commoditys');

          });
          User.find({"_id":id} ,function (error, doc) {

                  user=doc;
                //   console.log(user);

                  Cart.find({"uId":req.session.user._id,"cStatus":false}, function (error, docs) {
                      carts=docs;
                      res.render('single-product',{
                          User:user,
                          Commoditys:commoditys,
                          Carts:carts,
                          CImgs:cImag
                      });

                  });


          });
    });

module.exports = router;
