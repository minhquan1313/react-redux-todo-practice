import { filtersSlice } from "@/redux/Slice/filtersSlice";
import { todoListSlice } from "@/redux/Slice/todoListSlice";
import { combineReducers } from "redux";

// const initState: TReducerState = {} as TReducerState;

// export const rootReducer = (state = initState, action: TReducerAction<TActionType>): TReducerState => {
// const { type, payload } = action;

// switch (type) {
//   case "todoList/addTodo":
//     return {
//       ...state,
//       todoList: [...state.todoList, payload],
//     };

//   case "todoList/removeTodo":
//     return state;

//   case "filters/searchFilterChange":
//     return {
//       ...state,
//       filters: {
//         ...state.filters,
//         search: payload,
//       },
//     };

//   default:
//     return state;
// }
// };

// export const rootReducer = (state = initState, action: TReducerAction<TActionType>): TReducerState => {
//   return {
//     filters: filtersReducer(state.filters, action),
//     todoList: todoListReducer(state.todoList, action),
//   };
// };

// export const rootReducer = combineReducers({
//   filters: filtersSlice,
//   todoList: todoListSlice,
// });
