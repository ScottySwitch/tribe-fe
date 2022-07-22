import React, { useState } from "react";

export interface IUser {
  [key: string]: any;
}

export const UserInforContext = React.createContext({
  user: {},
  updateUser: (infor: IUser) => {},
  deleteUser: () => {},
});

const defaultUserInformation: { [key: string]: any } = {
  token: undefined,
  avatar: undefined,
  location: undefined,
};

export const UserInforProvider = ({ children }) => {
  const [user, setUser] = useState<IUser>(defaultUserInformation);

  const contextDefaultValue = {
    user: user,
    deleteUser: () => setUser({}),
    updateUser: (infor) => {
      const localStringyUserInfor = localStorage.getItem("user") || "{}";
      const localUserInfor = JSON.parse(localStringyUserInfor);
      const newUserInfor = { ...localUserInfor, ...infor };
      const stringyNewLocalUserInfor = JSON.stringify(newUserInfor);
      
      localStorage.setItem("user", stringyNewLocalUserInfor);
      setUser({ ...user, ...infor });
    },
  };

  return (
    <UserInforContext.Provider value={contextDefaultValue}>
      {children}
    </UserInforContext.Provider>
  );
};
