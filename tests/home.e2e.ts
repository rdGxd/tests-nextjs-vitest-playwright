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
  // Renderização
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
  // Criação
  test.describe("Criação", () => {});
  // Exclusão
  test.describe("Exclusão", () => {});
  // Erros
  test.describe("Erros", () => {});
});
