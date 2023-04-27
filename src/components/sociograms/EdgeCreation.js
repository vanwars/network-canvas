
import {React, useEffect, useRef, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMinimize2 } from 'react-icons/fi';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getStages, updateStage, createStage } from '../../actions/stages';
import { updateProtocol, createProtocol } from '../../actions/protocol';
import axios from 'axios';


const EdgeCreation = ({
   uid,
   sidePanelSwitch,
   isStage,
}) => {
   const [isCardOpen, setIsCardOpen] = useState(true);


   const [stageEdgeNodes, setStageEdgeNodes] = useState([]);
   const [protocolEdgeNodes, setProtocolEdgeNodes] = useState([]);
   const [isStageEdited, setIsStageEdited] = useState(false);
   const [isProtocolEdited, setIsProtocolEdited] = useState(false);


   const [stageStartNodeTmp, setStageStartNodeTmp] = useState(null);
   const [stageStartNode, setStageStartNode] = useState(null);
   const [stageEndNodeTmp, setStageEndNodeTmp] = useState(null);
   const [stageEndNode, setStageEndNode] = useState(null); //mainly used for deleting edges
   const [ifStageSingleClick, setIfStageSingleClick] = useState(true);
   const [protocolStartNodeTmp, setProtocolStartNodeTmp] = useState(null);
   const [protocolStartNode, setProtocolStartNode] = useState(null);
   const [protocolEndNodeTmp, setProtocolEndNodeTmp] = useState(null);
   const [protocolEndNode, setProtocolEndNode] = useState(null); //mainly used for deleting edges
   const [ifProtocolSingleClick, setIfProtocolSingleClick] = useState(true);
   const [stageEdges, setStageEdges] = useState([]);
   const [protocolEdges, setProtocolEdges] = useState([]);
   const [instructionIdx, setInstructionIdx] = useState(0);
   const instructionText = ["Researchers can use one or more ways to build relationship among nodes in order to construct social network for their participants. "
       + "Categorization using edge creation can be one of them.", "By clicking any of the two nodes, a line(edge) would show up to connect the two nodes. By clicking them again, the edge would be deleted."];
    



   const dispatch = useDispatch();
   useEffect(() => {
    console.log("stage edge changes.");
   }, [stageEdges]);
  
   useEffect(() => {
    if (isStage === true) {
        const fetchStage = async() => {
            try {
                let data = await axios.get("/stages");
                data = data.data.find((d) => d._id === uid);
                setStageEdgeNodes(data.edgeNodes);
                setStageEdges(data.edges);
                console.log("data here: ", data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchStage();
        // console.log("data");
    }
   }, [])
   useEffect(() => {
    const fetchStage = async() => {
        try {
            await axios.patch("/stages", {_id: uid, edges: stageEdges});
        }
        catch(error){
            console.log(error);
        }
    }
    if (isStageEdited) {
        console.log("patch stage edges");
        fetchStage();
    }
   }, [stageEdges.length, ifStageSingleClick]);


   useEffect(() => {
    if (isStage === false) {
        const fetchProtocol = async() => {
            try {
                let data = await axios.get("/protocol");
                data = data.data.find((d) => d._id === uid);
                setProtocolEdgeNodes(data.edgeNodes);
                setProtocolEdges(data.edges);
                console.log("data here: ", data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchProtocol();
        // console.log("data");
    }
   }, [isStage])
   useEffect(() => {
    const fetchProtocol = async() => {
        try {
            await axios.patch("/protocol", {_id: uid, edges: protocolEdges});
        }
        catch(error){
            console.log(error);
        }
    }
    if (isProtocolEdited) {
        fetchProtocol();
    }
   }, [protocolEdges.length, ifProtocolSingleClick])



   
  
    const handleMouseDown = (e) => {
        if (isStage) {
            let index = parseInt(e.target.dataset.idx);
            let newAttrList = [...stageEdgeNodes];
            newAttrList[index].isDown = true;
            newAttrList[index].screenX = e.screenX;
            newAttrList[index].screenY = e.screenY;
            setStageEdgeNodes(newAttrList);
     
     
            if (stageStartNode === null) {
                setStageStartNodeTmp(index);
            } else {
                setStageEndNodeTmp(index);
            }
        } else {
            let index = parseInt(e.target.dataset.idx);
            let newAttrList = [...protocolEdgeNodes];
            newAttrList[index].isDown = true;
            newAttrList[index].screenX = e.screenX;
            newAttrList[index].screenY = e.screenY;
            setProtocolEdgeNodes(newAttrList);


            if (protocolStartNode === null) {
                setProtocolStartNodeTmp(index);
            } else {
                setProtocolEndNodeTmp(index);
            }
        }
       
   }
  
    const handleMouseMove = (e) => {
        if (isStage) {
            console.log("mouse moving.");
            let index = parseInt(e.target.dataset.idx);
            let newAttrList = [...stageEdgeNodes];

            if (newAttrList[index].isDown) {
                if (stageStartNode === null && index === stageStartNodeTmp || stageStartNode !== null && index === stageEndNodeTmp) {
                    setIfStageSingleClick(false);
                }
                const shiftX = e.screenX - newAttrList[index].screenX;
                const shiftY = e.screenY - newAttrList[index].screenY;
                newAttrList[index].posX = newAttrList[index].posX + shiftX;
                newAttrList[index].posY = newAttrList[index].posY + shiftY;
                newAttrList[index].posXText = newAttrList[index].posX + "px";
                newAttrList[index].posYText = newAttrList[index].posY + "px";
                newAttrList[index].screenX = e.screenX;
                newAttrList[index].screenY = e.screenY;
                setStageEdgeNodes(newAttrList);
                // dispatch(updateStage(uid, {_id: uid, edgeNodes: newAttrList}));


                let newEdges = [...stageEdges];
                for (let i = 0; i < newEdges.length; i++) {
                    if (newEdges[i].start === index) {
                        newEdges[i].marginLeft = newAttrList[index].posX + 50 + "px";
                        newEdges[i].marginTop = newAttrList[index].posY + 50 + "px";


                        let rad = Math.atan(Math.abs(newAttrList[index].posY-newAttrList[newEdges[i].end].posY) / Math.abs(newAttrList[index].posX-newAttrList[newEdges[i].end].posX));
                        let width = Math.abs(newAttrList[index].posX-newAttrList[newEdges[i].end].posX) / Math.cos(rad);
                        let transform;
                        if (newAttrList[index].posY <= newAttrList[newEdges[i].end].posY && newAttrList[index].posX >= newAttrList[newEdges[i].end].posX) {
                            transform = "rotate(-" + parseFloat(Math.PI + rad) + "rad)"
                        } else if (newAttrList[index].posY >= newAttrList[newEdges[i].end].posY && newAttrList[index].posX >= newAttrList[newEdges[i].end].posX) {
                            transform = "rotate(-" + parseFloat(Math.PI - rad) + "rad)"
                        } else if (newAttrList[index].posY <= newAttrList[newEdges[i].end].posY && newAttrList[index].posX <= newAttrList[newEdges[i].end].posX) {
                            transform = "rotate(" + rad + "rad)"
                        } if (newAttrList[index].posY >= newAttrList[newEdges[i].end].posY && newAttrList[index].posX <= newAttrList[newEdges[i].end].posX) {
                            transform = "rotate(-" + rad + "rad)"
                        }
                        newEdges[i].width = width;
                        newEdges[i].transform = transform;
                        setStageEdges(newEdges);
                    } else if (newEdges[i].end === index) {
                        let rad = Math.atan(Math.abs(newAttrList[index].posY-newAttrList[newEdges[i].start].posY) / Math.abs(newAttrList[index].posX-newAttrList[newEdges[i].start].posX));
                        let width = Math.abs(newAttrList[index].posX-newAttrList[newEdges[i].start].posX) / Math.cos(rad);
                        let transform;
                        if (newAttrList[index].posY < newAttrList[newEdges[i].start].posY && newAttrList[index].posX > newAttrList[newEdges[i].start].posX) {
                            transform = "rotate(-" + rad + "rad)"
                        } else if (newAttrList[index].posY > newAttrList[newEdges[i].start].posY && newAttrList[index].posX > newAttrList[newEdges[i].start].posX) {
                            transform = "rotate(" + rad + "rad)"
                        } else if (newAttrList[index].posY < newAttrList[newEdges[i].start].posY && newAttrList[index].posX < newAttrList[newEdges[i].start].posX) {
                            transform = "rotate(-" + parseFloat(Math.PI - rad) + "rad)"
                        } if (newAttrList[index].posY > newAttrList[newEdges[i].start].posY && newAttrList[index].posX < newAttrList[newEdges[i].start].posX) {
                            transform = "rotate(-" + parseFloat(Math.PI + rad) + "rad)"
                        }
                        newEdges[i].width = width;
                        newEdges[i].transform = transform;
                        setStageEdges(newEdges);
                    }
                }
                console.log("set stage edge");
                setStageEdges(newEdges);
                // dispatch(updateStage(uid, {_id: uid, edges: newEdges}));
            }
        } else {
            let index = parseInt(e.target.dataset.idx);
            let newAttrList = [...protocolEdgeNodes];


            if (newAttrList[index].isDown) {
                if (protocolStartNode === null && index === protocolStartNodeTmp || protocolStartNode !== null && index === protocolEndNodeTmp) {
                    setIfProtocolSingleClick(false);
                }
                const shiftX = e.screenX - newAttrList[index].screenX;
                const shiftY = e.screenY - newAttrList[index].screenY;
                newAttrList[index].posX = newAttrList[index].posX + shiftX;
                newAttrList[index].posY = newAttrList[index].posY + shiftY;
                newAttrList[index].posXText = newAttrList[index].posX + "px";
                newAttrList[index].posYText = newAttrList[index].posY + "px";
                newAttrList[index].screenX = e.screenX;
                newAttrList[index].screenY = e.screenY;
                setProtocolEdgeNodes(newAttrList);


                let newEdges = protocolEdges;
                for (let i = 0; i < newEdges.length; i++) {
                    if (newEdges[i].start === index) {
                        newEdges[i].marginLeft = newAttrList[index].posX + 50 + "px";
                        newEdges[i].marginTop = newAttrList[index].posY + 50 + "px";


                        let rad = Math.atan(Math.abs(newAttrList[index].posY-newAttrList[newEdges[i].end].posY) / Math.abs(newAttrList[index].posX-newAttrList[newEdges[i].end].posX));
                        let width = Math.abs(newAttrList[index].posX-newAttrList[newEdges[i].end].posX) / Math.cos(rad);
                        let transform;
                        if (newAttrList[index].posY <= newAttrList[newEdges[i].end].posY && newAttrList[index].posX >= newAttrList[newEdges[i].end].posX) {
                            transform = "rotate(-" + parseFloat(Math.PI + rad) + "rad)"
                        } else if (newAttrList[index].posY >= newAttrList[newEdges[i].end].posY && newAttrList[index].posX >= newAttrList[newEdges[i].end].posX) {
                            transform = "rotate(-" + parseFloat(Math.PI - rad) + "rad)"
                        } else if (newAttrList[index].posY <= newAttrList[newEdges[i].end].posY && newAttrList[index].posX <= newAttrList[newEdges[i].end].posX) {
                            transform = "rotate(" + rad + "rad)"
                        } if (newAttrList[index].posY >= newAttrList[newEdges[i].end].posY && newAttrList[index].posX <= newAttrList[newEdges[i].end].posX) {
                            transform = "rotate(-" + rad + "rad)"
                        }
                        newEdges[i].width = width;
                        newEdges[i].transform = transform;
                        setProtocolEdges(newEdges);
                    } else if (newEdges[i].end === index) {
                        let rad = Math.atan(Math.abs(newAttrList[index].posY-newAttrList[newEdges[i].start].posY) / Math.abs(newAttrList[index].posX-newAttrList[newEdges[i].start].posX));
                        let width = Math.abs(newAttrList[index].posX-newAttrList[newEdges[i].start].posX) / Math.cos(rad);
                        let transform;
                        if (newAttrList[index].posY < newAttrList[newEdges[i].start].posY && newAttrList[index].posX > newAttrList[newEdges[i].start].posX) {
                            transform = "rotate(-" + rad + "rad)"
                        } else if (newAttrList[index].posY > newAttrList[newEdges[i].start].posY && newAttrList[index].posX > newAttrList[newEdges[i].start].posX) {
                            transform = "rotate(" + rad + "rad)"
                        } else if (newAttrList[index].posY < newAttrList[newEdges[i].start].posY && newAttrList[index].posX < newAttrList[newEdges[i].start].posX) {
                            transform = "rotate(-" + parseFloat(Math.PI - rad) + "rad)"
                        } if (newAttrList[index].posY > newAttrList[newEdges[i].start].posY && newAttrList[index].posX < newAttrList[newEdges[i].start].posX) {
                            transform = "rotate(-" + parseFloat(Math.PI + rad) + "rad)"
                        }
                        newEdges[i].width = width;
                        newEdges[i].transform = transform;
                        setProtocolEdges(newEdges);
                    }
                }
                setProtocolEdges(newEdges);
            }
        }
       
    }


    const handleMouseUp = async(e) => {
        if (isStage) {
            // console.log('what');
            let newAttrList = [...stageEdgeNodes];
            const index = parseInt(e.target.dataset.idx);
            newAttrList[index].isDown = false;
            newAttrList[index].screenX = 0;
            newAttrList[index].screenY = 0;
            setStageEdgeNodes(newAttrList);
            // dispatch(updateStage(uid, {_id: uid, edgeNodes: newAttrList}));
            try {
                const result = await axios.patch("/stages", {_id: uid, edgeNodes: newAttrList})
            } catch(error) {
                console.log(error);
            }

            //only set start node when single clicking a node
            if (ifStageSingleClick && stageStartNode === null) {
                console.log('single click');
                setStageStartNode(index);
            } else if (ifStageSingleClick && stageStartNode !== null && stageStartNode !== index) {
                setStageEndNode(index);
                setStageStartNode(null);


                //delete second-time selected edges.
                let ifEdgeExists = false;
                for (let i = 0; i < stageEdges.length; i++) {
                    if (stageEdges[i].start === stageStartNode && stageEdges[i].end === index) {
                        console.log("updated edges");
                        setStageEdges(stageEdges.filter((item) => !(item.start === stageStartNode && item.end === index)));
                        setIsStageEdited(true);
                        await axios.patch("/stages", {_id: uid, edges: stageEdges.filter((item) => !(item.start === stageStartNode && item.end === index))});
                        // dispatch(updateStage(uid, {_id: uid, edges: stageEdges.filter((item) => !(item.start === stageStartNode && item.end === index))}));
                        ifEdgeExists = true;
                        break;
                    } else if (stageEdges[i].end === stageStartNode && stageEdges[i].start === index) {
                        console.log("updated edges");
                        setStageEdges(stageEdges.filter((item) => !(item.end === stageStartNode && item.start === index)));
                        setIsStageEdited(true);
                        // await axios.patch("/stages", {_id: uid, edges: stageEdges.filter((item) => !(item.end === stageStartNode && item.start === index))});
                        // dispatch(updateStage(uid, {_id: uid, edges: stageEdges.filter((item) => !(item.end === stageStartNode && item.start === index))}));
                        ifEdgeExists = true;
                        // console.log(newEdges);
                        break;
                    }
                }

                if (stageStartNode !== null && ifEdgeExists === false) {
                    let rad = Math.atan(Math.abs(stageEdgeNodes[index].posY-stageEdgeNodes[stageStartNode].posY) / Math.abs(stageEdgeNodes[index].posX-stageEdgeNodes[stageStartNode].posX));
                    let width = Math.abs(stageEdgeNodes[index].posX-stageEdgeNodes[stageStartNode].posX) / Math.cos(rad);
                    const marginLeft = stageEdgeNodes[stageStartNode].posX + 50 + "px";
                    const marginTop = stageEdgeNodes[stageStartNode].posY + 50 + "px";
                    let transform;
                    if (stageEdgeNodes[index].posY < stageEdgeNodes[stageStartNode].posY && stageEdgeNodes[index].posX > stageEdgeNodes[stageStartNode].posX) {
                        transform = "rotate(-" + rad + "rad)"
                    } else if (stageEdgeNodes[index].posY > stageEdgeNodes[stageStartNode].posY && stageEdgeNodes[index].posX > stageEdgeNodes[stageStartNode].posX) {
                        transform = "rotate(" + rad + "rad)"
                    } else if (stageEdgeNodes[index].posY < stageEdgeNodes[stageStartNode].posY && stageEdgeNodes[index].posX < stageEdgeNodes[stageStartNode].posX) {
                        transform = "rotate(-" + parseFloat(Math.PI - rad) + "rad)"
                    } if (stageEdgeNodes[index].posY > stageEdgeNodes[stageStartNode].posY && stageEdgeNodes[index].posX < stageEdgeNodes[stageStartNode].posX) {
                        transform = "rotate(-" + parseFloat(Math.PI + rad) + "rad)"
                    }
                    setStageEdges([...stageEdges, {start: stageStartNode, end: index, width: width, rad: rad, transform: transform, marginLeft: marginLeft, marginTop: marginTop}]);
                    console.log("hehehe");
                    setIsStageEdited(true);
                    // await axios.patch("/stages", {_id: uid, edges: [...stageEdges, {start: stageStartNode, end: index, width: width, rad: rad, transform: transform, marginLeft: marginLeft, marginTop: marginTop}]});
                    // dispatch(updateStage(uid, {_id: uid, edges: [...stageEdges, {start: stageStartNode, end: index, width: width, rad: rad, transform: transform, marginLeft: marginLeft, marginTop: marginTop}]}));

                }
            }
            setIfStageSingleClick(true);
            setStageStartNodeTmp(null);
            setStageEndNodeTmp(null);
            setIsStageEdited(true);
            // // dispatch(updateStage(uid, {_id: uid, edges: stageEdges}));
            await axios.patch("/stages", {_id: uid, edgeNodes: stageEdgeNodes});
        } else {
            let newAttrList = [...protocolEdgeNodes];
            const index = parseInt(e.target.dataset.idx);
            newAttrList[index].isDown = false;
            newAttrList[index].screenX = 0;
            newAttrList[index].screenY = 0;
            setProtocolEdgeNodes(newAttrList);
            try {
                const result = await axios.patch("/protocol", {_id: uid, edgeNodes: newAttrList})
            } catch(error) {
                console.log(error);
            }
            


            //only set start node when single clicking a node
            if (ifProtocolSingleClick && protocolStartNode === null) {
                setProtocolStartNode(index);
            } else if (ifProtocolSingleClick && protocolStartNode !== null && protocolStartNode !== index) {
                setProtocolEndNode(index);
                setProtocolStartNode(null);


                //delete second-time selected edges.
                let ifEdgeExists = false;
                for (let i = 0; i < protocolEdges.length; i++) {
                    if (protocolEdges[i].start === protocolStartNode && protocolEdges[i].end === index) {
                        setProtocolEdges(protocolEdges.filter((item) => !(item.start === protocolStartNode && item.end === index)));
                        await axios.patch("/protocol", {_id: uid, edges: protocolEdges.filter((item) => !(item.start === protocolStartNode && item.end === index))})
                        // dispatch(updateProtocol(uid, {edges: protocolEdges.filter((item) => !(item.start === protocolStartNode && item.end === index))}))
                        ifEdgeExists = true;
                        break;
                    } else if (protocolEdges[i].end === protocolStartNode && protocolEdges[i].start === index) {
                        setProtocolEdges(protocolEdges.filter((item) => !(item.end === protocolStartNode && item.start === index)));
                        // await axios.patch("/protocol", {_id: uid, edges: protocolEdges.filter((item) => !(item.end === protocolStartNode && item.start === index))})
                        // dispatch(updateProtocol(uid, {edges: protocolEdges.filter((item) => !(item.end === protocolStartNode && item.start === index))}))
                        ifEdgeExists = true;
                        // console.log(newEdges);
                        break;
                    }
                }


                if (protocolStartNode !== null && ifEdgeExists === false) {
                    let rad = Math.atan(Math.abs(protocolEdgeNodes[index].posY-protocolEdgeNodes[protocolStartNode].posY) / Math.abs(protocolEdgeNodes[index].posX-protocolEdgeNodes[protocolStartNode].posX));
                    let width = Math.abs(protocolEdgeNodes[index].posX-protocolEdgeNodes[protocolStartNode].posX) / Math.cos(rad);
                    const marginLeft = protocolEdgeNodes[protocolStartNode].posX + 50 + "px";
                    const marginTop = protocolEdgeNodes[protocolStartNode].posY + 50 + "px";
                    let transform;
                    if (protocolEdgeNodes[index].posY < protocolEdgeNodes[protocolStartNode].posY && protocolEdgeNodes[index].posX > protocolEdgeNodes[protocolStartNode].posX) {
                        transform = "rotate(-" + rad + "rad)"
                    } else if (protocolEdgeNodes[index].posY > protocolEdgeNodes[protocolStartNode].posY && protocolEdgeNodes[index].posX > protocolEdgeNodes[protocolStartNode].posX) {
                        transform = "rotate(" + rad + "rad)"
                    } else if (protocolEdgeNodes[index].posY < protocolEdgeNodes[protocolStartNode].posY && protocolEdgeNodes[index].posX < protocolEdgeNodes[protocolStartNode].posX) {
                        transform = "rotate(-" + parseFloat(Math.PI - rad) + "rad)"
                    } if (protocolEdgeNodes[index].posY > protocolEdgeNodes[protocolStartNode].posY && protocolEdgeNodes[index].posX < protocolEdgeNodes[protocolStartNode].posX) {
                        transform = "rotate(-" + parseFloat(Math.PI + rad) + "rad)"
                    }
                    setProtocolEdges([...protocolEdges, {start: protocolStartNode, end: index, width: width, rad: rad, transform: transform, marginLeft: marginLeft, marginTop: marginTop}]);
                    setIsProtocolEdited(true);
                    // await axios.patch("/protocol", {_id: uid, edges: [...protocolEdges, {start: protocolStartNode, end: index, width: width, rad: rad, transform: transform, marginLeft: marginLeft, marginTop: marginTop}]})
                    // dispatch(updateProtocol(uid, {_id: uid, edges: [...protocolEdges, {start: protocolStartNode, end: index, width: width, rad: rad, transform: transform, marginLeft: marginLeft, marginTop: marginTop}]}));

                }
            }
            setIfProtocolSingleClick(true);
            setProtocolStartNodeTmp(null);
            setProtocolEndNodeTmp(null);
            setIsProtocolEdited(true);
            await axios.patch("/protocol", {_id: uid, edgeNodes: protocolEdgeNodes});
            // dispatch(updateProtocol(uid, {edges: protocolEdges}));
        }
       
    }

   const styles = {
       btn: {
           backgroundColor: "#e22e58",
           borderColor: "#e22e58",
           width: "100px",
           height: "100px",
       }
   };


   const callBackRef = useCallback(domNode => {
       if (domNode) {
       //   console.log(domNode.getBoundingClientRect());
       }
   }, []);


   console.log("protocol edges: ", stageEdges);
//    console.log("protocol nodes: ", protocolEdgeNodes);
//    console.log('startNode', startNode);
//    console.log('endNode', endNode);
   // console.log('rotate', edge.rotateDegree);




   return (
       <div className="stage-detail-canvas" style={{backgroundColor: "#2d2955"}}>
        <div style={{color: "white", position: "absolute", marginLeft: "16%", fontSize: "26px", marginTop: "20px"}}>
            { isStage ? "A stage prompt here. Example can be viewed in the interview protocol" : "When was the last time you visited the place mentioned before?" }
        </div>
           <div className={`circle-background circle1 ${sidePanelSwitch === true ? "on" : "off"}`}></div>
           <div className={`circle-background circle2 ${sidePanelSwitch === true ? "on" : "off"}`}></div>
           <div className={`circle-background circle3 ${sidePanelSwitch === true ? "on" : "off"}`}></div>
           { isStage ? stageEdgeNodes && stageEdgeNodes.length > 0 && stageEdgeNodes.map((item, index) => {
               return (
                   <div className="edge-node"
                       style={{marginLeft: item.posXText, marginTop: item.posYText}}
                       onMouseDown={handleMouseDown}
                       onMouseMove={handleMouseMove}
                       onMouseUp={handleMouseUp}
                       data-idx={index}>
                            <Button className="rounded-circle" style={styles.btn} data-idx={index}>
                               {item.text}
                           </Button>
                   </div>
               )
           }) : protocolEdgeNodes.length > 0 && protocolEdgeNodes.map((item, index) => {
            return (
                <div className="edge-node"
                    style={{marginLeft: item.posXText, marginTop: item.posYText}}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    data-idx={index}>
                         <Button className="rounded-circle" style={styles.btn} data-idx={index}>
                            {item.text}
                        </Button>
                </div>
            )
        })}


           { isStage ? stageEdges.length > 0 && stageEdges.map((item, index) => {
               return (
                   <div style={{width: item.width, height: "10px", transform: item.transform, transformOrigin: "left", marginLeft: item.marginLeft, marginTop: item.marginTop, backgroundColor: "#f2b700", position: "absolute"}}></div>
               )
           }) : protocolEdges.length > 0 && protocolEdges.map((item, index) => {
            return (
                <div style={{width: item.width, height: "10px", transform: item.transform, transformOrigin: "left", marginLeft: item.marginLeft, marginTop: item.marginTop, backgroundColor: "#f2b700", position: "absolute"}}></div>
            )
        })}


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


export default EdgeCreation;