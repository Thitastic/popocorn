<template>
  <div class="player">
    <div class="player__container">
      <video
        ref="video"
        :poster="playerDetails.thumbnail"
        :height="size"
        @click="playToggle()"
        @timeupdate="updateTime"
        @loadedmetadata="loadDetails"
        id="vuePlayer"
      >
        <source type="video/mp4; codecs=avc1.42E01E, mp4a.40.2" />
        <source type="video/mp4; codecs=Opus Vorbis VP8" />
        <source type="video/webm; " />
        <source type="video/ogg;" />
      </video>
      <v-card
        :width="size"
        color="rgb(0, 0, 0, 0.5)"
        outlined
        class="player-controls d-flex"
      >
        <div class="player-control align-self-center">
          <v-btn
            @click="playToggle()"
            class="player-controls__actions"
            icon
            color="primary"
            ><v-icon>{{ !isPlayed ? "mdi-play" : "mdi-pause" }}</v-icon></v-btn
          >
          <v-btn
            @click="forward(10)"
            class="player-controls__actions"
            icon
            color="primary"
            ><v-icon>mdi-fast-forward-10</v-icon></v-btn
          >
          <v-btn
            @click="rewind(10)"
            class="player-control__actions"
            icon
            color="primary"
            ><v-icon>mdi-rewind-10</v-icon></v-btn
          >
        </div>
        <v-layout class="player-control">
          <v-slider
            @change="seekVideo"
            v-model="vCurrentTime"
            id="playerSlider"
            hide-details
            :max="vDuration"
            min="0"
            color="primary"
          ></v-slider>
        </v-layout>
        <div class="player-controls__timer align-self-center pa-2">
          <h6 :style="`color: #e31e2d`">
            <span id="currentTime">0:00</span>
            /
            <span id="videoDuration">0:00</span>
          </h6>
        </div>
        <div class="player-control align-self-center">
          <v-btn
            @click="requestFullscreen"
            class="player-controls__actions"
            icon
            color="primary"
            ><v-icon>mdi-fullscreen</v-icon></v-btn
          >
          <v-menu open-on-hover top :offset-y="true">
            <template v-slot:activator="{ on, attr }">
              <v-btn
                v-bind="attr"
                v-on="on"
                class="player-control__actions"
                icon
                color="primary"
                @click="mutedVolume"
                ><v-icon>{{
                  !isMuted ? "mdi-volume-high" : "mdi-volume-variant-off"
                }}</v-icon></v-btn
              >
            </template>
            <v-card class="pa-5">
              <h3 class="player-controls__volume__value">
                {{ !isMuted ? volume : "0" }}
              </h3>
              <v-slider
                vertical
                max="100"
                min="0"
                step="5"
                color="primary"
                @change="changeVolume()"
                v-model="volume"
              ></v-slider>
            </v-card>
          </v-menu>
        </div>
      </v-card>

      <!-- -->
      <v-card
        color="rgb(0, 0, 0, 0.5)"
        tile
        v-if="!isPlayed"
        class="player__details d-flex align-center px-1 px-md-5 py-3"
      >
        <v-btn color="transparent" elevation="0" @click="goBack()"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <h3 :style="`color:` + this.$vuetify.theme.themes.light.primary">
          {{ playerDetails.title }}
        </h3>
        <v-spacer></v-spacer>
        <v-btn @click="goHome()" elevation="0" color="primary" outlined>POPCORN</v-btn>
      </v-card>
      <v-btn
        v-if="!isPlayed"
        color="primary"
        x-large
        fab
        class="player__btn-play-lg"
      >
        <v-icon @click="playToggle()" x-large>mdi-play</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "ui-player",
  methods: {
    playToggle() {
      if (!this.start) this.start = true;
      this.isPlayed = !this.isPlayed;
      if (!this.isPlayed) this.$refs.video.pause();
      else this.$refs.video.play();
    },
    changeVolume() {
      this.isMuted = false;
      this.$refs.video.volume = this.volume / 100;
    },
    mutedVolume() {
      this.isMuted = !this.isMuted;
      this.$refs.video.muted = !this.$refs.video.muted;
    },
    seekVideo() {
      this.$refs.video.currentTime +=
        this.vCurrentTime - this.$refs.video.currentTime;
    },
    requestFullscreen() {
      this.$refs.video.requestFullscreen();
    },
    forward(time) {
      if (this.$refs.video.currentTime > 10) {
        this.$refs.video.currentTime += time;
      } else this.$refs.video.currentTime = 0;
    },
    rewind(time) {
      if (this.$refs.video.currentTime < this.$refs.video.duration - 10) {
        this.$refs.video.currentTime -= time;
      } else this.$refs.video.currentTime = 0;
    },
    updateTime() {
      let min, sec;
      min = Math.floor(this.$refs.video.currentTime / 60);
      sec = Math.floor(this.$refs.video.currentTime - 60 * min);
      if (min < 10) min = "0" + min;
      if (sec < 10) sec = "0" + sec;
      document.getElementById("currentTime").innerHTML = min + ":" + sec;
      this.vCurrentTime = this.$refs.video.currentTime;
    },
    loadDetails() {
      let min, sec;
      min = Math.floor(this.$refs.video.duration / 60);
      sec = Math.floor(this.$refs.video.duration - 60 * min);
      if (min < 10) min = "0" + min;
      if (sec < 10) sec = "0" + sec;
      document.getElementById("videoDuration").innerHTML = min + ":" + sec;
      this.vDuration = this.$refs.video.duration;
      console.log(this.$refs.video.autoplay);
      if (this.$refs.video.autoplay == true) {
        this.isMuted = true;
        this.isPlayed = false;
      }
    },
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push("/");
    },
  },
  data() {
    return {
      isPlayed: false,
      vDuration: 0,
      volume: 70,
      isMuted: false,
      videoObj: null,
      vCurrentTime: 0,
      size: 0,
      start: false,
    };
  },
  mounted() {
    this.$refs.video.setAttribute("src", this.playerDetails.src);
    this.$refs.video.autoplay = this.playerDetails.autoplay;
    this.$refs.video.controls = false;
    if (window.outerWidth < this.playerDetails.size)
      this.size = window.outerWidth - 10;
    else this.size = this.playerDetails.size;
  },
  props: {
    playerDetails: {
      src: String,
      size: Number,
      autoplay: Boolean,
      thumbnail: String,
      title: String,
      back: Object,
    },
  },
};
</script>

<style scope>
.player {
  width: 100%;
}
.player__container {
  position: relative !important;
  text-align: center;
  background: rgb(0, 0, 0);
}
.player-controls {
  transform: scaleY(0);
  position: absolute !important;
  bottom: 5px;
  left: 0;
  width: 100% !important;
}

.player__details {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
}

.player__btn-play-lg {
  position: absolute !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.player:hover .player-controls {
  transition: 0.5s all;
  transform: scaleY(1);
}
.v-player {
  position: relative;
}
.player__thumbnail {
  position: absolute !important;
  top: 0;
  left: 0;
}
#vuePlayer {
  max-width: 100%;
}
</style>