import { Link } from "react-router-dom";

const ProtocolOverview = ({
    setIsStage,
}) => {
    return (
        <div id="protocol-overview-canvas">
            <div id="protocol-overview">
                <div className="single-protocol-canvas"></div>
                <Link to="/sample-protocol">
                    <button className="big-btn" onClick={() => setIsStage(false)}>Try This Protocol</button>
                </Link>
                <div className="container protocol-stage-info">
                    <div className="row">
                        <div className="col-sm-1">
                            <div className="bullet-point" style={{backgroundColor: "#e22e58"}}></div>
                        </div>
                        <div className="col" style={{color: "#e22e58"}}>Name Generator</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <div className="bullet-point" style={{backgroundColor: "#0fa3c1"}}></div>
                        </div>
                        <div className="col" style={{color: "#0fa3c1"}}>Ego Form</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <div className="bullet-point" style={{backgroundColor: "#f2b700"}}></div>
                        </div>
                        <div className="col" style={{color: "#f2b700"}}>Per Alter Form</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <div className="bullet-point" style={{backgroundColor: "#70bf54"}}></div>
                        </div>
                        <div className="col" style={{color: "#70bf54"}}>Sociogram</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <div className="bullet-point" style={{backgroundColor: "#bf0cd8"}}></div>
                        </div>
                        <div className="col" style={{color: "#bf0cd8"}}>Dyad Census</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProtocolOverview;