import { describe, expect, test } from 'vitest'
import { render, within } from '@testing-library/react'
import Page from './page'

// @FUTURE: replace me with useful tests
describe('Hello World faux unit tests', () => {
  test('Heading is defined (existing test)', () => {
    const { container } = render(<Page />)
    const withinContainer = within(container);
    expect(withinContainer.getByRole('heading', { name: /hello world/i })).toBeDefined();
  });


  test('Displays unit tests setup message (TDD)', () => {
    const { container } = render(<Page />)
    const withinContainer = within(container);
    expect(withinContainer.findByText(/unit tests setup/i)).toBeDefined();
  });
});