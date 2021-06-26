import React, { createContext, useMemo, useContext, useReducer } from "react";

const HabitContext = createContext();

function habitReducer(state, action) {
  switch (action.type) {
    case "UPDATE_HABITS":
      return { ...state, listHabits: action.payload.listHabits };
    case "UPDATE_NUMBER_TODOS":
      return { ...state, numberTodos: action.payload.numberTodos };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function HabitProvider(props) {
  const [state, dispatch] = useReducer(habitReducer, {
    listHabits: [],
    numberTodos: 0,
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

  const updateHabits = (listHabits) => {
    dispatch({
      type: "UPDATE_HABITS",
      payload: { listHabits },
    });
  };

  const updateNumberTodos = (numberTodos) => {
    dispatch({
      type: "UPDATE_NUMBER_TODOS",
      payload: { numberTodos },
    });
  };

  return {
    state,
    updateHabits,
    updateNumberTodos,
  };
}

export { HabitProvider, useHabits };

// export default HabitContext;
