var express = require('express');
var router = express.Router();
var multer  = require('multer')
var fs = require('fs');

//创建上传目录
var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};


var uploadFolder = 'public/images';
createFolder(uploadFolder);


//定制上传方式
var imgName = '';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, imgName = Date.now()+ '-' +file.originalname);
    }
});



var upload = multer({ storage: storage })

  router.get('/', function(req, res) {
      res.render('addcommodity');
  });


  router.post('/', upload.single('cimgSrc'),function (req, res, next) {

      var file = req.file;

    console.log(req.body);

      var Commodity = global.dbHelper.getModel('commodity');
      console.log(req.session.user._id);
      var uId = req.session.user._id;
      var cname = req.body.cname;
      var price = req.body.cprice;
      var imgSrc = imgName;
      var commodity = {
        uId: uId,
        name: cname,
        price: price,
        imgSrc: imgSrc
      };
      Commodity.create(commodity, function (error, doc) {
          if (doc) {
              // res.send(200);
              res.redirect('./home');
          }else{
              res.send(404);
          }
      });
  });
module.exports = router;
