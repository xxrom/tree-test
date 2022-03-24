import '../matchMedia';
import React from 'react';
import {render, screen} from '@testing-library/react';
import {App} from '../App';

test('Render App and find text "Tree"', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tree/i);
  expect(linkElement).toBeInTheDocument();
});
