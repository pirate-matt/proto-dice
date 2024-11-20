import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, waitFor, within } from '@testing-library/react';
import { DiceRoller, DiceValue } from './dice-roller';

describe('TDD-ing dice-roller', async () => {
  test('Can add initiation dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /add initiation die/i;
    const removeName = /remove initiation die/i;
    const valueLabel = /initiation d6 dice count/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: removeName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '1' });
  });

  test('Can add initiation boost dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /boost initiation/i;
    const removeName = /remove initiation boost/i;
    const valueLabel = /initiation boost dice count/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: removeName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '1' });
  });


  test('Can add opposition dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /add opposition die/i;
    const removeName = /remove opposition die/i;
    const valueLabel = /opposition d6 dice count/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: removeName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '1' });
  });

  test('Can add opposition boost dice and remove', async () => {
    const user = userEvent.setup();
    const addName = /boost opposition/i;
    const removeName = /remove opposition boost/i;
    const valueLabel = /opposition boost dice count/i;

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '0' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '1' });

    await user.click(withinContainer.getByRole('button', { name: addName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '2' });

    await user.click(withinContainer.getByRole('button', { name: removeName }));
    expect(await withinContainer.findByRole('spinbutton', { name: valueLabel })).toMatchObject({ value: '1' });
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

    // Rolling animation check
    const rollingInitiationDice = await withinContainer.findAllByTitle(/initiation die showing rolling animation/i);
    expect(rollingInitiationDice.length).toBe(2);

    const rollingInitiationBoostDice = await withinContainer.findAllByTitle(/initiation boost die showing rolling animation/i);
    expect(rollingInitiationBoostDice.length).toBe(1);

    const rollingOppositionDice = await withinContainer.findAllByTitle(/opposition die showing rolling animation/i);
    expect(rollingOppositionDice.length).toBe(1);

    const rollingOppositionBoostDice = await withinContainer.findAllByTitle(/opposition boost die showing rolling animation/i);
    expect(rollingOppositionBoostDice.length).toBe(1);

    // Result check - wait for rolling animations to complete
    await waitFor (() => {
      expect(withinContainer.queryByTitle(/initiation die showing rolling animation/i)).toBeNull();
      expect(withinContainer.queryByTitle(/initiation boost die showing rolling animation/i)).toBeNull();
      expect(withinContainer.queryByTitle(/opposition die showing rolling animation/i)).toBeNull();
      expect(withinContainer.queryByTitle(/opposition boost die showing rolling animation/i)).toBeNull();
    });

    const rolledInitiationDice = await withinContainer.findAllByTitle(/initiation die showing (blank|one pip|two pips|crit)/i);
    expect(rolledInitiationDice.length).toBe(2);

    const rolledInitiationBoostDice = await withinContainer.findAllByTitle(/initiation boost die showing (blank|one pip|crit)/i);
    expect(rolledInitiationBoostDice.length).toBe(1);

    const rolledOppositionDice = await withinContainer.findAllByTitle(/opposition die showing (blank|one pip|two pips|crit)/i);
    expect(rolledOppositionDice.length).toBe(1);

    const rolledOppositionBoostDice = await withinContainer.findAllByTitle(/opposition boost die showing (blank|one pip|crit)/i);
    expect(rolledOppositionBoostDice.length).toBe(1);
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

    // Wait for rolling animation to complete
    await waitFor(() => {
      expect(withinContainer.queryByTitle(/initiation die showing rolling animation/i)).toBeNull();
      expect(withinContainer.queryByTitle(/initiation boost die showing rolling animation/i)).toBeNull();
      expect(withinContainer.queryByTitle(/opposition die showing rolling animation/i)).toBeNull();
      expect(withinContainer.queryByTitle(/opposition boost die showing rolling animation/i)).toBeNull();
    });

    const order = ['onePip', 'twoPips', 'crit', 'blank'];

    const initiationDice = await withinContainer.findAllByTitle(/initiation (?:boost )?die showing (blank|one pip|two pips|crit)/i);

    let initiationDiceCurrentOrderIndex = order.findIndex((orderValue) => initiationDice[0].textContent?.match(orderValue));

    for (const initiationDie of Array.from(initiationDice)) {
      const dieText = initiationDie.textContent || '';
      const newOrderIndex = order.findIndex(
        (orderValue) => dieText.match(new RegExp(orderValue, 'i')),
      );
      expect(newOrderIndex, `Could not find ${dieText}`).toBeGreaterThan(-1);

      const diff = initiationDiceCurrentOrderIndex - newOrderIndex;
      expect(diff === 0 || diff === -1, `Incorrect order detected ${order[initiationDiceCurrentOrderIndex]} --> ${dieText}`).toBe(true);

      initiationDiceCurrentOrderIndex = newOrderIndex;
    }

    const oppositionDice = await withinContainer.findAllByTitle(/opposition (?:boost )?die showing (blank|one pip|two pips|crit)/i);

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

  test('Reset dice button removes all added dice and boost dice', async () => {
    const user = userEvent.setup();

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);
    const withinDiceTray = within(await withinContainer.findByTestId('dice-tray'));

    // Add some initiation dice and boost dice
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add initiation die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost initiation/i }));

    // Add some opposition dice and boost dice
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add opposition die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost opposition/i }));

    // Verify that dice have been added
    expect(withinDiceTray.getAllByTitle(/initiation die showing (blank|one pip|two pips|crit)/i)).toHaveLength(2);
    expect(withinDiceTray.getAllByTitle(/initiation boost die showing (blank|one pip|crit)/i)).toHaveLength(1);
    expect(withinDiceTray.getAllByTitle(/opposition die showing (blank|one pip|two pips|crit)/i)).toHaveLength(2);
    expect(withinDiceTray.getAllByTitle(/opposition boost die showing (blank|one pip|crit)/i)).toHaveLength(1);

    // Click the reset button
    await user.click(withinDiceTray.getByRole('button', { name: /reset/i }));

    // Verify that all dice have been removed
    expect(withinDiceTray.queryAllByTitle(/initiation die showing (blank|one pip|two pips|crit)/i)).toHaveLength(0);
    expect(withinDiceTray.queryAllByTitle(/initiation boost die showing (blank|one pip|crit)/i)).toHaveLength(0);
    expect(withinDiceTray.queryAllByTitle(/opposition die showing (blank|one pip|two pips|crit)/i)).toHaveLength(0);
    expect(withinDiceTray.queryAllByTitle(/opposition boost die showing (blank|one pip|crit)/i)).toHaveLength(0);
  });
});