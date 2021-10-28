import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders home with title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Job Tracker/i);
  expect(titleElement).toBeInTheDocument();
});
