<template>
  <div id="home">
     <v-sheet v-if="!pageLoad" dark height="100vh">
      <v-skeleton-loader
        class="mx-auto"
        min-height="100vh"
        width="100%"
        type="image"
      ></v-skeleton-loader>
    </v-sheet>
    <v-sheet v-else dark class="home-items">
    <!-- POSTER -->
    <v-card tile class="poster">
      <v-img class="poster__img" :src="'images/thumbnails/' +poster.posterThumbnails" alt="poster">
        <div class="poster__video">
              <video loop autoplay muted :src="'videos/' + poster.posterVideo"></video>
        </div>
        <div class="blender"></div>
        <v-card
          dark
          flat
          elevation="0"
          color="transparent"
          class="ma-md-10 ma-xs-1 pa-3 align-self-end poster__items"
        >
          <v-img
            class="poster__title poster__item mt-16"
            :src="'images/logos/' + poster.posterLogo"
            alt="logo"
          ></v-img>
          <v-card-title class="px-0 py-2">
            <h2 class="poster__name">{{ poster.posterName }}</h2>
          </v-card-title>
          <div class="d-flex my-1">
            <v-chip
              class="mr-2"
              v-for="(item, index) in poster.posterGenre"
              :key="index"
              link
              outlined
              >{{ item }}</v-chip
            >
          </div>
          <p class="py-md-3 py-xs-1 ma-0 poster__desc hidden-sm-and-down">
            {{ poster.posterDesc }}
          </p>
          <v-card-actions>
            <v-btn @click="goWatch(poster.posterId)" class="poster__actions" color="primary" large>
              <v-icon>mdi-play</v-icon>
              <span class="px-3">Watch now</span>
            </v-btn>
            <v-btn class="poster__actions" color="primary" large>
              <v-icon>mdi-movie</v-icon>
              <span class="px-3">Add to Gallery</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-img>
    </v-card>
    <!-- TRENDING -->
    <section id="trending" class="mt-6 d-flex flex-column">
      <v-card
        tile
        dark
        elevation="0"
        class="trending mt-md-5 mt-xs-2 mx-md-10 mx-xs-1 pa-1"
      >
        <h3 class="trending__title">
          <v-icon large color="primary">mdi-trending-up</v-icon>
          <span class="px-2">Trendings</span>
        </h3>
        <v-slide-group show-arrows>
          <v-slide-item v-for="(item, index) in topTrending" :key="index">
            <v-card elevation="5" width="200" height="325" class="ma-2 pa-2">
              <v-img height="200" :src="publicPath + 'images/thumbnails/' + item._thumbnail"></v-img>
              <v-card-title>
                <h5 class="text-truncate">{{ item._name }}</h5>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn @click="goWatch(item._id)" color="primary" elevation="0">
                  <v-icon>mdi-play</v-icon>
                  <span class="px-2">Watch</span>
                </v-btn>
                <v-btn color="primary" elevation="0"
                  ><v-icon>mdi-information</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-card>
      <!-- News Arrivals -->
      <v-card
        height="200"
        tile
        dark
        elevation="0"
        class="trending mt-5 mx-md-10 mx-xs-2 pa-1 d-flex trending__carousel"
      >
        <v-carousel
          height="150"
          class="align-self-center trending__carousel-item"
          hide-delimiters
        >
          <v-carousel-item
            link
            v-for="(item, index) in trendCarousel"
            :key="index"
            :src="item.img"
          ></v-carousel-item>
        </v-carousel>
      </v-card>
    </section>

    <section id="recomended mt-6">
      <v-card
        tile
        dark
        elevation="0"
        class="recomend mt-md-5 mt-xs-2 mx-md-10 mx-xs-1 pa-1"
      >
        <h3 class="trending__title">
          <v-icon large color="primary">mdi-thumb-up</v-icon>
          <span class="px-2">Reccommend</span>
        </h3>
        <v-container class="trending__content d-flex mx-0 px-0">
          <v-row align="start" align-sm="center">
            <v-col md="7" class="reccommend__player">
              <Player v-if="recommendVideo.src != ''" :playerDetails="recommendVideo" />
            </v-col>
            <v-col md="5" class="reccommend__title d-block">
              <v-card elevation="0" class="px-5 px-md-0">
              <v-img :src="publicPath + 'images/logos/' + recommend.posterLogo" alt="#" width="250"></v-img>
              <div class="d-flex my-1">
                <v-chip
                  class="mr-2"
                  v-for="(item, index) in recommend.posterGenre"
                  :key="index"
                  link
                  outlined
                  >{{ item }}</v-chip
                >
              </div>
              <p class="px-0 py-3 ma-0 text-justify">{{recommend.posterDesc}}</p>
              <v-card-actions class="pa-0">
                <v-btn @click="goWatch(recommend.posterId)" class="reccommend__actions" color="primary" large>
              <v-icon>mdi-play</v-icon>
              <span class="px-3">Watch now</span>
            </v-btn>
            <v-btn class="reccommend__actions" color="primary" large>
              <v-icon>mdi-information</v-icon>
              <span class="px-3">More info</span>
            </v-btn>
              </v-card-actions>
            </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </section>

    <!-- TV SERIES -->
    <section id="series" class="mt-6 d-flex flex-column">
      <v-card
        tile
        dark
        elevation="0"
        class="series mt-md-5 mt-xs-2 mx-md-10 mx-xs-1 pa-1"
      >
        <h3 class="series__title">
          <v-icon large color="primary">mdi-television-classic</v-icon>
          <span class="px-2">TV Series</span>
        </h3>
        <v-slide-group show-arrows>
          <v-slide-item v-for="(item, index) in series" :key="index">
            <v-card elevation="5" width="200" height="375" class="ma-2 pa-2">
              <v-img height="250" :src="publicPath + 'images/thumbnails/' + item._thumbnail "></v-img>
              <v-card-title>
                <h5 class="text-truncate">{{ item._name }}</h5>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn @click="goWatch(item._id)" color="primary" elevation="0">
                  <v-icon>mdi-play</v-icon>
                  <span class="px-2">Watch</span>
                </v-btn>
                <v-btn color="primary" elevation="0"
                  ><v-icon>mdi-information</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-card>
    </section>

    <!-- CARTOON -->
    <section id="cartoon" class="mt-6 d-flex flex-column">
      <v-card
        tile
        dark
        elevation="0"
        class="series mt-md-5 mt-xs-2 mx-md-10 mx-xs-1 pa-1"
      >
        <h3 class="cartoon__title">
          <v-icon large color="primary">mdi-teddy-bear</v-icon>
          <span class="px-2">Cartoon & Animations</span>
        </h3>
        <v-slide-group show-arrows>
          <v-slide-item v-for="(item, index) in cartoon" :key="index">
            <v-card elevation="5" width="200" height="375" class="ma-2 pa-2">
              <v-img height="250" :src="publicPath + 'images/thumbnails/' + item._thumbnail"></v-img>
              <v-card-title>
                <h5 class="text-truncate">{{ item._name }}</h5>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn @click="goWatch(item._id)" color="primary" elevation="0">
                  <v-icon>mdi-play</v-icon>
                  <span class="px-2">Watch</span>
                </v-btn>
                <v-btn color="primary" elevation="0"
                  ><v-icon>mdi-information</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-card>
    </section>
  </v-sheet>
  </div>
