<template>
  <v-layout class="otp d-flex justify-center">
    <v-card class="otp__card align-self-center">
      <v-stepper v-model="step" class="otp__stepper" elevation="0">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-img class="mx-auto" width="300" :src="img"></v-img>
              <h5>Please let we know your phone number</h5>
              <v-layout class="d-flex my-3">
                <v-select
                  class="otp__input otp__number-prefix mr-3"
                  flat
                  outlined
                  hide-details
                  :items="countryPrefix"
                  item-text="country"
                  item-value="prefix"
                  return-object
                  v-model="uPrefix"
                >
                <template v-slot:selection="{item}">
                    <v-layout class="d-flex">
                        <v-img width="15" :src="item.img"></v-img>
                        <h4 class="ml-0 ml-md-2">+{{item.prefix}}</h4>
                    </v-layout>
                </template>
                <template v-slot:item="{item}">
                    <v-layout class="d-flex">
                        <v-img class="align-self-center" width="15" :src="item.img"></v-img>
                        <h5 class="ml-0 ml-md-2 align-self-center">{{item.country}}</h5>
                    </v-layout>
                </template>
                </v-select>
                <v-text-field
                  ref="phoneInput"
                  class="otp__input otp__number-field"
                  outlined
                  v-model="uPhone"
                  @keypress="filter($event)"
                  :rules="phoneRule"
                ></v-text-field>
              </v-layout>
              <v-card-actions class="ma-0 pa-0">
                <v-btn width="100%" x-large @click="getOtp()" color="primary">Get OTP</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2" class="otp__stepper">
            <v-card>
              <v-layout class="d-flex flex-column">
                  <h4>Code is sent to +<span class="primary--text">{{legalPhone}}</span></h4>
                  <v-otp-input v-model="otpVal" class="mt-10" length="6" type="number"></v-otp-input>
                  <v-img width="200" class="mx-auto" :src="require('../assets/message.gif')" alt="#"></v-img>
                  <h4 class="my-3">Didn't receive code? <span class="primary--text">Re-send code</span></h4>
              </v-layout>
                <v-card-actions class="pa-0 ma-0 mt-5">
                  <v-btn class="my-1" x-large width="50%" color="secondary" @click="retypePhone" elevation="0">Back</v-btn>
                <v-btn @click="verifyOtp()" class="my-1" x-large width="50%" color="primary" elevation="0">Submit</v-btn>
                </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-layout>
</template>

<script>
import UserApi from '../api/UserApi.js'
// import OtpApi from '../api/OtpApi.js'
export default {
  name: "ui-otp",
  async mounted(){
    //
  },
  data() {
    return {
      step: 1,
      img: require("../assets/4498897.jpg"),
      uPhone: "",
      uPrefix: { country: "VIE", img: require('../assets/vietnam.png'), prefix: "84" },
      legalPhone: '',
      countryPrefix: [
        { country: "VIE", img: require('../assets/vietnam.png'), prefix: "84" },
        { country: "CHN", img: require('../assets/china.png'), prefix: "86" },
        { country: "USA", img: require('../assets/united-states.png'), prefix: "1" },
        { country: "THA", img: require('../assets/thailand.png'), prefix: "81" },
      ],
      phoneRule:[
          v=>!!v || "Phone number is required!",
          v=>(v && v.length <=12) || "Phone number must less than 12 numbers",
          v => /\d+$/.test(v) || "Invalid phone number!"
      ],
      otpVal: '',
      sysOtp: null,
    };
  },
  // mounted() {
  //     function compare(a,b){
  //         if(a.country < b.country) return -1
  //         if(a.country > b.country) return 1
  //         return 0
  //     }
  //   this.countryPrefix.sort(compare)
  // },
  methods: {
     getOtp(){
      if(this.$refs.phoneInput.validate()){
          this.legalPhone = this.uPrefix.prefix + this.uPhone
          console.log(this.legalPhone)
          this.sysOtp = '111222'
          this.step = 2
      }
      

    },
    retypePhone() {
      this.step = 1;
    },
    submitOtp() {
    },
    filter: function($event){
        if($event.key == "Enter"){
          this.getOtp()
          return
        }
        if(this.uPhone.length ==12){
            $event.preventDefault()
            return
        }
        let reg = /\d+$/
        if(!reg.test($event.key)) $event.preventDefault()
    },
    createToken(){
      return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
    },
    async checkUser(phone){
      const user = await UserApi.findPhone(phone)
      console.log(user)
    },
    async verifyOtp(){
      if(this.otpVal === this.sysOtp){
        //Get user info
        const user = await UserApi.findPhone(this.legalPhone)
        if(user.length === 1){
          const token = this.createToken()
          localStorage.setItem('token', token)
          user[0]._token = token
          await UserApi.update(user[0]._id, user)
          this.$cookies.remove('on_register_token')
          this.$router.push("/")
        }
        else{
          this.$cookies.set('on_register_token', this.createToken() , 1800)
          this.$cookies.set('phone', this.legalPhone, 1800)
          this.$router.push("Register")
        }
      }
    }
  },
};
</script>

<style scoped>
.otp {
  width: 100%;
  height: 100vh;
}
.otp .otp__card {
  max-width: 400px;
  min-height: 500;
}
.otp .otp__number-prefix {
  width: 25%;
}
.otp .otp__number-field{
    width: 60%;
    font-size: 18px;
    font-weight: 600;
}
</style>