import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, within } from '@testing-library/react';
import { DiceRoller } from './dice-roller';

describe('TDD-ing dice-roller', async () => {
  test('Can add action dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /add action die/i;
    const removeName = /remove action die/i;
    const valueLabel = /action dice/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: removeName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '1' });
  });

  test('Can add action boost dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /boost action/i;
    const removeName = /remove action boost/i;
    const valueLabel = /action boost \(d4\)/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: removeName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '1' });
  });


  test('Can add challenge dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /add challenge die/i;
    const removeName = /remove challenge die/i;
    const valueLabel = /challenge dice/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: removeName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '1' });
  });

  test('Can add challenge boost dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /boost challenge/i;
    const removeName = /remove challenge boost/i;
    const valueLabel = /challenge boost \(d4\)/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: removeName }));
    expect(await withinContainer.findByLabelText(valueLabel)).toMatchObject({ value: '1' });
  });

});