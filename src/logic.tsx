import { PLAYERS } from "./constants";

/**
 * Determines if a sub-board has possible moves, therefore if it is a valid restriction
 * @param subBoard 
 */
export const BoardHasPossibleMoves = (subBoard: []) => {
    for(var i = 0; i < subBoard.length; i++){
        if(subBoard[i] === PLAYERS.NONE){
            return true;
        }
    }

    return false;
}

/**
 * 
 * @param subboard 
 * @returns PLAYER.NONE, 1, 2
 */
export const DetermineBoardWinner = (subboard: []) => {
    // Hori
    // Vert
    // Diag 1 
    // Diag 2
}

/**
 * Checks for each board and builds a mocked sub-board which is again checked
 * @param currentBoard 
 * @returns PLAYER.NONE, 1, 2
 */
export const DetermineGameWiner = (currentBoard: any) => [

]

export const DetermineIfMoveRestrictionsSastified = (
  currentBoard: any,
  proposedMove: [board: number, cell: number],
  restriction: number
) => {
  console.log(currentBoard);
  console.log(proposedMove[0]);
  console.log(proposedMove[1]);

    // If exising cell has move


    // If proposed move violdates the resitrction 

};

