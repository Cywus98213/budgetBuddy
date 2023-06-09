import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HistoryView from "../views/HistoryView.vue";
import DashboardView from "../views/DashboardView.vue";
import BudgetView from "../views/BudgetView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import BudgetPlanView from "../views/BudgetPlanDetailView.vue";
import IncomeView from "../views/IncomeView.vue";
import ProfileView from "../views/UserProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:id/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/:id/history",
      name: "history",
      component: HistoryView,
    },
    {
      path: "/:id/budget",
      name: "budget",
      component: BudgetView,
    },
    {
      path: "/:id/income",
      name: "income",
      component: IncomeView,
    },
    {
      path: "/:id/budgetplan/:budgetplanid",
      name: "budgetplan",
      component: BudgetPlanView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/:id/profile",
      name: "profile",
      component: ProfileView,
    },
  ],
});

export default router;
