import React, { useState, useReducer } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { DEFAULT_TABLE, PLAYERS, COLORS, GameState } from "./constants";
import { PlayerIndicator, PlayerLabel } from "./Player";
import { BoardHasPossibleMoves, DetermineBoardWinner } from "./logic";

/**
 * Calls the matchHandler if any of the targets match the source
 * @param source The cell number of the current cell
 * @param targets The cell number targets
 * @param matchHandler The function that will be called on match
 */
const matchesAny = (source: any, targets: any[], matchHandler: () => void) => {
  targets.forEach((element: any) => {
    if (source === element) {
      matchHandler();
    }
  });
};

const CellBorders = (sequence: number) => {
  let cellStyles: any[] = [];

  matchesAny(sequence, [0, 1, 2], () => {
    cellStyles.push(styles.noBorderTop);
  });

  matchesAny(sequence, [0, 3, 6], () => {
    cellStyles.push(styles.noBorderLeft);
  });

  matchesAny(sequence, [2, 5, 8], () => {
    cellStyles.push(styles.noBorderRight);
  });

  matchesAny(sequence, [6, 7, 8], () => {
    cellStyles.push(styles.noBorderBottom);
  });

  return cellStyles;
};

export default function Board(props: any) {
  const [gameStack, setGameStack] = useState([new GameState()]);
  const [undoAllow, setUndoAllow] = useState(false);

  const Cell = (props: any) => {
    let board = props.location[0] * 3 + props.location[1];
    let cell = props.location[2] * 3 + props.location[3];

    const onMove = (location: any) => {
      console.log(
        `The player moved into cell 1D ${location[2] * 3 + location[3]} or 2D ${
          location[2]
        },${location[3]}`
      );

      // Determine if move is valid

      // Is there already move in this cell
      if (
        gameStack[gameStack.length - 1].board[location[0]][location[1]][
          location[2]
        ][location[3]] != PLAYERS.NONE
      ) {
        return;
      }

      // @TODO
      // Was this board valid based on the precding cell restructuons?
      if (gameStack[gameStack.length - 1].nextMoveRestriction != -1) {
        if (
          location[0] * 3 + location[1] !=
          gameStack[gameStack.length - 1].nextMoveRestriction
        ) {
          // Display an error message to the user?
          return;
        }
      }

      // Create a new instance to store this's moves game information
      let thisMove = new GameState();

      // Copy existing moves and closed boards
      // This JSON parsing is a tempoary fix to copying arrays immutably i swear (double nested arrays are hard)
      // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
      thisMove.board = JSON.parse(
        JSON.stringify(gameStack[gameStack.length - 1].board)
      );

      thisMove.closedBoards = Object.assign(
        [],
        gameStack[gameStack.length - 1].closedBoards
      );

      // Move the player
      thisMove.board[location[0]][location[1]][location[2]][location[3]] =
        gameStack[gameStack.length - 1].nextTurn;

      // Unlock undo more if it was locked
      setUndoAllow(true);

      // Determine if any board winner(s) and update closed boards
      let boardNumber = 0;
      thisMove.board.forEach((row) => {
        row.forEach((board) => {
          if (DetermineBoardWinner(board) != PLAYERS.NONE) {
            // Consider this a closed board
            thisMove.closedBoards[boardNumber] = DetermineBoardWinner(board);

            // Consider preventing the undo button in this case since a win more was likely intentional
            setUndoAllow(false);
          }

          boardNumber++;
        });
      });

      // @TODO set restriction for next player if there is one

      // If the board is not closed AND there are moves avaiable in the target board, then
      // sent the move restriction to the target board
      if (
        BoardHasPossibleMoves(thisMove.board[location[2]][location[3]]) &&
        thisMove.closedBoards[location[2] * 3 + location[3]] === PLAYERS.NONE
      ) {
        // The next move must go in this specific square
        thisMove.nextMoveRestriction = location[2] * 3 + location[3];
        console.log(
          `Set a move restriction for ${location[2] * 3 + location[3]}`
        );
      }

      // Flip the turn to the other player if it will be player 2's move
      // The next player is player1 by default (see class consturctor)
      if (gameStack[gameStack.length - 1].nextTurn === PLAYERS.PLAYER1) {
        thisMove.nextTurn = PLAYERS.PLAYER2;
      }

      // Push the end of the stack
      setGameStack([...gameStack, thisMove]);

      // TODO Check if there is a winner
    };

    let thisCellHighlighted =
      // Check if move retriction is defined, or -1 for open move
      (gameStack[gameStack.length - 1].nextMoveRestriction ===
        props.location[0] * 3 + props.location[1] ||
        gameStack[gameStack.length - 1].nextMoveRestriction === -1) &&

      // Make sure that they cell is not already occupied 
      props.data === PLAYERS.NONE;

    return (
      <Pressable
        onPressIn={() => {
          onMove(props.location);
        }}
      >
        <View
          style={[
            styles.miniItem,
            ...CellBorders(cell),
            // Sets a background color indicator for move restrictions
            thisCellHighlighted ? styles.mustMoveBoard : null,
          ]}
        >
          {/* <Text style={styles.label}> */}
          {/* {Pla(
              gameStack[gameStack.length - 1].board[props.location[0]][props.location[1]][
                props.location[2]
              ][props.location[3]]
            )} */}
          <PlayerLabel
            // data={
            //   props.gameState.board[props.location[0]][props.location[1]][
            //     props.location[2]
            //   ][props.location[3]]
            // }
            data={props.data}
          />
          {/* B{board} */}
          {/* C{cell} */}
          {/* B{props.location[0]},{props.location[1]} */}
          {/* C{props.location[2]},{props.location[3]} */}
          {/* </Text> */}
        </View>
      </Pressable>
    );
  };

  const InnerRow = (props: any) => (
    <View style={[styles.miniRow]}>
      <Cell
        location={[...props.location, 0]}
        data={
          gameStack[gameStack.length - 1].board[props.location[0]][
            props.location[1]
          ][props.location[2]][0]
        }
        gameState={gameStack[gameStack.length - 1]}
      />
      <Cell
        location={[...props.location, 1]}
        data={
          gameStack[gameStack.length - 1].board[props.location[0]][
            props.location[1]
          ][props.location[2]][1]
        }
        gameState={gameStack[gameStack.length - 1]}
      />
      <Cell
        location={[...props.location, 2]}
        data={
          gameStack[gameStack.length - 1].board[props.location[0]][
            props.location[1]
          ][props.location[2]][2]
        }
        gameState={gameStack[gameStack.length - 1]}
      />
    </View>
  );

  const InnerBoard = (props: any) => (
    <View
      style={[
        styles.item,

        // Sets the borders based on this subboard's location
        ...CellBorders(props.location[0] * 3 + props.location[1]),
      ]}
    >
      {/* <Text>{props.location[0] * 3 + props.location[1]}</Text> */}
      {gameStack[gameStack.length - 1].closedBoards[
        props.location[0] * 3 + props.location[1]
      ] != PLAYERS.NONE && <Text>Closed</Text>}
      <InnerRow location={[...props.location, 0]} />
      <InnerRow location={[...props.location, 1]} />
      <InnerRow location={[...props.location, 2]} />
    </View>
  );

  const Row = (props: any) => (
    <View style={styles.row}>
      {/* <Text>{props.location[0]}</Text> */}
      <InnerBoard location={[...props.location, 0]} />
      <InnerBoard location={[...props.location, 1]} />
      <InnerBoard location={[...props.location, 2]} />
    </View>
  );

  /**
   * Rows of the main board
   */
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>---Logo goes here---</Text>
      </View>
      <View>
        <PlayerIndicator
          playerName="Player X"
          active={gameStack[gameStack.length - 1].nextTurn === PLAYERS.PLAYER1}
          color={COLORS[0]}
        />
        <PlayerIndicator
          playerName="Player O"
          active={gameStack[gameStack.length - 1].nextTurn === PLAYERS.PLAYER2}
          color={COLORS[1]}
        />
      </View>
      <Row location={[0]} />
      <Row location={[1]} />
      <Row location={[2]} />
      <View
        style={[
          undoBtnStyles.default,
          !undoAllow ? undoBtnStyles.disabled : null,
        ]}
      >
        <Pressable
          onPress={() => {
            if (undoAllow) {
              setGameStack([...gameStack, gameStack[gameStack.length - 2]]);
              setUndoAllow(false);
            }
          }}
        >
          <Text>Undo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 325,
    textAlign: "center",
    // padding: 25
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: "center",
    flexDirection: "row",
  },
  miniRow: {
    justifyContent: "center",
    flexDirection: "row",
  },
  item: {
    backgroundColor: "#ddd",
    // margin: 5,
    borderWidth: 5,
    // borderColor: "red",
  },
  miniItem: {
    height: 35,
    width: 35,
    backgroundColor: "#ddd",
    // margin: 5,
    // padding: 5,
    // cursor: "pointer",
    borderWidth: 2,
    borderColor: "#75848A",
  },
  btn: {
    padding: 20,
    marginTop: 20,
    width: 225,
    borderRadius: 10,
    backgroundColor: "dodgerblue",
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  noBorderLeft: {
    borderLeftWidth: 0,
  },
  noBorderRight: {
    borderRightWidth: 0,
  },
  noBorderTop: {
    borderTopWidth: 0,
  },
  noBorderBottom: {
    borderBottomWidth: 0,
  },
  // Cell style when cell is allowed to be moved in
  mustMoveBoard: {
    backgroundColor: "#98ffcc", //#EBF30C // #F7B9DD
  },
});

const undoBtnStyles = StyleSheet.create({
  default: {
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  disabled: {
    backgroundColor: "gray",
  },
});
