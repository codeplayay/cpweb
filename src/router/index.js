import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/",
    alias: "/login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/user/student/register",
    component: () => import("@/views/user/student/Register.vue")
  },
  {
    path: "/user/teacher/register",
    component: () => import("@/views/user/teacher/Register.vue")
  },
  {
    path: "/organization/dncschema",
    component: () => import("@/views/organization/DnCSchema.vue")
  },
  {
    path: "/subjects/schema",
    component: () => import("@/views/subjects/Schema.vue")
  },
  {
    path: "/user/teacher/hod",
    component: () => import("@/views/user/teacher/HOD.vue")
  },
  {
    path: "/collection/marks",
    component: () => import("@/views/collection/Marks.vue")
  },
  {
    path: "/notice/prepare",
    component: () => import("@/views/notice/Prepare.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
