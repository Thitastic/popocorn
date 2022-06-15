import axios from 'axios'

const _PATH_GET_RSS = 'http://localhost:3000/api/res/'

class RssApi{
    static findResource(id){
        return  new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GET_RSS + id).then((res)=>{
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