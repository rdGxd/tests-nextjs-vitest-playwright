/*
 *❗Esse é um teste de implementação consciente:
 * Estamos testando se o botão tem as classes certas baseadas em props.
 * A Testing Library recomenda evitar esse tipo de teste, mas nesse caso, o comportamento *é* visual.
 * Logo, esse teste é necessário e justificado.
 *
 * OS SELETORES USADOS NESSE TESTE FORAM APENAS UM EXEMPLO,
 * TENTE SEMPRE USAR A ORDEM INDICADA EM ANOTAÇÕES.
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from '.';

const VARIANT_CLASSES = {
  default: 'bg-blue-600 hover:bg-blue-700 text-blue-100',
  ghost: 'bg-slate-300 hover:bg-slate-400 text-slate-950',
  danger: 'bg-red-600 hover:bg-red-700 text-red-100',
  disabled:
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed',
};

const SIZE_CLASSES = {
  sm: 'text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1',
  md: 'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2',
  lg: 'text-lg/tight py-4 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3',
};

describe('<Button />', () => {
  describe('props padrão e JSX', () => {
    it('deve renderizar o botão com o props correto (apenas children)', async () => {
      render(<Button>Enviar</Button>);

      const button = screen.getByRole('button', { name: /Enviar/i });

      expect(button).toBeInTheDocument();

      expect(button).toHaveClass(VARIANT_CLASSES.default);
      expect(button).toHaveClass(SIZE_CLASSES.md);

      // * Evite usar snapshots para testar, pois elas podem mudar com frequência.
      // expect(button).toMatchSnapshot();
    });

    it('verifica se as propriedades padrão do JSX funcionam corretamente', async () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} type='submit' aria-hidden='false'>
          Enviar
        </Button>,
      );

      const button = screen.getByText(/Enviar/i);

      await userEvent.click(button);
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(2);
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('variantes (cores)', () => {
    it('checa se default renderiza com as classes corretas', () => {
      render(
        <Button variant='default' title='teste'>
          Enviar
        </Button>,
      );

      const button = screen.getByTitle(/teste/i);

      expect(button).toHaveClass(VARIANT_CLASSES.default);
    });

    it('checa se danger renderiza com as classes corretas', () => {
      render(
        <Button variant='danger' title='teste'>
          Enviar
        </Button>,
      );

      const button = screen.getByTitle(/teste/i);

      expect(button).toHaveClass(VARIANT_CLASSES.danger);
    });

    it('checa se ghost renderiza com as classes corretas', () => {
      render(
        <Button variant='ghost' title='teste'>
          Enviar
        </Button>,
      );

      const button = screen.getByTitle(/teste/i);

      expect(button).toHaveClass(VARIANT_CLASSES.ghost);
    });
  });

  describe('sizes (tamanhos)', () => {
    it('checa se o tamanho sm renderiza com as classes corretas', () => {
      render(<Button size='sm'>Enviar</Button>);

      const button = screen.getByRole('button', { name: /Enviar/i });
      expect(button).toHaveClass(SIZE_CLASSES.sm);
    });

    it('checa se o tamanho md renderiza com as classes corretas', () => {
      render(<Button size='md'>Enviar</Button>);

      const button = screen.getByRole('button', { name: /Enviar/i });
      expect(button).toHaveClass(SIZE_CLASSES.md);
    });

    it('checa se o tamanho lg renderiza com as classes corretas', () => {
      render(<Button size='lg'>Enviar</Button>);

      const button = screen.getByRole('button', { name: /Enviar/i });
      expect(button).toHaveClass(SIZE_CLASSES.lg);
    });
  });

  describe('disabled', () => {
    it('checa se o botão desabilitado renderiza com as classes corretas', () => {
      render(<Button disabled>Enviar</Button>);

      const button = screen.getByRole('button', { name: /Enviar/i });
      expect(button).toBeDisabled();
      expect(button).toHaveClass(VARIANT_CLASSES.disabled);
    });
  });
});
