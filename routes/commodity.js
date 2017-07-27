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
        //   var type ='';
          var id = req.session.user._id;

          CImg.find({"cId": req.params.id}, function (error, docs) {

              cImag=docs;
            //   console.log(cImag);
          });



                  var promise = new Promise(function(resolve){

                  Commodity.find({"cId": req.params.id} ,function (error, docs) {//通过本商品id进行筛选


                          commoditys=docs;
                        //   type = docs[0].type;
                        //   uId = docs[0].uId;
                          resolve(docs);
                  });

                  });
                  promise.then(function(value){
                    //   console.log(value,'vv');

                      Commodity.find({"type": value[0].type} ,function (error, docs) {

                              commoditys=commoditys.concat(docs.slice(0, 4));
                              console.log('type',commoditys.length);

                      });
                      return commoditys;

                  }).then(function(value){
                            // console.log(value,'vw');
                      Commodity.find({"uId": id} ,function (error, docs) {

                              commoditys=commoditys.concat(docs.slice(4, 10));
                            //   console.log('uId',commoditys.length);
                            //   console.log(commoditys,'uid');
                      });

                      return commoditys;
                  }).then(function(value){

                      User.find({"_id":id} ,function (error, doc) {
                              user=doc;
                            //   console.log('all',commoditys.length);

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
                  })



            //   console.log(commoditys,'commoditys');



    });

module.exports = router;
