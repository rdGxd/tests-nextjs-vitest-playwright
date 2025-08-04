import { DrizzleDatabase } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { todoTable } from "../schemas/drizzle-todo-table.schema";
import { Todo, TodoPresenter } from "../schemas/todo.contract";
import { TodoRepository } from "./todo.contract.repository";

export class DrizzleTodoRepository implements TodoRepository {
  private readonly db: DrizzleDatabase;

  constructor(db: DrizzleDatabase) {
    this.db = db;
  }

  async findAll(): Promise<Todo[]> {
    return this.db.query.todo.findMany({
      orderBy: (todo, { desc }) => [
        desc(todo.createdAt),
        desc(todo.description),
      ],
    });
  }

  async create(todoData: Todo): Promise<TodoPresenter> {
    const existingTodo = await this.db.query.todo.findFirst({
      where: (todoTable, { or, eq }) =>
        or(
          eq(todoTable.description, todoData.description),
          eq(todoTable.id, todoData.id)
        ),
    });

    if (existingTodo) {
      return {
        success: false,
        errors: ["Já existe uma tarefa com essa descrição ou ID inválido."],
      };
    }

    await this.db.insert(todoTable).values(todoData);
    return {
      success: true,
      todo: todoData,
    };
  }

  async remove(id: string): Promise<TodoPresenter> {
    const existingTodo = await this.db.query.todo.findFirst({
      where: (todoTable, { eq }) => eq(todoTable.id, id),
    });

    if (!existingTodo) {
      return {
        success: false,
        errors: ["Tarefa não encontrada."],
      };
    }

    await this.db.delete(todoTable).where(eq(todoTable.id, id));
    return {
      success: true,
      todo: existingTodo,
    };
  }
}
