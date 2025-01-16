import Vue from 'vue'
import Vuex from 'vuex'
import websocketModule from "./modules/websocket";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        websocket: websocketModule,
    }
})
