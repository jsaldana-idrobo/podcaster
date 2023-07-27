// src/Card.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppProvider";
import { Entry } from "../types.d";

interface CardDetailProps {
  podcast: Entry;
}

const CardDetail: React.FC<CardDetailProps> = ({ podcast }) => {
  const { setLoading } = useContext(AppContext);
  return (
    podcast && (
      <div className="card detail">
        <Link
          className="card-link"
          onClick={() => setLoading(false)}
          to={`/podcast/${podcast.id.attributes["im:id"]}`}
        >
          <img
            className="detail"
            src={podcast["im:image"][0].label}
            alt={podcast["im:name"].label}
          />
        </Link>
        <div className="separator" />
        <div className="card-text">
          <Link
            className="card-link"
            onClick={() => setLoading(false)}
            to={`/podcast/${podcast.id.attributes["im:id"]}`}
          >
            <h4>{podcast.title.label}</h4>
          </Link>
          <Link
            className="card-link"
            onClick={() => setLoading(false)}
            to={`/podcast/${podcast.id.attributes["im:id"]}`}
          >
            <p>By: {podcast["im:artist"].label}</p>
          </Link>
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
