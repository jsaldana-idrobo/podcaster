import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Episode } from "../types.d";

const Detail = () => {
  const { state } = useLocation();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodesCounter, setEpisodesCounter] = useState<number>(0);

  useEffect(() => {
    if (state)
      fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${state?.podcast.id.attributes["im:id"]}`
        )}`
      )
        .then(async (res) => await res.json())
        .then((res) => {
          const jsonResult = JSON.parse(res.contents);
          setEpisodesCounter(jsonResult.resultCount);
          setEpisodes(jsonResult.results);
        })
        .catch((error) => console.log(error));
  }, [state]);

  return (
    <div>
      <h1>Podcast: {state?.podcast.id.attributes["im:id"]}</h1>
      <h2>Episodios: {episodesCounter}</h2>
      {episodes.map((episode: Episode) => (
        <h3 key={episode.trackId}>{episode.artistName}</h3>
      ))}
    </div>
  );
};

export default Detail;
