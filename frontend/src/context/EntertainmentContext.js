import { createContext, useReducer } from "react";

export const EntertainmentContext = createContext();

export const entertainmentReducer = (state, action) => {
  switch (action.type) {
    case "SET_ENTERTAINMENT":
      return {
        allEntertainment: action.payload,
        // singleEntertainment: state.singleEntertainment,
      };
    case "CREATE_ENTERTAINMENT":
      return {
        allEntertainment: [...state.allEntertainment, action.payload],
        singleEntertainment: state.singleEntertainment,
      };
    case "FIND_SINGLE_ENTERTAINMENT":
      return {
        allEntertainment: state.allEntertainment,
        singleEntertainment: action.payload,
      };
    case "UPDATE_ENTERTAINMENT":
      return {
        allEntertainment: state.allEntertainment.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        singleEntertainment: state.singleEntertainment,
      };
    case "DELETE_ENTERTAINMENT":
      return {
        allEntertainment: state.allEntertainment.filter(
          (item) => item._id !== action.payload._id
        ),
        singleEntertainment: state.singleEntertainment,
      };
    default:
      return state;
  }
};

export const EntertainmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(entertainmentReducer, {
    allEntertainment: null,
    singleEntertainment: null,
  });

  return (
    <EntertainmentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EntertainmentContext.Provider>
  );
};
