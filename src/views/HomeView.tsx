import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../AppProvider";
import Card from "../components/Card";
import { Entry } from "../types.d";
import { refetchIfExpired } from "../utils";

const HomeView = () => {
  const { loading, setLoading } = useContext(AppContext);
  const [filter, setFilter] = useState<string | null>(null);

  const getPodcasts = async (): Promise<Entry[]> => {
    try {
      const res = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const result = await res.json();
      localStorage.setItem("fetch", JSON.stringify(result.feed.entry));
      setLoading(false);
      return result.feed.entry as Promise<Entry[]>;
    } catch {
      return [];
    }
  };

  const { data, error, refetch } = useQuery<Entry[]>("podcasts", getPodcasts, {
    enabled: false,
    initialData: JSON.parse(localStorage.getItem("fetch")!),
  });

  useEffect(() => {
    if (refetchIfExpired(86400000)) {
      setLoading(true);
      refetch();
    }
  }, [refetch, setLoading]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div>There was an error getting the data.</div>;
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

export default HomeView;
