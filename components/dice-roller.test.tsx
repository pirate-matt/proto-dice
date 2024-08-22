import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, within } from '@testing-library/react';
import { DiceRoller } from './dice-roller';

describe('TDD-ing dice-roller', async () => {
  test('Can add action dice and remove', async () => {
    const user = userEvent.setup();
    const expectedLabel = /action dice/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByLabelText(expectedLabel)).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: /add action die/i }));
    expect(await withinContainer.findByLabelText(expectedLabel)).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: /add action die/i }));
    expect(await withinContainer.findByLabelText(expectedLabel)).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: /remove action die/i }));
    expect(await withinContainer.findByLabelText(expectedLabel)).toMatchObject({ value: '1' });
  });

  test('Can add challenge dice and remove', async () => {
    const user = userEvent.setup();
    const expectedLabel = /challenge dice/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByLabelText(expectedLabel)).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: /add challenge die/i }));
    expect(await withinContainer.findByLabelText(expectedLabel)).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: /add challenge die/i }));
    expect(await withinContainer.findByLabelText(expectedLabel)).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: /remove challenge die/i }));
    expect(await withinContainer.findByLabelText(expectedLabel)).toMatchObject({ value: '1' });
  });
});