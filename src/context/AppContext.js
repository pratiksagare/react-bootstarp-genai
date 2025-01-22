import { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [geminiPro, setGeminiPro] = useState(true);
    const [geminiFlash, setGeminiFlash] = useState(true);
    const [models, setModels] = useState({
        geminiFlash: [
            {
                sender: "model",
                message: `Hello, I am GeminiFlash`
            }, {
                sender: "model",
                message: "How can I help you ?"
            }
        ], geminiPro: [
            {
                sender: "model",
                message: "Hey I am GeminiPro, How can I help you?"
            }
        ]
    });
    const [language, setLanguage] = useState("")
    const [model, setModel] = useState("");

    const resetChat = () => {
        setModels(prevModels => {
            const updatedModels = { ...prevModels };

            if (geminiFlash) {
                console.log("Clicked Flash");
                updatedModels.geminiFlash = [
                    {
                        sender: "model",
                        message: `Hello, I am GeminiFlash`
                    },
                    {
                        sender: "model",
                        message: "How can I help you ?"
                    }
                ];
            }

            if (geminiPro) {
                console.log("Clicked Pro");
                updatedModels.geminiPro = [
                    {
                        sender: "model",
                        message: `Hey I am GeminiPro, How can I help you?`
                    }
                ];
            }

            return updatedModels;
        });
    };

    return (
        <AppContext.Provider value={{ models, setModels, model, setModel, language, setLanguage, geminiFlash, setGeminiFlash, geminiPro, setGeminiPro, resetChat }}>
            {children}
        </AppContext.Provider>
    );
}