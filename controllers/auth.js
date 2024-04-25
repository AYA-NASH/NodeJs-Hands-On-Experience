const User = require('../models/user');

exports.getLogin = (req, res, next) => {
      res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

exports.postLogin = (req, res, next)=>{
    User.findById('6625555916b00f96126d626f')
    .then(user=>{
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });     
    })
    .catch(err=>{
      console.log(err);
    })
}

exports.postLogout = (req, res, next)=>{
  // clear the session
  req.session.destroy((err)=>{
    //this functoin gets called once the session is destroyed
    console.log(err);
    res.redirect('/');
  })
}