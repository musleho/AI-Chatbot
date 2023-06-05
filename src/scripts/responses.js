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
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {"role":"user", "content": prompt}
        ],
        max_tokens: 250,
        n: 1
    })
};

export default getBotResponse;