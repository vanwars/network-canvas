import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonToolbar, ButtonGroup, Modal, Form} from 'react-bootstrap';
import Draggable from 'react-draggable';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FiMinimize2 } from 'react-icons/fi';
import { AiFillPlusCircle, AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { createStage, updateStage } from '../../actions/stages';
import { createProtocol, updateProtocol } from '../../actions/protocol';
import axios from 'axios';

const stageurl = "https://network-canvas-web.herokuapp.com/stages";
const protocolurl = "https://network-canvas-web.herokuapp.com/protocol";
const uidurl = "https://network-canvas-web.herokuapp.com/uid";

const FormAdd = ({
    uid,
    nodeRef,
    nodeVal,
    startPos,
    curDragNode,
    trashCan,
    showTrashCan,
    setShowTrashCan,
    setNodeVal,
    handleChange,
    handleDragStart,
    callBackRef,
    isStage,
}) => {
    const [show, setShow] = useState(false);
    const [stageNodes, setStageNodes] = useState([]);
    const [protocolNodes, setProtocolNodes] = useState([]);
    const [isCardOpen, setIsCardOpen] = useState(true);
    const [instructionIdx, setInstructionIdx] = useState(0);
    const instructionText = ["A node is something that researchers can gain a deeper understanding about their participants through it. "
        + "It can be anything that researchers wants to learn about. A node is a fundamental part of the social network.", 
        "Form add provides researchers with an opportunity to get some additional information about the node for futher analysis.", 
        "A node can be dragged and dropped to the trash can in order to be deleted."];
    const [stageEdgeNodes, setStageEdgeNodes] = useState([]);
    const [stageAwaitNodes, setStageAwaitNodes] = useState([]);
    const [stageCoordNodes, setStageCoordNodes] = useState([]);

    const [protocolEdgeNodes, setProtocolEdgeNodes] = useState([]);
    const [protocolAwaitNodes, setProtocolAwaitNodes] = useState([]);
    const [protocolCoordNodes, setProtocolCoordNodes] = useState([]);

    const [isStageEdited, setIsStageEdited] = useState(false);
    const [isProtocolEdited, setIsProtocolEdited] = useState(false);
   

    const dispatch = useDispatch();
    useEffect(() => {
        if (isStage === true) {
            const fetchStage = async() => {
                try {
                    let data = await axios.get(stageurl);
                    data = data.data.find((d) => d._id === uid);
                    setStageNodes(data.nodes);
                    setStageEdgeNodes(data.edgeNodes);
                    setStageAwaitNodes(data.awaitNodes);
                    setStageCoordNodes(data.coordNodes);
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchStage();
        }
       }, [])

       useEffect(() => {
        if (isStage === true && isStageEdited === true) {
            const fetchStage = async() => {
                try {
                    await axios.patch(stageurl, {_id: uid, nodes: stageNodes, edgeNodes: stageEdgeNodes, awaitNodes: stageAwaitNodes, coordNodes: stageCoordNodes});
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchStage();
        }
       }, [stageNodes])

    

       useEffect(() => {
        if (isStage === false) {
            const fetchProtocol = async() => {
                try {
                    let data = await axios.get(protocolurl);
                    data = data.data.find((d) => d._id === uid);
                    setProtocolNodes(data.nodes);
                    setProtocolEdgeNodes(data.edgeNodes);
                    setProtocolAwaitNodes(data.awaitNodes);
                    setProtocolCoordNodes(data.coordNodes);
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchProtocol();
        }
       }, [])

       useEffect(() => {
        if (isStage === false && isProtocolEdited === true) {
            const fetchProtocol = async() => {
                try {
                    await axios.patch(protocolurl, {_id: uid, nodes: protocolNodes, edgeNodes: protocolEdgeNodes, awaitNodes: protocolAwaitNodes, coordNodes: protocolCoordNodes});
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchProtocol();
        }
       }, [protocolNodes])


    const handleSubmit = async() => {
        let text = nodeVal;
        if (isStage) {
          console.log("heys");
          if (stageNodes.length === 0) {
              setStageNodes(stageNodes => [...stageNodes, {text: text, bin: 0, idx: 0}]);
              setStageEdgeNodes([...stageEdgeNodes, {idx: 0, text: text, transform: 0, isDown: false, posX: 100, posXText: 100+"px", 
              posY: 100, posYText: "100px", screenX: 0, screenY: 0}]);
              setStageAwaitNodes([...stageAwaitNodes, {text}]);
              setStageCoordNodes([...stageCoordNodes, {text: text, transform: 0, isDown: false, posX: 0, 
                posXText: "0px", posY: 0, posYText: "0px", screenX: 0, screenY: 0}]);
              dispatch(createStage({_id: uid, nodes: [...stageNodes, {text: text, bin: 0, idx: 0}], awaitNodes: [...stageAwaitNodes, {text}], selectedNodes: [], 
              edgeNodes: [...stageEdgeNodes, {idx: 0, text: text, transform: 0, isDown: false, posX: 100, posXText: 100+"px", 
              posY: 100, posYText: "100px", screenX: 0, screenY: 0}], coordNodes: [...stageCoordNodes, {text: text, transform: 0, isDown: false, posX: 0, 
              posXText: "0px", posY: 0, posYText: "0px", screenX: 0, screenY: 0}]}));
          } else {
              setStageNodes(stageNodes => [...stageNodes, {text: text, bin: parseInt(stageNodes.length/4), idx: stageNodes.length}]);
              setStageEdgeNodes([...stageEdgeNodes, {idx: stageNodes.length, text: text, transform: 0, isDown: false, posX: 100+200*(stageNodes.length%5), posXText: 100+200*(stageNodes.length%5)+"px", 
              posY: 100+Math.floor(stageNodes.length/5)*150, posYText: 100+Math.floor(stageNodes.length/5)*150 + "px", screenX: 0, screenY: 0}]);
              setStageAwaitNodes([...stageAwaitNodes, {text}]);
              setStageCoordNodes([...stageCoordNodes, {text: text, transform: 0, isDown: false, posX: 0, 
                posXText: "0px", posY: 0, posYText: "0px", screenX: 0, screenY: 0}])
          }
      } else {
        console.log("this is protocol.");
        if (protocolNodes.length === 0) {
            console.log("create a new protocol.");
            setProtocolNodes(protocolNodes => [...protocolNodes, {text: text, bin: 0, idx: 0}]);
            setProtocolEdgeNodes([...protocolEdgeNodes, {idx: 0, text: text, transform: 0, isDown: false, posX: 100, posXText: 100+"px", 
            posY: 100, posYText: "100px", screenX: 0, screenY: 0}]);
            setProtocolAwaitNodes([...protocolAwaitNodes, {text}]);
            setProtocolCoordNodes([...protocolCoordNodes, {text: text, transform: 0, isDown: false, posX: 0, 
              posXText: "0px", posY: 0, posYText: "0px", screenX: 0, screenY: 0}]);
              dispatch(createProtocol({_id: uid, nodes: [...protocolNodes, {text: text, bin: 0, idx: 0}], awaitNodes: [...protocolAwaitNodes, {text}], selectedNodes: [], 
                  edgeNodes: [...protocolEdgeNodes, {idx: 0, text: text, transform: 0, isDown: false, posX: 100, posXText: 100+"px", 
                  posY: 100, posYText: "100px", screenX: 0, screenY: 0}], coordNodes: [...protocolCoordNodes, {text: text, transform: 0, isDown: false, posX: 0, 
                  posXText: "0px", posY: 0, posYText: "0px", screenX: 0, screenY: 0}]}));
        } else {
            console.log("update a protocol.");
            setProtocolNodes(protocolNodes => [...protocolNodes, {text: text, bin: parseInt(protocolNodes.length/4), idx: protocolNodes.length}]);
            setProtocolEdgeNodes([...protocolEdgeNodes, {idx: protocolNodes.length, text: text, transform: 0, isDown: false, posX: 100+200*(protocolNodes.length%5), posXText: 100+200*(protocolNodes.length%5)+"px", 
            posY: 100+Math.floor(protocolNodes.length/5)*150, posYText: 100+Math.floor(protocolNodes.length/5)*150 + "px", screenX: 0, screenY: 0}]);
            setProtocolAwaitNodes([...protocolAwaitNodes, {text}]);
            setProtocolCoordNodes([...protocolCoordNodes, {text: text, transform: 0, isDown: false, posX: 0, 
              posXText: "0px", posY: 0, posYText: "0px", screenX: 0, screenY: 0}])
        }
    }
        setNodeVal("");
    }

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    handleSubmit();

    if (isStage === true) {
        setIsStageEdited(true);
    } else {
        setIsProtocolEdited(true);
    }
  }

  const handleDragStop = (e, data) => {
    let dimension = e.target.getBoundingClientRect();
    if (!(dimension.right < trashCan.left || 
        dimension.left > trashCan.right || 
        dimension.bottom < trashCan.top || 
        dimension.top > trashCan.bottom)) {
            if (isStage) {
                setStageNodes(stageNodes.filter((item, index) => index !== parseInt(curDragNode)));
                setIsStageEdited(true);
                // dispatch(updateStage(uid, {_id: uid, nodes: stageNodes.filter((item, index) => index !== parseInt(curDragNode))}));
            } else {
                setProtocolNodes(protocolNodes.filter((item, index) => index !== parseInt(curDragNode)));
                setIsProtocolEdited = true;
                // dispatch(updateProtocol(uid, {_id: uid, nodes: protocolNodes.filter((item, index) => index !== parseInt(curDragNode))}));
            }
    }
    setShowTrashCan(false);
  }
    return (
        <div className="stage-detail-canvas" style={{backgroundColor: "#2d2955"}}>
            <div style={{color: "white", position: "absolute", marginLeft: "16%", fontSize: "26px", marginTop: "20px"}}>
            { isStage ? "A stage prompt here. Example can be viewed in the interview protocol." : "Please name some places you once visited before." }
            </div>
            <div style={{height: "60vh", display: "flex", justifyContent: "center", marginTop: "100px"}}>
                    { isStage ? stageNodes && stageNodes.map((item, index) => {
                        return (
                            <Draggable
                                onStart={handleDragStart}
                                onStop={handleDragStop}
                                position={startPos}
                            >
                            <Button ref={nodeRef} style={{width: "100px", height: "100px", position: "relative", zIndex: "5", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={index}>
                                {item.text}
                            </Button>
                            </Draggable>
                        )
                    }) : protocolNodes && protocolNodes.map((item, index) => {
                        return (
                            <Draggable
                                onStart={handleDragStart}
                                onStop={handleDragStop}
                                position={startPos}
                            >
                            <Button ref={nodeRef} style={{width: "100px", height: "100px", position: "relative", zIndex: "5", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={index}>
                                {item.text}
                            </Button>
                            </Draggable>
                        )
                    })}
            </div>

            <div className="name-generator-input">
                <div onClick={handleShow}>
                    <AiFillPlusCircle style={{color: "#00c9a2", cursor: "pointer"}} size={100} />
                </div>
            </div>
              {/* <div className="name-generator-input">
                    <div className={`input-wrapper`}>
                        <input className={`input-box`} placeholder="Type a name and press enter..." />
                    </div>
                    <AiFillPlusCircle style={{color: "#00c9a2", cursor: "pointer"}} size={100}  />
                </div> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a Place you visited this week</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>What is the name of the place you visited?</Form.Label>
                            <Form.Control
                                placeholder="Enter some text..."
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>In your own words, what were the purposes of your visit?</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter some text... The answer you entered here will only be used for research analysis." />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <div ref={callBackRef} style={{width: "fit-content", marginTop: "15vh", marginLeft: "auto", marginRight: "auto"}}>
                <BsTrashFill className={`trash-can ${showTrashCan === true ? 'on' : 'off'}`} />
            </div>

            <div className="instruction-card-wrapper">
                { isCardOpen ? <div className="instruction-card-open">
                    <div className="card-text">{ instructionText[Math.floor(Math.abs(instructionIdx)%3)] }</div>
                    <FiMinimize2 onClick={() => setIsCardOpen(false)} className="card-minimize" />
                    <AiFillCaretLeft  className="card-left-icon" onClick={() => setInstructionIdx(instructionIdx + 1)}  />
                    <AiFillCaretRight className="card-right-icon" onClick={() => setInstructionIdx(instructionIdx - 1)}  />
                </div> : 
                <div onClick={() => setIsCardOpen(true)} className="instruction-card-closed">Tap to show more instructions.</div>}
                { isStage === true && <Link to="/name-generator">
                    <div className="navigate-to-prompt">
                        <Button style={{width: "400px"}}>Choose Another Name Generator</Button>
                    </div>
                </Link> }
            </div>
        </div>
    )
}

export default FormAdd;