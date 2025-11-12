import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './index';

const Bomb = () => {
  throw new Error('boom');
};

test('ErrorBoundary shows fallback on error', () => {
  render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );
  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText(/Algo salió mal/i)).toBeInTheDocument();
});
