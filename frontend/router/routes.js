'use strict';

// Configurations
import Configs from '@/configs';

// Routes
export const Routes = {
  // Dashboard
  MAIN: {path: '/', name: 'main'},
  DASHBOARD: {path: `${Configs.paths.dashboard}`, name: 'dashboard'},
  // Auth
  SIGNIN: {path: `${Configs.paths.dashboard}/signin`, name: 'signin'},
  // Facebook
  FACEBOOK: {
    LIST: {path: `${Configs.paths.dashboard}/facebook`, name: 'facebook_list'},
    ANALYTICS: {path: `${Configs.paths.dashboard}/facebook/analytics`, name: 'facebook_analytics'}
  },
  // Twitter
  TWITTER: {
    LIST: {path: `${Configs.paths.dashboard}/twitter`, name: 'twitter'}
  },
  // Empty
  EMPTY: {path: `${Configs.paths.dashboard}/empty`, name: 'empty'},
  // Not Found: 404 error
  NOTFOUND: {path: '/404', name: 'notfound'}
};
