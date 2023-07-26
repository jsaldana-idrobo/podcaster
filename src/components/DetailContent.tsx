import React from "react";
import { Outlet } from "react-router-dom";
import { Episode } from "../types.d";
import Episodes from "./Episodes";

interface DetailContentProps {
  isLoading: boolean;
  isEpisode: boolean;
  data: Episode[] | undefined;
}

const DetailContent: React.FC<DetailContentProps> = ({
  isLoading,
  isEpisode,
  data,
}) => {
  if (isLoading) {
    return (
      <div>
        <div className="loading"></div>
      </div>
    );
  }

  if (isEpisode) {
    return <Outlet />;
  }

  return (
    data && (
      <div>
        <h2>Episodes: {data.length}</h2>
        <Episodes episodes={data} />
      </div>
    )
  );
};

export default DetailContent;
