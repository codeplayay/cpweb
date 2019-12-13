import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "jquery/dist/jquery.slim";
import "popper.js/dist/popper";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/popover";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/toast";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/util";
import "./index.scss";

Vue.config.productionTip = false;

Vue.mixin({
  data: function () {
    return {
      get api() {
        return {
          host: "http://localhost",
          port: 9632
        };
      },

      get app() {
        return {
          name: "CloudPlay"
        }
      },

      get roles() {
        return ["Student", "Teacher"];
      },
    };
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
