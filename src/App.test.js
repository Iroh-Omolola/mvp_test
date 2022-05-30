import { render, screen } from '@testing-library/react';
import App from './App';

test('renders  app link', () => {
  render(<App />);
  const linkElement = screen.getByText(/report/i);
  expect(linkElement).toBeInTheDocument();
});
