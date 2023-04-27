import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStage, getStages, updateStage } from "../actions/stages";
import { createProtocol } from "../actions/protocol";

const Stage = () => {
    
    const stages = useSelector((state) => state.stages);
    console.log("stages", stages);
    const protocol = useSelector((state) => state.protocol);
    console.log("protocol", protocol);

    // const stage = useSelector((state) => state.stages.find((s) => s._id === "642e53414045d89f135427b3"));

    const [stageInfo, setStageInfo] = useState({_id: "6433c2833c72e263d2792e3a", tmpkey: "belt", nodes: [{text: "0"}]});

    const dispatch = useDispatch();

    const submitStage = () => {
        dispatch(createStage(stageInfo));
        // dispatch(updateStage("642e53414045d89f135427b3", {tmpkey: "randomstr", nodes: [{text: "20"}]}));
    }

    return (
        <div>
            <button onClick={submitStage}>hello</button>
        </div>
    )
}

export default Stage;