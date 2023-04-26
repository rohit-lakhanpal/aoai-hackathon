require('dotenv').config()

const errorGenerator = (item, key, value) => {
    let message = `${item} is not set correctly. Please check [${key}] in the .env file.`;
    if (value) {
        message += ` (E.g. ${key}="${value}"))`;
    }
    return message;
}

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
        },
        "openai": {
            "type": process.env.OPENAI_TYPE, // "openai" or "azure"
            "key": process.env.OPENAI_KEY,
            "baseUrlOptional": process.env.OPENAI_AZURE_BASE_URL_OPTIONAL, // Needed for Azure OpenAI [eg. https://[your-deployment-name].openai.azure.com/]
            "apiVersionOptional": process.env.OPENAI_AZURE_API_VERSION_OPTIONAL
        }
    },
    "validate": function() {
        let errors = [];
        // for (let key in this.values) {
        //     if (this.values.hasOwnProperty(key)) {
        //         let value = this.values[key];
        //         for (let key2 in value) {
        //             if (value.hasOwnProperty(key2)) {
        //                 if (!value[key2]) {              
        //                     // Don't throw an error if the key contains the word "optional"              
        //                     if (key2.toLowerCase().indexOf("optional") === -1) {                               
        //                         errors.push(`${key}.${key2} is not set`);    
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        this.validateSpeech().forEach(error => errors.push(error));
        this.validateLanguage().forEach(error => errors.push(error));
        this.validateOpenAi().forEach(error => errors.push(error));

        if (errors.length > 0) {
            throw new Error(`The following environment variables are not set: \n- ${errors.join("\n- ")}`);
        }
    },
    "validateSpeech": () => {
        let errors = [];

        // Check if speech config values are set correctly
        if (!config.values.speech.key || config.values.speech.key.length !== 32) {
            errors.push(errorGenerator(`Speech key`, `SPEECH_KEY`));
        }
        if (!config.values.speech.region || config.values.speech.region.length === 0) {            
            errors.push(errorGenerator(`Speech region`, `SPEECH_REGION`));
        }

        // Speech endpoint URL is optional. 
        // If its set, check is a valid url in the following format:
        // https://southcentralus.api.cognitive.microsoft.com/sts/v1.0/issuetoken
        if (config.values.speech.endpointUrlOptional && config.values.speech.endpointUrlOptional.length > 0) {
            let url = config.values.speech.endpointUrlOptional;
            if (url.indexOf("https://") !== 0 || url.indexOf("sts/v1.0/issuetoken") === -1) {                
                errors.push(errorGenerator(`Speech endpoint URL`, `SPEECH_ENDPOINT_URL_OPTIONAL`));
            }
        }
        return errors;
    },
    "validateLanguage": () => {
        let errors = [];

        // Check if language config values are set correctly
        if (!config.values.language.key || config.values.language.key.length !== 32) {            
            errors.push(errorGenerator(`Language key`, `LANGUAGE_KEY`));
        }
        if (!config.values.language.region || config.values.language.region.length === 0) {            
            errors.push(errorGenerator(`Language region`, `LANGUAGE_REGION`));
        }
        if (!config.values.language.endpointUrl || config.values.language.endpointUrl.length === 0) {            
            errors.push(errorGenerator(`Language endpoint URL`, `LANGUAGE_ENDPOINT_URL`));
        }

        return errors;
    },
    "validateOpenAi": () => {
        let errors = [];

        // Check if openai key is set correctly
        if (!(config.values.openai.key && config.values.openai.key.length >= 32)) {
            errors.push(errorGenerator(`OpenAI key`, `OPENAI_KEY`));
        }

        // Check if openai type is set to azure
        if (config.values.openai.type && config.values.openai.type.toLowerCase() === "azure") {
            // Check if openai azure endpoint URL is set correctly
            if (config.values.openai.baseUrlOptional.length === 0) {
                errors.push(errorGenerator(`OpenAI Azure endpoint URL`, `OPENAI_AZURE_BASE_URL_OPTIONAL`));
            } else {
                let url = config.values.openai.baseUrlOptional;
                if (url.indexOf("https://") !== 0 || url.indexOf(".openai.azure.com/") === -1) {                
                    errors.push(errorGenerator(`OpenAI Azure endpoint URL`, `OPENAI_AZURE_BASE_URL_OPTIONAL`));
                }
            }

            // Check if openai azure api version is set correctly
            if (config.values.openai.apiVersionOptional.length === 0) {
                errors.push(errorGenerator(`OpenAI Azure API version`, 
                `OPENAI_AZURE_API_VERSION_OPTIONAL`,
                `https://[your-deployment-name].openai.azure.com/`));
            }

            // Check api version is "2022-12-01" or "2023-03-15-preview"
            if (config.values.openai.apiVersionOptional !== "2022-12-01" && 
                config.values.openai.apiVersionOptional !== "2023-03-15-preview") {

                errors.push(errorGenerator(`OpenAI Azure API version`, 
                `OPENAI_AZURE_API_VERSION_OPTIONAL`, 
                `2022-12-01 or 2023-03-15-preview`));            
            }
        } else if (config.values.openai.type && config.values.openai.type.toLowerCase() === "openai") {
            // Check URL, Version?
        } else {
            errors.push(errorGenerator(`OpenAI type`, `OPENAI_TYPE`, `openai or azure`));
        }

        return errors;
    }
};

module.exports = config;
