import Vue from "vue";
import VueRouter from "vue-router";
import UsersList from "../views/UsersList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/users",
    name: "Users",
    component: UsersList,
  },
  {
    path: "/",
    redirect: "/users",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
