import { PLAYERS } from "./constants";

/**
 * Determines if a sub-board has possible moves, therefore if it is a valid restriction
 * @param subBoard 
 */
export const BoardHasPossibleMoves = (subBoard: any) => {
    for(var i = 0; i < subBoard.length; i++){
        for(var x = 0; x < subBoard[i].length; x++){
            if(subBoard[i][x] === PLAYERS.NONE){
                return true;
            }
        }
    }

    return false;
}

/**
 * Determines if a subboard contains a winner
 * @param subboard 
 * @returns PLAYERS.NONE, 1, 2
 */
export const DetermineBoardWinner = (subboard: PLAYERS[][]) => {
    
    // Hori
    for(var i = 0; i < 3; i++){
        if(subboard[i][0] != PLAYERS.NONE && subboard[i][0] === subboard[i][1] && subboard[i][0] === subboard[i][2]){
            return subboard[i][0];
        }
    }

    // Vert
    for(var i = 0; i < 3; i++){
        if(subboard[0][i] != PLAYERS.NONE && subboard[0][i] === subboard[1][i] && subboard[0][i] === subboard[2][i]){
            return subboard[0][i];
        }
    }

    // Diag 1 
    if(subboard[0][0] != PLAYERS.NONE && subboard[0][0] === subboard[1][1] && subboard[0][0] === subboard[2][2]){
        return subboard[0][0]
    }

    // Diag 2
    if(subboard[0][2] != PLAYERS.NONE && subboard[0][2] === subboard[1][1] && subboard[0][2] === subboard[2][0]){
        return subboard[0][2]
    }

    // Tie case 
    if(!BoardHasPossibleMoves(subboard)){
        return PLAYERS.TIE;
    }

    return PLAYERS.NONE
}

/**
 * Checks for each board and builds a mocked sub-board which is again checked
 * @param currentBoard 
 * @returns PLAYER.NONE, 1, 2
 */
export const DetermineGameWiner = (currentBoard: any) => {
    // Build 2D array out of closed boards
    let board2D: any[][] = [];
    for(var i = 0; i < 3; i++){
        let row = [];
        for(var j = 0; j < 3; j++){
            row.push(currentBoard[i * 3 + j])
        }
        board2D.push(row);
    }


    console.log(board2D)
    console.log(`Game winner: ${DetermineBoardWinner(board2D)} `);

    return DetermineBoardWinner(board2D);
}

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

