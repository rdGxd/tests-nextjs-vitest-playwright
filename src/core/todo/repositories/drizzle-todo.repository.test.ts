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
    it("cria um todo se os dados estão válidos", async () => {});
    it("falha se houver uma descrição igual na tabela", async () => {});

    it("falha se houver uma ID igual na tabela", async () => {});
  });

  describe("delete", () => {
    it("deve remover um todo se a ID existir", async () => {});
    it("falha se a ID não existir", async () => {});
  });
});
