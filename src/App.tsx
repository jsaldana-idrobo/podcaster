import { Route, Routes } from "react-router-dom";
import Detail from "./views/Detail";
import Episode from "./views/Episode";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

function App() {
  return (
    <div>
      <h1>Prueba tecnica - Podcaster</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:id" element={<Detail />}>
          <Route path="episode/:id" element={<Episode />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
