import axios from "axios"

const _PATH_TRENDING = 'https://api-popcorn.herokuapp.com/api/movies/trending/'
const _PATH_GENRE = 'https://api-popcorn.herokuapp.com/api/movies/g/'
const _PATH_TYPE = 'https://api-popcorn.herokuapp.com/api/movies/type/'
const _PATH_ID = 'https://api-popcorn.herokuapp.com/api/movies/watch/'
const _PATH_SEARCH = 'https://api-popcorn.herokuapp.com/api/movies/search/'
class MovieApi{
    static getTrending(limit){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_TRENDING + limit).then((res)=>{
                    const data = res.data
                    resolve(
                        data
                    )
                }).catch(err=>{reject(err)})
            }catch(error){
                console.log(error)
            }
        })
    }
    static findGenre(name){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GENRE + name).then((res)=>{
                    const data = res.data
                    resolve(
                        data
                    )
                }).catch(err=>{reject(err)})
            }catch(error){
                console.log(error)
            }
        })
    }

    static findId(id){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_ID + id).then((res)=>{
                    const data = res.data
                    resolve(
                        data
                    )
                }).catch(err=>{reject(err)})
            }catch(error){
                console.log(error)
            }
        })
    }

    static findType(type){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_TYPE + type).then((res)=>{
                    const data = res.data
                    resolve(
                        data
                    )
                }).catch(err=>{reject(err)})
            }catch(error){
                console.log(error)
            }
        })
    }

    static search(key){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_SEARCH + key).then((res)=>{
                    const data = res.data
                    resolve(
                        data
                    )
                }).catch(err=>{reject(err)})
            }catch(error){
                console.log(error)
            }
        })
    }
    
}

export default MovieApi