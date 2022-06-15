<template>
  <v-card elevation="0" class="mt-10 mx-16 register">
    <h2 class="color--primary">Welcome to Popcorn</h2>
    <v-card class="mt-10" elevation="0">
      <h4 class="mb-2">Username *</h4>
      <v-layout class="register__form">
        <v-text-field v-model="usernameInput" @keypress="verifyInput($event)"  @keyup="verifyUsername()" hide-details placeholder="Ex: Alex123" outlined></v-text-field>
        <v-tooltip bottom color="warning" transition="slide-x-transition">
                <template v-slot:activator="{on, attr}">
                    <v-icon class="px-2" color="success" v-if="usernameVerify === true">mdi-check-decagram</v-icon>
                    <v-icon v-bind="attr" v-on="on"  class="px-2" color="error" v-else-if="usernameVerify === false">mdi-alert-decagram</v-icon>
                    <v-icon v-bind="attr" v-on="on"  class="px-2" color="warning" v-else-if="usernameVerify === null">mdi-decagram</v-icon>
                </template>
                <span>{{verifyMsg}}</span>
        </v-tooltip>
      </v-layout> 
      <h4 class="mt-3">Plan *</h4>
      <v-radio-group row v-model="selectedPlan">
        <v-layout v-for="(item, index) in plans" :key="index" class="register__plans">
          <v-hover>
            <template v-slot:default="{hover}">
               <v-card @click="selectedPlan = item.value" shaped :elevation="hover ? 6: 2" width="100%" class="pa-5 ma-2">
                    <h4 class="text-uppercase text-center color--primary mb-3">{{item.title}}</h4>
                    <v-img :src="item.img" width="150" class="mx-auto"></v-img>
                    <h2 class="text-center my-3">VND {{item.price}}</h2>
                    <h5 class="text-center">{{item.desc}}</h5>
                    <div v-if="item.value === selectedPlan" ref="ribbon" class="ribbon ribbon-top-right"><span>Selected</span></div>
                </v-card>
          </template>
          </v-hover>
        </v-layout>
      </v-radio-group>
      <v-btn @click="register()" color="primary" x-large width="100%">Register</v-btn>
    </v-card>
  </v-card>
</template>

<script>
import UserApi from '../api/UserApi'
export default {
    name: 'new-account',
    data(){
      return{
        usernameVerify: null,
        verifyMsg: 'Please enter Username!',
        selectedPlan: 0,
        usernameInput: '',
        usernameRules: [

        ],
        plans: [
          {title: 'Free', img: require('../assets/resource_images/free.png'), desc: 'Free member', value: 0, price: '0'},
          {title: `Movie's Lover`, img: require('../assets/resource_images/p-30d.png'), desc: 'Gives 30 days premium', value: 30, price: '49,000'},
          {title: 'Soul of Cinema', img: require('../assets/resource_images/p-90d.png'), desc: 'Gives 90 days premium', value: 90, price: '119,000'},
          {title: 'Directors', img: require('../assets/resource_images/p-1y.png'), desc: 'Gives 1 year premium', value: 365, price: '419,000'},
        ]
      }
    },
    methods:{
       selectePlan(){
         console.log('select')
       },
       verifyInput($event){
        const reg = /^(?![0-9])([a-zA-Z0-9])+$/
          if(!reg.test(this.usernameInput + $event.key)) $event.preventDefault()
       },
        async verifyUsername(){
          if(this.usernameInput.length >= 6 && this.usernameInput.length <= 18){
                const user = await UserApi.findUsername(this.usernameInput)
                if(user.length > 0){
                    this.usernameVerify =  false
                    this.verifyMsg = 'This name is already taken!'
                  }
                else{
                    this.usernameVerify =  true
                    this.verifyMsg = 'Nice!'
                }
          }
          else if(this.usernameInput.length < 6 ){
            this.usernameVerify =  false
            this.verifyMsg = 'Username must at least 6 characters'
          }
          else{
            this.usernameVerify =  false
            this.verifyMsg = 'Username must at most 18 characters'
          }
       },
        async register(){
          console.log(this.selectedPlan)
          if(this.usernameVerify == true){
              const phone = document.cookie.match('(^|;)\\s*' + 'phone' + '\\s*=\\s*([^;]+)')?.pop() || ''
              const token = document.cookie.match('(^|;)\\s*' + 'on_register_token' + '\\s*=\\s*([^;]+)')?.pop() || ''
              const today = new Date(Date.now())
              let outdate = today.setDate(today.getDate() + this.selectedPlan + 1)
              outdate = new Date(outdate).toISOString().split('T')[0]
              const newUser = {
              _username: this.usernameInput,
              _phone: phone,
              _premium_outdate: outdate,
              _token: token
              }
              console.log(newUser)

              //INSERT NEW USER IF FREE PLAN
              if(this.selectedPlan == 0){
                  const result = await UserApi.insert(newUser)
                  console.log(result)
                  if(result === 200){
                      localStorage.setItem('token', token)
                      this.$cookies.remove('on_register_token')
                      this.$router.push('/')
                  }
                  else{
                      alert('ERR:'+ result)
                  }
              }

              //REDIRECT AND INSERT AT PAYMENT PAGE
              else{
                this.$router.push('/payment')
                this.$cookies.set('user', newUser)
              }
         }
       }
    }
}
</script>

<style>
.color--primary{
  color: #e31e2d;
}
.register .register__form{
}

.ribbon {
  width: 120px;
  height: 150px;
  overflow: hidden;
  position: absolute;
}

.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: '';
  display: block;
  border: 5px solid #e31e2d;
}
.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 7px 0;
  background-color: #e31e2d;
  box-shadow: 0 2px 1px rgba(0,0,0,.1);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
}

/* top right*/
.ribbon-top-right {
  top: 0;
  right: 0;
}
.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 22px;
}
.ribbon-top-right::after {
  bottom: 22px;
  right: 0;
}
.ribbon-top-right span {
  left: -27px;
  top: 29px;
  transform: rotate(45deg);
}
</style>