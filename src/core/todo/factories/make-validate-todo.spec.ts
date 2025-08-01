import * as sanitizeStrMod from "@/utils/sanitize-str";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";
import * as makeNewTodoMod from "./make-new-todo";
import { InvalidTodo, makeValidateTodo, ValidTodo } from "./make-validate-todo";
// Mockar (mock) -> Substituir a implementação real por uma versão controlada temporariamente
// vi.spyOn -> Cria um "espião" (spy) na função especificada, permitindo monitorar suas chamadas
// mockReturnValue -> Define o valor que a função mockada deve retornar quando chamada
// mockResolvedValue -> Define o valor que a função mockada deve retornar quando chamada, mas para funções assíncronas
// mockRejectedValue -> Define o erro que a função mockada deve lançar quando chamada
// mockImplementation -> Substitui a implementação original da função por uma nova função

describe("makeValidateTodo (unit)", () => {
  it("deve chamar a função sanitizeStr com a descrição correta", () => {
    const { description, sanitizeSpy } = makeMocks();

    makeValidateTodo(description);

    expect(sanitizeSpy).toHaveBeenCalledExactlyOnceWith(description);
    // expect(sanitizeSpy).toHaveBeenCalledTimes(1);
    // expect(sanitizeSpy).toHaveBeenCalledWith("Test Todo");
  });

  it("deve chamar a função validateTodoDescription com o retorno de sanitizeStr", () => {
    const { sanitizeSpy, validateTodoDescriptionSpy, description } =
      makeMocks(); // Pegando os spies criados no makeMocks

    // Variavel para simular o retorno de sanitizeStr
    const sanitizeStrReturn = "retorno novo";
    // Mockando o retorno de sanitizeStr
    sanitizeSpy.mockReturnValue(sanitizeStrReturn);

    makeValidateTodo(description) as ValidTodo;

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn
    );
  });

  it("deve chamar makeNewTodo se validateTodoDescription retornar sucesso", () => {
    const { description } = makeMocks();
    const result = makeValidateTodo(description) as ValidTodo;

    expect(result.success).toBe(true);
    expect(result).toStrictEqual({
      success: true,
      data: {
        id: expect.any(String),
        description,
        createdAt: expect.any(String),
      },
    });
  });

  it("deve retornar validatedDescription.errors se a validação falhou", () => {
    const { description, validateTodoDescriptionSpy, errors } = makeMocks();

    // Mockando o retorno de validateTodoDescription para simular erro
    validateTodoDescriptionSpy.mockReturnValue({
      success: false,
      errors,
    });

    const result = makeValidateTodo(description) as InvalidTodo;

    expect(result).toStrictEqual({ errors, success: false });
  });

  const makeMocks = (description = "Test Todo") => {
    const errors = ["Erro de validação", "Outro erro", "Mais um erro"];

    const todo = {
      id: "any-id",
      description,
      createdAt: "any-date",
    };

    const sanitizeSpy = vi
      .spyOn(sanitizeStrMod, "sanitizeStr")
      .mockReturnValue(description);

    const validateTodoDescriptionSpy = vi
      .spyOn(validateTodoDescriptionMod, "validateTodoDescription")
      .mockReturnValue({
        success: true,
        errors: [],
      });

    const makeNewTodoSpy = vi
      .spyOn(makeNewTodoMod, "makeNewTodo")
      .mockReturnValue(todo);

    return {
      description,
      sanitizeSpy,
      validateTodoDescriptionSpy,
      makeNewTodoSpy,
      todo,
      errors,
    };
  };
});
