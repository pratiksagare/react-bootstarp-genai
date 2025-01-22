import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { Button, Col, Container, Form, Row, Modal } from 'react-bootstrap';
import piston from 'piston-client';
import { toast, ToastContainer } from 'react-toastify';
import { Bounce } from 'react-toastify/unstyled';

const pistonClient = piston({ server: 'https://emkc.org' });
// const MemorizedNavbar = React.memo(Navbar);
export default function PlayGround() {
    const [runTimeEnv, setRunTimeEnv] = useState([]);
    const [selectEnv, setSelectEnv] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [isCodeExecuting, setCodeExecuting] = useState(false);
    const [inputTemplateCode, setInputTemplateCode] = useState("");
    const [outputTemplateCode, setOutputTemplateCode] = useState("");
    const [template, setTemplate] = useState("");
    const codeBoxRef = useRef(null);
    const outputBoxRef = useRef(null);

    useEffect(() => {
        getRunTimeEnv();
    }, []);

    const getRunTimeEnv = async () => {
        try {
            const runtimes = await pistonClient.runtimes();
            setRunTimeEnv(runtimes);
        } catch (e) {
            console.error('Error occur while fetching runtime env : ', e);
            showToast('Error occur while fetching runtime env')
        }
    }

    const executeCode = async () => {
        let response;
        let [language, version] = selectEnv.split(':');
        try {
            if (codeBoxRef.current.value !== "" && selectEnv !== "") {
                setCodeExecuting(true);
                response = await pistonClient.execute(language, codeBoxRef.current.value, { language: version });
                if (response.run.stdout !== '') {
                    outputBoxRef.current.value = response.run.stdout;
                }
                if (response.run.stderr !== '') {
                    outputBoxRef.current.value = response.run.stderr;
                }
            } else {
                showToast("Input is blank or env is not selected")
            }
        } catch (e) {
            console.error('Error executing code:', e);
            showToast("Something went wrong");
            setCodeExecuting(false);
        } finally {
            setCodeExecuting(false);
        }
    };

    const handleSelectRunTimeEnv = (event) => {
        const selectedEnv = event.target.value;
        setSelectEnv(selectedEnv);
    };

    const handleShowModal = (breakpoint) => {
        setFullscreen(breakpoint);
        setShowModal(true);
    };

    const handleCodeReset = () => {
        codeBoxRef.current.value = "";
    }

    const handleOutputReset = () => {
        outputBoxRef.current.value = "";
    }

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

    const handleFile = (e) => {
        const content = e.target.result;
        setTemplate(content);
    }

    const uploadTemplate = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsText(file);
    }

    const generateTemplate = () => {
        try {
            const temp = template.replace("<code snippet>", `${inputTemplateCode}`);
            setOutputTemplateCode(temp);
        }
        catch (e) {
            showToast("Something went wrong check console");
            console.error(e);
        }
    }

    const copyToClipboard = () => {
        const content = outputTemplateCode; // Use innerHTML for HTML content or innerText for plain text
        navigator.clipboard
            .writeText(content)
            .then(() => {
                showToast("Content copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy content: ", err);
            });
    };

    const saveCodeToFile = () => {
        if (!outputTemplateCode) {
            showToast("Output code is empty. Nothing to save.");
            return;
        }

        const fileName = prompt("Enter the file name (including extension, e.g., output.txt):", "output.txt");
        if (!fileName) {
            showToast("File name not provided. Save operation cancelled.");
            return;
        }

        const blob = new Blob([outputTemplateCode], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`File saved as ${fileName}`);
    };


    return (
        <Container fluid={false} className="d-flex flex-column vh-100">
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
                theme="dark"
                transition={Bounce}
            />
            <Row>
                <Navbar />
            </Row>
            <Col className="d-flex flex-column flex-grow-1 py-2">
                {/* Modal */}
                <Modal show={showModal} fullscreen={fullscreen} onHide={() => setShowModal(false)} className='h-100'>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex flex-column flex-grow-1'>
                        <Row className='d-flex justify-content-evenly flex-grow-1 pt-2 custom-row mb-2'>
                            <Col xs={12} lg={6} className="custom-col">
                                <Form.Control value={inputTemplateCode} onChange={(e) => setInputTemplateCode(e.target.value)} as="textarea" style={{ boxShadow: 'none', height: '100%', resize: 'none', outline: 'none' }} data-gramm="false" placeholder="Paste code here." />
                            </Col>
                            <Col xs={12} lg={6} className="custom-col">
                                <Form.Control value={outputTemplateCode} as="textarea" style={{ height: '100%', resize: 'none', outline: 'none', boxShadow: 'none' }} data-gramm="false" disabled placeholder='Output will display here' />
                            </Col>
                        </Row>
                        <Row className='w-100 gap-2 d-flex justify-content-center align-items-center'>
                            <Col lg="auto" className='d-flex justify-content-center gap-2'>
                                <Col xs={8}>
                                    <Form.Control type="file" onChange={(e) => uploadTemplate(e.target.files[0])} style={{ boxShadow: 'none' }} />
                                </Col>
                                <Col xs="auto">
                                    <Button variant='dark' onClick={generateTemplate}>Generate Code</Button>
                                </Col>
                            </Col>
                            <Col lg="auto" className='d-flex justify-content-center gap-2'>
                                <Col xs="auto">
                                    <Button variant='dark' onClick={copyToClipboard}>Copy Code</Button>
                                </Col>
                                <Col xs="auto">
                                    <Button variant='dark' onClick={saveCodeToFile}>Save Code</Button>
                                </Col>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>

                {/* Main Playground */}
                <Row className="w-100 g-0 gap-2 d-flex flex-column justify-content-center align-items-center pb-2 flex-wrap">
                    <Col xs={12} lg={6} className='d-flex gap-2'>
                        <Form.Select aria-label="Default select example" value={selectEnv} onChange={handleSelectRunTimeEnv} style={{ boxShadow: 'none' }}>
                            <option value="" disabled>
                                Select Environment
                            </option>
                            {runTimeEnv &&
                                runTimeEnv.map((env, index) => {
                                    const value = `${env.language}:${env.version}`;
                                    return (
                                        <option value={value} key={index}>
                                            {`${env.language} ${env.version}`}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                        <Button disabled={isCodeExecuting} variant="dark" className="text-nowrap" onClick={executeCode}>
                            Run Code
                        </Button>
                    </Col>
                    <Col xs={12} lg="auto" className="d-flex justify-content-center gap-2">
                        <Button variant="dark" className="text-nowrap" onClick={handleCodeReset}>
                            Reset Code
                        </Button>
                        <Button variant="dark" className="text-nowrap" onClick={handleOutputReset}>
                            Reset Output
                        </Button>
                        <Button variant="dark" className="text-nowrap" onClick={() => { handleShowModal(true); setInputTemplateCode(codeBoxRef.current.value) }}>
                            Inject Code in Template
                        </Button>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-evenly flex-grow-1 custom-row">
                    <Col xs={12} lg={8} className="custom-col">
                        <Form.Control ref={codeBoxRef} as="textarea" style={{ height: '100%', resize: 'none', outline: 'none', boxShadow: 'none' }} data-gramm="false" placeholder="Type code here..." />
                    </Col>
                    <Col xs={12} lg={4} className="custom-col">
                        <Form.Control ref={outputBoxRef} as="textarea" style={{ height: '100%', resize: 'none', outline: 'none', boxShadow: 'none' }} data-gramm="false" disabled placeholder='Output will display here' />
                    </Col>
                </Row>
            </Col>
        </Container>
    );
}




















// import React, { useEffect, useRef, useState } from 'react'
// import Navbar from '../components/Navbar'
// import { Button, Col, Container, Form, Row } from 'react-bootstrap'
// import piston from "piston-client";


// const pistonClient = piston({ server: "https://emkc.org" });

// export default function PlayGround() {
//     const [runTimeEnv, setRunTimeEnv] = useState([]);
//     const [selectEnv, setSelectEnv] = useState("");
//     const codeBoxRef = useRef(null);
//     const outputBoxRef = useRef(null);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const runtimes = await pistonClient.runtimes();
//                 setRunTimeEnv(runtimes);
//             } catch (e) {
//                 console.log("Error occur while fetching runtime env : ", e);
//             }
//         })();
//     }, [])


//     const executeCode = async () => {
//         let response;
//         let [language, version] = selectEnv.split(':');
//         try {
//             response = await pistonClient.execute(language, codeBoxRef.current.value, { language: version });
//             if (response.run.stdout !== "") {
//                 outputBoxRef.current.innerText = response.run.stdout;
//             }
//             if (response.run.stderr !== "") {
//                 outputBoxRef.current.innerText = response.run.stderr;
//             }
//         }
//         catch (e) {
//             // outputBoxRef.innerText = "Compilation Failed - " + e + response.run.stderr;
//             // add tost here to retry

//         }
//     }

//     const handleSelectRunTimeEnv = (event) => {
//         const selectedEnv = event.target.value;
//         setSelectEnv(selectedEnv); // Directly update state with the string (language:version)
//     };

//     return (
//         <Container fluid={false} className='d-flex flex-column vh-100'>
//             <Row>
//                 <Navbar />
//             </Row>
//             <Col className='  d-flex flex-column flex-grow-1 py-2'>
//                 <Row className='w-100  g-0 gap-2 d-flex justify-content-center align-items-center pb-2'>
//                     <Col xs={4}>
//                         <Form.Select aria-label="Default select example" value={selectEnv} onChange={handleSelectRunTimeEnv}>
//                             <option value="" disabled>Select Environment</option>
//                             {
//                                 runTimeEnv && runTimeEnv.map((env, index) => {
//                                     const value = `${env.language}:${env.version}`; // Concatenate language and version
//                                     return <option value={value} key={index}>{`${env.language} ${env.version}`}</option>;
//                                 })
//                             }
//                         </Form.Select>
//                     </Col>
//                     <Col xs="auto" className='d-flex '>
//                         <Button variant='dark' className='text-nowrap' onClick={executeCode}>Run Code</Button>
//                     </Col>
//                     <Col xs="auto">
//                         <Button variant='dark' className='text-nowrap'>Generate Code</Button>
//                     </Col>
//                 </Row>
//                 <Row className='d-flex justify-content-evenly flex-grow-1   custom-row'>
//                     <Col xs={12} lg={8} className='custom-col'>
//                         <Form.Control ref={codeBoxRef} as="textarea" style={{ height: '100%', resize: 'none', outline: 'none' }} data-gramm="false" placeholder='Type code here...' />
//                     </Col>
//                     <Col xs={12} lg={4} className='custom-col'>
//                         <Form.Control ref={outputBoxRef} value={"Output will display here"} as="textarea" style={{ height: '100%', resize: 'none', outline: 'none' }} data-gramm="false" disabled />
//                     </Col>
//                 </Row>
//             </Col>
//         </Container>
//     )
// }
