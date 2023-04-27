import { useState } from "react";
import EdgeCreation from "./sociograms/EdgeCreation";
import Bin from "./sociograms/Bin";
import CoordinateBin from "./sociograms/CoordinateBin";

const Sociogram = ({
    uid,
    sidePanelSwitch,
    sociogramStage,
    isStage,
    pageIdx,
}) => {
    const [socioType, setSocioType] = useState("edge-creation");

    const handleTypeChange = (type) => {
        setSocioType(type);
    }

    // console.log("isStage: ", isStage);
    // console.log("sociogramStage: ", sociogramStage);
    // console.log("pageIdx: ", pageIdx);

    // console.log(sociogramStage);

    return (
        // <div className="stage-detail-canvas" style={{backgroundColor: "#2d2955"}}>
        <>
             { ((isStage === true && sociogramStage === 0) || (isStage === false && pageIdx === 3)) &&
                <EdgeCreation uid={uid} sidePanelSwitch={sidePanelSwitch} isStage={isStage} />
             }
             { ((isStage === true && sociogramStage === 1) || (isStage === false && pageIdx === 4)) &&
                <Bin uid={uid} isStage={isStage} />
             }
             { ((isStage === true && sociogramStage === 2) || (isStage === false && pageIdx === 5)) &&
                <CoordinateBin uid={uid} isStage={isStage} />
             }
        </>
        // </div>
        )
}

export default Sociogram;