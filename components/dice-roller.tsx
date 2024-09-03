'use client';

import { useId, useReducer } from "react";

// ---- TYPES & CONST ----

const ACTIONS = {
  addInitiationDie: 'addInitiationDie',
  removeInitiationDie: 'removeInitiationDie',
  boostInitiation: 'boostInitiation',
  removeInitiationBoost: 'removeInitiationBoost',

  addOppositionDie: 'addOppositionDie',
  removeOppositionDie: 'removeOppositionDie',
  boostOpposition: 'boostOpposition',
  removeOppositionBoost: 'removeOppositionBoost',

  initiateDiceRoll: 'initiateDiceRoll',
  completeDiceRoll: 'completeDiceRoll',
  resetDice: 'resetDice',
} as const;
type DiceRollerAction = keyof typeof ACTIONS;

const DICE_ANIMATION_MS = 1000;

const DICE_VALUES = {
  onePip: 'onePip',
  twoPips: 'twoPips',
  blank: 'blank',
  crit: 'crit',
} as const;
export type DiceValue = keyof typeof DICE_VALUES;

type State = {
  diceRolling: Boolean;
  initiationDice: Array<{
    type: 'initiation' | 'boost';
    isRolling: boolean;
    value?: DiceValue;
    isCanceled: boolean;
  }>,
  oppositionDice: Array<{
    type: 'opposition' | 'boost'
    isRolling: boolean;
    value?: DiceValue;
    isCanceled: boolean;
  }>,
};

// ---- UTILS ----

const INITIATION_DIE = [
  DICE_VALUES.blank,
  DICE_VALUES.onePip,
  DICE_VALUES.twoPips,
  DICE_VALUES.onePip,
  DICE_VALUES.twoPips,
  DICE_VALUES.crit,
] as const;
const OPPOSITION_DIE = [
  DICE_VALUES.blank,
  DICE_VALUES.blank,
  DICE_VALUES.onePip,
  DICE_VALUES.twoPips,
  DICE_VALUES.twoPips,
  DICE_VALUES.crit,
] as const;
function rollD6(dieType: typeof INITIATION_DIE | typeof OPPOSITION_DIE) {
  const randomD6Side = Math.floor(Math.random() * 6);
  return dieType[randomD6Side];
}

const INITIATION_BOOST_DIE = [
  DICE_VALUES.blank,
  DICE_VALUES.onePip,
  DICE_VALUES.onePip,
  // DICE_VALUES.onePip,
  // DICE_VALUES.twoPips,
  DICE_VALUES.crit,
]
const OPPOSITION_BOOST_DIE = [
  DICE_VALUES.blank,
  DICE_VALUES.onePip,
  DICE_VALUES.onePip,
  // DICE_VALUES.onePip,
  // DICE_VALUES.twoPips,
  DICE_VALUES.crit,
];
function rollD4(dieType: typeof INITIATION_BOOST_DIE | typeof OPPOSITION_BOOST_DIE) {
  const randomD4Side = Math.floor(Math.random() * 4);
  return dieType[randomD4Side];
}

// ---- REDUCER ----

const order: Array<DiceValue> = ['onePip', 'twoPips', 'crit', 'blank'];
function sortByDiceValue(a: { value: DiceValue }, b: { value: DiceValue }) {
  const indexA = order.indexOf(a.value);
  const indexB = order.indexOf(b.value);
  return indexA - indexB;
}

