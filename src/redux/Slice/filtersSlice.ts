import { textToBoolean } from "@/Utils/textToBoolean";
import { TPriority } from "@/type/TPriority";
import { TReducerState, TStateFilterStatus } from "@/type/TReducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TFilterReducer = TReducerState["filters"];

const query = new URLSearchParams(window.location.search);

const initState: TFilterReducer = {
  search: query.get("search") ?? "",
  status: textToBoolean(query.get("status")),
  priority: (query.get("priority")?.split(",") ?? []) as TPriority[],
};

// export const filtersReducer = (state = initState, action: TReducerAction<TActionType>): TFilterReducer => {
//   const { type, payload } = action;

//   switch (type) {
//     case "filters/searchFilterChange":
//       return {
//         ...state,
//         search: payload,
//       };

//     case "filters/statusFilterChange":
//       return {
//         ...state,
//         status: payload,
//       };

//     case "filters/prioritiesFilterChange":
//       return {
//         ...state,
//         priority: payload,
//       };

//     default:
//       return state;
//   }
// };

export const filtersSlice = createSlice({
  name: "filters",
  initialState: initState,
  reducers: {
    searchFilterChange: (s, { payload }: PayloadAction<string>) => {
      s.search = payload;
    },
    statusFilterChange: (s, { payload }: PayloadAction<TStateFilterStatus>) => {
      s.status = payload;
    },
    prioritiesFilterChange: (s, { payload }: PayloadAction<TPriority[]>) => {
      s.priority = payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { searchFilterChange, statusFilterChange, prioritiesFilterChange } = filtersSlice.actions;
