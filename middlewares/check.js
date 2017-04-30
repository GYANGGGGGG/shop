module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.session.error = "用户已过期，请重新登录."
      return res.redirect('/login');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.session.error = "用户已登录."
      return res.redirect('/home');//返回之前的页面
    }
    next();
  }
};
