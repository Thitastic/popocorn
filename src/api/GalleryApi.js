import axios from 'axios'

const _HOST_PATH = 'https://api-popcorn.herokuapp.com/api'
const _PATH_FIND_BY_USER = `${_HOST_PATH}/gallery/`
const _PATH_DESTROY = `${_HOST_PATH}/gallery/destroy/`
const _PATH_CREATE = `${_HOST_PATH}/gallery/new/`

class GalleryApi{
    static findUserId(user_id) {
        return new Promise((resolve, reject)=>{
            try {
                axios.get(_PATH_FIND_BY_USER + user_id).then(res=>{
                    resolve(res.data)
                }).catch(err=> reject(err))
            } catch (error) {
                console.log(error)
            }
        })
    }

    static insert(object) {
        return new Promise((resolve, reject)=>{
            try {
                axios.post(_PATH_CREATE , {item: object}).then(res=>{
                    resolve(res.status)
                }).catch(err=> reject(err))
            } catch (error) {
                console.log(error)
            }
        })
    }

    static destroyGallery(id){
        return new Promise((resolve, reject)=>{
            try {
                axios.delete(_PATH_DESTROY + id).then(res=>{
                    resolve(res.status)
                }).catch(err=>reject(err))
            } catch (error) {
                console.log(error)
            }
        })
    }
}

export default GalleryApi