import { TReducerState } from "@/type/TReducer";
import { createSelector } from "@reduxjs/toolkit";

// export const selectorTodoList = (s: TReducerState) => {
//   const filtered = s.todoList.filter((t) => t.name.toLowerCase().includes(selectorSearch(s).toLowerCase()));
//   return s.todoList;
// };

export const todoListSelector = (s: TReducerState) => s.todoList;
export const searchSelector = (s: TReducerState) => s.filters.search;
export const filtersSelector = (s: TReducerState) => s.filters;

export const todoListRemainSelector = createSelector(todoListSelector, filtersSelector, (list, filter) => {
  const { status, search, priority } = filter;

  return list.filter((t) => {
    const nameMatch = t.name.toLowerCase().includes(search.toLowerCase());
    const statusMatch = status === undefined ? true : status === t.completed;
    const priorityMatch = priority.length === 0 ? true : priority.includes(t.priority);

    return nameMatch && statusMatch && priorityMatch;
  });
});
