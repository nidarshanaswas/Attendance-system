import React, { useEffect, useState } from "react";
import "../../styles/ClockCard.css";

function ClockCard({
  status,
  clockInTime,
  date,
  workedHours,
  buttonText,
  onButtonClick,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="clock-card">
      <div className="clock-card-left">
        <span className="status-badge">{status}</span>

        <h2>
          {isMobile
            ? `Clocked in ${clockInTime}`
            : `Clocked in at ${clockInTime}`}
        </h2>

        <p>{date}</p>
      </div>

      <div className="clock-card-right">
        <div className="worked-hours-inline">
          <span className="hours">{workedHours}</span>
          <span className="label">
            {isMobile ? "Worked" : "worked today"}
          </span>
        </div>

        <button
          className="clock-btn"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ClockCard;