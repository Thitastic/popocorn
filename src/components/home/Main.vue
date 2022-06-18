<template>
  <v-app>
    <v-app-bar dark class="fixed-app-bar" elevation="0" flat :color="navColor">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="myNav = true">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-sm-and-down">
        <h4 class="logo logo__text">POPCORN</h4>
      </v-app-bar-title>
      <v-tabs v-model="activeTab" class="hidden-sm-and-down" align-with-title :style="`width: unset`">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab
          active-class="tab--active"
          @click="goHome()"
          >Home</v-tab
        >
         <v-tab
          active-class="tab--active"
          @click="goCollections('movie')"
          >Movies</v-tab
        >
         <v-tab
          active-class="tab--active"
          @click="goCollections('series')"
          >Series</v-tab
        >
      </v-tabs>
      <v-text-field
        v-model="searchKey"
        @keypress="goSearch($event)"
        hide-details
        dense
        outlined
        label="SEARCH"
        single-line
        append-icon="mdi-magnify"
        color="#e31e2d"
      ></v-text-field>
      <v-btn v-if="currentUser === null" @click="goLogin()" color="primary" class="mx-2">Login</v-btn>
      <v-card v-else flat color="transparent"  class="d-flex mx-2 px-2">
        <v-badge
          avatar
          bottom
          dot
          bordered
          overlap
          color="success"
          offset-x="10"
          offset-y="10"
        >
          <v-avatar color="primary">
            <v-img src="../../assets/reindeer.png" alt="avt"></v-img>
          </v-avatar>
        </v-badge>
        <h4 v-if="currentUser != null" class="align-self-center px-3 hidden-sm-and-down">{{ currentUser[0]._username }}</h4>
        <v-menu :style="`box-shadow: none !important`" transition="slide-y-transition" min-width="175px" nudge-bottom="50px" :rounded="true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="align-self-center btn--active" color="transparent" elevation="0" small v-bind="attrs" v-on="on">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goGallery()"  class="profile-item">
              <v-list-item-icon><v-icon class="profile-item__icon">mdi-movie</v-icon></v-list-item-icon>
              <v-list-item-title class="profile-item__text">Gallery</v-list-item-title>
            </v-list-item>
             <v-list-item @click="goProfile()"  class="profile-item" link >
              <v-list-item-icon><v-icon class="profile-item__icon">mdi-account</v-icon></v-list-item-icon>
              <v-list-item-title class="profile-item__text">Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goLogout()"  class="profile-item" link >
              <v-list-item-icon><v-icon class="profile-item__icon">mdi-logout-variant</v-icon></v-list-item-icon>
              <v-list-item-title class="profile-item__text">Log out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card>
    </v-app-bar>
    <v-navigation-drawer v-model="myNav" app temporary>
      <v-list nav>
        <v-list-item>
           <v-list-item-title @click="goHome()">Home</v-list-item-title>
        </v-list-item>
        <v-list-item>
           <v-list-item-title @click="goCollections('series')">Series</v-list-item-title>
        </v-list-item>
        <v-list-item>
           <v-list-item-title @click="goCollections('movie')">Movies</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
        <router-view @loadUser="loadUser()" ></router-view>
    </v-main>
    <div class="alert">
       <v-alert :value="pageAlert.vissible" transition="slide-x-transition" elevation="6" color="white" class="page__alert">
         <v-progress-circular v-if="pageAlert.process === true" size="20" class="mr-3" indeterminate color="primary"></v-progress-circular>
         <v-icon v-else>{{pageAlert.icon}}</v-icon>
          {{pageAlert.msg}}
       </v-alert>
    </div>
  </v-app>
</template>

<script>

import UserApi from '../../api/UserApi'
export default {
  name: "ui-home",
  components: {
  },
  data: () => ({
    searchKey: '',
    activeTab: 0,
    myNav: false,
    navColor: 'transparent',
    pageRoutes: [
      { title: "Movies", route: "/movies" },
      { title: "TV Shows", route: "/tvshows" },
      { title: "Series", route: "/series" },
    ],
    currentUser: null,
    pageAlert:{
      msg: 'Logging you out...',
      process: true,
      icon: 'mdi-information-outline',
      vissible: false,
      routeName: null,
    },
  }),
  created(){
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed(){
    window.removeEventListener('scroll', this.onScroll)
  },
  async mounted(){
    await this.loadUser()
    this.setActiveTab()
  },
  watch:{
    '$route': 'setActiveTab'
  },
  methods: {
    async loadUser(){
      if(localStorage.getItem('token')!= null){
      this.currentUser = await UserApi.findToken(localStorage.getItem('token'))
      if(this.currentUser.length < 1) localStorage.removeItem('token')
    }
    },
    onScroll(){
      let opacity = Math.round(0 + window.pageYOffset*0.01*100)/100;
      if(opacity<1) {
        this.navColor = 'rgb(30,30,30,' + opacity + ')'
      }
      else{
        this.navColor = 'rgb(30,30,30,1)'
      }
    },

    //Login redirect
    goLogin(){
      this.$router.push("/login")
    },

    goGallery(){
      this.$router.push("/gallery")
    },

    goCollections(_type){
      this.$router.push({path: '/collections/', query:{type: _type}})
    },

    goHome(){
      this.activeTab = 0
      this.$router.push("/home")
    },
    setActiveTab(){
      switch (this.$route.name) {
        case "Home":
          this.activeTab = 0
          break;
        case "Collections":
          switch (this.$route.query.type) {
            case "movie":
             this.activeTab = 1
              break;
            case "series":
              this.activeTab = 2
              break;
            default:
              break;
          }
          break
        default:
          break;
      }
    },

    goSearch($event){
      if($event.key == "Enter" && this.searchKey != ''){
        this.$router.push({path: '/search', query: {key: this.searchKey}})
      }
    },
    goProfile(){
      this.activeTab = 0
      this.$router.push('/profile')
    },
    async goLogout(){
      this.pageAlert.vissible = true
      this.currentUser[0]._token = ''
      const result = await UserApi.update(this.currentUser[0]._id, this.currentUser) //set token in db to ''
      localStorage.removeItem('token')
      this.pageAlert.vissible = false
      console.log(result)
      this.currentUser = null
    }
  }
};
</script>

<style>
*,
html {
  font-family: "Akshar", sans-serif;
}
.logo__text {
  font-size: 27px;
  color: #e31e2d;
}
.tab--active {
  color: #e31e2d !important;
}
.btn--active::before{
    background: transparent !important;
}
.profile-item:hover .profile-item__icon{
    color: #e31e2d !important;
    transition: .5s;
}
.profile-item:hover .profile-item__text{
    color: #e31e2d !important;
    transition: .5s;
}
.profile-menu{
    box-shadow: none !important;
    border: 1px white solid !important;
}
.fixed-app-bar{
    position: fixed !important;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
}
.alert .page__alert{
  position: fixed;
  bottom: 10px;
  left: 10px;
}
@media only screen and (max-width: 600px) {
  .tab__xs-none{
    display: none;
  }
}
</style>