import axios from "axios"

const _PATH_TRENDING = 'http://localhost:3000/api/movies/trending/'
const _PATH_GENRE = 'http://localhost:3000/api/movies/g/'
const _PATH_TYPE = 'http://localhost:3000/api/movies/type/'
const _PATH_ID = 'http://localhost:3000/api/movies/watch/'
const _PATH_SEARCH = 'http://localhost:3000/api/movies/search/'
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