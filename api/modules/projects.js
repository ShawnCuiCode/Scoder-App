export const useProjectsApi = (Vue, vm) => {
    return {
        // Fetches the list of all projects
        async getProjectList() {
            return await vm.$u.http.get('/projects/getProjectList');
        },

        // Fetches details of a specific project by its ID
        async getProjectById(projectId) {
            return await vm.$u.http.get('/projects/' + projectId);
        },

        // Fetches the list of teams associated with a specific project
        async getTeamsByProjectId(projectId) {
            return await vm.$u.http.get('/projects/team/project/' + projectId);
        },

        // Fetches the list of teams a specific user is part of, within a project
        async getTeamListByUser(projectId, userId) {
            return await vm.$u.http.get('/projects/team/getTeamListByUser?projectId=' + projectId + '&userId=' + userId);
        },

        // Adds a new project with the provided data
        async addProject(data) {
            return await vm.$u.http.post('/projects', data);
        },

        async updateProject(data) {
            return await vm.$u.http.put('/projects', data);
        },

        // Adds a new team with the provided form data
        async addTeam(form) {
            return await vm.$u.http.post('projects/team', form);
        },

        // Updates an existing team with the provided form data
        async updateTeam(form) {
            return await vm.$u.http.put('/projects/team/', form);
        },

        // Allows a user to join a specific team by team ID
        async joinTeam(teamId) {
            return await vm.$u.http.post('/projects/team/' + teamId + '/join');
        },

        // Fetches details of a specific team by its ID
        async getTeamById(teamId) {
            return await vm.$u.http.get('projects/team/' + teamId);
        },

        // Fetches the list of projects the current user is part of
        async getMyProjectList() {
            return await vm.$u.http.get('projects/getMyProjectList');
        },

        // Fetches the list of teams the current user is part of
        async getMyTeamList() {
            return await vm.$u.http.get('projects/team/getMyTeamList');
        },
    }
}
