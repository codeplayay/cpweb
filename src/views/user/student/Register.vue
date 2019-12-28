<template>
  <div class="register">
    <div class="card shadow-sm">
      <div class="card-header">
        <span>Student Registration Form</span>
      </div>

      <div class="row">
        <div class="col-12 col-md-3 border-md-right">
          <!-- Profile -->
        </div>
        <div class="col-12 col-md-9">
          <div class="card-body">
            <!-- Form -->
            <form
              id="registerStudent"
              v-bind:class="{
                'was-validated': form.registerStudent.wasValidated
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
                    v-model="form.registerStudent.fname"
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
                    v-model="form.registerStudent.mname"
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
                    v-model="form.registerStudent.lname"
                    pattern="^([A-Za-z]{1,24})$"
                    required
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12 col-md-4">
                  <Select get="department/options" @update="selectDepartment" />
                </div>
                <div class="form-group col-12 col-md-4">
                  <Select :get="getClass" @update="selectClass" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group d-flex justify-content-end col-12">
                  <!-- Create button -->
                  <ButtonAsync
                    tooltip="Register this user"
                    text="Add"
                    :loading="loading.registerStudent"
                    @click.native="registerStudent()"
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
import Select from "@/components/Select.vue";

export default {
  name: "Register",
  components: {
    Select,
    ButtonAsync
  },
  data() {
    return {
      loading: {
        registerStudent: false
      },
      form: {
        registerStudent: {
          wasValidated: false,
          fname: "",
          mname: "",
          lname: ""
        }
      },
      selected: {
        department: {
          _id: -1
        },
        _class: {
          _id: -1
        }
      },

      // Sent along when fetching options for classes
      getClass: ""
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

    registerStudent: function() {
      if (document.getElementById("registerStudent").checkValidity()) {
        if (
          this.selected.department._id !== -1 &&
          this.selected._class._id !== -1
        ) {
          this.loading.registerStudent = true;

          axios
            .post(`${this.api.host}:${this.api.port}/user/student/register`, {
              fname: this.form.registerStudent.fname,
              mname: this.form.registerStudent.mname,
              lname: this.form.registerStudent.lname,
              department: this.selected.department._id,
              _class: this.selected._class._id
            })
            .then(() => {
              this.loading.registerStudent = false;
            })
            .catch(error => {
              if (error.response) {
                console.log(error.response.status);
              } else {
                // No Internet
              }
              this.loading.registerStudent = false;
            });
        }
      } else {
        this.form.registerStudent.wasValidated = true;
      }
    },

    selectDepartment: function(department) {
      this.selected.department = department;
      this.getClass = "class/options/" + department._id;
    },

    selectClass: function(_class) {
      this.selected._class = _class;
    }
  }
};
</script>
