import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppProvider";
import { Episode } from "../types.d";
import { converText } from "../utils";

const EpisodeView = () => {
  const { id, episodeId } = useParams();
  const [episode, setEpisode] = useState<Episode>();
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    setEpisode(
      JSON.parse(localStorage.getItem(`fetch-${id ?? ""}`)!).find(
        (epi: Episode) => epi.trackId.toString() == episodeId
      )
    );
  }, [episodeId, id]);

  return (
    <div className="card description">
      <p className="description-title">
        {episode?.trackName} - {episode?.artistName}
      </p>
      <p
        className="description-text"
        dangerouslySetInnerHTML={{
          __html: converText(episode?.description ?? ""),
        }}
      />
      {episode && (
        <audio
          className="audio"
          controls
          onLoadStart={() => setLoading(true)}
          onLoadedMetadata={() => setLoading(false)}
        >
          <source src={episode.episodeUrl} type="audio/mpeg" />
          Tu navegador no soporta la reproducción de audio.
        </audio>
      )}
    </div>
  );
};

export default EpisodeView;
