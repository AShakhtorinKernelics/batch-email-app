<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Email App</h5>
        <div class="row mb-5">
          <div class="col-10">
            <input
              @keyup.enter="add"
              type="text"
              class="form-control"
              v-model="email"
            />
          </div>
          <div class="col-2">
            <button class="btn btn-success" @click="add">Add</button>
            <button class="btn btn-success" @click="sendEmail">
              Send Email
            </button>
            <button class="btn btn-success" @click="logOut">Log out</button>
          </div>
        </div>
        <div class="row" v-if="emailLoading">
          <div class="col">
            <list :emails="emails" @deleteEmail="deleteEmail" />
            <small>Emails Selected : {{ emailsAmount }}</small>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
import { storageAuthItemName } from "../constants/auth-item-names";
import { viewNames } from "../constants/view-names";
import { ContactsService, MailService } from "../services";

export default {
  data() {
    return {
      connection: null,
      email: "",
      emailLoading: true,
      emails: [],
    };
  },
  mounted() {
    // this.emails = JSON.parse(localStorage.getItem("emails")) || [];
    this.getEmails();
    this.wsConnectionOpen();
  },
  computed: {
    emailsAmount() {
      return this.emails.length;
    },
  },
  components: { List },

  methods: {
    getEmails() {
      MailService.getEmails().then(
        (res) => {
          console.log(res);
          this.emailLoading = false;
          this.emails = res;
        },
        (err) => {
          console.log(err);
          this.emailLoading = false;
          this.emails = [];
        }
      );
    },
    add() {
      this.emails.unshift({
        name: this.email,
        isDone: false,
      });
      this.email = "";
      this.saveUpdates();
    },
    deleteEmail(emailIndex) {
      this.emails = this.emails.filter((item, index) => {
        if (index != emailIndex) {
          return item;
        }
      });
      this.saveUpdates();
    },
    saveUpdates() {
      ContactsService.setContactList(this.emails).then((res) => {
        console.log(res);
        localStorage.setItem("emails", JSON.stringify(this.emails));
      });
    },
    wsConnectionOpen() {
      console.log("Starting connection to WebSocket Server");
      this.connection = new WebSocket("ws://localhost:4001/ws/");
      this.connection.onmessage = function (event) {
        console.log("on message");
        console.log(event);
      };

      this.connection.onerror = function (error) {
        console.log("on error");
        console.log(error);
      };

      this.connection.onopen = function (event) {
        console.log("on open");
        console.log(event);
        console.log("Successfully connected to the echo websocket server...");
      };

      this.connection.onclose = function (event) {
        console.log("on close");
        console.log(event);
      };
    },
    checkHealth() {
      axios.defaults.headers.common["Accept"] = "application/json";

      axios.get("http://localhost:4001/api/ws/health").then((response) => {
        console.log("health");
        console.log(response);
      });
    },
    sendMessage(message, action) {
      this.connection.send(
        JSON.stringify({
          action: action,
          data: message,
        })
      );
    },
    sendEmail() {
      MailService.sendEmail("", "", "", "").then((response) => {
        console.log("health");
        console.log(response);
      });
    },
    logOut() {
      sessionStorage.removeItem(storageAuthItemName);
      this.$router.push({ name: viewNames.HomeView });
    },
  },
};
</script>