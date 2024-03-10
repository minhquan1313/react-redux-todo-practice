import { TPriority } from "@/type/TPriority";

export type TTodoItem = {
  id: string;
  name: string;
  completed: boolean;
  priority: TPriority;
};
