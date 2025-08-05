import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo-mocks';
import { deleteTodoAction } from './delete-todo.action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('DeleteTodoAction (unit)', () => {
  it('deve chamar o deleteTodoUseCase com os valores corretos', async () => {
    const { deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const fakeId = 'any-id';

    await deleteTodoAction(fakeId);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(fakeId);
  });

  it('deve chamar o revalidatePath se o useCase retornar sucesso', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const fakeId = 'any-id';
    await deleteTodoAction(fakeId);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  it('deve retornar o mesmo valor do usecase em caso de sucesso', async () => {
    const { successResult } = makeTestTodoMocks();
    const fakeId = 'any-id';
    const result = await deleteTodoAction(fakeId);

    expect(result).toStrictEqual(successResult);
  });

  it('deve retornar o mesmo valor do usecase em caso de erro', async () => {
    const { errorResult, deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const fakeId = 'any-id';

    deleteTodoUseCaseSpy.mockResolvedValueOnce(errorResult);

    const result = await deleteTodoAction(fakeId);

    expect(result).toStrictEqual(errorResult);
  });
});
