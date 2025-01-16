import { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [models, setModels] = useState({
        geminiFlash: [
            // {
            //     sender: "user",
            //     message: "Hi"
            // },
            {
                sender: "model",
                message: `Hello, I am GeminiFlash`
            }, {
                sender: "model",
                message: "How can I help you ?"
            }
        ], geminiPro: [
            // {
            //     sender: "user",
            //     message: "Hi"
            // },
            {
                sender: "model",
                message: "Hey I am GeminiPro, How can I help you?"
            }
        ]
    });
    const [language, setLanguage] = useState("")
    const [model, setModel] = useState("");

    return (
        <AppContext.Provider value={{ models, setModels, model, setModel, language, setLanguage }}>
            {children}
        </AppContext.Provider>
    );
}