<template>
  <nav class="navbar navbar-inverse navbar-fixed-top" v-if="shared.uxui.navbar">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" v-bind:href="Routes.MAIN.path">
          <img src="/img/logo_white.svg" style="height: 20px; margin-right: 10px; display: inline-block;"></img>
          <span style="display: inline-block;"><!-- Brand Name --></span>
        </a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <!-- start: Left menu -->
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Facebook <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">Facebook</li>
              <li><a href="#">Data collection</a></li>
              <li><a v-bind:href="Routes.FACEBOOK.ANALYTICS.path">Analytics</a></li>
            </ul>
          </li>
          <li><a v-bind:href="Routes.TWITTER.LIST.path">Twitter</a></li>
          <!-- end: Left menu -->
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{shared.user.name}} {{shared.user.surname}} <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">Admin</li>
              <li><a href="#settings">Settings</a></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header">User</li>
              <li><a href="#" v-on:click="Logout($event)">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// Requirements
import Cookies from 'js-cookie';

// Configurations
import Configs from '@/configs';

// Routes
import { Routes } from '@/router/routes';

// Stores and actions
import stores from  '@/store/stores';
import actions from  '@/store/actions';

// Services
import authServices from '@/services/auth';

export default {
  name: 'Navbar',
  data() {
    return {
      shared: stores,
      Routes: Routes
    }
  },
  methods: {
    Logout: function(e) {
      e.preventDefault();
      authServices.Logout()
      .then(res => {
        Cookies.remove('jwToken');
        actions.NAVBAR_HIDE();
        actions.USER_SET({});
        this.$router.push({name: Routes.SIGNIN.name});
      })
      .catch(err => {
        toastr.error(Configs.alerts.error);
      });
    }
  }
}
</script>
