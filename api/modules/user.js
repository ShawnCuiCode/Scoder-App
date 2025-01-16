export const useUserApi = (Vue, vm) => {
    return {
        // Logs in a user with the provided credentials
        async login(data) {
            return await vm.$u.http.post('/auth/login', data);
        },

        // Registers a new user with the provided data
        async register(data) {
            return await vm.$u.http.post('/auth/register', data);
        },

        // Retrieves the user's details using the current token
        async getUserByToken() {
            return await vm.$u.http.get('/user/getUserByToken');
        },

        // Fetches details of a user by their ID
        async getUserById(userId) {
            return await vm.$u.http.get('user/' + userId);
        },

        // Updates the profile of the current user
        async updateProfile(user) {
            return await vm.$u.http.put('user/updateProfile', user);
        },

        // Resets the user's password with the old and new passwords provided
        async resetPwd(oldPassword, newPassword) {
            return await vm.$u.http.put(
                'user/resetPwd?oldPassword=' + oldPassword + '&&newPassword=' + newPassword
            );
        },
    };
};
