import { test } from "@playwright/test";

test.describe("Home Page E2E Tests", () => {
  // Renderização
  test.describe("Renderização", () => {
    test("deve ter o title correto", async ({ page }) => {
      await page.goto("/");
      const title = await page.title();
      // test.expect(title).toBe("Todo App");
    });
  });
  // Criação
  test.describe("Criação", () => {});
  // Exclusão
  test.describe("Exclusão", () => {});
  // Erros
  test.describe("Erros", () => {});
});
