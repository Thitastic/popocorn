<template>
    <v-card  tile flat dark min-height="100vh">
        <v-container>
            <v-layout>
                <v-text-field @keyup="typeKey()" v-model="key" append-icon="mdi-magnify" color="primary" outlined hide-details placeholder="Search"></v-text-field>
            </v-layout>
            <v-layout class="my-3">
                <v-row>
                    <v-col md="4">
                        <v-select @change="filterSearch()" v-model="genreFilterVal" clearable outlined color="primary" :items="genreFilter" item-text="_name" item-value="_id" return-object label="Genre"></v-select>
                    </v-col>
                     <v-col md="4">
                        <v-select @change="filterSearch()" v-model="typeFilerVal" clearable outlined color="primary" :items="typeFilter" label="Type"></v-select>
                    </v-col>
                     <v-col md="4">
                        <v-select @change="sort()" v-model="nameFilerVal" outlined color="primary" :items="filterName" label="Sort by name"></v-select>
                    </v-col>
                </v-row>
            </v-layout>
            <v-layout class="mt-2">
                <h2 v-if="filterList.length > 0">We found {{filterList.length}} items match your keyword!</h2>
                <h2 v-else>No item found! Please check your keyword and filter</h2>
            </v-layout>
            <v-card v-if="beforeLoadDone" tile flat class="text-center py-15">
                <v-progress-circular size="50" color="primary" indeterminate></v-progress-circular>
                <h4>Searching...</h4>
            </v-card>
            <v-layout v-else class="flex-wrap">
                <v-card elevation="7" height="225" class="pa-2 ma-2" v-for="(item, index) in filterList" :key="index">
                    <v-layout>
                        <v-img height="200" width="200" :src="publicPath + 'images/thumbnails/' + item._thumbnail"></v-img>
                        <v-card tile flat class="px-2">
                            <h3 class="my-2">{{item._name | truncate(15)}}</h3>
                            <p :style="`font-size: 15px; max-width: 125px`">{{item._description | truncate(50)}}</p>
                            <v-card-actions>
                                <v-btn @click="goWatch(item._id)" width="100%" color="primary">
                                    <v-icon>mdi-play</v-icon>
                                    Watch</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-layout>
                </v-card>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import MovieApi from '../api/MovieApi'
import GenreApi from '../api/GenreApi'
export default {
    name: 'ui-search',
    async mounted(){
        this.beforeLoadDone = true
        this.key = this.$route.query.key
        this.searchList= await MovieApi.search(this.key)
        this.genreFilter = await GenreApi.getAll()
        this.beforeLoadDone = false
        this.filterList = this.searchList
    },
    methods:{
        goWatch(movieId){
            this.$router.push(`/watch/${movieId}`)
        },
        async typeKey(){
            this.beforeLoadDone = true
            this.$router.push({path: '/search', query: {key: this.key}} )
            if(this.key.length > 0){
                this.searchList= await MovieApi.search(this.key)
                this.filterList = this.filter(this.filterList)
            }
            this.beforeLoadDone = false
        },
       
        filter(list){
            const filter = {
                genre: this.genreFilterVal,
                type: this.typeFilerVal,
            }
            list = this.searchList.filter(function(item){
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
        filterSearch(){
            this.beforeLoadDone = true
            this.filterList = this.filter(this.filterList)
            this.beforeLoadDone = false
        },
        sort(){
            if(this.nameFilerVal == "A-Z"){
                this.filterList.sort((a,b)=> {
                   if(a._name > b._name) return 1
                   else return -1
                })
            }
            else{
                this.filterList.sort((a,b)=> {
                   if(a._name < b._name) return 1
                   else return -1
                })
            }
        }
        
    },
    data(){
        return{
            key: '',
            beforeLoadDone: false,
            genreFilter:[{}],
            typeFilter: [
                "Movie", "Series"
            ],
            filterName:[
                "A-Z", "Z-A"
            ],
            genreFilterVal: null,
            typeFilerVal: null,
            nameFilerVal: '',
            found: 0,
            searchList:[{}],
            filterList: [{}],
            publicPath: process.env.BASE_URL
        }
    }
}
</script>

<style>

</style>