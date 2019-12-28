<template>
  <div class="schema">
    <div class="card shadow-sm">
      <!-- Header -->
      <div class="card-header">
        <span>Subjects</span>
      </div>

      <!-- Autocomplete -->
      <div class="card-header">
        <code>Autocomplete</code>
      </div>

      <div class="card-body">
        <!-- Loading -->
        <div class="d-flex justify-content-center p-3" v-if="loading.list">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading</span>
          </div>
        </div>

        <!-- List -->
        <div class="row" v-else-if="subjects.length">
          <div
            class="col-12 col-md-6 col-lg-4"
            v-for="subject in subjects"
            :key="subject._id"
          >
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between border-0">
                <code v-text="subject.code" />
                <code v-text="subject.pattern" />
              </div>
              <div class="card-body">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="subject._id"
                  />
                  <label
                    class="custom-control-label"
                    :for="subject._id"
                    v-text="subject.name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty list -->
        <div v-else class="px-3">
          <EmptyResponse text="Select subjects" />
        </div>
      </div>

      <!-- Class subjects -->
      <div class="card-header border-top">
        <span>Class Subjects</span>
      </div>
      <div class="card-body">
        <!-- Form -->
        <form
          id="createLocalSubject"
          v-bind:class="{
            'was-validated': form.createLocalSubject.wasValidated
          }"
          novalidate
        >
          <div class="form-row">
            <!-- Subject name -->
            <div class="form-group col-12 col-md-4">
              <label>Subject name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Subject name"
                v-model="form.createLocalSubject.name"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="top"
                title="Subject name"
                pattern="^([A-Za-z0-9\s]{1,64})$"
                data-content="Subject name can contain only alphanumeric characters"
                required
              />
            </div>
            <!-- Subject code -->
            <div class="form-group col-12 col-md-4">
              <label>Subject code</label>
              <input
                type="text"
                class="form-control"
                placeholder="Subject code"
                v-model="form.createLocalSubject.code"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="top"
                title="Subject code"
                pattern="^([A-Z0-9]{1,8})$"
                data-content="Subject code can contain only uppercase alphanumeric characters"
                required
              />
            </div>
            <!-- Pattern -->
            <div class="form-group col-12 col-md-4">
              <label>Pattern</label>
              <input
                type="text"
                class="form-control"
                placeholder="Pattern"
                v-model="form.createLocalSubject.pattern"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="top"
                title="Pattern"
                pattern="^([A-Z0-9]{1,8})$"
                data-content="Pattern can contain only uppercase alphanumeric characters"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group d-flex justify-content-end col-12">
              <!-- Create button -->
              <ButtonAsync
                tooltip="Add a new class specific subject to your class"
                text="Add"
                :loading="loading.create"
                @click.native="createLocalSubject()"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyResponse from "@/components/EmptyResponse";
import ButtonAsync from "@/components/ButtonAsync";
import axios from "axios";
import $ from "jquery";

export default {
  name: "Schema",
  components: {
    EmptyResponse,
    ButtonAsync
  },
  data() {
    return {
      loading: {
        listSubjects: false,
        createLocalSubject: false
      },
      subjects: [],
      form: {
        createLocalSubject: {
          wasValidated: false,
          name: "",
          code: "",
          pattern: ""
        }
      }
    };
  },

  mounted() {
    this.popper();
    this.listSubjects();
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

    listSubjects: function() {
      this.loading.listSubjects = true;

      axios
        .post(`${this.api.host}:${this.api.port}/subject/list`)
        .then(response => {
          this.loading.listSubjects = false;
          this.subjects = response.data.prototype;
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.status);
          } else {
            // No Internet
          }
          this.loading.listSubjects = false;
        });
    },

    createLocalSubject: function() {
      if (document.getElementById("createLocalSubject").checkValidity()) {
        this.loading.createLocalSubject = true;

        axios
          .post(`${this.api.host}:${this.api.port}/subject/create/local`, {
            name: this.form.createLocalSubject.name,
            code: this.form.createLocalSubject.code,
            pattern: this.form.createLocalSubject.pattern
          })
          .then(response => {
            this.loading.createLocalSubject = false;
            this.subjects.push(response.data.prototype);
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.status);
            } else {
              // No Internet
            }

            this.loading.createLocalSubject = false;
          });
      } else {
        this.form.createLocalSubject.wasValidated = true;
      }
    }
  }
};
</script>
