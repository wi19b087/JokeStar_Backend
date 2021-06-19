import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const renderUserCard = (user, onDelete) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" component="p">
          {user.userId}
        </Typography>
        <Typography variant="body2" component="h2" color="textSecondary">
          Displayname: {user.userName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          //   onClick={async () => await onDelete(joke.id)}
          size="small"
          style={{ color: "red" }}
        >
          Remove all jokes of this user
        </Button>
      </CardActions>
    </Card>
  );
};

const UsersContainer = (props) => {
  const { allJokes = [], onDelete } = props;
  let users = [];
  allJokes.forEach((j) => {
    const userName = j.author;
    const userId = j.authorId;
    if (!users.some((u) => u.userId === userId)) {
      users.push({ userId, userName });
    }
  });

  return users ? (
    <div>{users.map((u) => renderUserCard(u, onDelete))}</div>
  ) : (
    <div />
  );
};

export default UsersContainer;
