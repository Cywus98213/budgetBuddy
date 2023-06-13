<template>
  <div class="incomeplan-wrapper">
    <div class="income-header">
      <p class="incometype">Source:</p>
      <h1>{{ incomeSource }}</h1>
    </div>
    <div class="income-main">
      <p class="incometype">Amount:</p>
      <p>${{ incomeAmount }}</p>
      <p class="incometype">Date:</p>
      <p>{{ convertDate }}</p>
    </div>
    <div class="income-footer">
      <p class="incometype">Frequency:</p>
      <p>{{ incomeFrequency }}</p>
      <p class="incometype">Status:</p>
      <p :class="checkincomeStatus">{{ incomeStatus }}</p>
    </div>
    <Button :text="'Delete'" @click="openModal" />

    <dialog ref="Modal" class="modal">
      <div class="modal-header">
        <h1 class="modal-header-text">Delete Income Plan</h1>
        <img
          src="../../assets/Icons/budget/closeicon.svg"
          class="closeIcon"
          alt="close"
          @click="closeModal"
        />
      </div>
      <div class="modal-body">
        <p class="modal-body-text">
          You sure you want to delete this Income Plan ?
        </p>
        <p class="modal-body-text">Deleted plan cannot be undo !!</p>
      </div>
      <div class="modal-footer">
        <Button :text="'Yes'" @click="deleteIncomePlan" />
      </div>
    </dialog>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import Button from "../common/Button.vue";
export default {
  data() {
    return {};
  },
  props: {
    incomeSource: {
      type: String,
      required: true,
    },
    incomeAmount: {
      type: Number,
      required: true,
    },
    incomeDate: {
      type: String,
      required: true,
    },
    incomeFrequency: {
      type: String,
      required: true,
    },
    incomeStatus: {
      type: String,
      required: true,
    },
    incomeId: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
  },
  methods: {
    deleteIncomePlan() {
      //delete income plan from database
      axios
        .delete(
          `http://localhost:3000/${this.$route.params.id}/income/${this.incomeId}`,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.$emit("deleteIncomePlan");
          this.closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal() {
      this.$refs.Modal.showModal();
    },
    closeModal() {
      this.$refs.Modal.close();
    },
  },
  computed: {
    convertDate() {
      const date = new Date(this.incomeDate);
      const formattedDateString = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
      return formattedDateString;
    },
    checkincomeStatus() {
      return {
        scheduled: this.incomeStatus === "scheduled" ? true : false,
        processed: this.incomeStatus === "processed" ? true : false,
      };
    },
  },
};
</script>
<style scoped>
.incomeplan-wrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  gap: 1rem;
}
.incometype {
  font-weight: 100;
}

.scheduled {
  color: var(--safe-clr);
}

.processed {
  color: var(--danger-clr);
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  padding: 1rem;
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.closeIcon {
  cursor: pointer;
}
.modal-header-text {
  font-weight: 100;
}
.modal-body-text {
  font-weight: 100;
  color: rgb(230, 230, 70);
}
.modal-footer {
  margin-top: 1rem;
}
</style>
