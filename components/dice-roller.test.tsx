import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, within } from '@testing-library/react';
import { DiceRoller } from './dice-roller';

describe('TDD-ing dice-roller', async () => {
  test('Can add initiation dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /add initiation die/i;
    const removeName = /remove initiation die/i;
    const valueLabel = /initiation dice/i;

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

  test('Can add initiation boost dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /boost initiation/i;
    const removeName = /remove initiation boost/i;
    const valueLabel = /initiation boost \(d4\)/i;

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


  test('Can add opposition dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /add opposition die/i;
    const removeName = /remove opposition die/i;
    const valueLabel = /opposition dice/i;

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

  test('Can add opposition boost dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /boost opposition/i;
    const removeName = /remove opposition boost/i;
    const valueLabel = /opposition boost \(d4\)/i;

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

  test('Can roll dice', async () => {
    const user = userEvent.setup();

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));

    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));

    await user.click(withinContainer.getByRole('button', { name: /roll/i }));

    // Rolling messages check

    const rollingInitiationDice = await withinContainer.findAllByTestId('rolling-initiation-die');
    expect(rollingInitiationDice.length).toBe(2);
    for (const rollingInitiationDie of rollingInitiationDice) {
      expect(rollingInitiationDie.textContent).toMatch(/rolling\.\.\./i);
    }
    const rollingInitiationBoostDice = await withinContainer.findAllByTestId('rolling-initiation-boost-die');
    expect(rollingInitiationBoostDice.length).toBe(1);
    for (const rollingInitiationBoostDie of rollingInitiationBoostDice) {
      expect(rollingInitiationBoostDie.textContent).toMatch(/rolling\.\.\./i);
    }

    const rollingOppositionDice = await withinContainer.findAllByTestId('rolling-opposition-die');
    expect(rollingOppositionDice.length).toBe(1);
    for (const rollingOppositionDie of rollingOppositionDice) {
      expect(rollingOppositionDie.textContent).toMatch(/rolling\.\.\./i);
    }
    const rollingOppositionBoostDice = await withinContainer.findAllByTestId('rolling-opposition-boost-die');
    expect(rollingOppositionBoostDice.length).toBe(1);
    for (const rollingOppositionBoostDie of rollingOppositionBoostDice) {
      expect(rollingOppositionBoostDie.textContent).toMatch(/rolling\.\.\./i);
    }

    // Rolled type check

    const rolledInitiationDice = await withinContainer.findAllByTestId('rolled-initiation-die');
    expect(rolledInitiationDice.length).toBe(2);
    for (const rolledInitiationDie of rolledInitiationDice) {
      expect(rolledInitiationDie.textContent).toMatch(/d6/i);
    }
    const rolledInitiationBoostDice = await withinContainer.findAllByTestId('rolled-initiation-boost-die');
    expect(rolledInitiationBoostDice.length).toBe(1);
    for (const rolledInitiationBoostDie of rolledInitiationBoostDice) {
      expect(rolledInitiationBoostDie.textContent).toMatch(/d4/i);
    }

    const rolledOppositionDice = await withinContainer.findAllByTestId('rolled-opposition-die');
    expect(rolledOppositionDice.length).toBe(1);
    for (const rolledOppositionDie of rolledOppositionDice) {
      expect(rolledOppositionDie.textContent).toMatch(/d6/i);
    }
    const rolledOppositionBoostDice = await withinContainer.findAllByTestId('rolled-opposition-boost-die');
    expect(rolledOppositionBoostDice.length).toBe(1);
    for (const rolledOppositionBoostDie of rolledOppositionBoostDice) {
      expect(rolledOppositionBoostDie.textContent).toMatch(/d4/i);
    }

  });
});