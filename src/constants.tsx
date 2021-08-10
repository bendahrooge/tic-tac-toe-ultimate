import React from 'react'

export enum Scenes {
  /**
   * The game's starting menu
   */
  MENU,

  /**
   * Game screen where the user can play
   */
  GAME,
}

/**
 * Identifer for each player, as well as the tie and no move cases
 */
export enum PLAYERS {
  NONE,
  PLAYER1,
  PLAYER2,
  TIE,
}

/**
 * The default state where no moves have been made by either party
 * Since imported object in JS are mutable (handled by reference at import), we
 * defined this constant as a function, to allow the game to reset to the blank state
 */
export const DEFAULT_BOARD = () => [
  [PLAYERS.NONE, PLAYERS.NONE, PLAYERS.NONE],
  [PLAYERS.NONE, PLAYERS.NONE, PLAYERS.NONE],
  [PLAYERS.NONE, PLAYERS.NONE, PLAYERS.NONE],
];

/**
 * Corresponds to the entire game table, which is made up of 8 boards
 * @returns
 */
export const DEFAULT_TABLE = () => [
  [DEFAULT_BOARD(), DEFAULT_BOARD(), DEFAULT_BOARD()],
  [DEFAULT_BOARD(), DEFAULT_BOARD(), DEFAULT_BOARD()],
  [DEFAULT_BOARD(), DEFAULT_BOARD(), DEFAULT_BOARD()],
];

/**
 * Context object for same global state.
 * I am being a little bit lazy here
 */
export const GlobalContext = React.createContext({
  scene: Scenes.MENU,
  setScene: (newScene: Scenes) => {}
})