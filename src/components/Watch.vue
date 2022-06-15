<template>
  <div class="watch">
    <v-card v-if="isEmpty" flat tile dark class="watch__empty">
      <h1>Th is movie is not ready to serve. Check Gravity falls if you a tester</h1>
    </v-card>
    <v-sheet v-if="!pageLoad" dark>
      <v-skeleton-loader
        class="mx-auto"
        height="100vh"
        width="100%"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-sheet v-else dark>
      <v-layout class="watch__player">
        <Player :playerDetails="playerDetails" />
      </v-layout>
      <v-layout class="mt-2">
        <v-container class="px-0">
          <v-row align-md="start" align-sm="center">
            <v-col md="7">
              <h4>Browser Eposide</h4>
              <v-card flat tile>
                <v-btn-toggle
                  class="d-flex flex-wrap"
                  mandatory
                  v-model="currentEp"
                  @change="changeEposide()"
                >
                  <template v-for="(item, index) in eposideList">
                    <v-btn
                    :value="item"
                    :key="index"
                    v-if="item._status == 'pending'" disabled
                    >{{ item._name}}
                    </v-btn>
                    <v-btn
                    :value="item"
                    :key="index"
                    v-else
                    >{{ item._name}}
                    </v-btn>
                  </template>
                </v-btn-toggle>
              </v-card>
            </v-col>
            <v-col md="3">
              <v-img :src="publicPath + 'images/logos' + movie._logo"></v-img>
            </v-col>
            <v-col md="2">
              <v-layout
                class="
                  align-center
                  justify-space-around justify-md-space-between
                  my-1
                "
              >
                <v-icon x-large color="white" class="pr-1"
                  >mdi-trending-up</v-icon
                >
                <h4>Top 1 this week</h4>
              </v-layout>
              <v-layout
                class="
                  align-center
                  justify-space-around justify-md-space-between
                  my-1
                "
              >
                <v-icon color="white" class="pr-1">mdi-thumb-up</v-icon>
                <h4>{{ movie._rating }} / 5.0</h4>
              </v-layout>
              <v-btn class="my-1" color="primary" width="100%"
                >Save to gallery</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
    </v-sheet>
  </div>
</template>

<script>
import Player from "./player/PlayerMax";
import EposidesApi from "../api/EposidesApi";
import MovieApi from "../api/MovieApi";
import RssApi from "../api/RssApi";
export default {
  name: "ui-watch",
  components: {
    Player,
  },
  data() {
    return {
      pageLoad: false,
      movie: [{}],
      playerDetails: {},
      currentEp: null,
      eposideList: null,
      currentMovie: null,
      publicPath: process.env.BASE_URL,
      previousPath: null,
      isEmpty: false
    };
  },
   created(){
    this.previousPath = this.$router.options.history.state.back
  },
  async mounted() {
    this.publicPath = process.env.BASE_URL
    this.eposideList = await EposidesApi.findEposide(this.$route.params.id)
    if(this.eposideList. length < 1) this.isEmpty = true
    const movieData = await MovieApi.findId(this.$route.params.id);
    if(movieData.length ==0) this.$router.push('/404-notfound')
    this.movie = movieData[0];
    this.pageLoad = true;
  },
  methods:{
    async changeEposide(){
      this.pageLoad = false
      const resourceId = this.currentEp._resource_id
      const resourceVideo = await RssApi.findResource(resourceId);
      this.playerDetails = {
        src: this.publicPath + 'videos/' + resourceVideo[0]._src,
        size: window.innerHeight,
        autoplay: false,
        thumbnail: this.publicPath + 'images/thumbnails/' + this.movie._thumbnail,
        title: this.movie._name + " | " + this.currentEp._name,
        back: this.previousPath
      }
      this.pageLoad = true
    },
  },
};
</script>

<style>
#watch .watch__empty{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>