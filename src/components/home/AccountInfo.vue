<template>
   <v-card dark flat tile min-height="100vh" class="pt--20 px-8">
      <h3>Personal Information</h3>
      <v-card flat tile class="information__edit mt-3">
            <h4 class="py-2">Username:</h4>
            <v-text-field @keyup="verifyUsername()" @keypress="verifyCharacter($event)" v-model="user._username"  hide-details outlined color="primary"></v-text-field>
            <h6 :style="`color:${this.$vuetify.theme.themes.light.primary}`">{{verifyMsg}}</h6>
             <h4 class="py-2">Phone:</h4>
            <v-text-field  @keyup="changeNumber()" v-model="user._phone" hide-details outlined color="primary"></v-text-field>
            <v-card v-if="phoneChange === true" flat tile class="pa-3 d-flex flex-wrap">
                <v-otp-input length="6" v-model="otp"></v-otp-input>
                <v-btn  @click="sendOtp()" color="primary" class="align-self-center">GET OTP</v-btn>
                 <v-btn @click="checkOtp()" color="primary" class="align-self-center">Verify</v-btn>
                 <h6 v-if="numberVerifyMsg" :style="`color:${this.$vuetify.theme.themes.light.primary}`">{{numberVerifyMsg}}</h6>
            </v-card>

            <v-card-actions v-if="infoChange === true" transition="scroll-y-transition" class="px-0 justify-end">
                <v-btn @click="discardChange()" color="secondary">Discard</v-btn>
                <v-btn @click="updateUser()" right color="primary">Update</v-btn>
            </v-card-actions>
            <h4 class="my-2">Premium outdate: 
                <span>{{user._premium_outdate}}</span>
            </h4>
      </v-card>
      <v-snackbar
      :timeout="3000"
      :value="snackbar.visible"
      color="success"
      absolute
      centered
      rounded
      bottom
    >
      {{snackbar.msg}}
    </v-snackbar>
   </v-card>
</template>

<script>
import UserApi from '../../api/UserApi'
import OtpApi from '../../api/OtpApi'
export default {
    name: 'ui-acc-info',
    data(){
        return{
            infoChange: false,
            phoneChange: false,
            user:{},
            userAfterEdit: null,
            verifyMsg: null,
            username: null,
            verify: true,
            numberVerify: true,
            numberVerifyMsg: null,
            otp: null,
            serverOtp: null,
            snackbar:{
                visible: false,
                msg : ""
            }
        }
    },
    async mounted(){
        await this.loadData()
    },
    methods:{
        async verifyUsername(){
            this.infoChange = true
           if(this.user._username.length >= 6 && this.user._username.length <= 18){
                const user = await UserApi.findUsername(this.user._username)
                if(user.length === 1){
                    this.verify =  false
                    this.verifyMsg = 'This name is already taken!'
                  }
                else{
                    this.verify =  true
                    this.verifyMsg = null
                }
          }
          else if(this.user._username.length < 6 ){
            this.verify =  false
            this.verifyMsg = 'Username must at least 6 characters'
          }
          else{
            this.verify =  false
            this.verifyMsg = 'Username must at most 18 characters'
          }
        },
        async loadData(){
            const dbUser = await UserApi.findToken(localStorage.getItem('token'))
            this.user = dbUser[0]
            this.userAfterEdit = Object.assign({}, this.user)
        },
        discardChange(){
            this.infoChange = false
            this.phoneChange = false
            Object.assign(this.user, this.userAfterEdit)
        },
         verifyCharacter($event){
          const reg = /^(?![0-9])([a-zA-Z0-9])+$/
          if(!reg.test(this.user._username + $event.key)) $event.preventDefault()
       },
       changeNumber(){
        this.infoChange = true
        this.phoneChange = true
        this.numberVerify = false
       },
       sendOtp(){
        this.serverOtp = OtpApi.generateOtp(6)
        const otpMsg = "Your OTP is "+ this.serverOtp + " ."
        OtpApi.sendSms("+" + this.user._phone, otpMsg)
       },
       checkOtp(){
        if(this.serverOtp == this.otp){
            this.numberVerify = true
            this.numberVerifyMsg = 'Verified!'
        }else{
            this.numberVerifyMsg = "Wrong OTP Code!"
        }
       },
       async updateUser(){
        if(this.verify === true && this.numberVerify === true){
            const updateUser = {0: this.user}
            const dbMsg = await UserApi.update(this.user._id, updateUser)
            if(dbMsg==200){
              this.snackbar.visible = true
              this.snackbar.msg = "Update suceessfully"
              this.infoChange = false
              await this.loadData()
              await this.$emit('loadUser')
            }
            else{
              this.snackbar.visible = true
              this.snackbar.msg = "Error to connect database"
            }
        }
       }
    },
}
</script>

<style>
.pt--20{
    padding-top: 80px;
}
</style>