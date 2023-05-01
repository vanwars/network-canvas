import {React, useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { IoTriangleSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FiMinimize2 } from 'react-icons/fi';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import axios from 'axios';

const stageurl = "https://network-canvas-web.herokuapp.com/stages";
const protocolurl = "https://network-canvas-web.herokuapp.com/protocol";
const uidurl = "https://network-canvas-web.herokuapp.com/uid";

const CoordinateBin = ({
    uid,
    isStage,
}) => {

    const [isCardOpen, setIsCardOpen] = useState(true);

    const [stageCoordNodes, setStageCoordNodes] = useState([]);
    const [protocolCoordNodes, setProtocolCoordNodes] = useState([]);
    const [instructionIdx, setInstructionIdx] = useState(0);
    const instructionText = ["Researchers can use one or more ways to build relationship among nodes in order to construct social network for their participants. "
        + "Categorization using a background image can be one of them.", "Nodes can be dragged and dropped to a specific position on the background image in order "
        + "to be categorized. Here a coordinate is set on the image so any position represents some meaning."];

    useEffect(() => {
        if (isStage === true) {
            const fetchStage = async() => {
                try {
                    let data = await axios.get(stageurl);
                    data = data.data.find((d) => d._id === uid);
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
        if (isStage === true && stageCoordNodes.length !== 0) {
            const fetchStage = async() => {
                try {
                    await axios.patch(stageurl, {_id: uid, coordNodes: stageCoordNodes});
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchStage();
        }
       }, [stageCoordNodes])
  
    
    
       useEffect(() => {
        if (isStage === false) {
            const fetchProtocol = async() => {
                try {
                    let data = await axios.get(protocolurl);
                    data = data.data.find((d) => d._id === uid);
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
        if (isStage === false && protocolCoordNodes.length !== 0) {
            const fetchProtocol = async() => {
                try {
                    await axios.patch(protocolurl, {_id: uid, coordNodes: protocolCoordNodes});
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchProtocol();
        }
       }, [protocolCoordNodes])

    const handleMouseDown = (e) => {
        if (isStage) {
            let index = parseInt(e.target.dataset.idx);
            let newAttrList = [...stageCoordNodes];
            newAttrList[index].isDown = true;
            newAttrList[index].screenX = e.screenX;
            newAttrList[index].screenY = e.screenY;
            setStageCoordNodes(newAttrList);
        } else {
            let index = parseInt(e.target.dataset.idx);
            let newAttrList = [...protocolCoordNodes];
            newAttrList[index].isDown = true;
            newAttrList[index].screenX = e.screenX;
            newAttrList[index].screenY = e.screenY;
            setProtocolCoordNodes(newAttrList);
        }
    }

    console.log(protocolCoordNodes);

const handleMouseMove = (e) => {
    if (isStage) {
        let index = parseInt(e.target.dataset.idx);
        let newAttrList = [...stageCoordNodes];

        if (newAttrList[index].isDown) {
            const shiftX = e.screenX - newAttrList[index].screenX;
            const shiftY = e.screenY - newAttrList[index].screenY;
            newAttrList[index].posX = newAttrList[index].posX + shiftX;
            newAttrList[index].posY = newAttrList[index].posY + shiftY;
            newAttrList[index].posXText = newAttrList[index].posX + "px";
            newAttrList[index].posYText = newAttrList[index].posY + "px";
            newAttrList[index].screenX = e.screenX;
            newAttrList[index].screenY = e.screenY;
            setStageCoordNodes(newAttrList);
        }
    } else {
        let index = parseInt(e.target.dataset.idx);
        let newAttrList = [...protocolCoordNodes];

        if (newAttrList[index].isDown) {
            const shiftX = e.screenX - newAttrList[index].screenX;
            const shiftY = e.screenY - newAttrList[index].screenY;
            newAttrList[index].posX = newAttrList[index].posX + shiftX;
            newAttrList[index].posY = newAttrList[index].posY + shiftY;
            newAttrList[index].posXText = newAttrList[index].posX + "px";
            newAttrList[index].posYText = newAttrList[index].posY + "px";
            newAttrList[index].screenX = e.screenX;
            newAttrList[index].screenY = e.screenY;
            setProtocolCoordNodes(newAttrList);
        }
    }
}

const handleMouseUp = (e) => {
    if (isStage) {
        let newAttrList = [...stageCoordNodes];
        const index = parseInt(e.target.dataset.idx);
        newAttrList[index].isDown = false;
        newAttrList[index].screenX = 0;
        newAttrList[index].screenY = 0;
        setStageCoordNodes(newAttrList);
    } else {
        let newAttrList = [...protocolCoordNodes];
        const index = parseInt(e.target.dataset.idx);
        newAttrList[index].isDown = false;
        newAttrList[index].screenX = 0;
        newAttrList[index].screenY = 0;
        setProtocolCoordNodes(newAttrList);
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

    return (
        <div className="stage-detail-canvas"  style={{height: "100vh", display: "flex", backgroundColor: "#2d2955"}}>
            <div style={{color: "white", position: "absolute", marginLeft: "16%", fontSize: "26px", marginTop: "5px"}}>
                { isStage ? "A stage prompt here. Example can be viewed in the interview protocol." : "Please drag the place nodes onto the coordinate system. How do you like the places you mentioned before and how often do you go there?" }
            </div>
            <div className="unsure-bin">Unsure</div>
            <div className="coordinate-bin">
                <div className="upper-left-bin"></div>
                <div className="upper-right-bin"></div>
                <div className="bottom-left-bin"></div>
                <div className="horizontal-line"></div>
                <div className="vertical-line"></div>
                <div className="upper-text">Most Favorite</div>
                <div className="bottom-text">Least Favorite</div>
                <div className="left-upper-text">Least</div>
                <div className="left-bottom-text">Frequently</div>
                <div className="right-upper-text">Most</div>
                <div className="right-bottom-text">Frequently</div>
                <IoTriangleSharp style={{position: "absolute", left: "0", right: "0", top: "4vh", margin: "auto"}} />
                <IoTriangleSharp style={{position: "absolute", left: "0", right: "0", top: "auto", bottom: "4vh", margin: "auto", transform: "rotate(180deg)"}} />
                <IoTriangleSharp style={{position: "absolute", left: "2vh", right: "auto", top: "0", bottom: "0", margin: "auto", transform: "rotate(270deg)"}} />
                <IoTriangleSharp style={{position: "absolute", left: "auto", right: "2vh", top: "0", bottom: "0", margin: "auto", transform: "rotate(90deg)"}} />
            </div>
            <div className="node-start-place">
                { isStage ? stageCoordNodes.length > 0 && stageCoordNodes.map((item, index) => {
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
                }) : protocolCoordNodes.length > 0 && protocolCoordNodes.map((item, index) => {
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

export default CoordinateBin;