import { describe, expect, test } from 'vitest'
import { render, within } from '@testing-library/react'
import Page from './page'

describe('Superficial page tests', () => {
  test('Heading is defined', () => {
    const { container } = render(<Page />)
    const withinContainer = within(container);
    expect(withinContainer.getByRole('heading', { level: 1 })).toBeDefined();
  });

  test('Dice roller is rendered', () => {
    const { container } = render(<Page />)
    const withinContainer = within(container);
    expect(withinContainer.findByText(/roll/i)).toBeDefined();
  });
});