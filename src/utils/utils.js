// utils/utils.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../staticVars';

const sendMessage = async (query, model) => {
    try {
        let response;
        console.log(GEMINI_API_KEY)
        // Assuming you have initialized the GoogleGenerativeAI instance
        const client = new GoogleGenerativeAI(GEMINI_API_KEY);
        if (model === "geminiflash") {
            let geminiFlashChat = client.getGenerativeModel({ model: 'gemini-1.5-flash' })
            response = await geminiFlashChat.generateContent(query);
            console.log(response);
            return response.response.candidates[0].content;
        }
        if (model === "geminipro") {
            let geminiFlashChat = client.getGenerativeModel({ model: 'gemini-1.5-pro' })
            response = await geminiFlashChat.generateContent(query);
            console.log({ response });
            return response.response.candidates[0].content;
        }
        // return response; // Return the response message
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw error;
    }
};

export { sendMessage };
