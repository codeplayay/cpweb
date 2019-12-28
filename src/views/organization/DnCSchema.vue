<template>
  <div class="dnc-schema">
    <div class="card shadow-sm">
      <div class="card-header">Organization</div>
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-6">
            <Departments @update="selectDepartment" />
          </div>
          <div class="col-12 col-md-6">
            <EmptyResponse
              text="Select department"
              v-if="department._id === -1"
            />
            <Classes v-else :department="department" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Departments from "@/components/organization/Departments.vue";
import Classes from "@/components/organization/Classes.vue";
import EmptyResponse from "@/components/EmptyResponse";

export default {
  name: "DnCSchema",
  components: {
    Departments,
    Classes,
    EmptyResponse
  },
  data() {
    return {
      department: {
        _id: -1
      }
    };
  },
  methods: {
    selectDepartment: function(department) {
      this.department = department;
    }
  }
};
</script>
