import { Link } from "react-router-dom";

const StageOverview = ({
    setIsStage,
}) => {
    return (
        <div id="stage-overview-canvas" className="container">
            <div>
                <div className="row" style={{textAlign: "center"}}>
                {/* <div className="col" onClick={() => setIsStage(true)}>
                        <Link to="/ego-form" className="linkTo">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="stage-canvas-wrapper">
                                        <div className="single-stage-canvas"></div>
                                    </div>
                                    <h5 className="card-title">Ego Form</h5>
                                </div>
                            </div>
                        </Link>
                    </div> */}
                    <div className="col" onClick={() => setIsStage(true)}>
                        <Link to="/name-generator" className="linkTo">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="stage-canvas-wrapper">
                                        <div className="single-stage-canvas"></div>
                                    </div>
                                    <h5 className="card-title">Name Generator</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                {/* </div> */}

                {/* <div className="row" style={{textAlign: "center"}}> */}
                    <div className="col" onClick={() => setIsStage(true)}>
                        <Link to="/sociogram" className="linkTo">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="stage-canvas-wrapper">
                                        <div className="single-stage-canvas"></div>
                                    </div>
                                    <h5 className="card-title">Sociogram</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StageOverview;