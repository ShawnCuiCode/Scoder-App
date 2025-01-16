export const useMessageApi = (Vue, vm) => {
    return {
        // Fetches the list of direct chats for a specific user
        async getDirectChatList(userId) {
            return await vm.$u.http.get('im/getDirectChatList/' + userId);
        },

        // Fetches the list of team chats for a specific user
        async getTeamChatList(userId) {
            return await vm.$u.http.get('im/getTeamChatList/' + userId);
        },

        // Fetches the chat history between a user and a specific receiver
        async getDirectChatHistory(userId, receiverId) {
            return await vm.$u.http.get('im/getDirectChatHistory/' + userId + '/' + receiverId);
        },

        // Fetches the chat history for a specific team
        async getTeamChatHistory(teamId) {
            return await vm.$u.http.get('im/getTeamChatHistory/' + teamId);
        },
    }
}
