import React, { useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AppContext } from "../AppProvider";
import { Episode } from "../types.d";
import Episodes from "./Episodes";
import Loading from "./Loading";

interface DetailContentProps {
  data: Episode[];
}

const DetailContent: React.FC<DetailContentProps> = ({ data }) => {
  const { loading } = useContext(AppContext);
  const { episodeId } = useParams();

  if (episodeId) return <Outlet />;

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Episodes: {data.length}</h2>
      <Episodes episodes={data.slice(1)} />
    </div>
  );
};

export default DetailContent;
