import { createTodoAction } from './create-todo-action';
import { deleteTodoAction } from './delete-todo-action';

export type createTodoAction = typeof createTodoAction;
export type deleteTodoAction = typeof deleteTodoAction;
