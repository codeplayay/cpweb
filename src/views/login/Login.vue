<template>
  <div class="h-100 d-flex align-items-center justify-content-center login-container">
    <div class="card login-card shadow-sm mx-2 my-4">
      <div class="card-body pb-2">
        <div class="h-40">
          <!-- Logo -->
          <img src="@/assets/logo.svg" alt="logo" class="login-logo" />
        </div>

        <h4 class="card-title text-center text-primary">{{app.name}}</h4>
      </div>
      <!-- Header -->
      <div class="card-header">Login</div>
      <div class="card-body">
        <form id="login" class="was-validated" novalidate>
          <div class="form-row">
            <!-- UID -->
            <div class="form-group col-12">
              <input
                type="text"
                class="form-control"
                placeholder="UID"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="top"
                title="UID"
                data-content="Your login ID"
                v-model="user.uid"
                pattern="^([A-Z0-9]{1,16})$"
                required
              />
            </div>
            <!-- Password -->
            <div class="form-group col-12">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="top"
                title="Password"
                data-content="Your little secret"
                v-model="user.password"
                required
              />
            </div>
            <button type="button" class="btn btn-primary btn-block" @click="login">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Login",
  data() {
    return {
      user: {
        uid: "",
        password: ""
      }
    };
  },

  mounted() {
    this.popper();
  },

  updated() {
    this.popper();
  },

  methods: {
    popper: function() {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
      $(".popover-dismiss").popover({
        trigger: "focus"
      });
    },
    login: function() {
      if (document.getElementById("login").checkValidity())
        this.$store
          .dispatch("login", {
            uid: this.user.uid,
            password: this.user.password,
            url: `${this.api.host}:${this.api.port}/user/login`
          })
          .then(() => {
            console.log(`Authenticated`);
          })
          .catch(() => {
            console.log(`Authentication failed`);
          });
    }
  }
};
</script>

<style scoped>
.h-40 {
  height: 40px;
}

.login-container {
  overflow-y: auto;
}

.login-card {
  width: 360px;
}

.login-logo {
  width: 96px;
  height: 96px;
  margin-top: -72px;
  display: block;
  position: absolute;
  /* Transform */
  transform: translateX(-48px);
  -moz-transform: translateX(-48px);
  -webkit-transform: translateX(-48px);
  /* Center */
  left: 50%;
  right: 50%;
}
</style>