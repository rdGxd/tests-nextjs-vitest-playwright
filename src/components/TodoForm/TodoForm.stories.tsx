import { fn } from '@storybook/test';
import { TodoForm } from '.';

const meta: Meta<typeof TodoForm> = {
  title: 'Components/Forms/TodoForm',
  component: TodoForm,
  decorators: [
    Story => (
      <div className='max-w-screen-md mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    action: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof TodoForm>;

export const Default: Story = {
  args: {
    action: fn(async () => {
      return {
        success: true,
        todo: {
          id: '1',
          description: 'Tarefa criada com sucesso',
          createdAt: 'date',
        },
      };
    }),
  },
};

export const WithError: Story = {
  args: {
    action: fn(async () => {
      return {
        success: false,
        errors: ['Erro ao criar a tarefa'],
      };
    }),
  },
};
