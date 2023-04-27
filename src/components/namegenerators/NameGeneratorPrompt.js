import { FaArrowAltCircleRight } from "react-icons/fa"
import { Link } from "react-router-dom";

const NameGeneratorPrompt = ({
    setNameGeneratorStage,
}) => {

    const gotoStage= (idx) => {
        setNameGeneratorStage(idx);
    }

    return (
        <div className="stage-detail-canvas" style={{backgroundColor: "#2d2955"}}>
                <div className="prompt-title">In this stage, you are able to generate nodes.</div>
                <div className="option-bar-wrapper">
                    {/* <div className="row"> */}
                        <div className="option-bar">
                            <Link to="/quick-add-name-generator" className="option-link">
                                {/* <div className="option-icon-wrapper"> */}
                                    <FaArrowAltCircleRight className="goto-stage" size={70} onClick={() => gotoStage(0)} />
                                {/* </div> */}
                            </Link>
                            <div>Quick Add: generating nodes in the most basic and easy way.</div>
                        </div>
                        <div className="option-bar">
                            <Link to="/form-add-name-generator" className="optionlink">
                                {/* <div className="option-icon-wrapper"> */}
                                    <FaArrowAltCircleRight className="goto-stage" size={70} onClick={() => gotoStage(1)} />
                                {/* </div> */}
                            </Link>
                            <div>Form Add: generating nodes by having interviewees fill out a form.</div>
                        </div>
                        <div className="option-bar">
                            <Link to="/panel-add-name-generator" className="option-link">
                                {/* <div className="option-icon-wrapper"> */}
                                    <FaArrowAltCircleRight className="goto-stage" size={70} onClick={() => gotoStage(2)} />
                                {/* </div> */}
                            </Link>
                            <div>Panel Add: generating nodes by selecting from a group of pre-generated nodes.</div>
                        </div>
                    {/* </div> */}
                </div>
        </div>
    )
}

export default NameGeneratorPrompt;