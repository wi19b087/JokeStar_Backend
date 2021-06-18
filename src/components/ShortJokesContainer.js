// Lists all Jokes
import React from "react";
import JokeList from "./JokeList";

const ShortJokesContainer = (props) => {
  const { allJokes, deleteJoke } = props;

  const shortJokes = allJokes.filter((j) => j.category === "Short Jokes");
  console.log({ shortJokes });

  return <JokeList jokes={shortJokes} onDelete={deleteJoke} />;
};

export default ShortJokesContainer;
