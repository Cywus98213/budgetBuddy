<template>
  <div class="IncomeView-wrapper">
    <Transition>
      <messageBanner v-if="toggleMessage" :Msg="Msg" />
    </Transition>
    <div class="header">
      <h1 class="header-title">Income.</h1>
    </div>
    <div class="planNav">
      <IncomeModal
        v-if="isAddIncome"
        @closeform="exitForm"
        @successful="toggleMessageBanner"
      />
      <Button :text="'Add Income'" @click="toggleIncomeForm" />
    </div>
    <div class="content-card">
      <incomePlanCard
        v-for="(incomePlan, index) in paginatedBudgetPlans"
        :key="index"
        :incomeSource="incomePlan.IncomeName"
        :incomeAmount="incomePlan.IncomeAmount"
        :incomeDate="incomePlan.IncomeDate"
        :incomeFrequency="incomePlan.IncomeFrequency"
        :incomePerviousExcutedDate="incomePlan.IncomePerviousExcutedDate"
        :incomeStatus="incomePlan.status"
        :incomeId="incomePlan._id"
        @deleteIncomePlan="getIncomePlan"
        @successful="toggleMessageBanner"
      />
    </div>
    <div class="pagination" v-if="exceedPages">
      <Button
        @click="showPreviousPage"
        :disabled="currentPage === 1"
        :text="'Previous'"
      />

      <span>{{ currentPage }} / {{ pages }}</span>
      <Button
        @click="showNextPage"
        :disabled="currentPage === pages"
        :text="'Next'"
      />
    </div>
  </div>
</template>
<script>
import messageBanner from "../components/common/messageBanner.vue";
import ErrorBanner from "../components/common/ErrorBanner.vue";
import incomePlanCard from "../components/income/incomePlanCard.vue";
import IncomeModal from "../components/budget/budgetModal/Income/IncomeModal.vue";
import Button from "../components/common/Button.vue";
import axios from "axios";
export default {
  data() {
    return {
      haveIncomePlan: false,
      toggleMessage: false,
      Msg: "",
      incomePlans: [],
      currentPage: 1, // Current page number
      plansPerPage: 9, // Number of plans per page
      isAddIncome: false,
    };
  },
  components: {
    Button,
    IncomeModal,
    incomePlanCard,
    messageBanner,
    ErrorBanner,
  },
  methods: {
    getIncomePlan() {
      //get income plan from database
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/income`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.incomePlans = res.data.IncomePlan;

          if (this.incomePlans.length > 0) {
            this.haveIncomePlan = true;
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$store.dispatch("logout");
            this.$router.push("/login");
          }
        });
    },
    toggleMessageBanner(msg) {
      this.toggleMessage = true;
      this.Msg = msg;
      setTimeout(() => {
        this.toggleMessage = false;
      }, 3000);
    },

    toggleIncomeForm() {
      this.isAddIncome = true;
    },
    exitForm() {
      this.isAddIncome = false;
      this.getIncomePlan();
    },
    showNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    showPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  computed: {
    paginatedBudgetPlans() {
      const startIndex = (this.currentPage - 1) * this.plansPerPage;
      const endIndex = startIndex + this.plansPerPage;
      return this.incomePlans.slice(startIndex, endIndex);
    },
    pages() {
      return Math.ceil(this.incomePlans.length / this.plansPerPage);
    },
    exceedPages() {
      return this.incomePlans.length > this.plansPerPage;
    },
  },
  mounted() {
    this.getIncomePlan();
  },
};
</script>
<style scoped>
.IncomeView-wrapper {
  padding: 1rem;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
.planNav {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
.content-card {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
}
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
  .content-card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1023px) {
  .content-card {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 2044px) {
  .content-card {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
