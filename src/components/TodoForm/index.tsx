'use client';

import { createTodoAction } from '@/core/todo/actions/todo.actions.types';
import { sanitizeStr } from '@/utils/sanitize-str';
import { CirclePlusIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { Button } from '../Button';
import { InputText } from '../InputText';

export type TodoFormProps = {
  action: createTodoAction;
};

export function TodoForm({ action }: TodoFormProps) {
  const [isPending, startTransition] = useTransition();
  const [inputError, setInputError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  function handleCreateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const input = ref.current;
    if (!input) return;

    const description = sanitizeStr(input.value);

    startTransition(async () => {
      const result = await action(description);

      if (!result.success) {
        setInputError(result.errors[0]);
        return;
      }

      input.value = '';
      setInputError('');
    });
  }

  return (
    <form onSubmit={handleCreateTodo} className='flex flex-col flex-1 gap-6'>
      <InputText
        ref={ref}
        type='text'
        placeholder='Digite sua tarefa'
        name='description'
        labelText='Tarefa'
        disabled={isPending}
        errorMessage={inputError}
      />
      <Button type='submit' disabled={isPending}>
        <CirclePlusIcon />
        {!isPending && <span>Adicionar</span>}
        {isPending && <span>Adicionando...</span>}
      </Button>
      {inputError && <p>{inputError}</p>}
    </form>
  );
}
