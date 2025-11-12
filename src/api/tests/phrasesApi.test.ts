import { getPhrases, addPhrase, deletePhrase } from '../phrasesApi';
import { API_BASE_URL } from '../constants';

describe('phrasesApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const globalAny = global as unknown as { fetch: jest.Mock };
  globalAny.fetch = jest.fn();

  // getPhrases
  it('should fetch phrases successfully', async () => {
    const mockData = [{ id: '1', text: 'Hello World' }];
    globalAny.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await getPhrases();
    expect(result).toEqual(mockData);
    expect(globalAny.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/phrases`
    );
  });

  it('should throw an error when getPhrases fails', async () => {
    globalAny.fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(getPhrases()).rejects.toThrow(
      'Error fetching phrases: 500'
    );
  });

  // addPhrase
  it('should add a phrase successfully', async () => {
    const newPhrase = { id: '2', text: 'new text' };
    globalAny.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newPhrase
    });

    const result = await addPhrase('new text');
    expect(result).toEqual(newPhrase);
    expect(globalAny.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/phrases`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'new text' })
      }
    );
  });

  it('should throw an error when addPhrase fails', async () => {
    globalAny.fetch.mockResolvedValueOnce({ ok: false, status: 400 });
    await expect(addPhrase('Texto')).rejects.toThrow(
      'Error adding phrase: 400'
    );
  });

  // deletePhrase
  it('should delete a phrase successfully', async () => {
    globalAny.fetch.mockResolvedValueOnce({ ok: true });
    const result = await deletePhrase('1');
    expect(result).toBe(true);
    expect(globalAny.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/phrases/1`,
      {
        method: 'DELETE'
      }
    );
  });

  it('should throw an error when deletePhrase fails', async () => {
    globalAny.fetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(deletePhrase('999')).rejects.toThrow(
      'Error deleting phrase: 404'
    );
  });
});
