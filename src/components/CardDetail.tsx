// src/Card.tsx
import React from "react";
import { Entry } from "../types.d";

interface CardDetailProps {
  state: { podcast: Entry };
}

const CardDetail: React.FC<CardDetailProps> = ({ state }) => {
  return (
    <div className="card detail">
      <img
        className="detail"
        src={state?.podcast["im:image"][0].label}
        alt={state?.podcast["im:name"].label}
      />
      <div className="separator" />
      <div className="card-text">
        <h4>{state?.podcast.title.label}</h4>
        <p>By: {state?.podcast["im:artist"].label}</p>
      </div>
      <div className="separator" />
      <div className="card-text">
        <h4>Description:</h4>
        <p>{state?.podcast.summary.label}</p>
      </div>
    </div>
  );
};

export default CardDetail;
