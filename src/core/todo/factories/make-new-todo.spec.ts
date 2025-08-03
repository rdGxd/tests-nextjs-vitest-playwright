import { makeNewTodo } from "./make-new-todo";
describe("makeNewTodo (unit)", () => {
  describe("create", () => {
    it("deve retornar um novo todo válido", () => {
      // AAA -> Arrange, Act, Assert

      // Arrange: prepara os dados necessários para o teste
      const expectedTodo = {
        id: expect.any(String), // O ID é gerado aleatoriamente, então usamos expect.any para aceitar qualquer string
        description: "meu novo todo",
        createdAt: expect.any(String), // A data de criação é gerada automaticamente, então usamos expect.any para aceitar qualquer string
      };

      // Act: chama a função que está sendo testada
      const newTodo = makeNewTodo("meu novo todo");

      // Assert: verifica se o resultado está correto
      // toBe é o === para tipos primitivos (string, number, etc.)
      // toEqual ou toStrictEqual é para objetos

      // Checando apenas a descrição
      expect(newTodo.description).toBe(expectedTodo.description);

      // Checando o objeto inteiro
      expect(newTodo).toStrictEqual(expectedTodo);
    });
  });
});
