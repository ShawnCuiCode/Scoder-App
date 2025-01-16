// API base URL (can be set as needed)
export const VUE_APP_API_URL = '';

// General HTTP request function
export const httpRequest = (opts, data) => {
    let httpDefaultOpts = {
        url: baseUrl + opts.url, // Construct request URL
        data: data, // Request data
        method: opts.method, // HTTP method
        header: opts.method === 'GET' ? {
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
        } : {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, // Headers based on HTTP method
        dataType: 'json', // Expected response data type
    };
    let promise = new Promise(function (resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1]); // Resolve with response
            }
        ).catch(
            (response) => {
                reject(response); // Reject on error
            }
        );
    });
    return promise; // Return a promise
};

// File upload request function
export const httpRequestUploadFile = (opts, filePath, data) => {
    let token = '';
    uni.getStorage({
        key: 'token',
        success: function (ress) {
            token = ress.data; // Retrieve token from local storage
        }
    });
    let httpDefaultOpts = {
        url: baseUrl + opts.url, // Construct upload URL
        header: {
            token: token, // Include token in headers
        },
        name: 'file', // File field name
        filePath: filePath, // Path to the file
        formData: data, // Additional form data
    };
    let promise = new Promise(function (resolve, reject) {
        uni.uploadFile(httpDefaultOpts).then(
            (res) => {
                resolve(res[1]); // Resolve with response
            }
        ).catch(
            (response) => {
                reject(response); // Reject on error
            }
        );
    });
    return promise; // Return a promise
};

// HTTP request with token included
export const httpTokenRequest = (opts, data) => {
    let token = '';
    uni.getStorage({
        key: 'token',
        success: function (ress) {
            token = ress.data; // Retrieve token from local storage
        }
    });
    // Test token (remove in production)
    token = 'dd0847da213958adf77e88a2cfb661e5';
    // The token is stored in local storage after a successful login
    let httpDefaultOpts = {
        url: baseUrl + opts.url, // Construct request URL
        data: data, // Request data
        method: opts.method, // HTTP method
        header: opts.method === 'GET' ? {
            'Token': token, // Include token in headers for GET requests
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
        } : {
            'Token': token, // Include token in headers for other requests
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        dataType: 'json', // Expected response data type
    };
    let promise = new Promise(function (resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1]); // Resolve with response
            }
        ).catch(
            (response) => {
                reject(response); // Reject on error
            }
        );
    });
    return promise; // Return a promise
};

// Custom HTTP request function
export const httpCustomeRequest = (opts, data) => {
    let httpDefaultOpts = {
        url: opts.url, // Custom request URL
        data: data, // Request data
        method: opts.method, // HTTP method
        header: opts.method === 'GET' ? {
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
        } : {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, // Headers based on HTTP method
        dataType: 'json', // Expected response data type
    };
    let promise = new Promise(function (resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1]); // Resolve with response
            }
        ).catch(
            (response) => {
                reject(response); // Reject on error
            }
        );
    });
    return promise; // Return a promise
};
