import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Episode } from "../types.d";
import CardDetail from "./CardDetail";
import Episodes from "./Episodes";

const Detail = () => {
  const { state } = useLocation();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodesCounter, setEpisodesCounter] = useState<number>(0);

  useEffect(() => {
    if (state)
      fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${state?.podcast.id.attributes["im:id"]}&country=US&media=podcast&entity=podcastEpisode`
        )}`
      )
        .then(async (res) => await res.json())
        .then((res) => {
          console.log(res);

          const jsonResult = JSON.parse(res.contents);
          setEpisodesCounter(jsonResult.resultCount);
          setEpisodes(jsonResult.results);
        })
        .catch((error) => console.log(error));
  }, [state]);

  return (
    <div className="detail">
      <CardDetail state={state} />

      <div className="episodes">
        <h2>Episodes: {episodesCounter}</h2>
        <Episodes episodes={episodes} />
      </div>
    </div>
  );
};

export default Detail;
