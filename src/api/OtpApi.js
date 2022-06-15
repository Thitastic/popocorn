const Vonage = require('@vonage/server-sdk')

class OtpApi{
    static sendSms(target, content) {

        const sender = "POPCORN"
        const vonage = new Vonage({
            apiKey: 'b65409d0',
            apiSecret: 'agK00JLrgCm2e6SN'
        })

        vonage.message.sendSms(sender, target, content, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        })
    }

    static generateOtp(length){
        return  Math.floor(100000 + Math.random() * 900000).toString().padStart(length, "0")
    }
}

export default OtpApi