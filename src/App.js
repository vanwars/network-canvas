import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import{ getStages } from './actions/stages';
import { getProtocol } from './actions/protocol';
import Stage from './components/Stage';
import SidePanel from './components/SidePanel';
import StageOverview from './components/StageOverview';
import ProtocolOverview from './components/ProtocolOverview'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NameGenerator from './components/NameGenerator';
import Sociogram from './components/Sociogram';
import Protocol from './components/Protocol';
import ProtocolSwitch from './components/ProtocolSwitch';
import NameGeneratorPrompt from './components/namegenerators/NameGeneratorPrompt';
import SociogramPrompt from './components/sociograms/SociogramPrompt';
import QuickAdd from './components/namegenerators/QuickAdd';
import FormAdd from './components/namegenerators/FormAdd';
import PanelAdd from './components/namegenerators/PanelAdd';
import UidGenerator from './components/UidGenerator';
import EgoForm from './components/EgoForm';
import Bin from './components/sociograms/Bin';
import EdgeCreation from './components/sociograms/EdgeCreation';

function App() {

  const location = useLocation().pathname;
  const [sidePanelSwitch, setSidePanelSwitch] = useState(true);
  const [pageIdx, setPageIdx] = useState(0);
  const [nameGeneratorStage, setNameGeneratorStage] = useState(null);
  const [sociogramStage, setSociogramStage] = useState(null);
  const [nodeVal, setNodeVal] = useState("");
  const [startPos, setStartPos] = useState({x: null, y: null});
  const [showTrashCan, setShowTrashCan] = useState(false);
  const [curDragNode, setCurDragNode] = useState(null);
  const [trashCan, setTrashCan] = useState(null);
  const [uid, setUid] = useState(null);
  const [isStage, setIsStage] = useState(true);

  const nodeRef = useRef(null);

  console.log("is Stage at app.js: ", isStage);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isStage) {
        // console.log("now dispatch the stages.");
      dispatch(getStages());
    }
  }, [dispatch, uid, isStage]);
  useEffect(() => {
    if (!isStage) {
        // console.log("now dispatch the protocol.");
      dispatch(getProtocol());
    }
  }, [dispatch, uid, isStage]);

  const protocol = useSelector((state) => state.protocol);
  // console.log("uid at app.js: ", uid);
//   console.log("protocol at app.js: ", protocol);
//   console.log("is stage? ", isStage);

//   useEffect(() => {
//     console.log('handle route change here', location);
//   }, [location])

//   useEffect(() => {
//     console.log("uid at app.js: ", uid);
//   }, [uid]);

  const handleChange = (event) => {
    setNodeVal(event.target.value);
  }

  const handleDragStart = (e, data) => {
    setStartPos(startPos => ({...startPos, x: data.x, y: data.y}));
    setCurDragNode(e.target.dataset.nodeid)
    setShowTrashCan(true);
  }

  const callBackRef = useCallback(domNode => {
    if (domNode) {
      setTrashCan(domNode.getBoundingClientRect());
    }
  }, []);

  return (
    <div className='App'>
      {/* <Stage /> */}
      {location && <SidePanel sidePanelSwitch={sidePanelSwitch} setSidePanelSwitch={setSidePanelSwitch} setIsStage={setIsStage} />}
      {location == "./sample-protocol" && <ProtocolSwitch pageIdx={pageIdx} setPageIdx={setPageIdx} />}
      {uid === null && <UidGenerator setUid={setUid} />}

      <Routes>
        <Route path='./' element={<StageOverview setIsStage={setIsStage} />}></Route>
        <Route path="./protocols" element={<ProtocolOverview setIsStage={setIsStage} />}></Route>
        <Route path="./ego-form" element={<EgoForm />}></Route>
        <Route path="quick-add-name-generator" element={<QuickAdd
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
                                                            isStage={isStage} />} >
        </Route>
        <Route path="form-add-name-generator" element={<FormAdd
                                                            uid={uid}
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
                                                            isStage={isStage} />} ></Route>
        <Route path="panel-add-name-generator" element={<PanelAdd
                                                            uid={uid}
                                                            nodeRef={nodeRef}
                                                            isStage={true} />} ></Route>
        <Route path="./name-generator" element={<NameGeneratorPrompt setNameGeneratorStage={setNameGeneratorStage} />}></Route>
        <Route path="./sociogram-stage" element={<Sociogram uid={uid} sidePanelSwitch={sidePanelSwitch} sociogramStage={sociogramStage} isStage={true} pageIdx={pageIdx} />}></Route>
        <Route path="./sociogram" element={<SociogramPrompt uid={uid} setSociogramStage={setSociogramStage} />}></Route>
        <Route path="./sample-protocol" element={<Protocol
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
                                                  pageIdx={pageIdx}
                                                  sidePanelSwitch={setSidePanelSwitch}
                                                  sociogramStage={sociogramStage}
                                                  nameGeneratorStage={nameGeneratorStage}
                                                  nodeVal={nodeVal} />}></Route>
      </Routes>

    </div>
  );
}

export default App;
