import { FaArrowAltCircleRight } from "react-icons/fa"
import { Link } from "react-router-dom";

const SociogramPrompt = ({
    uid,
    setSociogramStage,
}) => {

    const gotoStage= (idx) => {
        setSociogramStage(idx);
    }

    console.log("uid at sociogram prompt: ", uid);

    return (
        <div className="stage-detail-canvas" style={{backgroundColor: "#2d2955"}}>
                <div className="prompt-title">In this stage, you are able to construct social network relationship.</div>
                <div className="option-bar-wrapper">
                    {/* <div className="row"> */}
                        <div className="option-bar">
                            <Link to="/sociogram-stage" className="option-link">
                                {/* <div className="option-icon-wrapper"> */}
                                    <FaArrowAltCircleRight className="goto-stage" size={70} onClick={() => gotoStage(0)} />
                                {/* </div> */}
                            </Link>
                            <div>Edge Creation: categorizing nodes by creating edges to connect them.</div>
                        </div>
                        <div className="option-bar">
                            <Link to="/sociogram-stage" className="optionlink">
                                {/* <div className="option-icon-wrapper"> */}
                                    <FaArrowAltCircleRight className="goto-stage" size={70} onClick={() => gotoStage(1)} />
                                {/* </div> */}
                            </Link>
                            <div>Bin: categorizing nodes using bins.</div>
                        </div>
                        <div className="option-bar">
                            <Link to="/sociogram-stage" className="option-link">
                                {/* <div className="option-icon-wrapper"> */}
                                    <FaArrowAltCircleRight className="goto-stage" size={70} onClick={() => gotoStage(2)} />
                                {/* </div> */}
                            </Link>
                            <div>Coordinate Sociogram: categorizing nodes using a coordinate background image.</div>
                        </div>
                    {/* </div> */}
                </div>
        </div>
    )
}

export default SociogramPrompt;