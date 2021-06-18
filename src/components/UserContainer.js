import React from "react";
import UserList from "./UserList";

const UserContainer = (props) => {
  const { users, banUser } = props;

  //   const notBannedUsers =
  //   console.log({ notBannedUsers });
  console.log({ users });

  return <UserList users={users} banUser={banUser} />;
};

export default UserContainer;
