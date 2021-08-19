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
  PLAYER1,
  PLAYER2,
  NONE,
  TIE,
}

export const COLORS = [
  "#EA3556",
  "#61D2D6"
]

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
 * Represents the game at a state in time. 
 * Storing the game state this way allows each move to be stored as a new entry in the array,
 * and easily revert/undo a move, at the expense of increated memory usage. 
 */
export class GameState {
  board: PLAYERS[][];
  closedBoards: PLAYERS[];
  nextTurn: PLAYERS;
  constructor(){
    this.board = DEFAULT_BOARD();
    this.closedBoards = new Array(8);
    this.nextTurn = PLAYERS.PLAYER1;
  }
}

/**
 * Context object for same global state.
 * I am being a little bit lazy here
 */
export const GlobalContext = React.createContext({
  scene: Scenes.MENU,
  setScene: (newScene: Scenes) => {}
})