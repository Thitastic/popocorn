import axios from 'axios'
const _PATH_SEND_SMS = "'https://api-popcorn.herokuapp.com/api/sms"
class OtpApi{
    static sendSms(_message) {
        return new Promise((resolve, reject)=>{
            try{
                axios.post(_PATH_SEND_SMS, {message: _message}).then((res)=>{
                    resolve(
                       res.status
                    )
                }).catch((err)=>{reject(err)})
            }catch(error){
                console.log(error)
            }
        })
    }

    static generateOtp(length){
        return  Math.floor(100000 + Math.random() * 900000).toString().padStart(length, "0")
    }
}

export default OtpApi