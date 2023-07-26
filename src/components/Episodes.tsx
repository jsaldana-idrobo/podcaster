// src/Card.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Episode } from "../types.d";
import EpisodeContext from "./EpisodeContext";

interface EpisodesProps {
  episodes: Episode[];
}

const Episodes: React.FC<EpisodesProps> = ({ episodes }) => {
  const { setIsEpisode } = useContext(EpisodeContext);

  const handleButtonClick = () => {
    setIsEpisode((prevIsEpisode) => !prevIsEpisode);
  };

  return (
    <table className="episodes-table">
      <thead>
        <tr>
          <th className="title">Title</th>
          <th>Date</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {episodes?.map((episode) => {
          const seconds = Math.floor(episode.trackTimeMillis / 1000);
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          return (
            <tr key={episode.trackId}>
              <td>
                <Link
                  to={`episode/${episode.trackId}`}
                  onClick={handleButtonClick}
                >
                  {episode.trackName}
                </Link>
              </td>
              <td>{new Date(episode.releaseDate).toLocaleDateString()}</td>
              <td>
                {minutes}:{remainingSeconds}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Episodes;
