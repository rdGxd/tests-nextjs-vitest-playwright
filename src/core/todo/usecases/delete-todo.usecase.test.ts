import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo-repository';
import { afterEach } from 'vitest';
import { deleteTodoUseCase } from './delete-todo.usecase';

const { deleteTodoNoWhere } = await makeTestTodoRepository();

describe('deleteTodoUseCase', () => {
  beforeEach(async () => {
    await deleteTodoNoWhere();
  });

  afterEach(async () => {
    await deleteTodoNoWhere();
  });

  it('deve retornar erro se o ID do todo não for válido', async () => {
    const result = await deleteTodoUseCase('');
    expect(result).toStrictEqual({
      errors: ['ID inválido'],
      success: false,
    });
  });

  it('deve retornar sucesso ao deletar um todo existente', async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos);

    const result = await deleteTodoUseCase(todos[0].id);

    expect(result).toStrictEqual({
      success: true,
      todo: todos[0],
    });
  });

  it('deve retornar erro ao tentar deletar um todo inexistente', async () => {
    const result = await deleteTodoUseCase('non-existent-id');
    expect(result).toStrictEqual({
      errors: ['Tarefa não encontrada.'],
      success: false,
    });
  });
});
