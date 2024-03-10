import { TPriority } from "@/type/TPriority";
import { TTodoItem } from "@/type/TTodoItem";

export type TActionType = keyof TActionPayloadMap;

type TActionPayloadMap = {
  "todoList/addTodo": TTodoItem;
  "todoList/editTodo": TTodoItem;
  "todoList/removeTodo": TTodoItem;
  "filters/searchFilterChange": string;
  "filters/statusFilterChange": TStateFilterStatus;
  "filters/prioritiesFilterChange": TPriority[];
};

export type TReducerAction<T> = T extends "todoList/addTodo"
  ? {
      type: T;
      payload: TActionPayloadMap[T];
    }
  : T extends "todoList/removeTodo"
  ? {
      type: T;
      payload: TActionPayloadMap[T];
    }
  : T extends "todoList/editTodo"
  ? {
      type: T;
      payload: TActionPayloadMap[T];
    }
  : T extends "filters/searchFilterChange"
  ? {
      type: T;
      payload: TActionPayloadMap[T];
    }
  : T extends "filters/statusFilterChange"
  ? {
      type: T;
      payload: TActionPayloadMap[T];
    }
  : T extends "filters/prioritiesFilterChange"
  ? {
      type: T;
      payload: TActionPayloadMap[T];
    }
  : never;

export type TReducerActionCreator<T extends TActionType> = (data: TActionPayloadMap[T]) => TReducerAction<T>;

export type TStateFilterStatus = boolean | undefined;
export type TReducerState = {
  filters: {
    search: string;
    status: TStateFilterStatus;
    priority: TPriority[];
  };
  todoList: TTodoItem[];
};
