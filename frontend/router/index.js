'use strict';

// Requirements
import Vue from 'vue';
import VueRouter from 'vue-router';

// Routes
import { Routes } from '@/router/routes';

// Middlewares
import isAuth from '@/middlewares/isauth';

// Routes
import Signin from '@/components/auth/signin/index';
import Empty from '@/components/Empty';
import NotFound from '@/components/404';

Vue.use(VueRouter);

const routes = [
  { path: Routes.MAIN.path, redirect: Routes.EMPTY.path },
  { path: Routes.DASHBOARD.path, redirect: Routes.EMPTY.path },
  { path: Routes.SIGNIN.path, name: Routes.SIGNIN.name, component: Signin },
  { path: Routes.EMPTY.path, name: Routes.EMPTY.name, component: Empty, beforeEnter: isAuth },
  { path: Routes.NOTFOUND.path, component: NotFound },
  { path: '*', redirect: Routes.NOTFOUND.path }
];

export default new VueRouter({
  mode: 'history',
  routes: routes
});
