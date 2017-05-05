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
    app.use('/test', require('./test'));
    app.use('/sale', require('./sale'));

};
