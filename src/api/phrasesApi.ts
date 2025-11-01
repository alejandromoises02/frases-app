const BASE_URL = 'http://localhost:4000/phrases';
import { API_BASE_URL } from './constants';

export const getPhrases = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/phrases`);
    if (!res.ok)
      throw new Error(`Error fetching phrases: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPhrase = async (text: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/phrases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok)
      throw new Error(`Error adding phrase: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePhrase = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/phrases/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok)
      throw new Error(`Error deleting phrase: ${res.status}`);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
