
<template>
  <div class="google-btn-container">
    <button type="button" @click="googleAuthReq">Sign in with Google</button>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    googleAuthReq() {
      window.open("http://localhost:4000/auth/google", "_self");
    },
  },
};
</script>

<style scoped>
</style>
