import React, { createContext, useMemo, useContext, useReducer } from "react";

const UserContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER": {
      return action.payload.newUser;
    }
    case "LOGIN": {
      return { ...state };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function UserProvider(props) {
  const [state, dispatch] = useReducer(userReducer, {
    username: "",
    email: "",
    uid: "",
    isLoggedIn: null, //hihi
    // userInfo: null,
    avatarUrl: "default",
    role: "",
    createdAt: new Date(),
    // birthday: new Date(),
    // gender: "Male",
  });
  const value = useMemo(() => [state, dispatch], [state]);
  return <UserContext.Provider value={value} {...props} />;
}

function useUser() {
  const context = useContext(UserContext);
  // console.log("user", context);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const [state, dispatch] = context;

  const updateUser = (newUser) => {
    dispatch({
      type: "UPDATE_USER",
      payload: { newUser },
    });
  };

  return {
    state,
    updateUser,
  };
}

export { UserProvider, useUser };

// export default UserContext;
