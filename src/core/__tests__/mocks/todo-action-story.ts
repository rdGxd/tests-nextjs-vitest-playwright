import {
  createTodoAction,
  deleteTodoAction,
} from '@/core/todo/actions/todo.actions.types';
import { fn } from '@storybook/test';

export const todoActionStoryMock = {
  create: {
    success: fn(async () => {
      return {
        success: true,
        todo: { id: 'id', description: 'desc', createdAt: 'data' },
      };
    }) as createTodoAction,
    error: fn(async () => {
      return {
        success: false,
        errors: ['falha ao criar todo'],
      };
    }) as createTodoAction,
  },
  delete: {
    success: fn(async () => {
      return {
        success: true,
        todo: { id: 'id', description: 'desc', createdAt: 'data' },
      };
    }) as deleteTodoAction,
    error: fn(async () => {
      return {
        success: false,
        errors: ['falha ao criar todo'],
      };
    }) as deleteTodoAction,
    delayed: fn(async () => {
      await new Promise(r => setTimeout(r, 2000));
      return {
        success: true,
        todo: { id: 'id', description: 'desc', createdAt: 'data' },
      };
    }) as deleteTodoAction,
  },
};
