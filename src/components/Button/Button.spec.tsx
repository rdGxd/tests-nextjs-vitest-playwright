/*
 *❗Esse é um teste de implementação consciente:
 * Estamos testando se o botão tem as classes certas baseadas em props.
 * A Testing Library recomenda evitar esse tipo de teste, mas nesse caso, o comportamento *é* visual.
 * Logo, esse teste é necessário e justificado.
 */

import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('<Button />', () => {
  describe('props padrão e JSX', () => {
    it('deve renderizar o botão com o props correto (apenas children)', async () => {
      render(<Button>Enviar</Button>);

      const button = screen.getByRole('button', { name: /Enviar/i });

      expect(button).toBeInTheDocument();

      expect(button).toHaveClass('bg-blue-600 hover:bg-blue-700 text-blue-100');
      expect(button).toHaveClass('text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2');

      // * Evite usar snapshots para testar, pois elas podem mudar com frequência.
      // expect(button).toMatchSnapshot();
    });

    it('verifica se as propriedades padrão do JSX funcionam corretamente', async () => {});
  });

  describe('variantes (cores)', () => {
    it('checa se default renderiza com as classes corretas', () => {});
    it('checa se danger renderiza com as classes corretas', () => {});
    it('checa se ghost renderiza com as classes corretas', () => {});
  });

  describe('sizes (tamanhos)', () => {
    it('checa se o tamanho sm renderiza com as classes corretas', () => {});
    it('checa se o tamanho md renderiza com as classes corretas', () => {});
    it('checa se o tamanho lg renderiza com as classes corretas', () => {});
  });

  describe('disabled', () => {
    it('checa se o botão desabilitado renderiza com as classes corretas', () => {});
  });
});