</template>

<script>
import Player from "../player/Player";
import MovieApi from '../../api/MovieApi'
import ElementLoader from '../../api/element-loader/ElementLoader'
export default {
  name: "ui-home",
  components: { Player },
  data: () => ({
    pageLoad: false,
    poster: [{}],
    topTrending: [{}],
    publicPath: null,
    series: [{}],
    cartoon: [{}],
    recommend: [{}],
    trendCarousel: [
      { img: require("../../assets/carousel/jujutsu.png"), route: "/" },
      { img: require("../../assets/carousel/moon-knight.png"), route: "/" },
    ],
    recommendVideo: {src:'', size:480 },
    recomendTitle: {
      title: "Attack On Titan",
      logo: require("../../assets/logos/Attack-on-Titan-Logo.png"),
      desc: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
      genre: [
        { title: "Actions", route: "/genre/actions" },
        { title: "Adventure", route: "/genre/adventure" },
        { title: "Animations", route: "/genre/animations" },
      ],
    },
    posterUi: [{}],
  }),
  async mounted(){
    this.publicPath = process.env.BASE_URL

    this.topTrending = await MovieApi.getTrending(10)
    this.cartoon = await MovieApi.findGenre('Animation')
    this.poster = await ElementLoader.load(ElementLoader._POSTER)
    this.recommend = await ElementLoader.load(ElementLoader._RECOMMEND)
    this.series = await MovieApi.findType('series')
    this.recommendVideo.src = this.publicPath + 'videos/' + await this.recommend.posterVideo
    this.recommendVideo.size = 640
    this.pageLoad = true
  },
  methods:{
    goWatch(movieId){
      this.$router.push(`/watch/${movieId}`)
    }
  }
};
</script>

<style>
.poster__img {
  height: 100%;
  position: relative;
}
.blender {
  height: 100%;
}
.blender::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.5) 15%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.5) 85%,
    rgba(0, 0, 0, 1) 100%
  );
}
.poster {
  height: 100vh;
  position: relative;
}
.poster .poster__title {
  width: 250px;
}
.poster .poster__name {
  text-transform: uppercase;
}
.poster .v-responsive__content {
  display: flex;
}
.poster .poster__desc {
  width: 50%;
}
.poster .poster__actions {
  width: 200px;
}


.poster .poster__video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  overflow: hidden;
}
.poster__video video {
  /* Make video to at least 100% wide and tall */
  min-width: 100%; 
  min-height: 100%; 


  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

@media only screen and (max-width: 600px) {
  .poster {
    height: 350px !important;
  }
  .poster .poster__actions {
    width: 150px !important;
  }
  .poster .poster__name {
    font-size: 16px;
  }
  .poster .poster__title {
    width: 150px;
  }
  .trending__title {
    text-align: center;
  }
  .trending__caorousel {
    height: 150px !important;
  }
  .trending__caorousel-item {
    height: 100px !important;
  }
}
</style>