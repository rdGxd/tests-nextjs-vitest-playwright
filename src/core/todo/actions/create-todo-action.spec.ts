import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo-mocks';
import { createTodoAction } from './create-todo-action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('CreateTodoAction (unit)', () => {
  it('deve chamar o createTodoUseCase com os valores corretos', async () => {
    const { createTodoUseCaseSpy } = makeTestTodoMocks();
    const expectParamCall = 'Usecase should be called with this param';

    await createTodoAction(expectParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectParamCall,
    );
  });

  it('deve chamar o revalidatePath se o useCase retornar sucesso', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'Usecase should be called with this param';
    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  it('deve retornar o mesmo valor do usecase em caso de sucesso', async () => {
    const { successResult } = makeTestTodoMocks();
    const description = 'Usecase should be called with this param';
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });

  it('deve retornar o mesmo valor do usecase em caso de erro', async () => {
    const { errorResult, createTodoUseCaseSpy } = makeTestTodoMocks();
    const description = 'Usecase should be called with this param';

    createTodoUseCaseSpy.mockResolvedValueOnce(errorResult);

    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});
