
import Add from '../images/add.svg'
import Subtract from '../images/subtract.svg'

const MyLegnthComponent= ({breakL,sessionL,onBreakIncrement,onBreakDecrement,onSessionIncrement,onSessionDecrement}) =>{

    return(
        <div>
            <h3>25+5 Clock</h3>
            <div className="label-holder">
                <div id="break-label">
                <p>Break-length</p>
                <img id="break-decrement" src={Subtract} alt="-"  onClick={onBreakDecrement}/>
                <span id="break-length" >{breakL}</span>
                <img id="break-increment" src={Add} alt='+' onClick={onBreakIncrement}/>
                </div>
                <div id="session-label">
                <p>Session-length</p>
                <img id="session-decrement" src={Subtract} alt="-" onClick={onSessionDecrement}/>
                <span id="session-length" >{sessionL}</span>
                <img id="session-increment" src={Add} alt='+' onClick={onSessionIncrement}/>
                </div>
            </div>
        </div>
    )
}

export default MyLegnthComponent;