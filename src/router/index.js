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
      path: "/edit/:id/:title",
      name: "edit",
      component: () => import("../views/EditView.vue"),
    },
    {
      path: "/write/:id/:title",
      name: "write",
      component: () => import("../views/WriteView.vue"),
    },
    {
      path: "/read/quiz/:id/:title",
      name: "readquiz",
      component: () => import("../views/ReadQuizView.vue"),
    },
    {
      path: "/read/quiz/ans/:id/:ansId/:name",
      name: "readquizAns",
      component: () => import("../views/ReadAnsView.vue"),
    },
    {
      path: "/read/data/:id/:title",
      name: "readdata",
      component: () => import("../views/ReadDataView.vue"),
    },
    {
      path: "/:domain(.*)*",
      name: "error",
      component: () => import("../views/ErrorView.vue"),
    },
  ],
});

export default router;
