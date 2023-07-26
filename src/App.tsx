import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppProvider";
import Detail from "./views/Detail";
import Episode from "./views/Episode";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <AppProvider loading={loading} setLoading={setLoading}>
      <h1>Prueba tecnica - Podcaster</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:id" element={<Detail />}>
          <Route path="episode/:episodeId" element={<Episode />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
