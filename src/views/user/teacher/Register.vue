<template>
  <div class="register">
    <div class="card shadow-sm">
      <div class="card-header">
        <span>Teacher Registration Form</span>
      </div>

      <div class="row">
        <div class="col-12 col-md-3 border-md-right">
          <!-- Profile -->
        </div>
        <div class="col-12 col-md-9">
          <div class="card-body">
            <!-- Form -->
            <form
              id="registerTeacher"
              v-bind:class="{
                'was-validated': form.registerTeacher.wasValidated
              }"
              novalidate
            >
              <div class="form-row">
                <!-- First name -->
                <div class="form-group col-12 col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="First Name"
                    v-model="form.registerTeacher.fname"
                    pattern="^([A-Za-z]{1,24})$"
                    data-content="First name can contain only alphabets"
                    required
                  />
                </div>
                <!-- Middle name -->
                <div class="form-group col-12 col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Middle Name"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Middle Name"
                    v-model="form.registerTeacher.mname"
                    pattern="^([A-Za-z]{1,24})$"
                    data-content="Middle name can contain only alphabets"
                    required
                  />
                </div>
                <!-- Last name -->
                <div class="form-group col-12 col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Last Name"
                    data-content="Last name can contain only alphabets"
                    v-model="form.registerTeacher.lname"
                    pattern="^([A-Za-z]{1,24})$"
                    required
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group d-flex justify-content-end col-12">
                  <!-- Create button -->
                  <ButtonAsync
                    tooltip="Register this user"
                    text="Add"
                    :loading="loading.registerTeacher"
                    @click.native="registerTeacher()"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonAsync from "@/components/ButtonAsync";
import axios from "axios";
import $ from "jquery";

export default {
  name: "Register",
  components: {
    ButtonAsync
  },
  data() {
    return {
      loading: {
        registerTeacher: false
      },
      form: {
        registerTeacher: {
          wasValidated: false,
          fname: "",
          mname: "",
          lname: ""
        }
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

    registerTeacher: function() {
      if (document.getElementById("registerTeacher").checkValidity()) {
        this.loading.registerTeacher = true;

        axios
          .post(`${this.api.host}:${this.api.port}/user/teacher/register`, {
            fname: this.form.registerTeacher.fname,
            mname: this.form.registerTeacher.mname,
            lname: this.form.registerTeacher.lname
          })
          .then(() => {
            this.loading.registerTeacher = false;
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.status);
            } else {
              // No Internet
            }
            this.loading.registerTeacher = false;
          });
      } else {
        this.form.registerTeacher.wasValidated = true;
      }
    }
  }
};
</script>
