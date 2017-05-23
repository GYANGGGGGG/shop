module.exports = function (app) {
    app.get('/', function(req, res) {
        res.redirect('/login');
    });

    app.use('/login', require('./login'));
    app.use('/home', require('./home'));
    app.use('/logout', require('./logout'));
    app.use('/register', require('./register'));
    app.use('/cart', require('./cart'));
    app.use('/commodity', require('./commodity'));
    app.use('/addcommodity', require('./addcommodity'));
    app.use('/test2', require('./test2'));
    app.use('/sale', require('./sale'));
    app.use('/shop', require('./shop'));

};
