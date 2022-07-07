import React from "react";

export interface IUser {
  [key: string]: any;
}

export const UserInforContext = React.createContext({
  user: {},
  updateUser: (infor: IUser) => {},
  deleteUser: () => {},
});
