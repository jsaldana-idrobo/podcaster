// src/Card.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Entry } from "../types.d";

interface CardProps {
  podcast: Entry;
}

const Card: React.FC<CardProps> = ({ podcast }) => {
  console.log(podcast);

  return (
    <Link to={`/detail/${podcast.id.attributes["im:id"]}`}>
      <div className="card">
        <img
          src={podcast["im:image"][0].label}
          alt={podcast["im:name"].label}
        />
        <h3>{podcast["im:name"].label}</h3>
      </div>
    </Link>
  );
};

export default Card;
