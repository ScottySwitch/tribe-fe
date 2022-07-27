import { locations, loginInforItem } from "constant";
import { UserType } from "enums";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getBrowserLocation } from "utils";

export interface IUser {
  [key: string]: any;
}

const defaultUserInformation: { [key: string]: any } = {
  id: undefined,
  last_name: undefined,
  first_name: undefined,
  token: undefined,
  avatar: undefined,
  user_avatar: undefined,
  location: undefined,
};

export const UserInforContext = React.createContext({
  user: defaultUserInformation,
  updateUser: (infor: IUser) => {},
  deleteUser: () => {},
});

export const UserInforProvider = ({ children }) => {
  const [user, setUser] = useState<IUser>(defaultUserInformation);
  useEffect(() => {
    const stringyLoginInfo = localStorage.getItem("user");
    const localLoginInfo = stringyLoginInfo ? JSON.parse(stringyLoginInfo) : {};
    const localLocation = localLoginInfo.location;
    ///get location
    const setDefaulUserInfor = async () => {
      const browserLocation = await getBrowserLocation();
      updateUser({
        ...localLoginInfo,
        location: localLocation || browserLocation || locations[0].value,
        token: localLoginInfo.token,
        first_name: localLoginInfo.first_name,
        last_name: localLoginInfo.last_name,
        avatar:
          localLoginInfo.user_type === UserType.NORMAL_USER
            ? localLoginInfo.user_avatar
            : localLoginInfo.avatar,
        user_avatar: localLoginInfo.user_avatar,
        owner_listings: localLoginInfo.owner_listings,
        user_type: localLoginInfo.user_type || UserType.NORMAL_USER,
      });
    };

    setDefaulUserInfor();
  }, []);

  const deleteUser = () => {
    localStorage.removeItem("user");
    setUser({});
  };

  const updateUser = (infor) => {
    const localStringyUserInfor = localStorage.getItem("user") || "{}";
    const localUserInfor = JSON.parse(localStringyUserInfor);
    const newUserInfor = { ...localUserInfor, ...infor };
    const stringyNewLocalUserInfor = JSON.stringify(newUserInfor);

    localStorage.setItem("user", stringyNewLocalUserInfor);
    setUser({ ...user, ...infor });
  };

  const contextDefaultValue = {
    user: user,
    deleteUser,
    updateUser,
  };

  return (
    <UserInforContext.Provider value={contextDefaultValue}>
      {children}
    </UserInforContext.Provider>
  );
};