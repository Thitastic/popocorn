import ElementApi from "../ElementApi"
import ElementCvt from "../ElementCvt"

class ElementLoader{
    static _POSTER = 'poster'
    static _RECOMMEND = 'recommend'
    static async load(elName){
        const pageEl = await ElementApi.getPageElement(elName)
        let result
        switch (elName) {
            case this._POSTER:
                result = await ElementCvt.convertPoster(pageEl)
                break;
            case this._RECOMMEND:
                result = await ElementCvt.convertPoster(pageEl)
                break;
            default:
                break;
        }
        return result[0]
    }
}

export default ElementLoader