// src/Home.tsx
import React from "react";
import { Entry } from "../types.d";
import Card from "./Card";

interface HomeProps {
  podcasts: Entry[];
}

const Home: React.FC<HomeProps> = ({ podcasts }) => {
  return (
    <div className="home">
      {podcasts.map((entry: Entry) => (
        <Card key={entry.id.attributes["im:id"]} podcast={entry} />
      ))}
    </div>
  );
};

export default Home;
