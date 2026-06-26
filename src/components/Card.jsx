import React from "react";
import "../styles/Cards.css"
function Card({ title, value, subtitle }) {
  return (
  
    <div className="card">
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{subtitle}</small>
    </div>
  );
}

export default Card;