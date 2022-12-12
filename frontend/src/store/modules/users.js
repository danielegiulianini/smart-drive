import axios from "axios";
import { createClient } from "@supabase/supabase-js";

//========== to put in config directory =============
// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://epwsidhcgzajhezxiqyp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwd3NpZGhjZ3phamhlenhpcXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4NzI2NDEsImV4cCI6MTk3NzQ0ODY0MX0.qQQJSVDQkbG8SoJWa8ybUtmUTjn3ffyn9CfO8jwAcks"
);
// ===================================================

// =================== users module initialization code =======================
const {
  data: { session },
} = await supabase.auth.getSession();
//const { user } = session;
let user = null;
console.log("in users's modules of vuex store, session is:");
console.log(session);
if (session) {
  user = session.user;
}
//=============================================================================

const state = {
  user: user, //await supabase.auth.user(), //firebaseApp.app.auth().currentUser,
  isLoadedFlag: false,
};

const getters = {
  getUser: (state) => state.user,
  isLoggedIn: (state) => !!state.user,
  isLoaded: (state) => state.isLoadedFlag,
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setLoadedFlag: (state, value) => (state.isLoadedFlag = value),
};

const actions = {
  //using ES2015 argument destructuring here to simplify the code a bit (especially when we need to call commit multiple times):
  async registerAuthStateChangedListener({ commit }) {
    console.log("registering auth state change (users module)");

    //Geting the currently signed-in user
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("printing (event; session) in onAuthStateChange");
      console.log(event, session);

      if (session && session.user) {
        commit("setUser", user);
        commit("setLoadedFlag", true);

        // Adding a request interceptor
        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = session.access_token;
          return config;
        });
      } else {
        commit("setLoadedFlag", true);
      }
    });
  },

  async login({ commit }, params) {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });
    console.log("[users module] the error during login:", { error });
    console.log("[users module] the user:", { user });
    console.log("[users module] the session:", { session });
    if (error) {
      throw error; //throwing the error to allow login form to access it (as supabase doesn't throw it!)
    } else {
      commit("setUser", user);
      return (axios.defaults.headers.common["Authorization"] =
        session.access_token);
    }

    /*with promise-style:
    return supabase.auth
      .signInWithPassword({
        email: params.email,
        password: params.password,
      })
      .then(({ data: { user, session }, error }) => {
        console.log("[users module] the error during login:", { error });
        console.log("[users module] the user:", { user });
        console.log("[users module] the session:", { session });
        if (error) {
          throw error; //throwing the error to allow login form to access it (as supabase doesn't throw it!)
        } else {
          commit("setUser", user);
          axios.defaults.headers.common["Authorization"] = session.access_token;
        }
      });*/
  },

  async register({ commit }, params) {
    console.log("signup in (users module)");

    //this try-catch must be deleted for using exceptions on components
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });
    console.log("[users module] the error during register:", { error }); //implicit email verification
    console.log("[users module] the user during register:", { user }); //implicit email verification
    console.log("[users module] the session during register:", { session }); //implicit email verification
    if (error) {
      throw error; //throwing the error to allow login form to access it (as supabase doesn't throw it!)
    } else {
      commit("setUser", user);

      //If project's "Confirm email" is enabled (see https://app.supabase.com/project/epwsidhcgzajhezxiqyp/auth/users),
      //a user is returned but session is null. (in this case the flow continues
      //by means of the user (which clicks on the email copntaining the url and gets redirected to the my home page url, for ex.))

      return user;
    }
  },

  async logout({ commit }) {
    console.log("logging out (users module)");
    const { error } = supabase.auth
      .signOut()
      .then(() => {
        delete axios.defaults.headers.common["Authorization"];
        //throw TypeError
        commit("setUser", null);
      })
      .catch((error) => console.error(`errors while logging out: ${error}`));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
