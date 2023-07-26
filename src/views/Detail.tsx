import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CardDetail from "../components/CardDetail";
import DetailContent from "../components/DetailContent";
import EpisodeContext from "../components/EpisodeContext";
import { Entry, Episode } from "../types.d";
import { refetchIfExpired } from "../utils";

const Detail = () => {
  const { id } = useParams();

  const [podcast, setPodcast] = useState<Entry>();
  const [isLoading, setIsLoading] = useState(false);
  const [isEpisode, setIsEpisode] = useState(false);

  const contextValue = useMemo(
    () => ({ isEpisode, setIsEpisode }),
    [isEpisode]
  );

  const getEpisodes = async (): Promise<Episode[]> => {
    try {
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode&limit=1000&sort=recent`
        )}`
      );
      const result = await res.json();
      const jsonResult = JSON.parse(result.contents);
      localStorage.setItem(
        `fetch-${id ?? ""}`,
        JSON.stringify(jsonResult.results)
      );
      setIsLoading(false);
      return jsonResult.results as Promise<Episode[]>;
    } catch {
      return [];
    }
  };

  const { data, error, refetch } = useQuery<Episode[]>(
    ["episodes", id],
    getEpisodes,
    {
      enabled: false,
      initialData: JSON.parse(localStorage.getItem(`fetch-${id ?? ""}`)!),
    }
  );

  useEffect(() => {
    setPodcast(
      JSON.parse(localStorage.getItem("fetch")!).find(
        (pod: Entry) => pod.id.attributes["im:id"] === id
      )
    );

    if (refetchIfExpired(86400000, id)) {
      setIsLoading(true);
      refetch();
    }
  }, [id, refetch]);

  if (error) {
    return <div>There was an error getting the data.</div>;
  }

  return (
    podcast && (
      <div className="detail">
        <CardDetail podcast={podcast} />
        <EpisodeContext.Provider value={contextValue}>
          <div className="episodes">
            <DetailContent
              isLoading={isLoading}
              isEpisode={isEpisode}
              data={data}
            />
          </div>
        </EpisodeContext.Provider>
      </div>
    )
  );
};

export default Detail;
