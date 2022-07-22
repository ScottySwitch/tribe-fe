import { locations, loginInforItem } from "constant";
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
  location: undefined,
  listing_follow_ids: undefined,
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
        location: localLocation || browserLocation || locations[0].value,
        token: localLoginInfo.token,
        first_name: localLoginInfo.first_name,
        last_name: localLoginInfo.last_name,
        avatar: localLoginInfo.avatar,
        listing_follow_ids: localLoginInfo.listing_follow_ids,
      });
    };
    setDefaulUserInfor();
  }, []);

  const deleteUser = () => setUser({});

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