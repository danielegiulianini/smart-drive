import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import io from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js"; //import io from "socket.io-client" does not work

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://epwsidhcgzajhezxiqyp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwd3NpZGhjZ3phamhlenhpcXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4NzI2NDEsImV4cCI6MTk3NzQ0ODY0MX0.qQQJSVDQkbG8SoJWa8ybUtmUTjn3ffyn9CfO8jwAcks"
);

// =================== users module initialization code =======================
const {
  data: { session },
} = await supabase.auth.getSession();
let user = "";
if (session) {
  user = session.user;
}
//=============================================================================

const state = {
  user: user, 
  session: session,
  isLoadedFlag: false,
  socket: "",
};

const getters = {
  getUser: (state) => state.user,
  getSession: (state) => state.session,
  isLoggedIn: (state) => state.user, //before:  !!state.user,
  isLoaded: (state) => state.isLoadedFlag,
  getSocket: (state) => state.socket,
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setSession: (state, session) => (state.session = session),
  setLoadedFlag: (state, value) => (state.isLoadedFlag = value),
  setSocket: (state, value) => (state.socket = value),
};

const actions = {
  //using ES2015 argument destructuring here to simplify the code a bit (especially when we need to call commit multiple times):
  async registerAuthStateChangedListener({ commit }) {
    console.log("registering auth state change (users module)");

    //Geting the currently signed-in user
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (session && session.user) {
        commit("setUser", user);
        commit("setSession", session);
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

  async login({ commit, getters }, params) {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });
    
    if (error) {
      throw error; //throwing the error to allow login form to access the error and didplay error message (as supabase doesn't throw it!)
    } else {
      commit("setUser", user);
      commit("setSession", session);

      if (!getters.getSocket) {
        commit(
          "setSocket",
          io("http://localhost:8088", {
            query: { token: session.access_token },
          })
        );
        console.log("the socket is:", getters.getSocket);
      }

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
    //this try-catch must be deleted for using exceptions on components
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });
    if (error) {
      throw error; //throwing the error to allow login form to access it (as supabase doesn't throw it!)
    } else {
      commit("setUser", user);
      commit("setSession", session);
      commit(
        "setSocket",
        io("http://localhost:8088", {
          query: { token: session.access_token },
        })
      );

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
        //disconnecting socket
        console.log("disconnecting socket");
        state.socket.disconnect();
        commit("setUser", null);
        commit("setSession", null);
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