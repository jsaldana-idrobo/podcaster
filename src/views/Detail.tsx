import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import CardDetail from "../components/CardDetail";
import Episodes from "../components/Episodes";
import { Episode } from "../types.d";

const Detail = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const id = state?.podcast.id.attributes["im:id"];

  const getEpisodes = async (): Promise<Episode[]> => {
    try {
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode`
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
    if (!localStorage.getItem(`fetch-${id ?? ""}`)) {
      setIsLoading(true);
      refetch();
    }
  }, [id, refetch]);

  if (error) {
    return <div>There was an error getting the data.</div>;
  }

  return (
    <div className="detail">
      <CardDetail state={state} />

      <div className="episodes">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data && (
            <div>
              <h2>Episodes: {data.length}</h2>
              <Episodes episodes={data} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Detail;
