import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { Link } from "react-router-dom";
import { updateStage } from "../../actions/stages";
import { updateProtocol } from "../../actions/protocol";
import { FiMinimize2 } from 'react-icons/fi';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import axios from "axios";


const stageurl = "https://network-canvas-web.herokuapp.com/stages";
const protocolurl = "https://network-canvas-web.herokuapp.com/protocol";
const uidurl = "https://network-canvas-web.herokuapp.com/uid";


const PanelAdd = ({
    uid,
    nodeRef,
    isStage,
}) => {
    const [stageAwaitNodes, setStageAwaitNodes] = useState([]);
    const [stageSelectedNodes, setStageSelectedNodes] = useState([]);
    const [protocolAwaitNodes, setProtocolAwaitNodes] = useState([]);
    const [protocolSelectedNodes, setProtocolSelectedNodes] = useState([]);
    const [startPos, setStartPos] = useState({x: null, y: null});
    const [dropArea, setDropArea] = useState([]);
    const [isCardOpen, setIsCardOpen] = useState(true);
    const [instructionIdx, setInstructionIdx] = useState(0);
    const instructionText = ["A node is something that researchers can gain a deeper understanding about their participants through it. "
        + "It can be anything that researchers wants to learn about. A node is a fundamental part of the social network.", 
        "Panel add provides researchers with a way to ask some more narrowed-down questions so that participants can select from pre-existed nodes.", 
        "A node can be dragged and dropped to the trash can in order to be deleted."];
    const [isStageEdited, setIsStageEdited] = useState(false);
    const [isProtocolEdited, setIsProtocolEdited] = useState(false);
    
    useEffect(() => {
        if (isStage === true) {
            const fetchStage = async() => {
                try {
                    let data = await axios.get(stageurl);
                    data = data.data.find((d) => d._id === uid);
                    setStageAwaitNodes(data.awaitNodes);
                    setStageSelectedNodes(data.selectedNodes);
                    console.log(data.awaitNodes);
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
                    await axios.patch(stageurl, {_id: uid, awaitNodes: stageAwaitNodes, selectedNodes: stageSelectedNodes});
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchStage();
        }
       }, [stageAwaitNodes])


       useEffect(() => {
        if (isStage === false) {
            const fetchProtocol = async() => {
                try {
                    let data = await axios.get(protocolurl);
                    data = data.data.find((d) => d._id === uid);
                    setProtocolAwaitNodes(data.awaitNodes);
                    setProtocolSelectedNodes(data.selectedNodes);
                    console.log(data.awaitNodes);
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
                    await axios.patch(protocolurl, {_id: uid, awaitNodes: protocolAwaitNodes, selectedNodes: protocolSelectedNodes});
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchProtocol();
        }
       }, [protocolAwaitNodes])


   


    const handleDragStop = (e, data) => {
        let dimension = e.target.getBoundingClientRect();
        if (!(dimension.right < dropArea.left || 
            dimension.left > dropArea.right || 
            dimension.bottom < dropArea.top || 
            dimension.top > dropArea.bottom)) {
                // setAwaitNodes(awaitNodes.filter((item, index) => index !== parseInt(e.target.dataset.nodeid)));
                if (isStage) {
                    setStageAwaitNodes(stageAwaitNodes.filter((item, index) => index !== parseInt(e.target.dataset.nodeid)))
                    setStageSelectedNodes([...stageSelectedNodes, {text: e.target.dataset.nodetext}])
                    setIsStageEdited(true);
                    // dispatch(updateStage(uid, {_id: uid, tmpkey: stages.tmpkey, 
                    //     awaitNodes: stages.awaitNodes.filter((item, index) => index !== parseInt(e.target.dataset.nodeid))}));
                    // dispatch(updateStage(uid, {_id: uid, tmpkey: stages.tmpkey, selectedNodes: [...stages.selectedNodes, {text: e.target.dataset.nodetext}]}));
                } else {
                    setProtocolAwaitNodes(protocolAwaitNodes.filter((item, index) => index !== parseInt(e.target.dataset.nodeid)))
                    setProtocolSelectedNodes([...protocolSelectedNodes, {text: e.target.dataset.nodetext}])
                    setIsProtocolEdited(true);
                    // dispatch(updateProtocol(uid, {_id: uid, 
                    //     awaitNodes: protocol.awaitNodes.filter((item, index) => index !== parseInt(e.target.dataset.nodeid))}));
                    // dispatch(updateProtocol(uid, {_id: uid, selectedNodes: [...protocol.selectedNodes, {text: e.target.dataset.nodetext}]}));
                }
                // setSelectedNode(selectedNode => [...selectedNode, {text: e.target.dataset.nodetext}]);
        }
    }

    const handleDragStart = (e, data) => {
        setStartPos(startPos => ({...startPos, x: data.x, y: data.y}));
    }

    const callBackRef = useCallback(domNode => {
        if (domNode) {
          setDropArea(domNode.getBoundingClientRect());
        }
    }, []);

    return (
        <div className="stage-detail-canvas" style={{height: "100vh", display: "flex", backgroundColor: "#2d2955"}}>
            <div style={{color: "white", position: "absolute", marginLeft: "16%", fontSize: "26px", marginTop: "20px"}}>
                { isStage ? "A stage prompt here. Example can be viewed in the interview protocol." : "Among the places you mentioned, which of them do you visit more frequently? Drag and drop them to the right side." }
            </div>
            <div style={{width: "30vw", height: "85vh", backgroundColor: "#3a3a75", marginLeft: "0px", marginTop: "auto", marginBottom: "0px", borderRadius: "10px"}}>
            { isStage ? stageAwaitNodes.length > 0 && stageAwaitNodes.map((item, index) => {
                        return (
                            <Draggable
                                onStart={handleDragStart}
                                onStop={handleDragStop}
                                position={startPos}
                            >
                            <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={index} data-nodetext={item.text}>
                                {item.text}
                            </Button>
                            </Draggable>
                        )
                    }) : protocolAwaitNodes.length > 0 && protocolAwaitNodes.map((item, index) => {
                        return (
                            <Draggable
                                onStart={handleDragStart}
                                onStop={handleDragStop}
                                position={startPos}
                            >
                            <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={index} data-nodetext={item.text}>
                                {item.text}
                            </Button>
                            </Draggable>
                        )
                    })}
            </div>
            <div ref={callBackRef} style={{width: "30vw", height: "85vh", backgroundColor: "white", marginLeft: "auto", marginRight: "0px", marginTop: "auto", marginBottom: "0px", borderRadius: "10px"}}>
            { isStage ? stageSelectedNodes.length > 0 && stageSelectedNodes.map((item, index) => {
                        return (
                            <Draggable
                                onStop={handleDragStop}
                            >
                            <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={index}>
                                {item.text}
                            </Button>
                            </Draggable>
                        )
                    }) : protocolSelectedNodes.length > 0 && protocolSelectedNodes.map((item, index) => {
                        return (
                            <Draggable
                                onStop={handleDragStop}
                            >
                            <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={index}>
                                {item.text}
                            </Button>
                            </Draggable>
                        )
                    })}
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

export default PanelAdd;