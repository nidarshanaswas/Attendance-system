import React from "react";
import "../../styles/ClockCard.css"
function ClockCard({
  status,
  clockInTime,
  date,
  workedHours,
  buttonText,
}) {
  return (
    <div className="clock-card">
      <div className="clock-card-left">
        <span className="status-badge">{status}</span>

        <h2>Clocked in at {clockInTime}</h2>

        <p>{date}</p>
      </div>

      <div className="clock-card-right">
        
        <div className="worked-hours-inline">
          <span className="hours">{workedHours}</span>
          <span className="label">worked today</span>
        </div>
        <button className="clock-btn">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ClockCard;