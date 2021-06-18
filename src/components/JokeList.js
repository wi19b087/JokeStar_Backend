// Lists all Jokes
import React, { useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const renderJokeCard = (joke, onDelete) => {
  console.log({ joke });
  return (
    // <>
    //   <div>
    //     <p>{joke.text}</p>
    //     <br />
    //     <p>Posted by: {joke.displayName}</p>
    //   </div>
    // </>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" component="p">
          {joke.text}
        </Typography>
        <Typography variant="body2" component="h2" color="textSecondary">
          posted by {joke.author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={async () => await onDelete(joke.id)}
          size="small"
          style={{ color: "red" }}
        >
          Delete this joke from Firestore
        </Button>
      </CardActions>
    </Card>
  );
};

const JokeList = (props) => {
  const { jokes, onDelete } = props;

  //jokes:
  // createdAt 30. Mai 2021 um 15:08:05 UTC+2
  // photoURL "https://lh3.googleusercontent.com/a/AATXAJwCOObiB4Js51ehvZJSnAie8QxDnVvHuZ1TTqbr=s96-c"
  // (String)
  // text "whats up"
  // uid "sbu4vrfoSbheWtiKH1cxgALcTsA3"

  return jokes ? (
    <div>{jokes.map((j) => renderJokeCard(j, onDelete))}</div>
  ) : (
    <div />
  );
};

export default JokeList;
