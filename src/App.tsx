import { useEffect, useState } from "react";
import "./App.css";
import { Entry, Podcasts } from "./types.d";

function App() {
  const [podcasts, setPodcasts] = useState<Entry[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    if (
      !localStorage.getItem("fetchTime") ||
      Math.round(new Date().getTime() / 1000) -
        Number(localStorage.getItem("fetchTime")) >
        86400
    ) {
      console.log("Entra");
      getPodcasts();
    } else {
      setPodcasts(JSON.parse(localStorage.getItem("podcasts")!));
    }
  }, []);

  const getPodcasts = () => {
    fetch(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    )
      .then(async (res) => await res.json())
      .then((res: Podcasts) => {
        const pods = res.feed.entry;
        setPodcasts(pods);
        localStorage.setItem(
          "fetchTime",
          Math.round(new Date().getTime() / 1000).toString()
        );
        localStorage.setItem("podcasts", JSON.stringify(pods));
      })
      .catch((error) => console.log(error));
  };

  const filteredPodcasts =
    typeof filter === "string"
      ? podcasts.filter((podcast) => {
          return (
            podcast.title.label.toLowerCase().includes(filter.toLowerCase()) ||
            podcast["im:artist"].label
              .toLowerCase()
              .includes(filter.toLowerCase())
          );
        })
      : podcasts;

  return (
    <div className="app">
      <h1>Prueba tecnica - Podcaster</h1>
      <input
        type="text"
        placeholder="Filter podcasts"
        className="filter"
        onChange={(e) => setFilter(e.target.value)}
      />
      {JSON.stringify(filteredPodcasts)}
    </div>
  );
}

export default App;
