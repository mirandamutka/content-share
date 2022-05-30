import React, { createContext, FC, useState } from "react";

interface IContext {
  profileList: any;
  setProfileList: (data: any) => void;
  updateProfile: boolean;
  setUpdateProfile: (updated: boolean) => void;
  index: number;
  setIndex: (index: number) => void;
}
export const Context = createContext<IContext | undefined>(undefined);

export const ContextProvider: FC = (props) => {
  const [profileList, setProfileList] = useState([]);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <Context.Provider
      value={{
        profileList,
        setProfileList,
        updateProfile,
        setUpdateProfile,
        index,
        setIndex,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
