import React from "react";
import Start from '../images/play.svg'
import Stop from '../images/stop.svg'
import Reset from '../images/reset.svg'

const ControlElement = ({ onStartStop, onReset, isRunning }) => {
    return (
      <div className="controls-container">
        <img id="start_stop" src={isRunning ? Stop : Start} alt="start-stop" onClick={onStartStop} />
        <img id="reset" src={Reset} alt="reset" onClick={onReset} />
      </div>
    );
  };

export default ControlElement