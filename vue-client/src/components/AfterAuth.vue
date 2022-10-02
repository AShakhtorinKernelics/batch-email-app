
<template>
  <div class="after-auth-processing">
    <h1>{{ "Auth " + headerText }}</h1>
    <button v-if="headerText === authHeaders.failed" @click="redirectToLogin">
      Back to Login
    </button>
  </div>
</template>

<script lang="ts">
import { authHeaders } from "../constants/auth-headers";

export default {
  data() {
    headerText: authHeaders.pending;
  },
  mounted() {
    this.transferCookieToStorage();
  },
  methods: {
    transferCookieToStorage() {
      const jwtData = this.$cookies.get("jwt");
      this.updateViewOnCookie(!!jwtData);
      if (jwtData) {
        sessionStorage.setItem("jwt", jwtData);
        this.$cookies.remove("jwt");
        this.router$.push({ path: "/profile" });
      }
    },
    updateViewOnCookie(exist: boolean) {
      this.headerText = exist ? authHeaders.succeeded : authHeaders.failed;
    },
    redirectToLogin() {
      this.router$.push({ path: "/" });
    },
  },
};
</script>
<style scoped>
</style>
