<template>
  <div class="account-overview-wrapper">
    <div class="account-overview-header">
      <h1>Account Overview</h1>
      <!-- <div class="overview-nav">
        <Button :iconSrc="downloadIcon" :text="'Download report'" />
      </div> -->
    </div>
    <div class="account-overview-main">
      <div class="main-left">
        <div class="main-left-header">
          <h1>Category:</h1>
          <h1>Total:</h1>
        </div>
        <div class="main-left-content">
          <AccountOverviewsubCard
            v-for="(budgetPlan, index) in budgetPlans"
            :key="index"
            :category="budgetPlan.Category"
            :limitAmount="budgetPlan.LimitAmount"
            :amount="budgetPlan.Amount"
          />
        </div>
      </div>
      <div class="main-right">
        <div class="main-right-content">
          <Doughnut
            class="overviewChart"
            v-if="loaded"
            :data="chartData"
            :options="options"
            ref="chart"
          />
          <div v-else class="loading">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);
import AccountOverviewsubCard from "./AccountOverviewsubCard.vue";
import downloadIcon from "../../../assets/Icons/dashboard/download.svg";
import Button from "../../../components/common/Button.vue";
export default {
  components: {
    Button,
    AccountOverviewsubCard,
    Doughnut,
  },
  methods: {},
  data() {
    return {
      downloadIcon: downloadIcon,
      budgetPlans: [],
      expenses: [],
      incomes: [],
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#003f5c",
              "#2f4b7c",
              "#665191",
              "#a05195",
              "#d45087",
              "#f95d6a",
              "#ff7c43",
              "#ffa600",
            ],
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  async mounted() {
    this.loaded = false;

    try {
      axios
        .get(
          `https://budgetbuddyproject-8ca78d75eded.herokuapp.com/${this.$route.params.id}/account`,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.budgetPlans = res.data.BudgetPlan;
          this.expenses = res.data.Expenses;
          this.incomes = res.data.IncomePlan;

          this.chartData.labels = this.budgetPlans.map(
            (budgetPlan) => budgetPlan.Category
          );

          this.chartData.datasets[0].data = this.budgetPlans.map(
            (budgetPlan) => budgetPlan.Amount
          );

          this.loaded = true;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$store.dispatch("logout");
            this.$router.push("/login");
          }
        });
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
<style scoped>
.account-overview-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0.5rem auto;
}
.account-overview-header {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.account-overview-header h1 {
  font-size: 1.2rem;
}
.account-overview-main {
  display: flex;
  margin: 1rem auto;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--radius);
}
.main-left {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: var(--radius);
}
.main-left-header {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 0 1rem 0;
}
.main-left-header h1 {
  font-size: 0.8rem;
  font-weight: 100;
}
.main-left-header::after {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background-color: var(--main-bg-clr);
}
.main-left-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding: 0 0.3rem 0 0;
  max-height: 80%;
}
.main-right {
  display: grid;
  place-content: center;
}

.loading {
  height: auto;
  width: 200px;
  display: grid;
  place-content: center;
}
.overviewChart {
  height: 175px;
  width: 175px;
}

@media screen and (min-width: 767px) {
  .account-overview-main {
    flex-direction: row;
  }
  .main-left {
    flex-grow: 5;
  }
  .main-right {
    flex-grow: 1;
  }
  .account-overview-header {
    flex-direction: row;
    justify-content: space-between;
  }

  .main-left-header h1 {
    font-size: 1rem;
  }
  .main-left-content {
    padding: 0 0.8rem 0 0;
  }
}

@media screen and (min-width: 1022px) {
  .main-left-header h1 {
    font-size: 1.2rem;
  }
  .main-left-content {
    padding: 0 1rem 0 0;
  }
}
</style>
