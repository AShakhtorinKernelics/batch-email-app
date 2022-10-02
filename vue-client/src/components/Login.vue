
<template>
  <div class="google-btn-container">
    <button type="button" @click="googleAuthReq">Sign in with Google</button>
  </div>
</template>

<script lang="ts">
import { AuthService } from "../services";

export default {
  methods: {
    googleAuthReq() {
      AuthService.googleAuth();
    },
  },
};
</script>

<style scoped>
</style>
