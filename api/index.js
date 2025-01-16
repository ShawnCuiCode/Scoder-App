// Import user-related API functions
import {useUserApi} from './modules/user.js';

// Import project-related API functions
import {useProjectsApi} from './modules/projects.js';

// Import base/general API functions
import {useBaseApi} from './modules/base.js';

// Import messaging-related API functions
import {useMessageApi} from './modules/message.js';

// Function to install and register API modules into the Vue instance
export const installApiModules = (Vue, vm) => {
    // Merge all API modules into a single object and assign it to $u.api
    vm.$u.api = Object.assign(
        useProjectsApi(Vue, vm),  // Add project APIs
        useUserApi(Vue, vm),      // Add user APIs
        useBaseApi(Vue, vm),      // Add base APIs
        useMessageApi(Vue, vm)    // Add message APIs
    );
};
