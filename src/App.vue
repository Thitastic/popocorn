<template>
  <v-app>
        <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    isLoggedIn: false,
  }),
  methods: {
  }
};
</script>

<style scoped>
*,
html {
  font-family: "Akshar", sans-serif;
}
</style>