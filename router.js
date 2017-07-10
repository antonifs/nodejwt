const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false} );
const requireSignin = passport.authenticate('local', { session: false} );

module.exports = function (app) {
  app.get('/', requireAuth, function(req, res){
    res.send({ message: 'Authentication with JWT' });
  });
  app.get('/list-of-users', requireAuth, function(req, res){
    res.send({ 
      users: [
        {id: '1', nama: 'Antoni'}, 
        {id: '2', nama: 'Fajar'}, 
        {id: '3', nama: 'Setiawan'}
      ]
   });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
