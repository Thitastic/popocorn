import axios from "axios"


const _PATH_ALL_USERS = 'http://localhost:3000/api/users/'
const _PATH_GET_BY_PHONE = 'http://localhost:3000/api/users/p/'
const _PATH_UPDATE = 'http://localhost:3000/api/users/update'
const _PATH_GET_BY_USERNAME = 'http://localhost:3000/api/users/username/'
const _PATH_INSERT = 'http://localhost:3000/api/users/new'
const _PATH_GET_BY_TOKEN = 'http://localhost:3000/api/users/t/'
class userApi {
    static getUsers(){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_ALL_USERS).then((res)=>{
                    const data = res.data
                    resolve(
                        data.map(user=> ({
                            ...user
                        }))
                    )
                }).catch((err)=>{reject(err)})
            }catch(error){
                console.log(error)
            }
        })
    }
    static findPhone(phone){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GET_BY_PHONE + phone).then((res)=>{
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

    static findUsername(username){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GET_BY_USERNAME + username).then((res)=>{
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

    static findToken(token){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GET_BY_TOKEN + token).then((res)=>{
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

    static update(id, user){
        return new Promise((resolve, reject)=>{
            try {
                axios.post(_PATH_UPDATE, {_id: id, _object: user}).then((res)=>{
                    resolve(
                        res.status
                    )
                }).catch(err=>{reject(err)})
            } catch (error) {
                console.log(error)
            }
        })
    }

    static insert(user){
        return new Promise((resolve, reject)=>{
            try {
                axios.post(_PATH_INSERT, {_object: user}).then((res)=>{
                    resolve(
                        res.status
                    )
                }).catch(err=>{reject(err)})
            } catch (error) {
                console.log(error)
            }
        })
    }
}

export default userApi