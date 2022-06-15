<template>
  <v-card dark flat tile min-height="100vh" class="pt-15 px-8">
    <h2>Your gallery:</h2>
    <v-container>
        <v-row align="start" justify="center">
            <v-col md="4">
                <v-select :items="genres" item-value="_id" item-text="_name" label="Genre" return-object clearable color="primary" outlined></v-select>
            </v-col>
            <v-col md="4">
                <v-select :items="type" label="Type" return-object clearable color="primary" outlined></v-select>
            </v-col>
        </v-row>
        <v-layout class="flex-wrap">
            <v-card v-for="(item, index) in movieList" :key="index" class="ma-2 pa-3">
                <v-img :src="item.img" position="center" width="200" height="200"></v-img>
                <h4 class="py-2">{{item.title | truncate(20)}}</h4>
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
</template>

<script>
export default {
    name: 'ui-gallery',
    data(){
        return{
            genres: [
                {_name: 'Fantasy', _id: '001'},
                {_name: 'Actions', _id: '002'},
                {_name: 'Sitcom', _id: '003'},
                {_name: 'Adventure', _id: '004'},
            ],
            type:["movie", "series"],
            movieList: [
      {
        title: `Ruyi's royal love in the palace`,
        img: require('../../assets/thumbnails/ruyis-royal-love-in-the-palace.jpg'),
        route: ''
      },
      {
        title: 'Reply 1988',
        img: require('../../assets/thumbnails/reply-1988.jpg'),
        route: ''
      },
      {
        title: 'D.P',
        img: require('../../assets/thumbnails/dp.jpg'),
        route: ''
      },
      {
        title: 'Thirty-nine',
        img: require('../../assets/thumbnails/thirty-nine.jpg'),
        route: ''
      },
      {
        title: 'Stranger Things',
        img: require('../../assets/thumbnails/stranger-things.jpg'),
        route: ''
      },
      {
        title: 'Girl from nowhere',
        img: require('../../assets/thumbnails/girl-from-no-where.jpg'),
        route: ''
      },
      {
        title: 'Bad Buddy The Series',
        img: require('../../assets/thumbnails/bad-buddy.jpg'),
        route: ''
      },
    ],
        }
    }
}
</script>

<style>

</style>