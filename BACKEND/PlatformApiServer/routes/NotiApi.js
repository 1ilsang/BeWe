// import { auth } from '../controllers/AuthCtrl';

const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');

const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {

  router.route('/users/noti')
    .get(authCtrl.checkSession, authCtrl.auth, notiCtrl.list);

  router.route('/users/noti/:idx')
    .get(authCtrl.auth, notiCtrl.check);

  return router;
};