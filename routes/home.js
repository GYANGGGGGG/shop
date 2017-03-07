module.exports = function ( app ) {
    app.get('/home', function (req, res) {
      console.log(req.session);
        if(req.session.user){
            var Picture = global.dbHelper.getModel('picture');
            Picture.find({}, function (error, docs) {
              console.log(docs);
                res.render('home',{Pictures:docs});
            });
        }else{
            req.session.error = "请先登录"
            res.redirect('/login');
        }
    });
}
