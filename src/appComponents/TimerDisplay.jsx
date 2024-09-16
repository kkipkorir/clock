import React from "react";

const MyDisplay = ({ timeLeft, label }) => {
  return (
    <div className="display-container">
      <span id="timer-label">{label}</span>
      <h1 id="time-left">{timeLeft}</h1>
    </div>
  );
};

export default MyDisplay;
