/*
 * AAA -> Arrange, Act, Assert
  * Arrange: prepara os dados necessários para o teste
  * Act: chama a função que está sendo testada
  * Assert: verifica se o resultado está correto

 * // toBe é o === para tipos primitivos (string, number, etc.)
 * // toEqual ou toStrictEqual é para objetos
 */

import { makeNewTodo } from './make-new-todo';
describe('makeNewTodo (unit)', () => {
  describe('create', () => {
    it('deve retornar um novo todo válido', () => {
      // * Arrange
      const expectedTodo = {
        id: expect.any(String),
        description: 'meu novo todo',
        createdAt: expect.any(String),
      };

      // * Act
      const newTodo = makeNewTodo('meu novo todo');

      // * Assert

      expect(newTodo.description).toBe(expectedTodo.description);

      expect(newTodo).toStrictEqual(expectedTodo);
    });
  });
});
