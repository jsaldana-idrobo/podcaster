import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppProvider";
import DetailView from "./views/DetailView";
import EpisodeView from "./views/EpisodeView";
import HomeView from "./views/HomeView";
import NotFoundView from "./views/NotFoundView";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <AppProvider loading={loading} setLoading={setLoading}>
      <h1>Prueba tecnica - Podcaster</h1>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/podcast/:id" element={<DetailView />}>
          <Route path="episode/:episodeId" element={<EpisodeView />} />
        </Route>
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
