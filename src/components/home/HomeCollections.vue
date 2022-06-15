<template>
  <div id="collections">
    <v-sheet v-if="pageOnLoad" dark height="100vh">
      <v-skeleton-loader
        class="mx-auto"
        min-height="100vh"
        width="100%"
        type="image"
      ></v-skeleton-loader>
    </v-sheet>
    <v-card v-else dark min-height="100vh" class="pt--20 px-8">
    <v-container>
        <v-row align="start" justify="center">
            <v-col md="4">
                <v-select @change="startFilter()" v-model="filterVal" :items="genres" item-value="_id" item-text="_name" label="Genre" return-object clearable color="primary" outlined></v-select>
            </v-col>
        </v-row>
        <v-layout class="flex-wrap">
            <v-card v-for="(item, index) in movieListFilter" :key="index" class="ma-2 pa-3">
                <v-img width="200" height="200" :src="publicPath +'images/thumbnails/' + item._thumbnail" alt="poster"></v-img>
                <h4 class="py-2">{{item._name | truncate(20)}}</h4>
                <v-card-actions class="d-flex">
                    <v-btn class="primary">
                        <v-icon>mdi-play</v-icon>
                        Watch
                    </v-btn>
                    <v-btn class="primary">
                        <v-icon>mdi-Information</v-icon>
                        info
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
  </v-card>
  </div>
</template>

<script>
import MovieApi from '../../api/MovieApi'
import GenreApi from '../../api/GenreApi'
export default {
    name: 'ui-collections',
    data(){
        return{
            publicPath: process.env.BASE_URL,
            genres: [{}],
            movieList: null,
            movieListFilter: null,
            pageOnLoad: true,
            filterVal: null,
        }
    },
    async mounted(){
      const moviesType = this.$route.query.type
      this.movieList = await this.loadMovie(moviesType)
      this.genres = await this.loadGenres()
      this.movieListFilter = this.movieList
      this.pageOnLoad = false
    },
    watch:{
      '$route.query.type' : 'queryChange'
    },
    methods:{
      async loadMovie(type){
        return await MovieApi.findType(type) 
      },
      async loadGenres(){
        return await GenreApi.getAll()
      },
      async queryChange(){
        this.pageOnLoad = true
        console.log(this.$route.query.type)
        this.movieList  = await this.loadMovie(this.$route.query.type)
        this.movieListFilter = this.movieList
        this.pageOnLoad = false
      },
      filter(list){
            const filter = this.filterVal
            list = this.movieList.filter(function(item){
              if(filter == null) return true
              for(const value of Object.entries(item._genre)){
                       if(value["1"] == filter._id){
                        return  true
                       }
                    }
                    return false
            })
            return list
      },
      startFilter(){
            this.pageOnLoad = true
            this.movieListFilter = this.filter(this.movieListFilter)
            this.pageOnLoad = false
      },
    },
}
</script>

<style>
.pt--20{
  padding-top: 80px;
}
</style>