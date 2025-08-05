import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta = {
  component: Button,
  decorators: [
    Story => (
      <div className='max-w-screen mx-auto p-12 flex items-center justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Texto do botão',
    variant: 'default',
    size: 'lg',
  },
  // render: args => {
  //   return (
  //     <div className='max-w-screen mx-auto p-12 flex items-center justify-center bg-red-300'>
  //       <Button {...args} />
  //     </div>
  //   );
  // },
};

export const Danger: Story = {
  args: {
    children: 'Texto do botão',
    variant: 'danger',
    size: 'lg',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Texto do botão',
    variant: 'ghost',
    size: 'lg',
  },
};
