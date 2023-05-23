<template>
  <div class="overview-wrapper">
    <div class="overview-header">
      <h1>Account Overview</h1>
      <div class="overview-nav">
        <Button :iconSrc="downloadIcon" :text="'Download report'" />
      </div>
    </div>
    <div class="overview-main">
      <div class="main-left">
        <div class="main-left-header">
          <h1>Category</h1>
          <h1>Total</h1>
        </div>
        <div class="main-left-content">
          <overviewsubCard
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
          <Doughnut :data="data" :options="options" id="Chart" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);
import overviewsubCard from "./overviewsubCard.vue";
import downloadIcon from "../../assets/Icons/dashboard/download.svg";
import Button from "../common/Button.vue";
export default {
  components: {
    Button,
    overviewsubCard,
    Doughnut,
  },
  props: {
    budgetPlans: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      downloadIcon: downloadIcon,
      data: {
        labels: sessionStorage.getItem("budgetPlans")
          ? JSON.parse(sessionStorage.getItem("budgetPlans")).map(
              (plan) => plan.Category
            )
          : [],
        datasets: [
          {
            backgroundColor: [
              "#001219",
              "#005f73",
              "#0a9396",
              "#e9d8a6",
              "#ee9b00",
              "#ca6702",
              "#bb3e03",
            ],
            data: sessionStorage.getItem("budgetPlans")
              ? JSON.parse(sessionStorage.getItem("budgetPlans")).map(
                  (plan) => plan.Amount
                )
              : [],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  methods: {},
  created() {},
};
</script>
<style scoped>
.overview-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0.5rem auto;
}
.overview-header {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.overview-header h1 {
  font-size: 1.2rem;
}
.overview-main {
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
  font-weight: 300;
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
  overflow-y: scroll;
  padding: 0 0.3rem 0 0;
  max-height: 80%;
}
.main-right {
  display: grid;
  place-content: center;
}

#Chart {
  max-width: 100%;
}

@media screen and (min-width: 767px) {
  .overview-main {
    flex-direction: row;
  }
  .main-left {
    flex-grow: 5;
  }
  .main-right {
    flex-grow: 1;
  }
  .overview-header {
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
