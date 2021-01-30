<template>
  <div>
    <h1>Opps!</h1>
    <h3>
      There seems to be a network issue. Please click the back button and try
      again.
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Or go back to the home page.</router-link
    >
  </div>
</template>
