import { useState } from 'react';
import { usePhrases } from '../../context/usePhrases';
import { FormWrapper, Input, Button, ErrorText } from './styles';
import { LiveRegion } from '../LiveRegion';

export const PhraseForm = () => {
  const { addPhrase } = usePhrases();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

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
      setNotification(`Frase agregada: ${trimmed}`); //just for a11y and readers purpose
    } catch {
      setError('Hubo un error al agregar la frase.');
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') handleAdd();
  };

  const handleTextChange = (
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
        onChange={handleTextChange}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleAdd}>Agregar</Button>
      {error && <ErrorText>{error}</ErrorText>}

      <LiveRegion message={notification} />
    </FormWrapper>
  );
};
