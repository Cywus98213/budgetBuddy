<template>
  <div class="budgetView-wrapper">
    <Transition>
      <messageBanner v-if="toggleMessage" :Msg="Msg" />
    </Transition>

    <div class="header">
      <h1 class="header-title">Budget / Saving.</h1>
    </div>
    <div class="budget-header">
      <mainBudgetCard :userBalance="userBalance" />
    </div>
    <div class="header">
      <h1 class="header-title">Budget Plan.</h1>
    </div>
    <div class="planNav">
      <!-- <budgetRefreshButton :iconSrc="budgetRefreshIcon" /> -->
      <ExpenseModal
        v-if="isAddExpense"
        @closeform="exitForm"
        @successful="toggleMessageBanner"
      />

      <planModal
        v-if="isAddPlan"
        @closeform="exitForm"
        @successful="toggleMessageBanner"
      />

      <Button :text="'Add Expense'" @click="toggleExpenseForm" />
      <Button :text="'Create Plan'" @click="togglePlanForm" />
    </div>

    <div class="expensesPlan-main">
      <div
        v-if="loaded"
        v-for="(budgetPlan, index) in userBudgetPlan"
        :key="index"
        class="budgetplan"
      >
        <budgetPlanCard
          :category="budgetPlan.Category"
          :expenses="budgetPlan.Expenses"
          :limitAmount="budgetPlan.LimitAmount"
          :amount="budgetPlan.Amount"
          :planid="budgetPlan._id"
        />
      </div>
      <div v-else class="loading">
        <p>Loading...</p>
      </div>
      <div class="empty" v-if="isBudgetEmpty">
        <p>You don't have any Budget Plan...</p>
      </div>
    </div>

    <div class="header">
      <h1 class="header-title">Saving Plan.</h1>
    </div>
    <div class="planNav">
      <!-- <budgetRefreshButton :iconSrc="budgetRefreshIcon" /> -->
      <savingsettingModal
        v-if="isSetting"
        @closeform="exitForm"
        :savingplanId="settingplanId"
      />

      <savingDeleteModal
        v-if="isSavingDelete"
        @closeform="exitForm"
        :savingplanId="deleteSavingplanId"
      />

      <savingModal v-if="isAddSavingPlan" @closeform="exitForm" />

      <Button :text="'Create Plan'" @click="toggleSavingForm" />
    </div>

    <div class="expensesPlan-main">
      <div
        v-if="loaded"
        v-for="(savingPlan, index) in userSavingPlan"
        :key="index"
        class="budgetplan"
      >
        <savingPlanCard
          :SavingGoalCurrentAmount="savingPlan.SavingGoalCurrentAmount"
          :SavingGoalName="savingPlan.SavingGoalName"
          :SavingGoalTarget="savingPlan.SavingGoalTarget"
          :SavingPlanId="savingPlan._id"
          @isSetting="toggleSavingSetting"
          @isDelete="toggleSavingDelete"
        />
      </div>
      <div v-else class="loading">
        <p>Loading...</p>
      </div>
      <div class="empty" v-if="isSavingEmpty">
        <p>You don't have any saving Plan...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import savingDeleteModal from "../components/budget/budgetModal/Saving/savingDeleteModal.vue";
import savingsettingModal from "../components/budget/budgetModal/Saving/savingsettingModal.vue";
import messageBanner from "../components/common/messageBanner.vue";
import savingPlanCard from "../components/budget/savingPlanCard.vue";
import savingModal from "../components/budget/budgetModal/Saving/savingModal.vue";
import ExpenseModal from "../components/budget/budgetModal/Expense/expenseModal.vue";
import IncomeModal from "../components/budget/budgetModal/Income/IncomeModal.vue";
import planModal from "../components/budget/budgetModal/plan/planModal.vue";
import budgetRefreshButton from "../components/budget/budgetRefreshButton.vue";
import budgetRefreshIcon from "../assets/Icons/budget/refresh.svg";
import budgetPlanNavButton from "../components/budget/budgetPlanNavButton.vue";
import Button from "../components/common/Button.vue";
import mainBudgetCard from "../components/budget/mainbudgetCard.vue";
import budgetPlanCard from "../components/budget/budgetPlanCard.vue";
import AddincomeIcon from "../assets/Icons/budget/addincome.svg";
import AddspendingIcon from "../assets/Icons/budget/addspending.svg";
export default {
  components: {
    mainBudgetCard,
    budgetPlanCard,
    Button,
    budgetPlanNavButton,
    budgetRefreshButton,
    planModal,
    ExpenseModal,
    IncomeModal,
    savingModal,
    savingPlanCard,
    messageBanner,
    savingsettingModal,
    savingDeleteModal,
  },
  data() {
    return {
      toggleMessage: false,
      userBalance: 0,
      loaded: false,
      userBudgetPlan: {},
      userSavingPlan: {},
      isSetting: false,
      isSavingDelete: false,
      isAddPlan: false,
      isAddExpense: false,
      isAddIncome: false,
      isAddSavingPlan: false,
      settingplanId: "",
      deleteSavingplanId: "",
      AddincomeIcon: AddincomeIcon,
      AddspendingIcon: AddspendingIcon,
      budgetRefreshIcon: budgetRefreshIcon,
    };
  },
  methods: {
    exitForm() {
      this.isAddPlan = false;
      this.isAddExpense = false;
      this.isAddSavingPlan = false;
      this.isSetting = false;
      this.isSavingDelete = false;

      this.getUserbudget();
    },
    toggleMessageBanner(msg) {
      this.toggleMessage = true;
      this.Msg = msg;
      setTimeout(() => {
        this.toggleMessage = false;
      }, 3000);
    },
    toggleSavingSetting(savingId) {
      this.settingplanId = savingId;
      this.isSetting = true;
    },
    toggleSavingDelete(savingId) {
      this.deleteSavingplanId = savingId;
      this.isSavingDelete = true;
    },
    togglePlanForm() {
      this.isAddPlan = true;
    },
    toggleExpenseForm() {
      this.isAddExpense = true;
    },
    toggleSavingForm() {
      this.isAddSavingPlan = true;
    },
    getUserbudget() {
      axios
        .get(
          `https://budgetbuddyproject-8ca78d75eded.herokuapp.com/${this.$route.params.id}/budget`,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.userBalance = res.data.Balance;
          this.userBudgetPlan = res.data.BudgetPlan;
          this.userSavingPlan = res.data.SavingPlan;

          this.loaded = true;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$store.dispatch("logout");
            this.$router.push("/login");
          }
        });
    },
  },
  computed: {
    isSavingEmpty() {
      return this.userSavingPlan.length === 0;
    },
    isBudgetEmpty() {
      return this.userBudgetPlan.length === 0;
    },
  },
  mounted() {
    this.getUserbudget();
  },
};
</script>

<style scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
}
.budgetView-wrapper {
  padding: 1rem;
}
.header {
  margin: 1rem auto;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
.budget-header {
  max-width: 100%;
  margin: 0.5rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.planNav {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin: 1rem auto;
}

.expensesPlan-main {
  display: flex;
  overflow-y: auto;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.6rem;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@media screen and (min-width: 767px) {
  .expensesPlan-main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (min-width: 1022px) {
  .expensesPlan-main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 2044px) {
  .expensesPlan-main {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
