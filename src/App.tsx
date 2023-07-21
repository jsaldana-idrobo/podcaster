import { useEffect, useState } from "react";
import "./App.css";
import { Entry, Podcasts } from "./types.d";

function App() {
  const [podcasts, setPodcasts] = useState<Entry[]>([]);

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

  return (
    <div className="App">
      <h1>Prueba tecnica - Podcaster</h1>
      {JSON.stringify(podcasts)}
    </div>
  );
}

export default App;
