import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  it("Deve retornar sucesso quando a descrição for válida", () => {
    const result = validateTodoDescription("Valid description");
    expect(result).toStrictEqual({ success: true, errors: [] });
  });

  it("Deve retornar erro quando a descrição for muito curta", () => {
    const result = validateTodoDescription("A".repeat(4));
    expect(result).toStrictEqual({
      success: false,
      errors: ["Descrição deve ter entre 5 e 100 caracteres"],
    });
  });

  it("Deve retornar erro quando a descrição for muito longa", () => {
    const result = validateTodoDescription("A".repeat(101));
    expect(result).toStrictEqual({
      success: false,
      errors: ["Descrição deve ter entre 5 e 100 caracteres"],
    });
  });
});
