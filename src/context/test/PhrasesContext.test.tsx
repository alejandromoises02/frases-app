import { render, waitFor, act } from '@testing-library/react';
import { PhrasesProvider, PhrasesContext } from '../PhrasesContext';
import { TPhrasesContext } from '../types';
import * as api from '../../api/phrasesApi';

jest.mock('../../api/phrasesApi');

const mockGet = api.getPhrases as jest.Mock;
const mockAdd = api.addPhrase as jest.Mock;
const mockDelete = api.deletePhrase as jest.Mock;

describe('PhrasesContext', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should load phrases on mount', async () => {
    const phrases = [{ id: '1', text: 'Hello world' }];
    mockGet.mockResolvedValueOnce(phrases);

    let contextValue: TPhrasesContext | undefined;
    await act(async () => {
      render(
        <PhrasesProvider>
          <PhrasesContext.Consumer>
            {(value) => {
              contextValue = value as TPhrasesContext;
              return null;
            }}
          </PhrasesContext.Consumer>
        </PhrasesProvider>
      );
    });

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
      expect(contextValue!.phrases).toEqual(phrases);
      expect(contextValue!.filteredPhrases).toEqual(phrases);
    });
  });

  it('addPhrase should add a new phrase', async () => {
    const newPhrase = { id: '2', text: 'New text' };
    mockAdd.mockResolvedValueOnce(newPhrase);
    mockGet.mockResolvedValueOnce([]);

    let contextValue: TPhrasesContext | undefined;
    await act(async () => {
      render(
        <PhrasesProvider>
          <PhrasesContext.Consumer>
            {(value) => {
              contextValue = value as TPhrasesContext;
              return null;
            }}
          </PhrasesContext.Consumer>
        </PhrasesProvider>
      );
    });

    await act(async () => {
      await contextValue!.addPhrase('New text');
    });

    expect(contextValue!.phrases).toContainEqual(newPhrase);
    expect(contextValue!.filteredPhrases).toContainEqual(newPhrase);
  });

  it('removePhrase should remove a phrase', async () => {
    const initialPhrases = [{ id: '1', text: 'Hello world' }];
    mockGet.mockResolvedValueOnce(initialPhrases);
    mockDelete.mockResolvedValueOnce(true);

    let contextValue: TPhrasesContext | undefined;
    await act(async () => {
      render(
        <PhrasesProvider>
          <PhrasesContext.Consumer>
            {(value) => {
              contextValue = value as TPhrasesContext;
              return null;
            }}
          </PhrasesContext.Consumer>
        </PhrasesProvider>
      );
    });

    await act(async () => {
      await contextValue!.removePhrase('1');
    });

    expect(contextValue!.phrases).toEqual([]);
    expect(contextValue!.filteredPhrases).toEqual([]);
  });

  it('should filter phrases using regex escaped', async () => {
    const phrases = [
      { id: '1', text: 'Hello world' },
      { id: '2', text: 'Bye' }
    ];
    mockGet.mockResolvedValueOnce(phrases);

    let contextValue: TPhrasesContext | undefined;
    await act(async () => {
      render(
        <PhrasesProvider>
          <PhrasesContext.Consumer>
            {(value) => {
              contextValue = value as TPhrasesContext;
              return null;
            }}
          </PhrasesContext.Consumer>
        </PhrasesProvider>
      );
    });

    await act(async () => {
      contextValue!.setFilterText('Hello');
    });

    await waitFor(() => {
      expect(contextValue!.filteredPhrases).toEqual([
        { id: '1', text: 'Hello world' }
      ]);
    });

    await act(async () => {
      contextValue!.setFilterText('.*+?^${}()|[]\\');
    });

    await waitFor(() => {
      expect(contextValue!.filteredPhrases).toEqual([]);
    });
  });

  it('should handle API errors without crashing', async () => {
    mockGet.mockRejectedValueOnce(new Error('fail'));

    let contextValue: TPhrasesContext | undefined;
    await act(async () => {
      render(
        <PhrasesProvider>
          <PhrasesContext.Consumer>
            {(value) => {
              contextValue = value as TPhrasesContext;
              return null;
            }}
          </PhrasesContext.Consumer>
        </PhrasesProvider>
      );
    });

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
      expect(contextValue!.phrases).toEqual([]);
      expect(contextValue!.filteredPhrases).toEqual([]);
    });
  });
});
