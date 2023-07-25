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
    if (
      !localStorage.getItem(
        `fetchTime-${state?.podcast.id.attributes["im:id"]}`
      ) ||
      Math.round(new Date().getTime() / 1000) -
        Number(
          localStorage.getItem(
            `fetchTime-${state?.podcast.id.attributes["im:id"]}`
          )
        ) >
        86400
    ) {
      getEpisodes();
    } else {
      setEpisodes(
        JSON.parse(
          localStorage.getItem(
            `episodes-${state?.podcast.id.attributes["im:id"]}`
          )!
        )
      );
    }
  }, []);

  const getEpisodes = () => {
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${state?.podcast.id.attributes["im:id"]}&country=US&media=podcast&entity=podcastEpisode`
      )}`
    )
      .then(async (res) => await res.json())
      .then((res) => {
        const jsonResult = JSON.parse(res.contents);
        setEpisodesCounter(jsonResult.resultCount);
        setEpisodes(jsonResult.results);
        localStorage.setItem(
          `fetchTime-${state?.podcast.id.attributes["im:id"]}`,
          Math.round(new Date().getTime() / 1000).toString()
        );
        localStorage.setItem(
          `episodes-${state?.podcast.id.attributes["im:id"]}`,
          JSON.stringify(jsonResult.results)
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="detail">
      <CardDetail state={state} />

      <div className="episodes">
        <h2>Episodes: {episodesCounter}</h2>
        {<Episodes episodes={episodes} />}
      </div>
    </div>
  );
};

export default Detail;
