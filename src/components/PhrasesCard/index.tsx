import { useState, useCallback } from 'react';
import type { TPhrasesCard } from './type';
import { Card, RemoveButton, Text } from './styles';
import { ConfirmModal } from '../ConfirmModal';

export const PhrasesCard = ({ id, text, onRemove }: TPhrasesCard) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = useCallback(() => {
    onRemove(id);
    setShowModal(false);
  }, [id, onRemove]);

  const handleCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Card>
        <Text title={text} data-testid="phrase-text">
          {text}
        </Text>
        <RemoveButton
          data-testid="remove-button"
          onClick={() => setShowModal(true)}
        >
          Borrar
        </RemoveButton>
      </Card>

      {showModal && (
        <ConfirmModal
          title="¿Estás seguro de borrar esta frase?"
          message={text}
          confirmText="Borrar"
          cancelText="Cancelar"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};
