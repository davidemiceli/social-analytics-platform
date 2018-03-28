'use strict';

// Requirements
import Cookies from 'js-cookie';

// Configuration settings
const Configs = {
  paths: {
    services: '/api',
    dashboard: '/dashboard',
    sockets: 'http://localhost:3000'
  },
  alerts: {
    success_added: 'Data added with success!',
    deleted: 'Deleted data with success!',
    error: 'Sorry, there was an error: contact the administrator...',
  },
  getAuthHeaders: function() {
    return {'Authorization': 'Bearer ' + Cookies.get('jwToken')};
  }
};

export default Configs;
