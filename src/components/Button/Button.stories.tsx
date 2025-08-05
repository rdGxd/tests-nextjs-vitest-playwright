import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: 'Texto do botão',
  },
};
