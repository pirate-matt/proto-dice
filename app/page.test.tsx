import { describe, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Page from './page'

// @FUTURE: replace me with useful tests
describe('Hello World faux unit tests', () => {
  test('Heading is defined (existing test)', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { name: /hello world/i })).toBeDefined();
  });


  test('Displays unit tests setup message (TDD)', () => {
    render(<Page />);
    expect(screen.findByText(/unit tests setup/i)).toBeDefined();
  });
});