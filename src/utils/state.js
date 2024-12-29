import fs from 'fs';

const STATE_FILE = 'commitment-state.json';

export function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

export function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE));
  } catch (error) {
    return {};
  }
}

export function updateState(newState) {
  const currentState = loadState();
  saveState({ ...currentState, ...newState });
  return { ...currentState, ...newState };
}