import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineFile, AiOutlineInfoCircle, AiOutlineRight, AiOutlineLeft } from "react-icons/ai"

const SidePanel = ({
    sidePanelSwitch,
    setSidePanelSwitch,
    setIsStage,
}) => {

    return (
        <div className={`side-panel ${sidePanelSwitch === true ? 'on' : 'off'}`}>
            <div className={`side-panel-switch ${sidePanelSwitch === true ? 'on' : 'off'}`} onClick={() => setSidePanelSwitch(!sidePanelSwitch)}>
                { sidePanelSwitch === true ? <AiOutlineLeft />
                    : <AiOutlineRight />
                }
            </div>
            <Link to="/" className="linkTo">
                <div className="side-panel-row side-panel-row-1st" onClick={() => setIsStage(true)}>
                    <AiOutlineInfoCircle />&nbsp;
                    {sidePanelSwitch === true ? "Stage Introductions" : ""}
                </div>
            </Link>
            <Link to="/protocols" className="linkTo">
                <div className="side-panel-row" onClick={() => setIsStage(false)}>
                    <AiOutlineFile />&nbsp;
                    {sidePanelSwitch === true ? "Interview Protocols" : ""}
                </div>
            </Link>
        </div>
    )
}

export default SidePanel;