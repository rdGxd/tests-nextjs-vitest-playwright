import { TodoContainer } from '@/components/TodoContainer';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Lista de Tarefas',
};

export default function Home() {
  return <TodoContainer />;
}
