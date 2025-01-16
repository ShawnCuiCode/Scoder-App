export const useBaseApi = (Vue, vm) => {
    return {
        // Uploads the user's avatar to the server
        async uploadAvatar(data) {
            return await vm.$u.http.post('/file/upload', data);
        },

        // Fetches the dictionary data for team skills
        async getSkillDictData() {
            return await vm.$u.http.get('/user/dict/team_skills');
        },

        // Fetches the dictionary data for team goals
        async getGoalDictData() {
            return await vm.$u.http.get('/user/dict/team_goals');
        },

        // Fetches the dictionary data for team experience
        async getExperienceDictData() {
            return await vm.$u.http.get('/user/dict/team_experience');
        },
    }
}
