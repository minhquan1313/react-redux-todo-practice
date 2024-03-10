// import { rootReducer } from "@/redux/reducer";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import { createStore } from "redux";

import { filtersReducer } from "@/redux/Slice/filtersSlice";
import localStorageMiddleware, { todoListReducer } from "@/redux/Slice/todoListSlice";
import { configureStore } from "@reduxjs/toolkit";

// const composeEnhancers = composeWithDevTools();

// export const store = createStore(rootReducer, composeEnhancers);
export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    todoList: todoListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
