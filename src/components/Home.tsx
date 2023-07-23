// src/Home.tsx
import React, { useState } from "react";
import { Entry } from "../types.d";
import Card from "./Card";

interface HomeProps {
  podcasts: Entry[];
}

const Home: React.FC<HomeProps> = ({ podcasts }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredPodcasts =
    typeof filter === "string"
      ? podcasts.filter((podcast) => {
          return (
            podcast.title.label.toLowerCase().includes(filter.toLowerCase()) ||
            podcast["im:artist"].label
              .toLowerCase()
              .includes(filter.toLowerCase())
          );
        })
      : podcasts;

  return (
    <div>
      <input
        type="text"
        placeholder="Filter podcasts"
        className="filter"
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="home">
        {filteredPodcasts.map((entry: Entry) => (
          <Card key={entry.id.attributes["im:id"]} podcast={entry} />
        ))}
      </div>
    </div>
  );
};

export default Home;
