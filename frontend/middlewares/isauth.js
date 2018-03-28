'use strict';

// Routes
import { Routes } from '@/router/routes';

// Stores and actions
import stores from  '@/store/stores';
import actions from  '@/store/actions';

// Services
import authServices from '@/services/auth';

// Checks if user is authenticated
function isAuth(to, from, next) {
  authServices.UserInfo()
  .then(res => {
    const user = res.data;
    actions.USER_SET(user);
    actions.NAVBAR_SHOW();
    next();
  })
  .catch(err => {
    actions.NAVBAR_HIDE();
    next({
      path: Routes.SIGNIN.path,
      query: { redirect: to.fullPath }
    });
  });
}

export default isAuth;
