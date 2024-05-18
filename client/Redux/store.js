import { combineReducers, configureStore } from "@redux/toolkit";
import * as User from "./Reducers/useReducers";

const rootReducer = combineReducers({
    // user Reducers
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// initialState
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});
