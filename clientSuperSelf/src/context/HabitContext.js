import React, { createContext, useMemo, useContext, useReducer } from "react";

const HabitContext = createContext();

function habitReducer(state, action) {
  switch (action.type) {
    case "FETCH_HABITS":
      return { ...state, listHabits: action.payload.listHabits };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function HabitProvider(props) {
  const [state, dispatch] = useReducer(habitReducer, {
    listHabits: [],
  });
  const value = useMemo(() => [state, dispatch], [state]);
  return <HabitContext.Provider value={value} {...props} />;
}

function useHabits() {
  const context = useContext(HabitContext);
  // console.log("user", context);
  if (!context) {
    throw new Error("useUser must be used within a HabitProvider");
  }

  const [state, dispatch] = context;

  const fetchHabits = (listHabits) => {
    dispatch({
      type: "FETCH_HABITS",
      payload: { listHabits },
    });
  };

  return {
    state,
    fetchHabits,
  };
}

export { HabitProvider, useHabits };

// export default HabitContext;
