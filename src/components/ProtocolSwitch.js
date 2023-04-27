import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs"

const ProtocolSwitch = ({
    pageIdx,
    setPageIdx,
}) => {

    const switchUp = () => {
        if (pageIdx > 0) {
            setPageIdx(pageIdx - 1);
        }
    }

    const switchDown = () => {
        if (pageIdx < 5) {
            setPageIdx(pageIdx + 1);
        }
    }

    return (
        <div className="protocol-switch">
            <div style={{width: "10vw", height: "10vw"}}>
                <BsFillCaretUpFill className="switch up" size={100} onClick={switchUp} />
            </div>
            <div style={{width: "10vw", height: "10vw"}}>
                <BsFillCaretDownFill className="switch down" size={100} onClick={switchDown} />
            </div>
            <div style={{color: "#00c9a2"}}>{ `Page ${pageIdx+1} / 6` }</div>
        </div>
    )
}

export default ProtocolSwitch;