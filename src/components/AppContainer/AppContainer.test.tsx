import { render, screen } from '@testing-library/react';
import { PhrasesAppContainer } from './index';

jest.mock('../../components/PhrasesGrid', () => ({
  PhrasesGrid: jest.fn(() => <div data-testid="phrases-grid" />)
}));

jest.mock('../PhraseForm', () => ({
  PhraseForm: jest.fn(() => <div data-testid="phrase-form" />)
}));

jest.mock('../PhraseFilter', () => ({
  PhraseFilter: jest.fn(() => <div data-testid="phrase-filter" />)
}));

describe('PhrasesAppContainer', () => {
  it('renders all components correctly', () => {
    render(<PhrasesAppContainer />);

    expect(screen.getByText('Frases')).toBeInTheDocument();
    expect(screen.getByTestId('phrase-form')).toBeInTheDocument();
    expect(screen.getByTestId('phrases-grid')).toBeInTheDocument();
    expect(screen.getByTestId('phrase-filter')).toBeInTheDocument();
  });
});
