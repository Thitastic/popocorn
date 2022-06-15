<template>
  <div class="player">
    <div class="player__container">
      <video autoplay muted ref="video" :width="size"  @click="playToggle()" @timeupdate="updateTime" @loadedmetadata="loadDetails" id="vuePlayer">
        <source type="video/mp4" />
      </video>
      <v-card :width="size" color="transparent" outlined class="player-controls d-flex">
        <div class="player-control align-self-center">
          <v-btn @click="playToggle()" class="player-controls__actions" icon color="primary"
            ><v-icon>{{!isPlayed ? 'mdi-pause' : 'mdi-play'}}</v-icon></v-btn
          >
          <v-btn @click="forward(10)" class="player-controls__actions" icon color="primary"
            ><v-icon>mdi-fast-forward-10</v-icon></v-btn
          >
          <v-btn @click="rewind(10)" class="player-control__actions" icon color="primary"
            ><v-icon>mdi-rewind-10</v-icon></v-btn
          >
        </div>
        <v-layout class="player-control">
          <v-slider @change="seekVideo" v-model="vCurrentTime" id="playerSlider" hide-details :max="vDuration" min="0" color="primary"></v-slider>
        </v-layout>
        <div class="player-controls__timer align-self-center pa-2">
            <h6 :style="`color: #e31e2d`">
                <span id="currentTime">0:00</span>
                /
                <span id="videoDuration">0:00</span>
            </h6>
        </div>
        <div class="player-control align-self-center">
          <v-btn @click="requestFullscreen" class="player-controls__actions" icon color="primary"
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
                ><v-icon>{{!isMuted ? 'mdi-volume-high' : 'mdi-volume-variant-off'}}</v-icon></v-btn
              >
            </template>
            <v-card class="pa-5">
              <h3 class="player-controls__volume__value">{{!isMuted ? volume : '0'}}</h3>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "ui-player",
  methods: {
      playToggle(){
          this.isPlayed = !this.isPlayed
          if(this.isPlayed) this.$refs.video.pause()
          else this.$refs.video.play()
      },
      changeVolume(){
          this.isMuted = false
          this.$refs.video.volume =  this.volume/100
      },
      mutedVolume(){
          this.isMuted = ! this.isMuted
           this.$refs.video.muted = !this.$refs.video.muted 
      },
      seekVideo(){
        this.$refs.video.pause()
        this.$refs.video.currentTime += (this.vCurrentTime - this.$refs.video.currentTime)
        this.$refs.video.play()
      },
      requestFullscreen(){
        this.$refs.video.requestFullscreen()
      },
      forward(time){
        if(this.$refs.video.currentTime > 10){
          this.$refs.video.currentTime += time
        }
        else
          this.$refs.video.currentTime = 0
      },
      rewind(time){
        if(this.$refs.video.currentTime  < this.$refs.video.duration - 10){
          this.$refs.video.currentTime -= time
        }
        else
          this.$refs.video.currentTime = 0
      },
      updateTime(){
        let min, sec
        min = Math.floor(this.$refs.video.currentTime/60)
        sec = Math.floor(this.$refs.video.currentTime - 60*min)
        if(min < 10) min = "0" + min
        if(sec < 10) sec = "0" + sec
        document.getElementById('currentTime').innerHTML = min + ":" + sec
        this.vCurrentTime = Math.floor(this.$refs.video.currentTime)
      },
      loadDetails(){
        let min, sec
        min = Math.floor(this.$refs.video.duration/60)
        sec = Math.floor(this.$refs.video.duration - 60*min)
        if(min < 10) min = "0" + min
        if(sec < 10) sec = "0" + sec
        document.getElementById('videoDuration').innerHTML = min + ":" + sec
        this.vDuration = this.$refs.video.duration
        console.log(this.$refs.video.autoplay)
        if(this.$refs.video.autoplay == true){
          this.isMuted = true
          this.isPlayed = false
        }
      }
  },
  data(){
    return{
      isPlayed: true,
      vDuration: 0,
      volume: 70,
      isMuted: false,
      videoObj: null,
      vCurrentTime: 0,
      size: 0,
    }
  },
   mounted(){
    this.$refs.video.setAttribute('src', this.playerDetails.src)
    console.log(this.playerDetails.src)
    this.$refs.video.controls =false
    if(window.outerWidth < this.playerDetails.size) this.size = window.outerWidth-10
    else this.size = this.playerDetails.size
  },
  props:{
    playerDetails: {
      src: String,
      size: Number
    }
  }
};
</script>

<style scope>
.player{
  width: 100%;
}
.player__container{
  position: relative !important;
}
.player-controls{
  transform: scaleY(0);
  position: absolute !important;
  bottom: 5px;
  left: 0;
}
.player:hover .player-controls{
  transition: .5s all;
   transform: scaleY(1);
}
.v-player{
  position: relative;
}
</style>