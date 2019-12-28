<template>
  <div class="login h-100">
    <div
      class="h-100 d-flex align-items-center justify-content-center login-container"
    >
      <div class="card login-card shadow-sm mx-2 my-4">
        <!-- CloudPlay -->
        <div class="card-body bg-light pb-2 border-bottom">
          <div class="h-40">
            <img src="@/assets/logo.svg" alt="logo" class="login-logo" />
          </div>
          <h4 class="card-title text-center">{{ app.name }}</h4>
        </div>

        <div class="card-body">
          <form
            id="login"
            v-bind:class="{ 'was-validated': form.login.wasValidated }"
            novalidate
          >
            <div class="form-row">
              <!-- UID -->
              <div class="form-group col-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="UID"
                  v-model="form.login.uid"
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
                  v-model="form.login.password"
                  required
                />
              </div>
              <button
                type="button"
                class="btn btn-primary btn-block"
                @click="login()"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        login: {
          wasValidated: false,
          uid: "",
          password: ""
        }
      }
    };
  },

  methods: {
    login: function() {
      if (document.getElementById("login").checkValidity()) {
        this.$store
          .dispatch("login", {
            uid: this.form.login.uid,
            password: this.form.login.password,
            url: `${this.api.host}:${this.api.port}/user/login`
          })
          .then(() => {
            console.log(`Authenticated`);
          })
          .catch(() => {
            console.log(`Authentication failed`);
          });
      } else {
        this.form.login.wasValidated = true;
      }
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
