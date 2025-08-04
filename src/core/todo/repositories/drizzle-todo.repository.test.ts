import { beforeEach } from "vitest";
import {
  insertTestTodos,
  makeTestTodoRepository,
} from "../__tests__/utils/make-test-todo-repository";

const { deleteTodoNoWhere } = await makeTestTodoRepository();

describe("DrizzleTodoRepository (integration)", () => {
  beforeEach(async () => {
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    await deleteTodoNoWhere();
  });

  describe("findAll", () => {
    it("deve retornar um array vazio se a tabela estiver limpa", async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });
    it("deve retornar todos os TODOs em ordem decrescente", async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.findAll();
      expect(result).toHaveLength(5);
      expect(result[0].createdAt).toBe("date 5");
      expect(result[1].createdAt).toBe("date 4");
      expect(result[2].createdAt).toBe("date 3");
      expect(result[3].createdAt).toBe("date 2");
      expect(result[4].createdAt).toBe("date 1");
    });
  });

  describe("create", () => {
    it("cria um todo se os dados estão válidos", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const newTodo = await repository.create(todos[0]);

      expect(newTodo).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });
    it("falha se houver uma descrição igual na tabela", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      // Cria um novo TODO
      await repository.create(todos[0]);

      // Tenta criar um TODO com a mesma descrição
      const duplicateTodo = {
        id: "any id",
        description: todos[0].description,
        createdAt: "any date",
      };

      const result = await repository.create(duplicateTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe uma tarefa com essa descrição ou ID inválido."],
      });
    });

    it("falha se houver uma ID igual na tabela", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      // Cria um novo TODO
      await repository.create(todos[0]);

      // Tenta criar um TODO com a mesma ID
      const duplicateTodo = {
        id: todos[0].id,
        description: "any description",
        createdAt: "any date",
      };

      const result = await repository.create(duplicateTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe uma tarefa com essa descrição ou ID inválido."],
      });
    });

    it("falha se houver uma Descrição e ID iguais na tabela", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      // Cria um novo TODO
      await repository.create(todos[0]);

      // Tenta criar um TODO com a mesma ID
      const duplicateTodo = {
        id: todos[0].id,
        description: todos[0].description,
        createdAt: "any date",
      };

      const result = await repository.create(duplicateTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe uma tarefa com essa descrição ou ID inválido."],
      });
    });
  });

  describe("delete", () => {
    it("deve remover um todo se a ID existir", async () => {
      const { todos, repository } = await makeTestTodoRepository();
      await insertTestTodos();

      const result = await repository.remove(todos[0].id);
      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });
    it("falha se a ID não existir", async () => {
      const { repository } = await makeTestTodoRepository();

      const result = await repository.remove("any id");
      expect(result).toStrictEqual({
        success: false,
        errors: ["Tarefa não encontrada."],
      });
    });
  });
});
