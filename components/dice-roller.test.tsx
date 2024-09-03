import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, within } from '@testing-library/react';
import { DiceRoller, DiceValue } from './dice-roller';

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

  test('Added dice are displayed in descending size order', async () => {
    const user = userEvent.setup();

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    // intentionally add them "out of order"
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));

    const diceTrayInitiationDice = await withinContainer.findByTestId('dice-tray-initiation-dice');
    const initiationDice = diceTrayInitiationDice.querySelectorAll('div');
    expect(initiationDice.length).toBe(3);
    expect(initiationDice[0].textContent).toMatch(/d6/i);
    expect(initiationDice[1].textContent).toMatch(/d6/i);
    expect(initiationDice[2].textContent).toMatch(/d4/i);

    // intentionally add them "out of order"
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));

    const diceTrayOppositionDice = await withinContainer.findByTestId('dice-tray-opposition-dice');
    const oppositionDice = diceTrayOppositionDice.querySelectorAll('div');
    expect(oppositionDice.length).toBe(3);
    expect(oppositionDice[0].textContent).toMatch(/d6/i);
    expect(oppositionDice[1].textContent).toMatch(/d6/i);
    expect(oppositionDice[2].textContent).toMatch(/d4/i);
  });

  test('Rolled dice are displayed in descending result order', async () => {
    const user = userEvent.setup();

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    // Add a whole lot of dice to decrease the chances all of the dice will already be ordered
    // and reduce the chance they all roll the same value.
    // Add them intentionally add them "out of order".
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));

    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));

    await user.click(withinContainer.getByRole('button', { name: /roll/i }));
    // Wait for the dice to finish rolling
    await withinContainer.findAllByTestId('rolled-initiation-die');
    await withinContainer.findAllByTestId('rolled-opposition-die');
    const order = ['onePip', 'twoPips', 'crit', 'blank'];

    const diceTrayInitiationDice = await withinContainer.findByTestId('dice-tray-initiation-dice');
    const initiationDice = diceTrayInitiationDice.querySelectorAll('div');

    let initiationDiceCurrentOrderIndex = order.findIndex((orderValue) => initiationDice[0].textContent?.match(orderValue));

    for (const initiationDie of Array.from(initiationDice)) {
      const dieText = initiationDie.textContent || '';
      console.log('dieText', dieText);
      const newOrderIndex = order.findIndex(
        (orderValue) => dieText.match(new RegExp(orderValue, 'i')),
      );
      expect(newOrderIndex, `Could not find ${dieText}`).toBeGreaterThan(-1);

      const diff = initiationDiceCurrentOrderIndex - newOrderIndex;
      expect(diff === 0 || diff === -1, `Incorrect order detected ${order[initiationDiceCurrentOrderIndex]} --> ${dieText}`).toBe(true);

      initiationDiceCurrentOrderIndex = newOrderIndex;
    }

    const diceTrayOppositionDice = await withinContainer.findByTestId('dice-tray-opposition-dice');
    const oppositionDice = diceTrayOppositionDice.querySelectorAll('div');

    let oppositionDiceCurrentOrderIndex = order.findIndex((orderValue) => oppositionDice[0].textContent?.match(orderValue));

    for (const oppositionDie of Array.from(oppositionDice)) {
      const dieText = oppositionDie.textContent || '';
      const newOrderIndex = order.findIndex(
        (orderValue) => dieText.match(new RegExp(orderValue, 'i')),
      );
      expect(newOrderIndex, `Could not find ${dieText}`).toBeGreaterThan(-1);

      const diff = oppositionDiceCurrentOrderIndex - newOrderIndex;
      expect(diff === 0 || diff === -1, `Incorrect order detected ${order[oppositionDiceCurrentOrderIndex]} --> ${dieText}`).toBe(true);

      oppositionDiceCurrentOrderIndex = newOrderIndex;
    }
  });
});