import { useState, useCallback } from 'react';
import type { TPhrasesCard } from './type';
import { Card, RemoveButton, Text } from './styles';
import { ConfirmModal } from '../ConfirmModal';
import { useIsMobile } from '../../hooks/useMobileModal';

export const PhrasesCard = ({ id, text, onRemove }: TPhrasesCard) => {
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    confirmText: '',
    cancelText: '',
    type: 'confirm' as 'confirm' | 'info'
  });

  const handleConfirm = useCallback(() => {
    if (modalInfo.type === 'confirm') onRemove(id);
    setShowModal(false);
    setModalInfo({
      title: '',
      confirmText: '',
      cancelText: '',
      type: 'confirm'
    });
  }, [id, onRemove, modalInfo.type]);

  const handleCancel = useCallback(() => {
    setShowModal(false);
    setModalInfo({
      title: '',
      confirmText: '',
      cancelText: '',
      type: 'confirm'
    });
  }, []);

  const handleTouchMobile = useCallback(() => {
    if (isMobile) {
      setShowModal(true);
      setModalInfo({
        title: 'Frase',
        confirmText: 'Cerrar',
        cancelText: '',
        type: 'info'
      });
    }
  }, [isMobile]);

  const handleDeleteText = useCallback(() => {
    setModalInfo({
      title: '¿Estás seguro de borrar esta frase?',
      confirmText: 'Borrar',
      cancelText: 'Cancelar',
      type: 'confirm'
    });
    setShowModal(true);
  }, []);

  return (
    <>
      <Card>
        <Text
          title={text}
          data-testid="phrase-text"
          onClick={handleTouchMobile}
        >
          {text}
        </Text>
        <RemoveButton
          data-testid="remove-button"
          onClick={handleDeleteText}
        >
          Borrar
        </RemoveButton>
      </Card>

      {showModal && (
        <ConfirmModal
          title={modalInfo.title}
          message={text}
          confirmText={modalInfo.confirmText}
          cancelText={modalInfo.cancelText || undefined}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};
