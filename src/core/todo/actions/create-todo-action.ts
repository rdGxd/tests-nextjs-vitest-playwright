import { revalidatePath } from "next/cache";
import { createTodoUseCase } from "../usecases/create-todo.usecase";
import { devOnlyDelay } from "@/utils/dev-only-delay";

export async function createTodoAction(description: string) {
  "use server";
  await devOnlyDelay(100);
  const createResult = await createTodoUseCase(description);

  if (createResult.success) {
    revalidatePath("/");
  }

  return createResult;
}

// Client Component
// useActionState -> forms -> parâmetros = state:any, formData: FormData -> return state
// useTransition  -> any -> parâmetros = o que você quiser -> return any
// useOptimisticState -> any -> parâmetros = state, updateFn(currentValue, optimisticValue)
