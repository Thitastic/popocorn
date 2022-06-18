<template>
  <v-card dark flat tile min-height="100vh" class="pt-15 px-8">
    <h2>Your gallery:</h2>
    <v-container>
        <v-row align="start" justify="center">
            <v-col md="4">
                <v-select @change="filterGallery()" :items="genres" item-value="_id" item-text="_name" label="Genre" return-object clearable color="primary" outlined></v-select>
            </v-col>
            <v-col md="4">
                <v-select @change="filterGallery()" :items="type" label="Type" return-object clearable color="primary" outlined></v-select>
            </v-col>
        </v-row>
        <v-layout class="flex-wrap">
            <v-card v-for="(item, index) in filterList" :key="index" class="ma-2 pa-3">
                <v-img :src="publicPath + 'images/thumbnails/' + item._thumbnail " position="center" width="200" height="200"></v-img>
                <h4 class="py-2">{{item.movie._name | truncate(20)}}</h4>
                <v-card-actions class="d-flex">
                    <v-btn @click="goWatch(item.movie._id)" class="primary">
                        <v-icon>mdi-play</v-icon>
                        Watch
                    </v-btn>
                    <v-btn @click="removeGallery(item._id)" class="primary">
                        <v-icon>mdi-delete</v-icon>
                        Remove
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import GenreApi from '../../api/GenreApi'
import UserApi from '../../api/UserApi'
import GalleryApi from '../../api/GalleryApi'
export default {
    name: 'ui-gallery',
    data(){
        return{
            genres: [{}],
            type:["movie", "series"],
            movieList: [{}],
            filterList: [{}],
            pageOnLoad: true,
            publicPath: process.env.BASE_URL
        }
    },
    async mounted(){
      const user = await UserApi.findToken(localStorage.getItem('token'))
      this.movieList = await GalleryApi.findUserId(user[0]._id)
      this.genres = await GenreApi.getAll()
      this.filterList = this.movieList
      this.pageOnLoad = false
    },
    methods:{
      filter(list){
            const filter = {
                genre: this.genreFilterVal,
                type: this.typeFilerVal,
            }
            list = this.movieList.filter(function(item){
                let genre  = true, type = true
                if(filter.genre != null){
                    for(const value of Object.entries(item._genre)){
                       if(value["1"] == filter.genre._id){
                        genre = true
                        break
                       }
                       genre = false
                    }
                }
                if(filter.type != null){
                   if(filter.type.toLowerCase() == item._type){
                    type = true
                   }
                   else type = false
                }
                if(genre && type) return true
                else return false
            })

            return list
        },

        filterGallery(){
            this.pageOnLoad = true
            this.filterList = this.filter(this.filterList)
            this.pageOnLoad = false
        },
        goWatch(movieId){
          this.$router.push(`/watch/${movieId}`)
        },
        async removeGallery(id){
          await GalleryApi.destroyGallery(id)
          this.movieList.forEach((item, index)=>{
            if(item._id == id) {
                this.movieList.splice(index, 1)
                return true
            }
          })
          this.filterList = this.filter(this.filterList)
        }
    },
}
</script>

<style>

</style>