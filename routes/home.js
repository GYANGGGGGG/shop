var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

    router.get('/', checkLogin, function (req, res) {
      // console.log(req.session);
          var Commodity = global.dbHelper.getModel('commodity');
          Commodity.find({imgIndex:0}, function (error, docs) {
              res.render('home',{Commoditys:docs});
          });
    });

module.exports = router;
