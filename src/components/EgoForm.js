import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { FiMinimize2 } from "react-icons/fi";
import { Form } from "react-bootstrap";
import { useState } from "react";

const EgoForm = ({
    isStage,
}) => {
    const [isCardOpen, setIsCardOpen] = useState(true);
    const [instructionIdx, setInstructionIdx] = useState(0);
    const instructionText = ["A node is something that researchers can gain a deeper understanding about their participants through it. "
    + "It can be anything that researchers wants to learn about. A node is a fundamental part of the social network.", 
    "Quick add is the easiest and most basic way of creating a node. By clicking the add sign at the bottom side and entering something, "
    + "a node would show up on the screen.", "A node can be dragged and dropped to the trash can in order to be deleted."];
    const [stageFirstName, setStageFirstName] = useState("");
    const [stageLastName, setStageLastName] = useState("");
    const [stageJob, setStageJob] = useState("");
    const [protocolFirstName, setProtocolFirstName] = useState("");
    const [protocolLastName, setProtocolLastName] = useState("");
    const [protocolJob, setProtocolJob] = useState("");

    const updateFirstName = (e) => {
        if (isStage === true) {
            setStageFirstName(e.target.value);
        } else {
            setProtocolFirstName(e.target.value);
        }
    }
    const updateLastName = (e) => {
        if (isStage === true) {
            setStageLastName(e.target.value);
        } else {
            setProtocolLastName(e.target.value);
        }
    }
    const updateJob = (e) => {
        if (isStage === true) {
            setStageJob(e.target.value);
        } else {
            setProtocolJob(e.target.value);
        }
    }

    return (
        <div className="stage-detail-canvas" style={{backgroundColor: "#2d2955"}}>
            <div className="instruction-card-wrapper">
                    { isCardOpen ? <div className="instruction-card-open">
                        <div className="card-text">{ instructionText[Math.floor(Math.abs(instructionIdx)%3)] }</div>
                        <FiMinimize2 onClick={() => setIsCardOpen(false)} className="card-minimize" />
                        <AiFillCaretLeft  className="card-left-icon" onClick={() => setInstructionIdx(instructionIdx + 1)} />
                        <AiFillCaretRight className="card-right-icon" onClick={() => setInstructionIdx(instructionIdx - 1)} />
                    </div> : 
                    <div onClick={() => setIsCardOpen(true)} className="instruction-card-closed">Tap to show more instructions.</div>}
                </div>
            <div className="ego-form">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>What is your first name?</Form.Label>
                        <div>
                            <input onChange={(e) => updateFirstName(e)} value={ isStage ? stageFirstName : protocolFirstName} className="ego-form-input" placeholder="Enter some text..." />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>What is your last name?</Form.Label>
                        <div>
                            <input onChange={(e) => updateLastName(e)} value={ isStage ? stageLastName : protocolLastName } className="ego-form-input" placeholder="Enter some text..." />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>What is your occupation?</Form.Label>
                        <div>
                            <input onChange={(e) => updateJob(e)} value={ isStage ? stageJob : protocolJob } className="ego-form-input" placeholder="Enter some text..." />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Which of the following languages do you speak fluently?</Form.Label>
                        <div className="language-box">
                            <div className="language">English</div>
                            <div className="language">Mandarin Chinese</div>
                            <div className="language">Hindi</div>
                            <div className="language">Spanish</div>
                            <div className="language">French</div>
                            <div className="language">Arabic</div>
                            <div className="language">Bengali</div>
                            <div className="language">Russian</div>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default EgoForm;