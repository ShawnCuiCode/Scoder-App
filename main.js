import Vue from 'vue';
import App from './App';

// Import uView UI library globally
import uView from 'uview-ui';

// Import global components
import Navbar from '@/components/navbar/navbar.vue'; // Navbar component
import NoData from '@/components/no-data.vue'; // NoData placeholder component

// Import global theme variables
import appTheme from '@/theme.scss';

// Import global utility functions
import {replaceSale} from '@/utils/replace.js'; // Utility to handle sale replacements
import {copyByUniappApi} from '@/utils/uniapp-api.js'; // Utility to handle clipboard operations

// Import Vuex store for state management
import store from './store/index.js';

// Import HTTP configuration based on uView UI
import {installHttpConfig} from '@/api/config.js';

// Import global API modules
import {installApiModules} from '@/api';

Vue.config.productionTip = false; // Disable production tip in console

App.mpType = 'app'; // Specify the type of the Vue instance as an app

// Register uView UI globally
Vue.use(uView);

// Register global components
Vue.component('Navbar', Navbar); // Register Navbar as a global component
Vue.component('NoData', NoData); // Register NoData as a global component

// Add global variables and functions to Vue's prototype
Vue.prototype.$appTheme = appTheme; // Add global theme variables
Vue.prototype.$replaceSale = replaceSale; // Add sale replacement utility
Vue.prototype.$copyByUniappApi = copyByUniappApi; // Add clipboard utility
Vue.prototype.$store = store; // Add Vuex store instance

// Create Vue instance
const app = new Vue({
    ...store, // Include Vuex store in the instance
    ...App, // Include the main app component
});

// Register HTTP configuration after creating the Vue instance
Vue.use(installHttpConfig, app);

// Register API modules globally
Vue.use(installApiModules, app);

// Mount the Vue instance to the DOM
app.$mount();
