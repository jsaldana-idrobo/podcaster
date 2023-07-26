// src/Card.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppProvider";
import { Episode } from "../types.d";

interface EpisodesProps {
  episodes: Episode[];
}

const Episodes: React.FC<EpisodesProps> = ({ episodes }) => {
  const { setLoading } = useContext(AppContext);

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
                  onClick={() => setLoading(true)}
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
