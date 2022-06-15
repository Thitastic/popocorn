import axios from 'axios'

const _PATH_GET_BY_MOVIE = 'http://localhost:3000/api/ep/m/'

class RssApi{
    static findEposide(id){
        return  new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GET_BY_MOVIE + id).then((res)=>{
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