import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const deleteAllJokesFromUser = async (user, deleteJoke) => {
  user.jokeIds.forEach((id) => {
    deleteJoke(id);
  });
};

const renderUserCard = (user, deleteJoke) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" component="p">
          {user.userName}
        </Typography>
        <Typography variant="body2" component="h2" color="textSecondary">
          {user.userId}
        </Typography>
        <Typography variant="body2" component="h2" color="textSecondary">
          Number of Jokes: {user.totalNumberOfJokes}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={async () => await deleteAllJokesFromUser(user, deleteJoke)}
          size="small"
          style={{ color: "red" }}
        >
          Remove this user and all associated jokes
        </Button>
      </CardActions>
    </Card>
  );
};

const UsersContainer = (props) => {
  const { allJokes = [], deleteJoke } = props;
  let users = [];

  // Get all users from Jokes-Collection
  allJokes.forEach((j) => {
    const userName = j.author;
    const userId = j.authorId;
    if (!users.some((u) => u.userId === userId)) {
      users.push({ userId, userName });
    }
  });

  // Attach all joke document ids to the specific user
  users.forEach((u) => {
    u.totalNumberOfJokes = 0;
    u.jokeIds = [];
    allJokes.forEach((j) => {
      if (u.userId === j.authorId) {
        u.totalNumberOfJokes++;
        console.log(j.id);
        u.jokeIds = [...u.jokeIds, j.id];
      }
    });
  });

  console.log({ users });

  return users ? (
    <div>{users.map((u) => renderUserCard(u, deleteJoke))}</div>
  ) : (
    <div />
  );
};

export default UsersContainer;
