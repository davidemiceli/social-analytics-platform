'use strict';

// Requirements
import axios from 'axios';

// Configurations
import Configs from '@/configs';

// Authentication Services
class authServices {

    constructor() { }

    UserInfo() {
        return axios.get(Configs.paths.services + '/auth/user', {
            headers: Configs.getAuthHeaders()
        });
    }
    Signin(email, pwd) {
        return axios.post(Configs.paths.services + '/auth/signin', {
            password: pwd,
            email: email
        });
    }
    Logout() {
        return axios.get(Configs.paths.services + '/auth/logout', {
            headers: Configs.getAuthHeaders()
        });
    }
}

export default new authServices();
