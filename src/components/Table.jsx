import React from "react";

function Table({ data }) {
  return (
    <>
      <table className="desktop-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>In</th>
            <th>Out</th>
            <th>Hours</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.employee}</td>
              <td>{item.date}</td>
              <td>{item.clockIn}</td>
              <td>{item.clockOut}</td>
              <td>{item.hours}</td>
              <td>
                <span className={item.status.toLowerCase()}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

   
      <div className="mobile-cards">
        <div className="month-header">
          June 2026 ⌄
        </div>

        {data.map((item, index) => (
          <div className="attendance-card" key={index}>
            <div className="card-row">
              <div>
                <h4>{item.date}</h4>
                <p>
                  {item.clockIn === "-"
                    ? "No punch"
                    : `${item.clockIn} — ${item.clockOut} • ${item.hours}`}
                </p>
              </div>

              <span className={item.status.toLowerCase()}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Table;