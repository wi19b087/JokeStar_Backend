// Lists all Jokes
import React, { useRef, useState } from "react";

const renderJokeCard = (joke) => {
  console.log({ joke });
  return (
    <>
      <div>
        <p>{joke.text}</p>
        <br />
        <p>Posted by: {joke.displayName}</p>
      </div>
    </>
  );
};

const JokeList = (props) => {
  const { jokes } = props;

  //jokes:
  // createdAt 30. Mai 2021 um 15:08:05 UTC+2
  // photoURL "https://lh3.googleusercontent.com/a/AATXAJwCOObiB4Js51ehvZJSnAie8QxDnVvHuZ1TTqbr=s96-c"
  // (String)
  // text "whats up"
  // uid "sbu4vrfoSbheWtiKH1cxgALcTsA3"

  return jokes ? <div>{jokes.map((j) => renderJokeCard(j))}</div> : <div/>;
};

export default JokeList;