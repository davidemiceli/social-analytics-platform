<template>
  <div class="headmargin">
    <form style="margin-top: 60px;" class="form-horizontal col-md-offset-3 col-md-6" v-on:keyup.enter="handleAuth($event)">
      <fieldset>
        <div class="text-center"><img src="/img/logo_white.svg" style="height: 18vh" /></div>
        <div class="col-sm-offset-4 col-sm-4">
          <div style="margin-top: 40px;" class="form-group">
            <input id="email" type="text" placeholder="Email" class="form-control" v-model="email" />
          </div>
        </div>
        <div class="col-sm-offset-4 col-sm-4">
          <div class="form-group">
            <input id="pwd" type="password" placeholder="Password" class="form-control" v-model="pwd" />
          </div>
        </div>
        <div class="col-sm-offset-4 col-sm-4">
          <div class="form-group">
            <button id="signin" type="button" v-on:click="handleAuth($event)" class="btn btn-primary btn-block sendrequest"><strong>Accedi</strong></button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>

// Requirements
import SparkMD5 from 'spark-md5';
import Cookies from 'js-cookie';

// Configurations
import Configs from '@/configs';

// Routes
import { Routes } from '@/router/routes';

// Services
import authServices from '@/services/auth';

// Actions
import actions from  '@/store/actions';

export default {
  name: Routes.SIGNIN.name,
  data() {
    return {
      email: '',
      pwd: ''
    }
  },
  methods: {
    handleAuth: function(e) {
      const email = this.email;
      const pwd = this.pwd;
      if ((email == '') || (pwd == '') || /\s/.test(email) || /\s/.test(pwd)) {
          toastr.error('Bad username or password');
          return;
      }
      actions.LOADING_START();
      const hashed_pwd = SparkMD5.hash(pwd);
      authServices.Signin(email, hashed_pwd)
      .then(res => {
        console.log('res.data.token =>', res.data.token);
        Cookies.set('jwToken', res.data.token, { expires: 1 });
        return authServices.UserInfo()
      })
      .catch(err => {
        actions.LOADING_STOP();
        toastr.error('Invalid username or password');
      })
      .then(res => {
        const user = res.data;
        actions.LOADING_STOP();
        this.$router.push({name: Routes.EMPTY.name});
      })
      .catch(err => {
        actions.LOADING_STOP();
        toastr.error(Configs.alerts.error);
      });
    }
  }
}
</script>
