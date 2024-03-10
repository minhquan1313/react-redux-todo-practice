import { TReducerState } from "@/type/TReducer";
import { TTodoItem } from "@/type/TTodoItem";
import { Middleware, PayloadAction, createSlice } from "@reduxjs/toolkit";

type TTodoListReducer = TReducerState["todoList"];

// const initState: TTodoListReducer = [
//   {
//     id: "03876011-eb09-4098-8e8b-9eddd891a095",
//     completed: false,
//     name: "Learn React",
//     priority: "High",
//   },
//   {
//     id: "51efae37-8acc-4718-950e-6289ca49dc0d",
//     completed: true,
//     name: "Learn Redux",
//     priority: "Medium",
//   },
//   {
//     id: "7c1bb2c6-ac47-4a3d-ab82-94f14fe3adfb",
//     completed: false,
//     name: "Learn JavaScript",
//     priority: "Low",
//   },
// ];

const initState: TTodoListReducer = JSON.parse(localStorage.getItem("REDUX_todoList") || "null") ?? [];

// export const todoListReducer = (state = initState, action: TReducerAction<TActionType>): TTodoListReducer => {
//   const { type, payload } = action;

//   switch (type) {
//     case "todoList/addTodo":
//       return [...state, payload];

//     case "todoList/removeTodo":
//       return state;

//     case "todoList/editTodo":
//       return state.map((todo) => (todo.id === payload.id ? payload : todo));

//     default:
//       return state;
//   }
// };
export const todoListSlice = createSlice({
  name: "todoList",
  initialState: initState,
  reducers: {
    addTodo: (s, { payload }: PayloadAction<TTodoItem>) => {
      s.push(payload);
    },
    removeTodo: (s, { payload }: PayloadAction<TTodoItem>) => {
      const i = findTodoIndex(s, payload);
      i >= 0 && s.splice(i, 1);
    },
    editTodo: (s, { payload }: PayloadAction<TTodoItem>) => {
      const i = findTodoIndex(s, payload);
      i >= 0 && (s[i] = payload);
    },
  },
});

function findTodoIndex(s: TTodoItem[], payload: TTodoItem) {
  return s.findIndex((todo) => todo.id === payload.id);
}

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);

  // Update local storage after the action has been processed
  const state: TReducerState = store.getState();

  localStorage.setItem("REDUX_todoList", JSON.stringify(state.todoList));
};

export default localStorageMiddleware;

export const todoListReducer = todoListSlice.reducer;
export const { addTodo, editTodo, removeTodo } = todoListSlice.actions;
