import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import Home from "./components/Home";
import { Entry } from "./types.d";

function App() {
  const [podcasts, setPodcasts] = useState<Entry[]>([]);

  useEffect(() => {
    if (
      !localStorage.getItem("fetchTime") ||
      Math.round(new Date().getTime() / 1000) -
        Number(localStorage.getItem("fetchTime")) >
        86400
    ) {
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
      .then((res) => {
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
    <div>
      <h1>Prueba tecnica - Podcaster</h1>
      <Routes>
        <Route path="/" element={<Home podcasts={podcasts} />} />
        <Route path="/podcast/:id" element={<Detail />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
