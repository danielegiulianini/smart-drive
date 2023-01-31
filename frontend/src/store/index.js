import { createStore } from "vuex";
import { createLogger } from "vuex";
import users from "./modules/users";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
  },
  plugins: [createLogger()], //to be possibly removed in production
});
