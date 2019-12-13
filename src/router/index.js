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
    path: "/organization",
    component: () => import("@/views/organization/Organization.vue")
  },
  {
    path: "/subject",
    component: () => import("@/views/subject/Subject.vue")
  },
  {
    path: "/user/teacher/hod",
    component: () => import("@/views/user/teacher/HOD.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
