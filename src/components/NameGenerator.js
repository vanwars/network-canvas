import { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable from 'react-draggable';
import { Button, ButtonToolbar, ButtonGroup, Modal} from 'react-bootstrap'
import QuickAdd from "./namegenerators/QuickAdd";
import FormAdd from "./namegenerators/FormAdd";
import PanelAdd from "./namegenerators/PanelAdd";
import { createProtocol, updateProtocol } from "../actions/protocol";

const NameGenerator = ({
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
    pageIdx,
    nodeVal,
}) => {
    const [show, setShow] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [inputNodeVal, setInputNodeVal] = useState("");
    const [nodes, setNodes] = useState([]);

    const dispatch = useDispatch();

    const protocol = useSelector((state) => {
        if (typeof state.protocol === "object") {
            return state.protocol.find((p) => p._id === uid);
        }
    });

    useEffect(() => {
        if (protocol && protocol !== null && protocol !== undefined) {
            setNodes(protocol.nodes);
        }
    }, [protocol])

    const handleClose = () => {
        setShow(false);
        handleSubmit();
    }
    const handleShow = () => setShow(true);

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        let text = inputNodeVal;
        if (!protocol) {
            console.log("heys");
            dispatch(createProtocol({_id: uid, tmpkey: "rich", nodes: [...nodes, {text}], awaitNodes: [{text}], selectedNodes: []}));
        } else {
            dispatch(updateProtocol(uid, {_id: uid, tmpkey: protocol.tmpkey, nodes: [...nodes, {text}], awaitNodes: [...protocol.awaitNodes, {text}], selectedNodes: protocol.selectedNodes}));
        }
        setNodes(nodes => [...nodes, {text}]);
        setNodeVal("");
    }
      
    const handleChange = (event) => {
        setNodeVal(event.target.value);
    }

    const handleDragStop = (e, data) => {
        let dimension = e.target.getBoundingClientRect();
        if (!(dimension.right < trashCan.left || 
            dimension.left > trashCan.right || 
            dimension.bottom < trashCan.top || 
            dimension.top > trashCan.bottom)) {
                setNodes(nodes.filter((item, index) => index !== parseInt(curDragNode)));
                dispatch(updateProtocol(uid, {_id: uid, tmpkey: protocol.tmpkey, nodes: nodes.filter((item, index) => index !== parseInt(curDragNode))}));
        }
        setShowTrashCan(false);
    }

    return (
        // <div className="stage-detail-canvas" style={{backgroundColor: "#2d2955"}}>
            <>
            { (isStage === false && pageIdx === 0) &&
                <QuickAdd
                    uid={uid}
                    nodeRef={nodeRef}
                    startPos={startPos}
                    curDragNode={curDragNode}
                    trashCan={trashCan}
                    showTrashCan={showTrashCan}
                    setShowTrashCan={setShowTrashCan}
                    setNodeVal={setNodeVal}
                    handleDragStart={handleDragStart}
                    callBackRef={callBackRef}
                    isStage={false} />
            }

            { (isStage === false && pageIdx === 1) &&
                <FormAdd uid={uid}
                    nodeRef={nodeRef}
                    nodeVal={nodeVal}
                    startPos={startPos}
                    curDragNode={curDragNode}
                    trashCan={trashCan}
                    showTrashCan={showTrashCan}
                    setShowTrashCan={setShowTrashCan}
                    setNodeVal={setNodeVal}
                    handleChange={handleChange}
                    handleDragStart={handleDragStart}
                    callBackRef={callBackRef}
                    isStage={isStage} />}

            { (isStage === false && pageIdx === 2) &&
                <PanelAdd 
                    uid={uid}
                    nodeRef={nodeRef}
                    isStage={isStage} />}
        {/* </div> */}
        </>
    )
}

export default NameGenerator;