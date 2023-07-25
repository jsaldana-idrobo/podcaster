import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Entry } from "../types.d";
import Card from "./Card";

const Home = () => {
  const expirationTimeInSeconds = 86400;
  const [filter, setFilter] = useState<string | null>(null);

  const getPodcasts = async (): Promise<Entry[]> => {
    try {
      const res = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const res_1 = await await res.json();
      return await (res_1.feed.entry as Promise<Entry[]>);
    } catch {
      return [];
    }
  };

  const { data, isLoading, error, refetch } = useQuery("podcasts", getPodcasts);

  useEffect(() => {
    const fetchTime = localStorage.getItem("fetchTime");
    const currentTimeInSeconds = Math.round(new Date().getTime() / 1000);
    const timeElapsed = currentTimeInSeconds - Number(fetchTime);

    if (!fetchTime || timeElapsed > expirationTimeInSeconds) {
      refetch();
      localStorage.setItem("fetchTime", currentTimeInSeconds.toString());
    }
  }, [refetch]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Hubo un error al obtener los datos.</div>;
  }

  const filteredPodcasts =
    typeof filter === "string"
      ? data?.filter((podcast: Entry) => {
          return (
            podcast.title.label.toLowerCase().includes(filter.toLowerCase()) ||
            podcast["im:artist"].label
              .toLowerCase()
              .includes(filter.toLowerCase())
          );
        })
      : data;

  return (
    <div>
      <input
        type="text"
        placeholder="Filter podcasts"
        className="filter"
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="home">
        {filteredPodcasts?.map((entry: Entry) => (
          <Card key={entry.id.attributes["im:id"]} podcast={entry} />
        ))}
      </div>
    </div>
  );
};

export default Home;
