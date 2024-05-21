export enum ITodoActionsTypes {}
export interface ITodo {
  id: number;
  title: string;
  done: boolean;
}
export interface ITodoState {
  todos: ITodo[];
  todosChange: string[];
}
