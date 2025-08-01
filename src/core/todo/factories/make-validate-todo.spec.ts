import * as sanitizeStrMod from "@/utils/sanitize-str";
import { makeValidateTodo } from "./make-validate-todo";
// Mockar (mock) -> Substituir a implementação real por uma versão controlada temporariamente
// vi.spyOn -> Cria um "espião" (spy) na função especificada, permitindo monitorar suas chamadas
// mockReturnValue -> Define o valor que a função mockada deve retornar quando chamada
// mockResolvedValue -> Define o valor que a função mockada deve retornar quando chamada, mas para funções assíncronas
// mockRejectedValue -> Define o erro que a função mockada deve lançar quando chamada
// mockImplementation -> Substitui a implementação original da função por uma nova função

describe("makeValidateTodo (unit)", () => {
  it("deve chamar a função sanitizeStr com a descrição correta", () => {
    const description = "Test Todo";
    const sanitizeSpy = vi
      .spyOn(sanitizeStrMod, "sanitizeStr")
      .mockReturnValue(description);

    makeValidateTodo(description);

    expect(sanitizeSpy).toHaveBeenCalledExactlyOnceWith(description);
    // expect(sanitizeSpy).toHaveBeenCalledTimes(1);
    // expect(sanitizeSpy).toHaveBeenCalledWith("Test Todo");
  });

  it("deve chamar a função validateTodoDescription com o retorno de sanitizeStr", () => {});

  it("deve chamar makeNewTodo se validateTodoDescription retornar sucesso", () => {});

  it("deve retornar validatedDescription.errors se a validação falhou", () => {});
});
