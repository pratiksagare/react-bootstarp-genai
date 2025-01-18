import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { Button, Col, Container, Form, Row, Modal } from 'react-bootstrap';
import piston from 'piston-client';

const pistonClient = piston({ server: 'https://emkc.org' });

export default function PlayGround() {
    const [runTimeEnv, setRunTimeEnv] = useState([]);
    const [selectEnv, setSelectEnv] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [isCodeExecuting, setCodeExecuting] = useState(false);
    const codeBoxRef = useRef(null);
    const outputBoxRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const runtimes = await pistonClient.runtimes();
                setRunTimeEnv(runtimes);
            } catch (e) {
                console.log('Error occur while fetching runtime env : ', e);
            }
        })();
    }, []);

    const executeCode = async () => {
        let response;
        let [language, version] = selectEnv.split(':');
        try {
            setCodeExecuting(true);
            response = await pistonClient.execute(language, codeBoxRef.current.value, { language: version });
            console.log({ response })
            if (response.run.stdout !== '') {
                console.log("response.run.stdout", { response })
                outputBoxRef.current.value = response.run.stdout;
            }
            if (response.run.stderr !== '') {
                outputBoxRef.current.value = response.run.stderr;
            }
        } catch (e) {
            console.log('Error executing code:', e);
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

    return (
        <Container fluid={false} className="d-flex flex-column vh-100">
            <Row>
                <Navbar />
            </Row>
            <Col className="d-flex flex-column flex-grow-1 py-2">
                {/* Modal */}
                <Modal show={showModal} fullscreen={fullscreen} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Modal body content</Modal.Body>
                </Modal>

                {/* Main Playground */}
                <Row className="w-100 g-0 gap-2 d-flex flex-column justify-content-center align-items-center pb-2 flex-wrap">
                    <Col xs={12} lg={6} className='d-flex gap-2'>
                        <Form.Select aria-label="Default select example" value={selectEnv} onChange={handleSelectRunTimeEnv}>
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
                        <Button variant="dark" className="text-nowrap" onClick={() => handleShowModal(true)}>
                            Inject Code in Template
                        </Button>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-evenly flex-grow-1 custom-row">
                    <Col xs={12} lg={8} className="custom-col">
                        <Form.Control ref={codeBoxRef} as="textarea" style={{ height: '100%', resize: 'none', outline: 'none' }} data-gramm="false" placeholder="Type code here..." />
                    </Col>
                    <Col xs={12} lg={4} className="custom-col">
                        <Form.Control ref={outputBoxRef} as="textarea" style={{ height: '100%', resize: 'none', outline: 'none' }} data-gramm="false" disabled placeholder='Output will display here' />
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
