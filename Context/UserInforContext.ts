import React from "react";

export const UserInforContext = React.createContext({
  userInfor: {},
  updateUserInfor: (infor: any) => {},
  deleteUserInfor: () => {},
});
