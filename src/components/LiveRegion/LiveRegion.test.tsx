import { render, screen } from '@testing-library/react';
import { LiveRegion } from './index';

test('renders message in live region', () => {
  render(<LiveRegion message="test" />);
  const liveElement = screen.getByText('test');
  expect(liveElement).toHaveAttribute('aria-live', 'polite');
});
