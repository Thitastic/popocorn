import axios from 'axios'
import MovieApi from './MovieApi'
import RssApi from './RssApi'
const _PATH_GET_EL = 'http://localhost:3000/api/web/build/'

class ElementApi{
    static findName(name){
        return  new Promise((resolve, reject)=>{
            try{
                axios.get(_PATH_GET_EL + name).then((res)=>{
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

    /**
     * 
     * @param {String} elName 
     * Returning page elements:
     *  Element:[_el_name]
     * Movie: [_movie_name, _movie_id]
     * Resource: [_rss ...{_id, _src, _movie_id}]
     */
    static async getPageElement(elName){
        const elInfo = await this.findName(elName)
        const movieId = elInfo[0]._movie_id
        const srcId = elInfo[0]._src_id
        
        const movieInfo = await MovieApi.findId(movieId)

        const resourceInfo = await RssApi.findResource(srcId)

        const pageElement = [
            {
                movie: movieInfo[0],
                element: elInfo[0],
                resource: resourceInfo[0]
            }
        ]

        return pageElement
    }

}

export default ElementApi