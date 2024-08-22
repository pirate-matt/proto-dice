'use client';

import { useId, useReducer } from "react";

// ---- TYPES & CONST ----

const ACTIONS = {
  addActionDie: 'addActionDie',
  removeActionDie: 'removeActionDie',
  addChallengeDie: 'addChallengeDie',
  removeChallengeDie: 'removeChallengeDie',
} as const;
type DiceRollerAction = keyof typeof ACTIONS;

const DICE_VALUES = {
  onePip: 'onePip',
  twoPips: 'twoPips',
  blank: 'blank',
  crit: 'crit',
};
type DiceValue = keyof typeof DICE_VALUES;

type State = {
  actionDice: Array<{
    type: 'action' | 'boost';
    isRolling: boolean;
    value?: DiceValue;
    isCanceled: boolean;
  }>,
  challengeDice: Array<{
    type: 'challenge' | 'boost'
    isRolling: boolean;
    value?: DiceValue;
    isCanceled: boolean;
  }>,
};

// ---- REDUCER ----

function diceRollerReducer(
  { actionDice, challengeDice }: State,
  action: DiceRollerAction
): State {

  switch(action) {
    // ADD Action d6
    case ACTIONS.addActionDie:
      return {
        actionDice: [
          ...actionDice.map((actionDie) => ({ ...actionDie })),
          {
            type: 'action',
            isRolling: false,
            isCanceled: false,
          },
        ],
        challengeDice: challengeDice.map((challengeDie) => ({ ...challengeDie })),
      };
    // REMOVE Action d6
    case ACTIONS.removeActionDie:
      let actionDieRemoved = false;
      const oneLessActionDie = actionDice.filter((actionDie) => {
        if (!actionDieRemoved && actionDie.type === 'action') {
          actionDieRemoved = true;
          return false;
        }
        return true;
      })
      return {
        actionDice: oneLessActionDie.map((actionDie) => ({ ...actionDie })),
        challengeDice: challengeDice.map((challengeDie) => ({ ...challengeDie })),
      };
    // ADD Challenge d6
    case ACTIONS.addChallengeDie:
      return {
        actionDice: actionDice.map((actionDie) => ({ ...actionDie })),
        challengeDice: [
          ...challengeDice.map((challengeDie) => ({ ...challengeDie })),
          {
            type: 'challenge',
            isRolling: false,
            isCanceled: false,
          },
        ],
      };
    // REMOVE Challenge d6
    case ACTIONS.removeChallengeDie:
      let challengeDieRemoved = false;
      const oneLessChallengeDie = challengeDice.filter((challengeDie) => {
        if (!challengeDieRemoved && challengeDie.type === 'challenge') {
          challengeDieRemoved = true;
          return false;
        }
        return true;
      })
      return {
        actionDice: actionDice.map((actionDie) => ({ ...actionDie })),
        challengeDice: oneLessChallengeDie.map((challengeDie) => ({ ...challengeDie })),
      };
  }
}

// ---- COMPONENT ----

export function DiceRoller() {
  const idPrefix = useId();
  const [state, dispatch] = useReducer(diceRollerReducer, {
    actionDice: [],
    challengeDice: [],
  });

  const { actionDice, challengeDice } = state;

  return (
    <section>
      <div>
        <h3>Action Dice</h3>
        <button onClick={() => dispatch(ACTIONS.addActionDie)}>Add Action Die</button>
        <button onClick={() => dispatch(ACTIONS.removeActionDie)}>Remove Action Die</button>
        <div>
          <label htmlFor={`${idPrefix}action-dice-count`}>Action Dice (d6)</label>
          <input readOnly id={`${idPrefix}action-dice-count`} type="number" value={actionDice.length} />
        </div>
      </div>

      <div>
        <h3>Challenge Dice</h3>
        <button onClick={() => dispatch(ACTIONS.addChallengeDie)}>Add Challenge Die</button>
        <button onClick={() => dispatch(ACTIONS.removeChallengeDie)}>Remove Challenge Die</button>
        <div>
          <label htmlFor={`${idPrefix}challenge-dice-count`}>Challenge Dice (d6)</label>
          <input readOnly id={`${idPrefix}challenge-dice-count`} type="number" value={challengeDice.length} />
        </div>
      </div>

    </section>
  );
}