import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { sendMessage } from '../utils/utils.js'
import { AppContext } from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify/unstyled';
import { RiResetRightLine } from "react-icons/ri";
import { FaImage } from "react-icons/fa6";

export default function Inputs() {
    const [query, setQuery] = useState("");
    // const [justCode, setJustCode] = useState(true);
    const [disableQuery, setDisableQuery] = useState(false);
    const { resetChat, setModels, model, setModel, language, setLanguage } = useContext(AppContext);
    // console.log({ query, models, setModels, model, setModel, language, setLanguage });

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    }

    const handleModelChange = (event) => {
        setModel(event.target.value)
    }

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    }

    // const handleJustCode = useCallback(() => {
    //     setJustCode(prev => !prev);
    // }, [justCode])

    // console.log({ justCode })

    const handleGeminiQuery = async (query, modelKey) => {
        const codeQuery = `write program in ${language} language without any comments and without any code explanation for below - ${query}`;

        // Add user's query to the corresponding model's array
        setModels((prevModels) => ({
            ...prevModels,
            [modelKey]: [...prevModels[modelKey], { sender: "user", message: query }],
        }));

        // Send query to Gemini AI
        try {
            const response = await sendMessage(codeQuery, model);
            setModels((prevModels) => ({
                ...prevModels,
                [modelKey]: [
                    ...prevModels[modelKey],
                    { sender: "model", message: response.parts[0].text },
                ],
            }));
        } catch (error) {
            toast(`An error occurred while processing ${modelKey}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.error(`Error sending message to ${modelKey}:`, error);
        }

        // Clear query field
        setQuery("");
    };

    const handleGeminiFlash = async () => {
        if (query.trim()) await handleGeminiQuery(query, "geminiFlash");
    };

    const handleGeminiPro = async () => {
        if (query.trim()) await handleGeminiQuery(query, "geminiPro");
    };

    const handleAllModel = async () => {
        await Promise.all([handleGeminiQuery(query, "geminiFlash"), handleGeminiQuery(query, "geminiPro")])
    }

    const handleSendMessage = async () => {
        if (query && model && language) {
            setDisableQuery(true);
            try {
                if (model === "geminiflash") {
                    await handleGeminiFlash();
                } else if (model === "geminipro") {
                    await handleGeminiPro();
                } else if (model === "all") {
                    await handleAllModel();
                }
            } catch (error) {
                console.error("Error processing model:", error);
                toast("An error occurred while processing your request", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } finally {
                setDisableQuery(false);
            }
        } else {
            if (!model) showToast("Please select model");
            if (!query) showToast("Please add prompt");
            if (!language) showToast("Please select language");
        }
    };

    const showToast = (message) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };


    return (
        <>
            <Row className="w-100 mb-1 g-0 gap-2 d-flex justify-content-center align-items-center">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
                <Col xs={4} lg={2}>
                    <Form.Select aria-label="Default select example" value={model} onChange={handleModelChange} style={{ boxShadow: 'none' }}>
                        <option value="" disabled>Select Model</option>
                        <option value="all">All</option>
                        <option value="geminiflash">Gemini 1.5 Flash</option>
                        <option value="geminipro">Gemini 1.5 Pro</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example" className='mt-2' value={language} onChange={handleLanguageChange} style={{ boxShadow: 'none' }}>
                        <option value="" disabled>Select Language</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="rust">Rust</option>
                        <option value="c">C Programming</option>
                    </Form.Select>
                </Col>
                <Col xs={5} lg={8}>
                    <Form.Control as="textarea" rows={3} value={query} style={{ resize: 'none', outline: 'none', boxShadow: 'none' }} data-gramm="false" onChange={handleQueryChange} disabled={disableQuery} placeholder='Type prompt here...' />
                </Col>
                <Col xs={2} lg={1} className='d-flex gap-2 flex-column align-items-center'>
                    {/* <Form.Check value={justCode} onChange={handleJustCode} type="checkbox" id={`default-checkbox`} label={`Just-Code`} /> */}
                    <Col className='d-flex gap-2'>
                        <RiResetRightLine size={22} onClick={resetChat} style={{ cursor: 'pointer', padding: 0 }} />
                        <FaImage size={22} style={{ cursor: 'pointer', padding: 0 }} />
                    </Col>
                    <Button className='w-100' disabled={disableQuery} variant='dark' onClick={handleSendMessage}>Send</Button>
                </Col>
            </Row>
        </>
    )
}
