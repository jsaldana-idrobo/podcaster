// src/Card.tsx
import React from "react";
import { Entry } from "../types.d";

interface CardDetailProps {
  podcast: Entry | undefined;
}

const CardDetail: React.FC<CardDetailProps> = ({ podcast }) => {
  return (
    podcast && (
      <div className="card detail">
        <img
          className="detail"
          src={podcast["im:image"][0].label}
          alt={podcast["im:name"].label}
        />
        <div className="separator" />
        <div className="card-text">
          <h4>{podcast.title.label}</h4>
          <p>By: {podcast["im:artist"].label}</p>
        </div>
        <div className="separator" />
        <div className="card-text">
          <h4>Description:</h4>
          <p>{podcast.summary.label}</p>
        </div>
      </div>
    )
  );
};

export default CardDetail;
