import Draggable from 'react-draggable';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BsTrashFill } from 'react-icons/bs';
// import { RiMapPinAddFill } from 'react-icons/ri'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { getStages, updateStage, createStage } from '../../actions/stages';
import { updateProtocol, createProtocol } from '../../actions/protocol';
import { FiMinimize2 } from 'react-icons/fi';
import { AiFillPlusCircle, AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import axios from 'axios';

const stageurl = "https://network-canvas-web.herokuapp.com/stages";
const protocolurl = "https://network-canvas-web.herokuapp.com/protocol";
const uidurl = "https://network-canvas-web.herokuapp.com/uid";


const QuickAdd = ({
    uid,
    nodeRef,
    startPos,
    curDragNode,
    trashCan,
    showTrashCan,
    setShowTrashCan,
    setNodeVal,
    handleDragStart,
    callBackRef,
    isStage,
}) => {

    const [showInput, setShowInput] = useState(false);
    const [inputNodeVal, setInputNodeVal] = useState("");
    const [stageNodes, setStageNodes] = useState([]);
    const [protocolNodes, setProtocolNodes] = useState([]);
    const [isCardOpen, setIsCardOpen] = useState(true);
    const [instructionIdx, setInstructionIdx] = useState(0);
    const instructionText = ["A node is something that researchers can gain a deeper understanding about their participants through it. "
        + "It can be anything that researchers wants to learn about. A node is a fundamental part of the social network.", 
        "Quick add is the easiest and most basic way of creating a node. By clicking the add sign at the bottom side and entering something, "
        + "a node would show up on the screen.", "A node can be dragged and dropped to the trash can in order to be deleted."];
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
                    await axios.get(stageurl)
                                .then(data => {
                                    console.log("data is: ", data);
                                    setStageNodes(data.data.find((d) => d._id === uid).nodes);
                                    setStageEdgeNodes(data.data.find((d) => d._id === uid).edgeNodes);
                                    setStageAwaitNodes(data.data.find((d) => d._id === uid).awaitNodes);
                                    setStageCoordNodes(data.data.find((d) => d._id === uid).coordNodes);
                                });
                    // data = data.data.find((d) => d._id === uid);
                    // console.log("stage data: ", data);
                    // setStageNodes(data.nodes);
                    // setStageEdgeNodes(data.edgeNodes);
                    // setStageAwaitNodes(data.awaitNodes);
                    // setStageCoordNodes(data.coordNodes);
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
                    console.log("data: ", data);
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




    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
            if (isStage === true) {
                setIsStageEdited(true);
            } else {
                setIsProtocolEdited(true);
            }
        }
    }

    console.log("length: ", stageNodes.length);
    console.log("posX: ", 100 + 200*(stageNodes.length%5));

    const handleSubmit = async() => {
        let text = inputNodeVal;
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
        setInputNodeVal("");
    }

    const handleDragStop = (e, data) => {
        let dimension = e.target.getBoundingClientRect();
        if (!(dimension.right < trashCan.left || 
            dimension.left > trashCan.right || 
            dimension.bottom < trashCan.top || 
            dimension.top > trashCan.bottom)) {
                if (isStage) {
                    setStageNodes(stageNodes.filter((item, index) => index !== parseInt(curDragNode)));
                    // dispatch(updateStage(uid, {_id: uid, nodes: stageNodes.filter((item, index) => index !== parseInt(curDragNode))}));
                } else {
                    setProtocolNodes(protocolNodes.filter((item, index) => index !== parseInt(curDragNode)));
                    // dispatch(updateProtocol(uid, {_id: uid, nodes: protocolNodes.filter((item, index) => index !== parseInt(curDragNode))}));
                }
        }
        setShowTrashCan(false);
    }

    // console.log("is stage? ", isStage);
    // console.log("stage nodes are; ", stageNodes);
    // console.log("protocol nodes are: ", protocolNodes);
    
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
                    }) :
                    protocolNodes && protocolNodes.map((item, index) => {
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
                    })
                    }
                </div>
                
    
                <div className="name-generator-input">
                    <div className={`input-wrapper ${showInput === true ? 'on' : 'off'}`}>
                        <input className={`input-box ${showInput === true ? 'on': 'off'}`} value={inputNodeVal} onChange={(e) => setInputNodeVal(e.target.value)} onKeyDown={handleEnter} placeholder="Type a name and press enter..." />
                    </div>
                    <AiFillPlusCircle style={{color: "#00c9a2", cursor: "pointer"}} size={100} onClick={() => setShowInput(!showInput)} />
                </div>
                <div ref={callBackRef} style={{width: "fit-content", marginTop: "15vh", marginLeft: "auto", marginRight: "auto"}}>
                    <BsTrashFill className={`trash-can ${showTrashCan === true ? 'on' : 'off'}`} />
                </div>

                <div className="instruction-card-wrapper">
                    { isCardOpen ? <div className="instruction-card-open">
                        <div className="card-text">{ instructionText[Math.floor(Math.abs(instructionIdx)%3)] }</div>
                        <FiMinimize2 onClick={() => setIsCardOpen(false)} className="card-minimize" />
                        <AiFillCaretLeft  className="card-left-icon" onClick={() => setInstructionIdx(instructionIdx + 1)} />
                        <AiFillCaretRight className="card-right-icon" onClick={() => setInstructionIdx(instructionIdx - 1)} />
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

export default QuickAdd;