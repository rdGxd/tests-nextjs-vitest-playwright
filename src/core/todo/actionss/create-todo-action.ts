import { revalidatePath } from 'next/cache';
import { createTodoUseCase } from '../usecases/create-todo.usecase';

export async function createTodoAction(description: string) {
  'use server';
  const createResult = await createTodoUseCase(description);

  if (createResult.success) {
    revalidatePath('/');
  }

  return createResult;
}

// Client Component
// useActionState -> forms -> parâmetros = state:any, formData: FormData -> return state
// useTransition  -> any -> parâmetros = o que você quiser -> return any
// useOptimisticState -> any -> parâmetros = state, updateFn(currentValue, optimisticValue)
