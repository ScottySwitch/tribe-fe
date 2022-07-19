import React from "react";

export interface IUser {
  [key: string]: any;
}

export const UserInforContext = React.createContext({
  user: <IUser>{},
  updateUser: (infor: IUser) => {},
  deleteUser: () => {},
});

export const UserInforProvider = UserInforContext.Provider;
