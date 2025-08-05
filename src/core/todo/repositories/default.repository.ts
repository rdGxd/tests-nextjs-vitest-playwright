import { drizzleDatabase } from '@/db/drizzle';
import { DrizzleTodoRepository } from './drizzle-todo.repository';
import { TodoRepository } from './todo.contract.repository';

export const todoRepository: TodoRepository = new DrizzleTodoRepository(
  drizzleDatabase.db,
);
