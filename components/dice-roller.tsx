'use client';

import { ACTION } from "next/dist/client/components/app-router-headers";
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

  initiateDiceRoll: 'initiateDiceRoll',
  completeDiceRoll: 'completeDiceRoll',
} as const;
type DiceRollerAction = keyof typeof ACTIONS;

const DICE_ANIMATION_MS = 1000;

const DICE_VALUES = {
  onePip: 'onePip',
  twoPips: 'twoPips',
  blank: 'blank',
  crit: 'crit',
} as const;
type DiceValue = keyof typeof DICE_VALUES;

type State = {
  diceRolling: Boolean;
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

// ---- UTILS ----

const ACTION_DIE = [
  DICE_VALUES.blank,
  DICE_VALUES.onePip,
  DICE_VALUES.twoPips,
  DICE_VALUES.onePip,
  DICE_VALUES.twoPips,
  DICE_VALUES.crit,
] as const;
const CHALLENGE_DIE = [
  DICE_VALUES.blank,
  DICE_VALUES.blank,
  DICE_VALUES.onePip,
  DICE_VALUES.twoPips,
  DICE_VALUES.twoPips,
  DICE_VALUES.crit,
] as const;
function rollD6(dieType: typeof ACTION_DIE | typeof CHALLENGE_DIE) {
  const randomD6Side = Math.floor(Math.random() * 6);
  return dieType[randomD6Side];
}

const ACTION_BOOST_DIE = [
  DICE_VALUES.blank,
  DICE_VALUES.onePip,
  DICE_VALUES.twoPips,
  // DICE_VALUES.onePip,
  // DICE_VALUES.twoPips,
  DICE_VALUES.crit,
]
const CHALLENGE_BOOST_DIE = [
  DICE_VALUES.blank,
  DICE_VALUES.onePip,
  DICE_VALUES.twoPips,
  // DICE_VALUES.onePip,
  // DICE_VALUES.twoPips,
  DICE_VALUES.crit,
];
function rollD4(dieType: typeof ACTION_BOOST_DIE | typeof CHALLENGE_BOOST_DIE) {
  const randomD4Side = Math.floor(Math.random() * 4);
  return dieType[randomD4Side];
}

// ---- REDUCER ----

function diceRollerReducer(
  { actionDice, challengeDice, ...remainingCurState }: State,
  action: DiceRollerAction
): State {

  switch(action) {
    // -- Action Dice --
    // ADD Action d6
    case ACTIONS.addActionDie:
      return {
        ...remainingCurState,
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
        ...remainingCurState,
        actionDice: oneLessActionDie.map((actionDie) => ({ ...actionDie })),
        challengeDice: challengeDice.map((challengeDie) => ({ ...challengeDie })),
      };
    // BOOST Action (d4)
    case ACTIONS.boostAction:
      return {
        ...remainingCurState,
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
        ...remainingCurState,
        actionDice: oneLessActionBoost.map((actionDie) => ({ ...actionDie })),
        challengeDice: challengeDice.map((challengeDie) => ({ ...challengeDie })),
      };
    // -- Challenge Dice --
    // ADD Challenge d6
    case ACTIONS.addChallengeDie:
      return {
        ...remainingCurState,
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
        ...remainingCurState,
        actionDice: actionDice.map((actionDie) => ({ ...actionDie })),
        challengeDice: oneLessChallengeDie.map((challengeDie) => ({ ...challengeDie })),
      };
    // BOOST Challenge (d4)
    case ACTIONS.boostChallenge:
      return {
        ...remainingCurState,
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
        ...remainingCurState,
        actionDice: actionDice.map((actionDie) => ({ ...actionDie })),
        challengeDice: oneLessChallengeBoost.map((challengeDie) => ({ ...challengeDie })),
      };
    // Roll Dice
    case ACTIONS.initiateDiceRoll:
      return {
        ...remainingCurState,
        diceRolling: true,
        actionDice: actionDice.map((actionDie) => ({
          ...actionDie,
          isRolling: true,
          value: undefined,
        })),
        challengeDice: challengeDice.map((challengeDie) => ({
          ...challengeDie,
          isRolling: true,
          value: undefined,
        })),
      };
    case ACTIONS.completeDiceRoll:
      return {
        ...remainingCurState,
        diceRolling: false,
        actionDice: actionDice.map((actionDie) => ({
          ...actionDie,
          isRolling: false,
          value: actionDie.type === 'boost' ? rollD4(ACTION_BOOST_DIE) : rollD6(ACTION_DIE),
        })),
        challengeDice: challengeDice.map((challengeDie) => ({
          ...challengeDie,
          isRolling: false,
          value: challengeDie.type === 'boost' ? rollD4(CHALLENGE_BOOST_DIE) : rollD6(CHALLENGE_DIE),
        })),
      };
  }
}

// ---- COMPONENT ----

export function DiceRoller() {
  const idPrefix = useId();
  const [state, dispatch] = useReducer(diceRollerReducer, {
    diceRolling: false,
    actionDice: [],
    challengeDice: [],
  });

  const { actionDice, challengeDice } = state;

  const actionD6Count = actionDice.filter(({ type }) => type === 'action').length;
  const actionBoostCount = actionDice.length - actionD6Count;

  const challengeD6Count = challengeDice.filter(({ type }) => type === 'challenge').length;
  const challengeBoostCount = challengeDice.length - challengeD6Count;

  const handleDiceRoll = () => {
    dispatch(ACTIONS.initiateDiceRoll);
    // @FUTURE: use animation listeners?
    setTimeout(() => {
      dispatch(ACTIONS.completeDiceRoll);
    }, DICE_ANIMATION_MS);
  }

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

      <div>
        <h3>Dice Tray</h3>
        <div>
          <button onClick={handleDiceRoll}>Roll Dice</button>
        </div>

        <fieldset>
          <label>Action</label>
          {actionDice.map(({ isRolling, type, value}, index) => (
            <div
              key={`${idPrefix}rolled-action-dice--${index}`}
              data-testid={`${isRolling ? 'rolling' : 'rolled'}-action${type === 'boost' ? '-boost' : ''}-die`}
            >
              {type === 'boost' ? 'd4: ' : 'd6: '}
              {isRolling ? 'Rolling...' : value}
            </div>
          ))}
        </fieldset>

        <fieldset>
          <label>Challenge</label>
          {challengeDice.map(({ isRolling, type, value }, index) => (
            <div
              key={`${idPrefix}rolled-challenge-dice--${index}`}
              data-testid={`${isRolling ? 'rolling' : 'rolled'}-challenge${type === 'boost' ? '-boost' : ''}-die`}
            >
              {type === 'boost' ? 'd4: ' : 'd6: '}
              {isRolling ? 'Rolling...' : value}
            </div>
          ))}
        </fieldset>

      </div>
    </section>
  );
}