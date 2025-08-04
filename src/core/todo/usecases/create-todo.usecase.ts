import { makeValidateTodo } from "../factories/make-validate-todo";
import { todoRepository } from "../repositories/default.repository";

export async function createTodoUseCase(description: string) {
  const validateResult = makeValidateTodo(description);

  if (!validateResult.success) {
    return validateResult;
  }
  return await todoRepository.create(validateResult.todo);
}
