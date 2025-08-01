import { sanitizeStr } from "@/utils/sanitize-str";
import { Todo } from "../schemas/todo.contract";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";

export type InvalidTodo = {
  success: false;
  errors: string[];
};

export type ValidTodo = {
  success: true;
  data: Todo;
};

type MakeValidateTodo = InvalidTodo | ValidTodo;

export function makeValidateTodo(description: string): MakeValidateTodo {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanDescription);

  if (validatedDescription.success) {
    return {
      success: true,
      data: makeNewTodo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validatedDescription.errors,
  };
}
