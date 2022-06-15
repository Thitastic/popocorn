import axios from 'axios'

const _PATH_GET_ID = 'https://api-popcorn.herokuapp.com/api/genre/'
const _PATH_GET_ALL = 'https://api-popcorn.herokuapp.com/api/genre/'

class RssApi{
    static findId(id){
        return  new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GET_ID + id).then((res)=>{
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

    static getAll(){
        return  new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GET_ALL).then((res)=>{
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

export default RssApi