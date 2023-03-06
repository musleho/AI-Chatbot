import { Configuration, OpenAIApi } from "openai";

const DEBUG = false;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getBotResponse = async (prompt) => {
    if (DEBUG) {
        return;
    }
    return await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.25,
    })
};

export default getBotResponse;