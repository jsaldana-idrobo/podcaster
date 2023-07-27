import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppProvider";

const Header = () => {
  const { loading, setLoading } = useContext(AppContext);
  return (
    <header className="app-header">
      <Link
        onClick={() => setLoading(false)}
        className="header-title card-link"
        to={"/"}
      >
        Podcaster
      </Link>
      <div className={`loading-container ${loading ? "loading" : ""}`}>
        <div className="loading-circle"></div>
      </div>
    </header>
  );
};

export default Header;
