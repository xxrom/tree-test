import './matchMedia';
import {render, screen} from '@testing-library/react';
import {App} from './App';

test('Render App and find text "Tree"', () => {
  render(<App />);

  const textElement = screen.getByText(/Tree/i);

  expect(textElement).toBeInTheDocument();
});
