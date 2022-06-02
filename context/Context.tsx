import React, { createContext, FC, useState } from "react";

interface IContext {
  profileList: any;
  setProfileList: (data: any) => void;
  updateProfile: boolean;
  setUpdateProfile: (updated: boolean) => void;
  allProfiles: any;
  setAllProfiles: (data: any) => void;
  index: number;
  setIndex: (index: number) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}
export const Context = createContext<IContext | undefined>(undefined);

export const ContextProvider: FC = (props) => {
  const [profileList, setProfileList] = useState([]);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [allProfiles, setAllProfiles] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  return (
    <Context.Provider
      value={{
        profileList,
        setProfileList,
        updateProfile,
        setUpdateProfile,
        allProfiles,
        setAllProfiles,
        index,
        setIndex,
        currentUser,
        setCurrentUser
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
