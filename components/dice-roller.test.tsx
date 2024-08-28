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

  test('Can roll dice', async () => {
    const user = userEvent.setup();

    const { container } = render(<DiceRoller />);
    const withinContainer = within(container);

    await user.click(withinContainer.getByRole('button', { name: /add action die/i }));
    await user.click(withinContainer.getByRole('button', { name: /add action die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost action/i }));

    await user.click(withinContainer.getByRole('button', { name: /add challenge die/i }));
    await user.click(withinContainer.getByRole('button', { name: /boost challenge/i }));

    await user.click(withinContainer.getByRole('button', { name: /roll/i }));

    // Rolling messages check

    const rollingActionDice = await withinContainer.findAllByTestId('rolling-action-die');
    expect(rollingActionDice.length).toBe(2);
    for (const rollingActionDie of rollingActionDice) {
      expect(rollingActionDie.textContent).toMatch(/rolling\.\.\./i);
    }
    const rollingActionBoostDice = await withinContainer.findAllByTestId('rolling-action-boost-die');
    expect(rollingActionBoostDice.length).toBe(1);
    for (const rollingActionBoostDie of rollingActionBoostDice) {
      expect(rollingActionBoostDie.textContent).toMatch(/rolling\.\.\./i);
    }

    const rollingChallengeDice = await withinContainer.findAllByTestId('rolling-challenge-die');
    expect(rollingChallengeDice.length).toBe(1);
    for (const rollingChallengeDie of rollingChallengeDice) {
      expect(rollingChallengeDie.textContent).toMatch(/rolling\.\.\./i);
    }
    const rollingChallengeBoostDice = await withinContainer.findAllByTestId('rolling-challenge-boost-die');
    expect(rollingChallengeBoostDice.length).toBe(1);
    for (const rollingChallengeBoostDie of rollingChallengeBoostDice) {
      expect(rollingChallengeBoostDie.textContent).toMatch(/rolling\.\.\./i);
    }

    // Rolled type check

    const rolledActionDice = await withinContainer.findAllByTestId('rolled-action-die');
    expect(rolledActionDice.length).toBe(2);
    for (const rolledActionDie of rolledActionDice) {
      expect(rolledActionDie.textContent).toMatch(/d6/i);
    }
    const rolledActionBoostDice = await withinContainer.findAllByTestId('rolled-action-boost-die');
    expect(rolledActionBoostDice.length).toBe(1);
    for (const rolledActionBoostDie of rolledActionBoostDice) {
      expect(rolledActionBoostDie.textContent).toMatch(/d4/i);
    }

    const rolledChallengeDice = await withinContainer.findAllByTestId('rolled-challenge-die');
    expect(rolledChallengeDice.length).toBe(1);
    for (const rolledChallengeDie of rolledChallengeDice) {
      expect(rolledChallengeDie.textContent).toMatch(/d6/i);
    }
    const rolledChallengeBoostDice = await withinContainer.findAllByTestId('rolled-challenge-boost-die');
    expect(rolledChallengeBoostDice.length).toBe(1);
    for (const rolledChallengeBoostDie of rolledChallengeBoostDice) {
      expect(rolledChallengeBoostDie.textContent).toMatch(/d4/i);
    }

  });
});