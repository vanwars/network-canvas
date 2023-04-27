import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getUid } from "../actions/uid";
import { Button, Form } from "react-bootstrap";
import emailjs from 'emailjs-com';
import { createStage } from "../actions/stages";
import { useNavigate } from "react-router-dom";


const UidGenerator = ({
    setUid,
}) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [inputUid, setInputUid] = useState("");
    const [isGenerateOrInput, setIsGenerateOrInput] = useState(true);
    const [isSendEmail, setIsSendEmail] = useState(false);
    const [toEmail, setToEmail] = useState(null);
    const [showNoValidEmail, setShowNoValidEmail] = useState(false);

    const navigate = useNavigate();

    let newUid = useSelector((state) => state.uid);

    useEffect(() => {
        // const patchStages = async() => {
            if (newUid && newUid !== null && newUid !== undefined && typeof newUid === "string") {
                // try {
                    const sampleNodes = [{text: "node1", bin: 0, idx: 0}, {text: "node2", bin: 1, idx: 1}];
                    const sampleEdgeNodes = [{idx: 0, text: "node1", transform:0, isDown: false, posX: 100, posXText: "100px", posY: 100, posYText: "100px", screenX: 0, screenY: 0}, 
                                        {idx: 1, text: "node2", transform:0, isDown: false, posX: 300, posXText: "300px", posY: 100, posYText: "100px", screenX: 0, screenY: 0}];
                    const sampleAwaitNodes = [{text: "node1"}, {text: "node2"}];
                    const sampleCoordNodes = [{text: "node1", transform: 0, isDown: false, posX: 0, posXText: "0px", posY: 0, posYText:"0px", screenX: 0, screenY:0}, 
                                        {text: "node2", transform: 0, isDown: false, posX: 0, posXText: "0px", posY: 0, posYText:"0px", screenX: 0, screenY:0}];
                    const sampleEdge = [{"start":0,"end":1,"width":200,"rad":0,"marginLeft":"150px","marginTop":"150px"}]
                    dispatch(createStage({_id: newUid, nodes: sampleNodes, edgeNodes: sampleEdgeNodes, edges: sampleEdge, awaitNodes: sampleAwaitNodes, coordNodes: sampleCoordNodes}));
                // }
                // catch(error){
                //     console.log(error);
                // }
            }
        // }
        // patchStages();
    }, [newUid])

    console.log(typeof newUid);

    const generate = () => {
        dispatch(getUid());
        setIsSendEmail(true);
    }


    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const sendEmail = () => {
        if(toEmail.match(isValidEmail)){
            setShowNoValidEmail(false);
            emailjs.send('service_7zt40af', 'template_871j3ls', data, 'rQHtH7Rgtdg0lscSe')
                .then((result) => console.log("result is: ", result));
            setCount(count + 1);
            navigate("/");
        }else{
            setShowNoValidEmail(true);
        }
    }

    useEffect(() => {
        if (newUid && count !== 0) {
            console.log(newUid);
            setUid(newUid)
        }
    }, [newUid, count]);

    var data = {
            "uid": newUid,
            "to_email": toEmail,
    };

    return (
        <div className="uid-canvas">
            <div className="uid-generator-wrapper">
                { isSendEmail ? <div style={{ color: "white" }}>
                    {`Here is the UID of your Network Canvas: ${newUid}. You could save it for future data retrival. Or you could enter an email address so we would send your UID to you.`}
                    <Form style={{ width: '300px', left: 0, right: 0, margin: "auto", padding: "20px"}}>
                        <Form.Group style={{marginTop: "20px"}}>
                            <Form.Control type="email" onChange={(e) => setToEmail(e.target.value)} />
                        </Form.Group>
                        { showNoValidEmail ? <div style={{color: "red"}}>Invalid Email Format.</div> : <div></div> }
                        <Button style={{marginTop: "20px"}} onClick={() => sendEmail()}>Send the UID to this email address</Button>
                        <Button style={{marginTop: "20px"}} onClick={() => {
                            setCount(count + 1);
                            navigate("/");
                        }}>Proceed to the main page without sending the UID.</Button>
                    </Form>
                </div> : 
                    <>{ isGenerateOrInput === true ? 
                        <div className="uid-btn" onClick={() => generate()}>Generate a new Network Canvas</div> : 
                        <div style={{height: "100%", color: "white", textAlign: "center"}}>
                            Enter your Network Canvas UID here.
                            <div className="uid-input">
                                <input onChange={(e) => setInputUid(e.target.value)} style={{width: "200px"}} />
                            </div>
                            <div className="uid-btn" onClick={() => {
                                setUid(inputUid);
                                navigate("/");
                            }}>Submit</div>
                        </div>}
                    <div className="uid-generator-switch" onClick={() => setIsGenerateOrInput(!isGenerateOrInput)} style={{color: "white"}}>
                        { isGenerateOrInput ? "Already have a protocol?" : "Go to create a new protocol"}
                    </div></>
                }
            </div>
        </div>
    )
}

export default UidGenerator;