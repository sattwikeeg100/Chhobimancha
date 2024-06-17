import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import themeSlice from "./slices/themeSlice";
import languageSlice from "./slices/languageSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        theme: themeSlice,
        language: languageSlice,
    },
});

export default store;