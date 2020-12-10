import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import("../views/account/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import("../views/account/register.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
