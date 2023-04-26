require('dotenv').config()

const config = {
    "values": {
        "speech": {
            "key": process.env.SPEECH_KEY,
            "region": process.env.SPEECH_REGION,
            "endpointUrlOptional": process.env.SPEECH_ENDPOINT_URL_OPTIONAL // For custom endpoints. (optional)
        },
        "language": {
            "key": process.env.LANGUAGE_KEY,
            "region": process.env.LANGUAGE_REGION,
            "endpointUrl": process.env.LANGUAGE_ENDPOINT_URL
        }
    },
    "validate": function() {
        let errors = [];
        for (let key in this.values) {
            if (this.values.hasOwnProperty(key)) {
                let value = this.values[key];
                for (let key2 in value) {
                    if (value.hasOwnProperty(key2)) {
                        if (!value[key2]) {              
                            // Don't throw an error if the key contains the word "optional"              
                            if (key2.toLowerCase().indexOf("optional") === -1) {                               
                                errors.push(`${key}.${key2} is not set`);    
                            }
                        }
                    }
                }
            }
        }
        if (errors.length > 0) {
            throw new Error(`The following environment variables are not set: \n- ${errors.join("\n- ")}`);
        }
    }
};

module.exports = config;