function diceRollerReducer(
  { initiationDice, oppositionDice, ...remainingCurState }: State,
  initiation: DiceRollerAction
): State {

  switch(initiation) {
    // -- Initiation Dice --
    // ADD Initiation d6
    case ACTIONS.addInitiationDie:
      return {
        ...remainingCurState,
        initiationDice: [
          { // d6 always go at the front
            type: 'initiation',
            isRolling: false,
            isCanceled: false,
          },
          ...initiationDice.map((initiationDie) => ({ ...initiationDie })),
        ],
        oppositionDice: oppositionDice.map((oppositionDie) => ({ ...oppositionDie })),
      };
    // REMOVE Initiation d6
    case ACTIONS.removeInitiationDie:
      let initiationDieRemoved = false;
      const oneLessInitiationDie = initiationDice.filter(({ type }) => {
        if (!initiationDieRemoved && type === 'initiation') {
          initiationDieRemoved = true;
          return false;
        }
        return true;
      })
      return {
        ...remainingCurState,
        initiationDice: oneLessInitiationDie.map((initiationDie) => ({ ...initiationDie })),
        oppositionDice: oppositionDice.map((oppositionDie) => ({ ...oppositionDie })),
      };
    // BOOST Initiation (d4)
    case ACTIONS.boostInitiation:
      return {
        ...remainingCurState,
        initiationDice: [
          ...initiationDice.map((initiationDie) => ({ ...initiationDie })),
          { // d4 always go at the end
            type: 'boost',
            isRolling: false,
            isCanceled: false,
          },
        ],
        oppositionDice: oppositionDice.map((oppositionDie) => ({ ...oppositionDie })),
      };
    // Remove Initiation BOOST (d4)
    case ACTIONS.removeInitiationBoost:
      let initiationBoostRemoved = false;
      const oneLessInitiationBoost = initiationDice.filter(({ type }) => {
        if (!initiationBoostRemoved && type === 'boost') {
          initiationBoostRemoved = true;
          return false;
        }
        return true;
      })
      return {
        ...remainingCurState,
        initiationDice: oneLessInitiationBoost.map((initiationDie) => ({ ...initiationDie })),
        oppositionDice: oppositionDice.map((oppositionDie) => ({ ...oppositionDie })),
      };
    // -- Opposition Dice --
    // ADD Opposition d6
    case ACTIONS.addOppositionDie:
      return {
        ...remainingCurState,
        initiationDice: initiationDice.map((initiationDie) => ({ ...initiationDie })),
        oppositionDice: [
          { // d6 always go at the front
            type: 'opposition',
            isRolling: false,
            isCanceled: false,
          },
          ...oppositionDice.map((oppositionDie) => ({ ...oppositionDie })),
        ],
      };
    // REMOVE Opposition d6
    case ACTIONS.removeOppositionDie:
      let oppositionDieRemoved = false;
      const oneLessOppositionDie = oppositionDice.filter(({ type }) => {
        if (!oppositionDieRemoved && type === 'opposition') {
          oppositionDieRemoved = true;
          return false;
        }
        return true;
      })
      return {
        ...remainingCurState,
        initiationDice: initiationDice.map((initiationDie) => ({ ...initiationDie })),
        oppositionDice: oneLessOppositionDie.map((oppositionDie) => ({ ...oppositionDie })),
      };
    // BOOST Opposition (d4)
    case ACTIONS.boostOpposition:
      return {
        ...remainingCurState,
        initiationDice: initiationDice.map((initiationDie) => ({ ...initiationDie })),
        oppositionDice: [
          ...oppositionDice.map((oppositionDie) => ({ ...oppositionDie })),
          { // d4 always go at the end
            type: 'boost',
            isRolling: false,
            isCanceled: false,
          },
        ],
      };
    // Remove Opposition BOOST (d4)
    case ACTIONS.removeOppositionBoost:
      let oppositionBoostRemoved = false;
      const oneLessOppositionBoost = oppositionDice.filter(({ type }) => {
        if (!oppositionBoostRemoved && type === 'boost') {
          oppositionBoostRemoved = true;
          return false;
        }
        return true;
      })
      return {
        ...remainingCurState,
        initiationDice: initiationDice.map((initiationDie) => ({ ...initiationDie })),
        oppositionDice: oneLessOppositionBoost.map((oppositionDie) => ({ ...oppositionDie })),
      };
    // Roll Dice
    case ACTIONS.initiateDiceRoll:
      return {
        ...remainingCurState,
        diceRolling: true,
        initiationDice: initiationDice.map((initiationDie) => ({
          ...initiationDie,
          isRolling: true,
          value: undefined,
        })),
        oppositionDice: oppositionDice.map((oppositionDie) => ({
          ...oppositionDie,
          isRolling: true,
          value: undefined,
        })),
      };
    case ACTIONS.completeDiceRoll:
      return {
        ...remainingCurState,
        diceRolling: false,
        initiationDice: initiationDice.map((initiationDie) => ({
          ...initiationDie,
          isRolling: false,
          value: initiationDie.type === 'boost' ? rollD4(INITIATION_BOOST_DIE) : rollD6(INITIATION_DIE),
        })).sort(sortByDiceValue),
        oppositionDice: oppositionDice.map((oppositionDie) => ({
          ...oppositionDie,
          isRolling: false,
          value: oppositionDie.type === 'boost' ? rollD4(OPPOSITION_BOOST_DIE) : rollD6(OPPOSITION_DIE),
        })).sort(sortByDiceValue),
      };
    case ACTIONS.resetDice:
      return {
        ...remainingCurState,
        initiationDice: [],
        oppositionDice: [],
      };
  }
}

