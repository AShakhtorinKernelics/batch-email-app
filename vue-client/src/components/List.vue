<template>
  <ul class="list-group">
    <li v-for="(email, index) in emails" :key="email" class="list-group-item">
      <div class="row">
        <div class="col">
          <span> {{ email.name }} </span>
        </div>
        <div class="col-auto">
          <div class="row">
            <div class="col">
              <button @click="deleteEmail(index)" class="btn btn-danger">
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    emails: {
      type: Array,
      default: [],
    },
  },
  methods: {
    deleteEmail(index) {
      this.$emit("deleteEmail", index);
    },
  },
};
</script>