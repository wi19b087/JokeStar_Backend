import React, { useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const renderUserCard = (user, banUser) => {
  console.log({ user });
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" component="p">
          {user}
        </Typography>
        <Typography variant="body2" component="h2" color="textSecondary">
          posted by {user}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={async () => await banUser(user.id)}
          size="small"
          style={{ color: "red" }}
        >
          Ban this user
        </Button>
      </CardActions>
    </Card>
  );
};

const UserList = (props) => {
  const { users, banUser } = props;

  return users ? (
    <div>{users.map((u) => renderUserCard(u, banUser))}</div>
  ) : (
    <div />
  );
};

export default UserList;
