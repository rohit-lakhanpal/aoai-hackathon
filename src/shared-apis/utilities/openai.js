const config = require("./config");
const { Configuration, OpenAIApi } = require("openai");

let configuration = new Configuration({
  apiKey: config.values.openai.key,
});

const openai = new OpenAIApi(configuration);

const openAiUtilities = {
  completion: async (prompt, model) => {
    if (config.values.openai.type.toLowerCase() === "openai") {
        return await openai.createCompletion({ prompt, model });
    } else {
        let result = await (new OpenAIApi(new Configuration({
            apiKey: config.values.openai.key,
            basePath: `${config.values.openai.baseUrlOptional}openai/deployments/${model}`,
            baseOptions: {
                headers: {'api-key': config.values.openai.key},
                params: {
                    'api-version': config.values.openai.apiVersionOptional // this might change. I got the current value from the sample code at https://oai.azure.com/portal/chat
                }
            }
        }))).createCompletion({
            prompt
        });

        return result.data;
    }
  },
};
module.exports = openAiUtilities;
