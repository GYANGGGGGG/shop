var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

    router.get('/', checkLogin, function (req, res) {
      // console.log(req.session);
      res.redirect('home');
    });
    router.get('/single/:id', checkLogin, function (req, res) {
      // console.log(req.session);
          var Commodity = global.dbHelper.getModel('commodity');
          Commodity.find({"cId": req.params.id}, function (error, docs) {
              res.render('commodity',{Commoditys:docs});
          });
    });

module.exports = router;
