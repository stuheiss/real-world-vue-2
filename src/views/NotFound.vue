<template>
  <div>
    <h1>Opps!</h1>
    <h3>The {{ resource || 'page' }} you are looking for is not here.</h3>
    <router-link :to="{ name: 'event-list' }"
      >Back to the home page</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: false
    }
  }
}
</script>

<style></style>
