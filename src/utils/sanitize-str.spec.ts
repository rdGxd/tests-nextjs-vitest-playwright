import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr (unit)", () => {
  test("deve remover espaços em branco e normalizar a string", () => {
    const input = "  Hello World!  ";
    const output = sanitizeStr(input);
    expect(output).toBe("Hello World!");
  });

  test("deve retornar uma string vazia se a entrada for inválida", () => {
    // @ts-expect-error testando a função sem passar um argumento
    const output = sanitizeStr();
    expect(output).toBe("");
  });

  test("deve retornar uma string vazia quando receber um valor que não é uma string", () => {
    // @ts-expect-error testando a função com um tipo inválido
    const output = sanitizeStr(123);
    expect(output).toBe("");
  });

  test("garante que a string é normalizada com NFC", () => {
    const output = sanitizeStr('e\u0301');
    expect(output).toBe("é");
  });
});
