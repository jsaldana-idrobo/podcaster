import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <h1>Prueba tecnica - Podcaster</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:id" element={<Detail />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
