import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputText, InputTextProps } from '.';

type Props = Partial<InputTextProps>;

const makeInput = (p: Props = {}) => {
  return (
    <InputText
      labelText='label'
      placeholder='placeholder'
      type='text'
      disabled={false}
      required={true}
      readOnly={false}
      {...p}
    />
  );
};

const renderInput = (p?: Props) => {
  const renderResult = render(makeInput(p));
  const input = screen.getByRole('textbox');
  return { input, renderResult };
};

const input = (p?: Props) => renderInput(p).input;

describe('<InputText  />', () => {
  describe('Comportamento padrão', () => {
    it('renderiza com label', async () => {
      const el = input({ labelText: 'Meu Input' });
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute('aria-label', 'Meu Input');
    });

    it('renderiza com placeholder', async () => {
      const el = input({ placeholder: 'Digite algo...' });
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute('placeholder', 'Digite algo...');
    });

    it('renderiza sem label e placeholder', async () => {
      const el = input({ labelText: undefined, placeholder: undefined });
      expect(el).toBeInTheDocument();
      expect(el).not.toHaveAttribute('aria-label');
      expect(el).not.toHaveAttribute('placeholder');
    });

    it('usa o labelText como aria-label quando possível', async () => {
      const el = input({ labelText: 'Meu Input' });
      expect(el).toHaveAttribute('aria-label', 'Meu Input');
    });

    it('usa o placeholder como fallback de aria-label', async () => {
      const el = input({ labelText: '', placeholder: 'Digite algo...' });
      expect(el).toHaveAttribute('aria-label', 'Digite algo...');
    });

    it('exibe o valor padrão corretamente', async () => {
      const el = input({ value: 'Valor Padrão' });
      expect(el).toHaveValue('Valor Padrão');
    });

    it('aceita outras props do JSX (data-testid, maxLength)', async () => {
      const el = input({ maxLength: 10, minLength: 5 });
      expect(el).toHaveAttribute('maxLength', '10');
      expect(el).toHaveAttribute('minLength', '5');
    });
  });

  describe('acessibilidade', () => {
    it('não exibe mensagem de erro por padrão', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
      expect(el).not.toHaveAttribute('aria-describedby');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('não marca o input como inválido por padrão', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('renderiza mensagem de erro quando `errorMessage` está presente', async () => {
      const el = input({ errorMessage: 'Erro' });
      const error = screen.getByRole('alert');
      const errorId = error.getAttribute('id');

      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('aria-describedby', errorId);
      expect(error).toBeInTheDocument();
    });
  });

  describe('comportamento interativo', () => {
    it('atualiza o valor conforme o usuário digita', async () => {
      const el = input();
      await userEvent.type(el, 'Novo valor');
      expect(el).toHaveValue('Novo valor');
    });
  });

  describe('estados visuais', () => {
    it('aplica estilos visuais quando desabilitado ', async () => {
      const el = input({ disabled: true });
      expect(el).toHaveClass(
        'disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-300',
      );
    });

    it('aplica estilos visuais quando readonly', async () => {
      const el = input({ readOnly: true });
      expect(el).toHaveClass('read-only:bg-slate-100');
    });

    it('adiciona classe de erro (ring vermelha) quando inválido', async () => {
      const el = input({ errorMessage: 'Erro' });
      expect(el).toHaveClass('ring-red-500 focus:ring-red-700');
    });

    it('mantém classes personalizadas do desenvolvedor', async () => {
      const el = input({ className: 'custom' });
      expect(el).toHaveClass('custom');
    });
  });
});
