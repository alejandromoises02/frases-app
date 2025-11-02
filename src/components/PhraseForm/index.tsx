import { useState } from 'react';
import { usePhrases } from '../../context/usePhrases';
import { FormWrapper, Input, Button, ErrorText } from './styles';

export const PhraseForm = () => {
  const { addPhrase } = usePhrases();
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError('La frase no puede estar vacía.');
      return;
    }

    try {
      addPhrase(trimmed);
      setText('');
      setError('');
    } catch {
      setError('Hubo un error al agregar la frase.');
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') handleAdd();
  };

  const handleTetxtChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setText(e.target.value);
    if (error) setError('');
  };

  return (
    <FormWrapper>
      <Input
        type="text"
        placeholder="Escribe una nueva frase..."
        value={text}
        onChange={handleTetxtChange}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleAdd}>Agregar</Button>
      {error && <ErrorText>{error}</ErrorText>}
    </FormWrapper>
  );
};
