
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
import {
  storageAuthItemName,
  cookieAuthItemName,
} from "../constants/auth-item-names";
import { viewNames } from "../constants/view-names";

export default {
  data() {
    return {
      authHeaders: { ...authHeaders },
      headerText: authHeaders.pending,
    };
  },
  mounted() {
    this.transferCookieToStorage();
  },
  methods: {
    transferCookieToStorage() {
      const jwtData = this.$cookies.get(cookieAuthItemName);
      this.updateViewOnCookie(!!jwtData);
      if (jwtData) {
        sessionStorage.setItem(storageAuthItemName, jwtData);
        this.$cookies.remove(cookieAuthItemName);
        this.$router.push({ name: viewNames.ProfileView });
      }
    },
    updateViewOnCookie(exist: boolean) {
      this.headerText = exist ? authHeaders.succeeded : authHeaders.failed;
    },
    redirectToLogin() {
      this.$router.push({ name: viewNames.HomeView });
    },
  },
};
</script>
<style scoped>
</style>
