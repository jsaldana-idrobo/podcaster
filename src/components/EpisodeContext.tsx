import React, { createContext } from "react";

interface EpisodeContextValue {
  isEpisode: boolean;
  setIsEpisode: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultEpisodeContextValue: EpisodeContextValue = {
  isEpisode: false,
  setIsEpisode: () => {},
};

const EpisodeContext = createContext<EpisodeContextValue>(
  defaultEpisodeContextValue
);

export default EpisodeContext;
