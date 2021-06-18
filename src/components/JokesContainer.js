import React from "react";
import JokeList from "./JokeList";

const JokesContainer = (props) => {
  const { jokes, deleteJoke } = props;

  return <JokeList jokes={jokes} onDelete={deleteJoke} />;
};

export default JokesContainer;
