import { useContext } from "react";
import { AppContext } from "../AppProvider";

const Loading = () => {
  const { loading } = useContext(AppContext);
  return (
    <div>
      <div className={`loading-content ${loading ? "loading" : ""}`}>
        Loading <span className="dot-1">.</span>
        <span className="dot-2">.</span>
        <span className="dot-3">.</span>
      </div>
    </div>
  );
};

export default Loading;
