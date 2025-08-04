import { beforeEach } from "vitest";
import { makeTestTodoRepository } from "../__tests__/utils/make-test-todo-repository";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import { createTodoUseCase } from "./create-todo.usecase";

const { deleteTodoNoWhere } = await makeTestTodoRepository();

describe("createTodoUseCase (integration)", () => {
  beforeEach(async () => {
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    await deleteTodoNoWhere();
  });

  it("deve retornar erro se a validação falhar", async () => {
    const result = (await createTodoUseCase("")) as InvalidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  it("deve retornar um TODO se a validação passar", async () => {
    const description = "Isso deve funcionar";
    const result = (await createTodoUseCase(description)) as ValidTodo;
    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      id: expect.any(String),
      description,
      createdAt: expect.any(String),
    });
  });

  it("deve retornar erro se o repositório falhar", async () => {
    // Cria o TODO uma vez
    const description = "Isso só funciona uma vez";
    (await createTodoUseCase(description)) as ValidTodo;

    // Tenta criar novamente, o repositório deve falhar
    const result = (await createTodoUseCase(description)) as InvalidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      "Já existe uma tarefa com essa descrição ou ID inválido.",
    ]);
  });
});
