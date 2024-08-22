'use client';

import { useId, useReducer } from "react";

// ---- TYPES & CONST ----

const ACTIONS = {
  addActionDie: 'addActionDie',
  removeActionDie: 'removeActionDie',
  boostAction: 'boostAction',
  removeActionBoost: 'removeActionBoost',

  addChallengeDie: 'addChallengeDie',
  removeChallengeDie: 'removeChallengeDie',
  boostChallenge: 'boostChallenge',
  removeChallengeBoost: 'removeChallengeBoost',
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
    // -- Action Dice --
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
      const oneLessActionDie = actionDice.filter(({ type }) => {
        if (!actionDieRemoved && type === 'action') {
          actionDieRemoved = true;
          return false;
        }
        return true;
      })
      return {
        actionDice: oneLessActionDie.map((actionDie) => ({ ...actionDie })),
        challengeDice: challengeDice.map((challengeDie) => ({ ...challengeDie })),
      };
    // BOOST Action (d4)
    case ACTIONS.boostAction:
      return {
        actionDice: [
          ...actionDice.map((actionDie) => ({ ...actionDie })),
          {
            type: 'boost',
            isRolling: false,
            isCanceled: false,
          },
        ],
        challengeDice: challengeDice.map((challengeDie) => ({ ...challengeDie })),
      };
    // Remove Action BOOST (d4)
    case ACTIONS.removeActionBoost:
      let actionBoostRemoved = false;
      const oneLessActionBoost = actionDice.filter(({ type }) => {
        if (!actionBoostRemoved && type === 'boost') {
          actionBoostRemoved = true;
          return false;
        }
        return true;
      })
      return {
        actionDice: oneLessActionBoost.map((actionDie) => ({ ...actionDie })),
        challengeDice: challengeDice.map((challengeDie) => ({ ...challengeDie })),
      };
    // -- Challenge Dice --
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
      const oneLessChallengeDie = challengeDice.filter(({ type }) => {
        if (!challengeDieRemoved && type === 'challenge') {
          challengeDieRemoved = true;
          return false;
        }
        return true;
      })
      return {
        actionDice: actionDice.map((actionDie) => ({ ...actionDie })),
        challengeDice: oneLessChallengeDie.map((challengeDie) => ({ ...challengeDie })),
      };
    // BOOST Challenge (d4)
    case ACTIONS.boostChallenge:
      return {
        actionDice: actionDice.map((actionDie) => ({ ...actionDie })),
        challengeDice: [
          ...challengeDice.map((challengeDie) => ({ ...challengeDie })),
          {
            type: 'boost',
            isRolling: false,
            isCanceled: false,
          },
        ],
      };
    // Remove Challenge BOOST (d4)
    case ACTIONS.removeChallengeBoost:
      let challengeBoostRemoved = false;
      const oneLessChallengeBoost = challengeDice.filter(({ type }) => {
        if (!challengeBoostRemoved && type === 'boost') {
          challengeBoostRemoved = true;
          return false;
        }
        return true;
      })
      return {
        actionDice: actionDice.map((actionDie) => ({ ...actionDie })),
        challengeDice: oneLessChallengeBoost.map((challengeDie) => ({ ...challengeDie })),
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

  const actionD6Count = actionDice.filter(({ type }) => type === 'action').length;
  const actionBoostCount = actionDice.length - actionD6Count;

  const challengeD6Count = challengeDice.filter(({ type }) => type === 'challenge').length;
  const challengeBoostCount = challengeDice.length - challengeD6Count;

  return (
    <section>
      <div>
        <h3>Action Dice</h3>
        <div>
          <button onClick={() => dispatch(ACTIONS.addActionDie)}>Add Action Die</button>
          <button onClick={() => dispatch(ACTIONS.removeActionDie)}>Remove Action Die</button>
          <div>
            <label htmlFor={`${idPrefix}action-dice-count`}>Action Dice (d6)</label>
            <input readOnly id={`${idPrefix}action-dice-count`} type="number" value={actionD6Count} />
          </div>
        </div>

        <div>
          <button onClick={() => dispatch(ACTIONS.boostAction)}>Boost Action</button>
          <button onClick={() => dispatch(ACTIONS.removeActionBoost)}>Remove Action Boost</button>
          <div>
            <label htmlFor={`${idPrefix}action-boost-count`}>Action Boost (d4)</label>
            <input readOnly id={`${idPrefix}action-boost-count`} type="number" value={actionBoostCount} />
          </div>
        </div>
      </div>

      <div>
        <h3>Challenge Dice</h3>
        <div>
          <button onClick={() => dispatch(ACTIONS.addChallengeDie)}>Add Challenge Die</button>
          <button onClick={() => dispatch(ACTIONS.removeChallengeDie)}>Remove Challenge Die</button>
          <div>
            <label htmlFor={`${idPrefix}challenge-dice-count`}>Challenge Dice (d6)</label>
            <input readOnly id={`${idPrefix}challenge-dice-count`} type="number" value={challengeD6Count} />
          </div>
        </div>

        <div>
          <button onClick={() => dispatch(ACTIONS.boostChallenge)}>Boost Challenge</button>
          <button onClick={() => dispatch(ACTIONS.removeChallengeBoost)}>Remove Challenge Boost</button>
          <div>
            <label htmlFor={`${idPrefix}challenge-boost-count`}>Challenge Boost (d4)</label>
            <input readOnly id={`${idPrefix}challenge-boost-count`} type="number" value={challengeBoostCount} />
          </div>
        </div>

      </div>

    </section>
  );
}