import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/CreateView.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
    },
    {
      path: "/search_backend",
      name: "search_backend",
      component: () => import("../views/SearchAllView.vue"),
    },
    {
      path: "/:domain(.*)*",
      name: "error",
      component: () => import("../views/ErrorView.vue"),
    },
  ],
});

export default router;