// ---- COMPONENT ----

export function DiceRoller() {
  const idPrefix = useId();
  const [state, dispatch] = useReducer(diceRollerReducer, {
    diceRolling: false,
    initiationDice: [],
    oppositionDice: [],
  });

  const { initiationDice, oppositionDice } = state;

  const initiationD6Count = initiationDice.filter(({ type }) => type === 'initiation').length;
  const initiationBoostCount = initiationDice.length - initiationD6Count;

  const oppositionD6Count = oppositionDice.filter(({ type }) => type === 'opposition').length;
  const oppositionBoostCount = oppositionDice.length - oppositionD6Count;

  const handleDiceRoll = () => {
    dispatch(ACTIONS.initiateDiceRoll);
    // @FUTURE: use animation listeners?
    setTimeout(() => {
      dispatch(ACTIONS.completeDiceRoll);
    }, DICE_ANIMATION_MS);
  }

  const handleDiceReset = () => {
    dispatch(ACTIONS.resetDice);
  };

  return (
    <section>
      <div>
        <h3>Initiation Dice</h3>
        <div>
          <button onClick={() => dispatch(ACTIONS.addInitiationDie)}>Add Initiation Die</button>
          <button onClick={() => dispatch(ACTIONS.removeInitiationDie)}>Remove Initiation Die</button>
          <div>
            <label htmlFor={`${idPrefix}initiation-dice-count`}>Initiation Dice (d6)</label>
            <input readOnly id={`${idPrefix}initiation-dice-count`} type="number" value={initiationD6Count} />
          </div>
        </div>

        <div>
          <button onClick={() => dispatch(ACTIONS.boostInitiation)}>Boost Initiation</button>
          <button onClick={() => dispatch(ACTIONS.removeInitiationBoost)}>Remove Initiation Boost</button>
          <div>
            <label htmlFor={`${idPrefix}initiation-boost-count`}>Initiation Boost (d4)</label>
            <input readOnly id={`${idPrefix}initiation-boost-count`} type="number" value={initiationBoostCount} />
          </div>
        </div>
      </div>

      <div>
        <h3>Opposition Dice</h3>
        <div>
          <button onClick={() => dispatch(ACTIONS.addOppositionDie)}>Add Opposition Die</button>
          <button onClick={() => dispatch(ACTIONS.removeOppositionDie)}>Remove Opposition Die</button>
          <div>
            <label htmlFor={`${idPrefix}opposition-dice-count`}>Opposition Dice (d6)</label>
            <input readOnly id={`${idPrefix}opposition-dice-count`} type="number" value={oppositionD6Count} />
          </div>
        </div>

        <div>
          <button onClick={() => dispatch(ACTIONS.boostOpposition)}>Boost Opposition</button>
          <button onClick={() => dispatch(ACTIONS.removeOppositionBoost)}>Remove Opposition Boost</button>
          <div>
            <label htmlFor={`${idPrefix}opposition-boost-count`}>Opposition Boost (d4)</label>
            <input readOnly id={`${idPrefix}opposition-boost-count`} type="number" value={oppositionBoostCount} />
          </div>
        </div>

      </div>

      <div data-testid="dice-tray">
        <h3>Dice Tray</h3>
        <div>
          <button onClick={handleDiceRoll}>Roll Dice</button>
          <button onClick={handleDiceReset}>Reset</button>
        </div>

        <fieldset data-testid="dice-tray-initiation-dice">
          <label>Initiation</label>
          {initiationDice.map(({ isRolling, type, value}, index) => (
            <div
              key={`${idPrefix}rolled-initiation-dice--${index}`}
              data-testid={`${isRolling ? 'rolling' : 'rolled'}-initiation${type === 'boost' ? '-boost' : ''}-die`}
            >
              {type === 'boost' ? 'd4: ' : 'd6: '}
              {isRolling ? 'Rolling...' : value}
            </div>
          ))}
        </fieldset>

        <fieldset data-testid="dice-tray-opposition-dice">
          <label>Opposition</label>
          {oppositionDice.map(({ isRolling, type, value }, index) => (
            <div
              key={`${idPrefix}rolled-opposition-dice--${index}`}
              data-testid={`${isRolling ? 'rolling' : 'rolled'}-opposition${type === 'boost' ? '-boost' : ''}-die`}
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