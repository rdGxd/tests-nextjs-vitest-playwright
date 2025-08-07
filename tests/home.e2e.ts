import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { expect, Page, test } from "@playwright/test";

const HOME_URL = "/";
const HEADING = "Lista de tarefas";
const INPUT = "Tarefa";
const BUTTON = "Adicionar";
const BUTTON_BUSY = "Adicionando...";
const NEW_TODO_TEXT = "Nova tarefa de teste";

const getHeading = (p: Page) => p.getByRole("heading", { name: HEADING });
const getInput = (p: Page) => p.getByRole("textbox", { name: INPUT });
const getButton = (p: Page) => p.getByRole("button", { name: BUTTON });
const getButtonBusy = (p: Page) => p.getByRole("button", { name: BUTTON_BUSY });

const getAll = (p: Page) => ({
  heading: getHeading(p),
  input: getInput(p),
  button: getButton(p),
  buttonBusy: getButtonBusy(p),
});

test.beforeEach(async ({ page }) => {
  const { deleteTodoNoWhere } = await makeTestTodoRepository();
  await deleteTodoNoWhere();
  await page.goto(HOME_URL);
});

test.afterAll(async () => {
  const { deleteTodoNoWhere } = await makeTestTodoRepository();
  await deleteTodoNoWhere();
});

test.describe("Home Page E2E Tests", () => {
  test.describe("Renderização", () => {
    test("deve ter o title correto", async ({ page }) => {
      await expect(page).toHaveTitle("Lista de Tarefas");
    });

    test("deve renderizar o cabeçalho, o input e o botão para criar TODOs", async ({
      page,
    }) => {
      await expect(getHeading(page)).toBeVisible();
      await expect(getInput(page)).toBeVisible();
      await expect(getButton(page)).toBeVisible();
    });
  });

  test.describe("Criação", () => {
    test("deve permitir criar uma nova tarefa", async ({ page }) => {
      const { button, input } = getAll(page);
      await input.fill(NEW_TODO_TEXT);
      await button.click();

      const createdTodo = page
        .getByRole("listitem")
        .filter({ hasText: NEW_TODO_TEXT });
      await expect(createdTodo).toBeVisible();
    });

    test("deve fazer o trim da descrição do input ao criar o TODO", async ({
      page,
    }) => {
      const { button, input } = getAll(page);

      const textToBeTrimmed = "   no spaces here   ";
      const textTrimmed = textToBeTrimmed.trim();

      await input.fill(textToBeTrimmed);
      await button.click();

      const createdTodo = page
        .getByRole("listitem")
        .filter({ hasText: textTrimmed });
      const createdTodoText = await createdTodo.textContent();

      expect(createdTodoText).toBe(textTrimmed);
    });

    test("deve permitir criar múltiplas tarefas", async ({ page }) => {
      const { button, input } = getAll(page);

      const tasks = ["Tarefa 1", "Tarefa 2", "Tarefa 3"];

      for (const task of tasks) {
        await input.fill(task);
        await button.click();

        const createdTodo = page
          .getByRole("listitem")
          .filter({ hasText: task });
        await expect(createdTodo).toBeVisible();
      }
    });
  });

  test.describe("Exclusão", () => {});
  test.describe("Erros", () => {});
});
