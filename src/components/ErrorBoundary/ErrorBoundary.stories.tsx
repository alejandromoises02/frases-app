import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './index';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary
};
export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

const ProblematicComponent = () => {
  throw new Error('Simulated crash in child component');
};

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  )
};
