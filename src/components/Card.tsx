// src/Card.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Entry } from "../types.d";

interface CardProps {
  podcast: Entry;
}

const Card: React.FC<CardProps> = ({ podcast }) => {
  return (
    <Link
      className="card-link"
      to={`/podcast/${podcast.id.attributes["im:id"]}`}
      state={{ podcast }}
    >
      <div className="card">
        <img
          src={podcast["im:image"][0].label}
          alt={podcast["im:name"].label}
        />
        <h3>{podcast.title.label}</h3>
        <h4>Author: {podcast["im:artist"].label}</h4>
      </div>
    </Link>
  );
};

export default Card;
