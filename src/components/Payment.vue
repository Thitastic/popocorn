<template>
  <div id="payment">
      <h1>We're sorry!</h1>
      <h4>The payment system is on developement, please register as FREE MEMBER</h4>
      <v-btn @click="goBack()" color="primary">Go back</v-btn>
      <v-btn @click="goHome()" color="primary">Go home</v-btn>
  </div>
</template>

<script>
export default {
    name: 'ui-payment',
    methods:{
        goBack(){
            this.$router.back()
        },
         goHome(){
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>