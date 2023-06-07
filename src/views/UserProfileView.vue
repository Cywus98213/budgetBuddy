<template>
  <div class="profile-wrapper">
    <div class="userProfile-container">
      <div class="profile-uid">
        <h1 class="profile-section">
          UID: <span>{{ userid }}</span>
        </h1>
      </div>

      <div class="profile-username">
        <h1 class="profile-section">
          Username: <span>{{ username }}</span>
        </h1>
      </div>
      <div class="profile-email">
        <h1 class="profile-section">
          Email: <span>{{ userEmail }}</span>
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      userEmail: "",
      userid: "",
      loaded: false,
    };
  },
  methods: {
    getUserProfile() {
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/profile`)
        .then((res) => {
          console.log(res.data);
          this.username = res.data.Username;
          this.userEmail = res.data.Email;
          this.userid = res.data._id;
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getUserProfile();
  },
};
</script>
<style scoped>
.profile-wrapper {
  padding: 1rem;
  height: 100vh;
  display: grid;
  place-content: center;
}
.userProfile-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.profile-section {
  font-weight: 100;
}
</style>
