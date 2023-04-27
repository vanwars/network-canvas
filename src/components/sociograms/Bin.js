import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { FiMinimize2 } from 'react-icons/fi';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStages, updateStage, createStage } from '../../actions/stages';
import { updateProtocol, createProtocol } from '../../actions/protocol';
import axios from "axios";

const Bin = ({
    uid,
    isStage,
}) => {
    const [startPos, setStartPos] = useState({x: null, y: null});
    const [stageNodes, setStageNodes] = useState([]);
    const [protocolNodes, setProtocolNodes] = useState([]);
    const [isCardOpen, setIsCardOpen] = useState(true);
    

    const [dropArea1, setDropArea1] = useState()
    const [dropArea2, setDropArea2] = useState()
    const [dropArea3, setDropArea3] = useState()
    const [dropArea4, setDropArea4] = useState()
    const [dropArea5, setDropArea5] = useState()
    const [instructionIdx, setInstructionIdx] = useState(0);
    const instructionText = ["Researchers can use one or more ways to build relationship among nodes in order to construct social network for their participants. "
        + "Categorization using bins can be one of them.", "Nodes can be dragged and dropped to a specific bin area in order to be categorized."];
    const [isStageEdited, setIsStageEdited] = useState(false);
    const [isProtocolEdited, setIsProtocolEdited] = useState(false);

    useEffect(() => {
        if (isStage === true) {
            const fetchStage = async() => {
                try {
                    let data = await axios.get("/stages");
                    data = data.data.find((d) => d._id === uid);
                    setStageNodes(data.nodes);
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
                    await axios.patch("/stages", {_id: uid, nodes: stageNodes});
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
                    let data = await axios.get("/protocol");
                    data = data.data.find((d) => d._id === uid);
                    setProtocolNodes(data.nodes);
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
                    await axios.patch("/protocol", {_id: uid, nodes: protocolNodes});
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchProtocol();
        }
       }, [protocolNodes])
    
    console.log("nodes at bin.js: ", stageNodes);

    const handleDragStop = (e, data) => {
        let dimension = e.target.getBoundingClientRect();
        if (!(dimension.right < dropArea1.left || 
            dimension.left > dropArea1.right || 
            dimension.bottom < dropArea1.top || 
            dimension.top > dropArea1.bottom)) {
                if (isStage) {
                    const newNodes = stageNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 0 } : item
                    );
                    setStageNodes(newNodes);
                    setIsStageEdited(true);
                    // dispatch(updateStage(uid, {_id: uid, nodes: newNodes}));
                } else {
                    const newNodes = protocolNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 0 } : item
                    );
                    setProtocolNodes(newNodes);
                    setIsProtocolEdited(true);
                    // dispatch(updateProtocol(uid, {_id: uid, nodes: newNodes}));
                }
        }
        else if (!(dimension.right < dropArea2.left || 
            dimension.left > dropArea2.right || 
            dimension.bottom < dropArea2.top || 
            dimension.top > dropArea2.bottom)) {
                if (isStage) {
                    const newNodes = stageNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 1 } : item
                    );
                    setStageNodes(newNodes);
                    setIsStageEdited(true);
                    // dispatch(updateStage(uid, {_id: uid, nodes: newNodes}));
                } else {
                    const newNodes = protocolNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 1 } : item
                    );
                    setProtocolNodes(newNodes);
                    setIsProtocolEdited(true);
                    // dispatch(updateProtocol(uid, {_id: uid, nodes: newNodes}));
                }
        }
        else if (!(dimension.right < dropArea3.left || 
            dimension.left > dropArea3.right || 
            dimension.bottom < dropArea3.top || 
            dimension.top > dropArea3.bottom)) {
                if (isStage) {
                    const newNodes = stageNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 2 } : item
                    );
                    setStageNodes(newNodes);
                    setIsStageEdited(true);
                    // dispatch(updateStage(uid, {_id: uid, nodes: newNodes}));
                } else {
                    const newNodes = protocolNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 2 } : item
                    );
                    setProtocolNodes(newNodes);
                    setIsProtocolEdited(true);
                    // dispatch(updateProtocol(uid, {_id: uid, nodes: newNodes}));
                }
        }
        else if (!(dimension.right < dropArea4.left || 
            dimension.left > dropArea4.right || 
            dimension.bottom < dropArea4.top || 
            dimension.top > dropArea4.bottom)) {
                if (isStage) {
                    const newNodes = stageNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 3 } : item
                    );
                    setStageNodes(newNodes);
                    setIsStageEdited(true);
                    // dispatch(updateStage(uid, {_id: uid, nodes: newNodes}));
                } else {
                    const newNodes = protocolNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 3 } : item
                    );
                    setProtocolNodes(newNodes);
                    setIsProtocolEdited(true);
                    // dispatch(updateProtocol(uid, {_id: uid, nodes: newNodes}));
                }
        }
        else if (!(dimension.right < dropArea5.left || 
            dimension.left > dropArea5.right || 
            dimension.bottom < dropArea5.top || 
            dimension.top > dropArea5.bottom)) {
                if (isStage) {
                    const newNodes = stageNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 4 } : item
                    );
                    setStageNodes(newNodes);
                    setIsStageEdited(true);
                    // dispatch(updateStage(uid, {_id: uid, nodes: newNodes}));
                } else {
                    const newNodes = protocolNodes.map(item =>
                        item.idx === parseInt(e.target.dataset.nodeid) ? { ...item, bin: 4 } : item
                    );
                    setProtocolNodes(newNodes);
                    setIsProtocolEdited(true);
                    // dispatch(updateProtocol(uid, {_id: uid, nodes: newNodes}));
                }
        }
    }

    console.log(stageNodes);

    const handleDragStart = (e, data) => {
        setStartPos(startPos => ({...startPos, x: data.x, y: data.y}));
    }

    const nodeRef = useRef(null);
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();
    const ref5 = useRef();

    useEffect(() => {
        setDropArea1(ref1.current.getBoundingClientRect());
        setDropArea2(ref2.current.getBoundingClientRect());
        setDropArea3(ref3.current.getBoundingClientRect());
        setDropArea4(ref4.current.getBoundingClientRect());
        setDropArea5(ref5.current.getBoundingClientRect());
    }, [])

    return (
        <div className="stage-detail-canvas"  style={{height: "100vh", display: "flex", backgroundColor: "#2d2955"}}>
            {/* <div style={{color: "#ffffff"}}>2345</div> */}
            <div style={{color: "white", position: "absolute", marginLeft: "16%", fontSize: "26px", marginTop: "20px"}}>
                { isStage ? "A stage prompt here. Example can be viewed in the interview protocol" : "When was the last time you visited the place mentioned before?" }
            </div>
            <div className="bin" style={{marginLeft: "5%", backgroundColor: "#3a3a75"}} ref={ref1}>
                <div style={{width: "100%", height: "10%", background: "#00c9a2", color: "white", textAlign: "center"}}>Last 24 hours</div>
                    { isStage ? stageNodes && stageNodes.map((item, index) => {
                        if (item.bin === 0) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    }) : protocolNodes && protocolNodes.map((item, index) => {
                        if (item.bin === 0) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    })}
            </div>
            <div className="bin" ref={ref2} style={{backgroundColor: "#3a3a7580"}}>
                <div style={{width: "100%", height: "10%", background: "#00c9a280", color: "white", textAlign: "center"}}> Last week</div>
                { isStage ? stageNodes && stageNodes.map((item, index) => {
                        if (item.bin === 1) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    }) : protocolNodes && protocolNodes.map((item, index) => {
                        if (item.bin === 1) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    })}
            </div>
            <div className="bin" ref={ref3} style={{backgroundColor: "#3a3a7560"}}>
                <div style={{width: "100%", height: "10%", background: "#00c9a260", color: "white", textAlign: "center"}}>Last six months</div>
                { isStage ? stageNodes && stageNodes.map((item, index) => {
                        if (item.bin === 2) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    }) : protocolNodes && protocolNodes.map((item, index) => {
                        if (item.bin === 2) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    })}
            </div>
            <div className="bin" ref={ref4} style={{backgroundColor: "#3a3a7540"}}>
                <div style={{width: "100%", height: "10%", background: "#00c9a240", color: "white", textAlign: "center"}}>Last two years</div>
                { isStage ? stageNodes && stageNodes.map((item, index) => {
                        if (item.bin === 3) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    }) : protocolNodes && protocolNodes.map((item, index) => {
                        if (item.bin === 3) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    })}
            </div>
            <div className="bin" ref={ref5} style={{backgroundColor: "#3a3a7520"}}>
            <div style={{width: "100%", height: "10%", background: "#00c9a220", color: "white", textAlign: "center"}}>Over two years ago</div>
            { isStage ? stageNodes && stageNodes.map((item, index) => {
                        if (item.bin === 4) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    }) : protocolNodes && protocolNodes.map((item, index) => {
                        if (item.bin === 4) {
                            return (
                                <Draggable
                                    onStart={handleDragStart}
                                    onStop={handleDragStop}
                                    position={startPos}
                                >
                                <Button ref={nodeRef} style={{width: "100px", height: "100px", backgroundColor: "#e22e58", borderColor: "#e22e58"}} className="rounded-circle" data-nodeid={item.idx} data-bin={item.bin}>
                                    {item.text}
                                </Button>
                                </Draggable>
                            )
                        }
                    })}
            </div>

            <div className="instruction-card-wrapper">
                { isCardOpen ? <div className="instruction-card-open">
                    <div className="card-text">{ instructionText[Math.floor(Math.abs(instructionIdx)%2)] }</div>
                    <FiMinimize2 onClick={() => setIsCardOpen(false)} className="card-minimize" />
                    <AiFillCaretLeft  className="card-left-icon" onClick={() => setInstructionIdx(instructionIdx + 1)} />
                    <AiFillCaretRight className="card-right-icon" onClick={() => setInstructionIdx(instructionIdx - 1)} />
                </div> : 
                <div onClick={() => setIsCardOpen(true)} className="instruction-card-closed">Tap to show more instructions.</div>}
                { isStage === true && <Link to="/sociogram">
                    <div className="navigate-to-prompt">
                        <Button style={{width: "400px"}}>Choose Another Sociogram</Button>
                    </div>
                </Link> }
            </div>
        </div>
    )
}

export default Bin;