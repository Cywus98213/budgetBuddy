import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TransactionsView from "../views/TransactionsView.vue";
import DashboardView from "../views/DashboardView.vue";
import BudgetView from "../views/BudgetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/transactions",
      name: "transactions",
      component: TransactionsView,
    },
    {
      path: "/budget",
      name: "budget",
      component: BudgetView,
    },
  ],
});

export default router;
