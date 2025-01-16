export const HTTP_URL_DEV = 'http://127.0.0.1:8080';
export const HTTP_URL_PROD = 'http://127.0.0.1:8080';

export const HTTP_URL_DEV_PREFIX = '';
export const HTTP_URL_PROD_PREFIX = '';

// uView UI HTTP Configuration
export const UVIEWUI_HTTP_CONFIG = {
    baseUrl: process.env.NODE_ENV === 'development'
        ? HTTP_URL_DEV + HTTP_URL_DEV_PREFIX
        : HTTP_URL_PROD + HTTP_URL_PROD_PREFIX,
    method: 'GET', // Default request method
    dataType: 'json', // Expected response data type
    showLoading: true, // Show loading indicator during requests
    loadingText: 'Loading...', // Text displayed during loading
    loadingTime: 800, // Delay before showing loading spinner (ms)
    originalData: true, // Return raw server response (required for custom handling)
    loadingMask: true, // Prevent touch interactions while loading
    header: {
        'Content-Type': 'application/json;charset=UTF-8', // Default headers
    },
};

// Request Interceptor
export const httpRequest = (config) => {
    const token = uni.getStorageSync('token'); // Retrieve token from storage
    config.header = {
        ...config.header, // Preserve existing headers
        Authorization: token ? `Bearer ${token}` : '', // Add token if available
    };
    return config; // Return modified config
};

// Response Interceptor
export const httpResponse = (res) => {
    if (!res || !res.data) {
        // Handle case where response is invalid
        uni.showToast({
            title: 'Invalid response from server.',
            icon: 'none',
        });
        throw new Error('Invalid response');
    }

    const {statusCode, data} = res;

    // Check HTTP status codes
    if (statusCode === 200) {
        return data; // Return the response data directly
    } else if (statusCode === 401) {
        // Handle unauthorized errors
        uni.showToast({
            title: 'Unauthorized. Please log in again.',
            icon: 'none',
        });
        uni.redirectTo({
            url: '/pages/login/index', // Redirect to login page
        });
        throw new Error('Unauthorized');
    } else if (statusCode === 500) {
        // Handle server errors
        uni.showToast({
            title: 'Server error. Please contact support.',
            icon: 'none',
        });
        throw new Error('Server error');
    } else {
        // Handle other status codes
        uni.showToast({
            title: `Error: ${data?.msg || 'Unknown error'}`,
            icon: 'none',
        });
        throw new Error(data?.msg || 'Unknown error');
    }
};

// Install HTTP Configuration
export const installHttpConfig = (Vue, vm) => {
    Vue.prototype.$u.http.setConfig(UVIEWUI_HTTP_CONFIG); // Set base config
    Vue.prototype.$u.http.interceptor.request = httpRequest; // Attach request interceptor
    Vue.prototype.$u.http.interceptor.response = httpResponse; // Attach response interceptor
};
