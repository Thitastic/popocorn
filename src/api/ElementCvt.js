/*
POSTER: 

        _________posterVideo________________________________________________________________
        |
        | posterLogo
        | posterName
        | posterDesc
        | posterGenre
        |
        | <v-btn> <v-btn>
        |___________________________________________________________________________________

*/
import GenreApi from './GenreApi'

class ElementCvt{
    /**
     * 
     * @param {Object} element 
     * Convert elementApi to page element
     */
    static async convertPoster(element){

        const genreIds = element[0].movie._genre
        let genres = []
        for(const [key, value] of Object.entries(genreIds)){
            key  //
            const genre = await GenreApi.findId(value)
            const genreName = genre[0]._name
            genres.push(genreName)
        }
        const poster = [
            {
                posterVideo: element[0].resource._src,
                posterName: element[0].movie._name,
                posterDesc: element[0].movie._description,
                posterLogo: element[0].movie._logo,
                posterId: element[0].movie._id,
                posterGenre: genres,
                posterThumbnails: element[0].movie._thumbnail
            }
        ]
        return poster
    }

    
}
export default ElementCvt