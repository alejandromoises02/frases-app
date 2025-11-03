import type { Meta, StoryObj } from '@storybook/react';
import { PhrasesGrid } from './index';
import { PhrasesContext } from '../../context/PhrasesContext';
import type { TPhrase } from '../../context/types';

const meta: Meta<typeof PhrasesGrid> = {
  title: 'Components/PhrasesGrid',
  component: PhrasesGrid,
  parameters: {
    layout: 'centered'
  }
};
export default meta;

type Story = StoryObj<typeof PhrasesGrid>;

const mockProvider = (phrases: TPhrase[], filterText = '') => (
  <PhrasesContext.Provider
    value={{
      phrases,
      filteredPhrases: phrases.filter((f) =>
        f.text.toLowerCase().includes(filterText.toLowerCase())
      ),
      addPhrase: () => {},
      removePhrase: () => {},
      filterText,
      setFilterText: () => {},
      loading: false
    }}
  >
    <PhrasesGrid />
  </PhrasesContext.Provider>
);

export const NoPhrases: Story = {
  render: () => mockProvider([]),
  name: 'No Phrases'
};

export const WithPhrases: Story = {
  render: () =>
    mockProvider([
      { id: '1', text: 'La vida es bella' },
      { id: '2', text: 'El código limpio es felicidad' },
      { id: '3', text: 'React es poderoso' },
      { id: '4', text: 'Keep it simple' },
      { id: '5', text: 'Aprender nunca termina' },
      { id: '6', text: 'El detalle marca la diferencia' },
      { id: '7', text: 'Hazlo simple, pero significativo' },
      { id: '8', text: 'La práctica hace al maestro' }
    ]),
  name: 'With Phrases'
};

export const FilterNoMatch: Story = {
  render: () =>
    mockProvider(
      [
        { id: '1', text: 'Life is beautiful' },
        { id: '2', text: 'Clean code is happiness' }
      ],
      'nonexistent'
    ),
  name: 'Filter No Match'
};
