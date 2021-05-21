import React, { useState, createContext } from "react";

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    uid: "",
    isLoggedIn: null, //hihi
    profilePhotoUrl: "default",
    // birthday: new Date(),
    // gender: "Male",
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
