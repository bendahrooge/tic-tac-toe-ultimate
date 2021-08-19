import React, { useState, useReducer } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { DEFAULT_TABLE, PLAYERS, COLORS, GameState } from "./constants";
import { PlayerIndicator, PlayerLabel } from "./Player";

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
  // const [gameState, setGameState] = useState(new GameState)

  // const PlayerToSymbol = (Player: PLAYERS) => {
  //   if (Player === PLAYERS.NONE) {
  //     return "";
  //   }
  //   if (Player === PLAYERS.PLAYER1) {
  //     return "X";
  //   }
  //   if (Player === PLAYERS.PLAYER2) {
  //     return "O";
  //   }
  // };

  const Cell = (props: any) => {
    let board = props.location[0] * 3 + props.location[1];
    let cell = props.location[2] * 3 + props.location[3];

    const onMove = (location: any) => {
      // let mostRecentMoveState = gameStack[gameStack.length - 1];

      // Determine if move is valid

      // Is there already move in this cell
      if (
        gameStack[gameStack.length - 1].board[location[0]][location[1]][location[2]][
          location[3]
        ] != PLAYERS.NONE
      ) {
        return;
      }

      // @TODO
      // Was this board valid based on the precding cell restructuons?
      if (false) {
        return;
      }

      // Create a new instance to store this's moves game information
      // let thisMove = new GameState();
      // console.log(thisMove);
      let thisMove = Object.assign(Object.create(Object.getPrototypeOf(gameStack[gameStack.length - 1])), gameStack[gameStack.length - 1])

      // Copy existing moves and closed boards
      // thisMove.board = Object.assign([], gameStack[gameStack.length - 1]);

      // thisMove.board = Array.from(gameStack[gameStack.length - 1].board)

      // console.log(mostRecentMoveState.board)
      console.log(gameStack)

      // mostRecentMoveState.board.forEach((row, index) => {
      //   row.forEach((cell, entry) => {
      //     // thisMove.board[index][entry] = cell
      //     if(cell === PLAYERS.PLAYER1){

      //     }
      //   });
      // });

      for(let x = 0; x < 3; x++){
        for(let y = 0; y < 3; y++){
          // thisMove.board[x][y] = mostRecentMoveState.board[x][y]
          // if(mostRecentMoveState.board[x][y] === PLAYERS.PLAYER1){

          // }
          // thisMove.board[x][y] = Object.assign({}, mostRecentMoveState.board[x][y])
        }
      }



      // Object.assign([], mostRecentMoveState.closedBoards);
      // thisMove.board = mostRecentMoveState.board;
      // thisMove.closedBoards = mostRecentMoveState.closedBoards;

      // Used before to force a DOM update?
      // setTurn(turn);

      // Move the player
      thisMove.board[location[0]][location[1]][location[2]][location[3]] =
      gameStack[gameStack.length - 1].nextTurn;

      // @TODO set restriction for next player if there is one

      // Flip the turn to the other player if it will be player 2's move
      // The next player is player1 by default (see class consturctor)
      if (gameStack[gameStack.length - 1].nextTurn === PLAYERS.PLAYER1) {
        thisMove.nextTurn = PLAYERS.PLAYER2;
      }

      // Push the end of the stack
      setGameStack([...gameStack, thisMove]);

      // TODO Check if there is a winner
    };

    return (
      <Pressable
        onPressIn={() => {
          onMove(props.location);
        }}
      >
        <View style={[styles.miniItem, ...CellBorders(cell)]}>
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
        ...CellBorders(props.location[0] * 3 + props.location[1]),
      ]}
    >
      {/* <Text>{props.location[0] * 3 + props.location[1]}</Text> */}
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
      <View>{/* <Text style={styles.logo}>---Logo goes here---</Text> */}</View>
      <View>
        <PlayerIndicator
          playerName="Player 1"
          active={gameStack[gameStack.length - 1].nextTurn === PLAYERS.PLAYER1}
          color={COLORS[0]}
        />
        <PlayerIndicator
          playerName="Player 2"
          active={gameStack[gameStack.length - 1].nextTurn === PLAYERS.PLAYER2}
          color={COLORS[1]}
        />
      </View>
      <Row location={[0]} />
      <Row location={[1]} />
      <Row location={[2]} />
      <View>
        <Pressable
          onPress={() => {
            console.log(gameStack);
            // // let newStack = gameStack.slice(0, -2)
            console.log([...gameStack, gameStack[gameStack.length - 2]]);
            // console.log(newStack.length)

            console.log(DEFAULT_TABLE())

            setGameStack([...gameStack, gameStack[gameStack.length - 2]]);
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
    height: 70,
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
    borderColor: "grey",
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
});
