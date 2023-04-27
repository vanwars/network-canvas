import NameGenerator from "./NameGenerator";
import Sociogram from "./Sociogram";

const Protocol = ({
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
    pageIdx,
    sidePanelSwitch,
    sociogramStage,
    nameGeneratorStage,
    nodeVal,
}) => {
    return (
        <>
        {/* // <div className="stage-detail-canvas" style={{backgroundColor: "#2d2955"}}> */}
            { pageIdx < 3 && <NameGenerator
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
                                isStage={false}
                                pageIdx={pageIdx}
                                nameGeneratorStage={nameGeneratorStage}
                                nodeVal={nodeVal} />}
            { pageIdx >= 3 && pageIdx < 6 && <Sociogram uid={uid} sidePanelSwitch={sidePanelSwitch} sociogramStage={sociogramStage} isStage={false} pageIdx={pageIdx} />}
        {/* // </div> */}
        </>
    )
}

export default Protocol;