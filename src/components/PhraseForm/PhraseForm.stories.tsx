import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PhraseForm } from './index';
import { PhrasesContext } from '../../context/PhrasesContext';
import type { TPhrasesContext } from '../../context/types';

const meta: Meta<typeof PhraseForm> = {
  title: 'Components/PhraseForm',
  component: PhraseForm
};

export default meta;
type Story = StoryObj<typeof PhraseForm>;

const MockProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [phrases, setPhrases] = useState<
    { id: string; text: string }[]
  >([]);

  const mockContext: TPhrasesContext = {
    phrases,
    filteredPhrases: phrases,
    addPhrase: (text: string) => {
      const newPhrase = { id: String(Date.now()), text };
      setPhrases((prev) => [...prev, newPhrase]);
      alert(`Frase agregada: ${newPhrase.text}`);
    },
    removePhrase: () => {},
    filterText: '',
    setFilterText: () => {}
  };

  return (
    <PhrasesContext.Provider value={mockContext}>
      {children}
    </PhrasesContext.Provider>
  );
};

export const Default: Story = {
  render: () => (
    <MockProvider>
      <div
        style={{
          maxWidth: 400,
          margin: '4rem auto',
          textAlign: 'center'
        }}
      >
        <PhraseForm />
      </div>
    </MockProvider>
  )
};
