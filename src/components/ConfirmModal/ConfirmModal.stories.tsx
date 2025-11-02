import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmModal } from './index';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' }
  }
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    title: '¿Estás seguro de borrar esta frase?',
    message: 'Esta acción no se puede deshacer',
    confirmText: 'Borrar',
    cancelText: 'Cancelar',
    onConfirm: () => {},
    onCancel: () => {}
  }
};

export const LongMessage: Story = {
  args: {
    title: '¡Aviso importante!',
    message: `Este es un mensaje muy largo que debería generar scroll vertical dentro del modal.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex.
      Mauris dapibus risus quis suscipit vulputate. Egestas et lorem magna. Etiam vel
      dictum risus. Sed lacinia urna non nisi egestas, nec suscipit diam viverra.
      Curabitur ac urna nec velit pharetra sollicitudin. Aliquam erat volutpat. Proin
      non erat nec nulla congue laoreet a at urna.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex.
      Mauris dapibus risus quis suscipit vulputate. Egestas et lorem magna. Etiam vel
      dictum risus. Sed lacinia urna non nisi egestas, nec suscipit diam viverra.
      Curabitur ac urna nec velit pharetra sollicitudin. Aliquam erat volutpat. Proin
      non erat nec nulla congue laoreet a at urna.`,
    confirmText: 'Aceptar',
    cancelText: 'Cancelar',
    onConfirm: () => {},
    onCancel: () => {}
  }
};
