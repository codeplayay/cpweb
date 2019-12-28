import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // User details
    user: null
  },
  mutations: {
    logout(state) {
      console.log("Mutating logout");

      state.user = null;
      axios.defaults.headers.common["Authorization"] = null;
      localStorage.removeItem("token");

      router.push("/login");
    },

    login(state, payload) {
      console.log("Mutating login");

      state.user = payload.user;
      axios.defaults.headers.common["Authorization"] = payload.token;
      localStorage.setItem("token", payload.token);

      router.push("/home");
    }
  },
  actions: {
    logout({ commit }) {
      commit("logout");
    },

    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(payload.url, {
            uid: payload.uid,
            password: payload.password
          })
          .then(response => {
            commit("login", response.data.prototype);
            resolve(response);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    }
  },
  modules: {}
});
