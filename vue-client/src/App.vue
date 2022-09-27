<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";

let connection = null;

function checkHealth() {
  axios.defaults.headers.common["Accept"] = "application/json";

  axios.get("http://localhost:4001/api/ws/health").then((response) => {
    console.log("health");
    console.log(response);
  });
}

function clickCheck() {
  console.log("click check");
}

function sendMessage(message, action) {
  connection.send(
    JSON.stringify({
      action: action,
      data: message,
    })
  );
}

function created() {
  console.log("Starting connection to WebSocket Server");
  connection = new WebSocket("ws://localhost:4001/ws/");
  console.log("connection");
  console.log(connection);
  connection.onmessage = function (event) {
    console.log("on message");
    console.log(event);
  };

  connection.onerror = function (error) {
    console.log("on error");
    console.log(error);
  };

  connection.onopen = function (event) {
    console.log("on open");
    console.log(event);
    console.log("Successfully connected to the echo websocket server...");
  };

  connection.onclose = function (event) {
    console.log("on close");
    console.log(event);
  };
}

function getAllConnections() {
  axios.defaults.headers.common["Accept"] = "application/json";

  axios.get("http://localhost:4001/api/ws/list").then((response) => {
    console.log(response);
  });
}

function googleAuthReq() {
  console.log("googleAuthReq");
  /* axios.get("http://localhost:4000/auth/google").then((response) => {
    console.log(response);
  }); */
  window.open("http://localhost:4000/auth/google", "_self");
}

function emailSenderHealthCheck() {
  axios.defaults.headers.common["Accept"] = "application/json";

  axios.get("http://localhost:4000/api/email/health").then((response) => {
    console.log(response);
  });
}

function getConnectionBySessionId() {}
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <button type="button" @click="clickCheck">Google Email Check</button>
        <button type="button" @click="created">WS Connection Create</button>
        <button type="button" @click="sendMessage('letter', 'echo')">
          WS Connection Send
        </button>
        <button type="button" @click="checkHealth">Server health</button>
        <button type="button" @click="getAllConnections">
          Get All Connections
        </button>
        <button type="button" @click="getConnectionBySessionId">
          Get Connection By ID
        </button>
        <button type="button" @click="googleAuthReq">
          Google Auth Request
        </button>
        <button type="button" @click="emailSenderHealthCheck">
          Email Sender Health Check
        </button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
