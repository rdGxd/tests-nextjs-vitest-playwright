import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '.';

const user = userEvent.setup();

describe('<TodoForm  /> (integration)', () => {
  it('deve renderizar todos os componentes do form ', async () => {
    const { input, button } = renderForm();
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('deve chamar a action com os valores corretos ', async () => {
    const { input, button, action } = renderForm();
    await user.type(input, 'Nova tarefa');
    await user.click(button);
    expect(action).toHaveBeenCalledWith('Nova tarefa');
  });

  it('deve cortar os espaços do início e fim da description (trim) ', async () => {
    const { input, button, action } = renderForm();
    await user.type(input, '   Nova tarefa   ');
    await user.click(button);
    expect(action).toHaveBeenCalledWith('Nova tarefa');
  });

  it('deve limpar o input se o formulário retornar sucesso', async () => {
    const { input, button } = renderForm();
    await user.type(input, 'Nova tarefa');
    await user.click(button);
    expect(input).toHaveValue('');
  });

  it('deve desativar o botão enquanto envia a action', async () => {
    const { input, button } = renderForm({ delay: 1000 });
    await user.type(input, 'Nova tarefa');
    await user.click(button);
    await waitFor(() => expect(button).toBeDisabled());
    await waitFor(() => expect(button).toBeEnabled());
  });

  it('deve desativar o input enquanto envia a action', async () => {
    const { input, button } = renderForm({ delay: 1000 });
    await user.type(input, 'Nova tarefa');
    await user.click(button);
    await waitFor(() => expect(input).toBeDisabled());
    await waitFor(() => expect(input).toBeEnabled());
  });

  it('deve mostrar o erro quando a action retornar erro', async () => {
    const { input, button } = renderForm({ success: false });
    await user.type(input, 'Nova tarefa');
    await user.click(button);
    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent('Erro ao criar tarefa');
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  it('deve trocar o texto do botão enquanto envia a action', async () => {
    const { input, button } = renderForm({ delay: 1000 });
    await user.type(input, 'Nova tarefa');
    await user.click(button);
    expect(button).toHaveTextContent('Adicionando...');
    await waitFor(() => expect(button).toHaveTextContent('Adicionar'));
  });

  it('deve manter o texto digitado no input se a action retornar erro', async () => {
    const { input, button } = renderForm({ success: false });
    await user.type(input, 'Nova tarefa');
    await user.click(button);
    expect(input).toHaveValue('Nova tarefa');
  });
});

type RenderForm = {
  delay?: number;
  success?: boolean;
};

function renderForm({ delay = 0, success = true }: RenderForm = {}) {
  const actionSuccessResult = {
    success: true,
    todo: { id: 'id', description: 'description', createdAt: 'createdAt' },
  };

  const actionErrorResult = {
    success: false,
    errors: ['Erro ao criar tarefa'],
  };

  const actionResult = success ? actionSuccessResult : actionErrorResult;

  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionWithDelay = vi.fn().mockImplementation(async () => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return actionResult;
  });

  const action = delay > 0 ? actionWithDelay : actionNoDelay;

  render(<TodoForm action={action} />);

  const input = screen.getByLabelText('Tarefa') as HTMLInputElement;
  const button = screen.getByRole('button', { name: 'Adicionar' });

  return {
    input,
    button,
    action,
  };
}
