import * as createTodoUseCaseMod from "@/core/todo/usecases/create-todo.usecase";
import { revalidatePath } from "next/cache";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import { createTodoAction } from "./create-todo-action";

vi.mock("next/cache", () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe("CreateTodoAction (unit)", () => {
  it("deve chamar o createTodoUseCase com os valores corretos", async () => {
    const { createTodoUseCaseSpy } = makeMocks();
    const expectParamCall = "Usecase should be called with this param";

    await createTodoAction(expectParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectParamCall
    );
  });

  it("deve chamar o revalidatePath se o useCase retornar sucesso", async () => {
    const { revalidatePathMock } = makeMocks();
    const description = "Usecase should be called with this param";
    await createTodoAction(description);

    expect(revalidatePathMock).toHaveBeenCalledExactlyOnceWith("/");
  });

  it("deve retornar o mesmo valor do usecase em caso de sucesso", async () => {
    const { successResult } = makeMocks();
    const description = "Usecase should be called with this param";
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });

  it("deve retornar o mesmo valor do usecase em caso de erro", async () => {
    const { errorResult, createTodoUseCaseSpy } = makeMocks();
    const description = "Usecase should be called with this param";

    createTodoUseCaseSpy.mockResolvedValueOnce(errorResult);

    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});

const makeMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: "id",
      description: "description",
      createdAt: "createdAt",
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ["any", "error"],
  } as InvalidTodo;

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, "createTodoUseCase")
    .mockResolvedValue(successResult);

  const revalidatePathMock = vi.mocked(revalidatePath);

  return {
    createTodoUseCaseSpy,
    successResult,
    errorResult,
    revalidatePathMock,
  };
};
