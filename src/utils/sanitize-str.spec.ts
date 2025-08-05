import { sanitizeStr } from './sanitize-str';

describe('sanitizeStr (unit)', () => {
  it('deve remover espaços em branco e normalizar a string', () => {
    const input = '  Hello World!  ';
    const output = sanitizeStr(input);
    expect(output).toBe('Hello World!');
  });

  it('deve retornar uma string vazia se a entrada for inválida', () => {
    // @ts-expect-error testando a função sem passar um argumento
    const output = sanitizeStr();
    expect(output).toBe('');
  });

  it('deve retornar uma string vazia quando receber um valor que não é uma string', () => {
    // @ts-expect-error testando a função com um tipo inválido
    const output = sanitizeStr(123);
    expect(output).toBe('');
  });

  it('garante que a string é normalizada com NFC', () => {
    const output = sanitizeStr('e\u0301');
    expect(output).toBe('é');
  });
});
