import type { Meta, StoryObj } from '@storybook/react';
import { PhrasesCard } from './index';

const meta: Meta<typeof PhrasesCard> = {
  title: 'Components/PhrasesCard',
  component: PhrasesCard,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof PhrasesCard>;

export const Default: Story = {
  args: {
    id: '1',
    text: 'Hola mundo',
    onRemove: (id: string) => alert(`Borrar frase con id: ${id}`)
  }
};

export const LongText: Story = {
  args: {
    id: '2',
    text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nisl, massa accumsan commodo aliquet orci dapibus dis augue, sed varius pretium mattis platea leo conubia. Et sollicitudin augue aptent massa quis curabitur tincidunt potenti, aliquet dapibus dis euismod urna purus vestibulum vulputate, blandit diam nec mattis lectus consequat in. Tincidunt sem nostra dictumst ultricies per ultrices vehicula massa sollicitudin, convallis phasellus facilisis congue est nisl dapibus ullamcorper, magna a maecenas in mus venenatis enim porta.',
    onRemove: () => {}
  }
};
