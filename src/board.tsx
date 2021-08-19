import React, { useState } from "react";
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
  // const [gameMoves, setGameMoves] = useState(DEFAULT_TABLE());
  // const [closedBoards, setClosedBoards] = useState(new Array(8));
  // const [turn, setTurn] = useState(PLAYERS.PLAYER1);

  const [gameStack, setGameStack] = useState()

  // -1, indicates no move restriction (otherwise Board #1)
  const [moveRestriction, setMoveRestriction] = useState(-1);

  const PlayerToSymbol = (Player: PLAYERS) => {
    if (Player === PLAYERS.NONE) {
      return "";
    }
    if (Player === PLAYERS.PLAYER1) {
      return "X";
    }
    if (Player === PLAYERS.PLAYER2) {
      return "O";
    }
  };

  const Cell = (props: any) => {
    let board = props.location[0] * 3 + props.location[1];
    let cell = props.location[2] * 3 + props.location[3];

    const onMove = (location: any) => {
      // TODO Determine if move is valid

      // Is there already move in this cell
      if (
        gameMoves[location[0]][location[1]][location[2]][location[3]] !=
        PLAYERS.NONE
      ) {
        return;
      }

      // Was this board valid based on the precding cell restructuons?

      setTurn(turn);

      // Move the player
      let gameBoard = gameMoves;
      gameBoard[location[0]][location[1]][location[2]][location[3]] = turn;
      setGameMoves(gameBoard);

      // @TODO set restriction for next player if there is one

      // Flip the turn to the other player
      if (turn === PLAYERS.PLAYER1) {
        setTurn(PLAYERS.PLAYER2);
      } else {
        setTurn(PLAYERS.PLAYER1);
      }

      //   console.log(gameMoves);

      // TODO Check if there is a winner
    };

    return (
      <Pressable
        onPressIn={() => {
          onMove(props.location);
        }}
      >
        <View style={[styles.miniItem, ...CellBorders(cell)]}>
          <Text style={styles.label}>
            {PlayerToSymbol(
              gameMoves[props.location[0]][props.location[1]][
                props.location[2]
              ][props.location[3]]
            )}
            {/* B{board} */}
            {/* C{cell} */}
            {/* B{props.location[0]},{props.location[1]} */}
            {/* C{props.location[2]},{props.location[3]} */}
          </Text>
        </View>
      </Pressable>
    );
  };

  const InnerRow = (props: any) => (
    <View style={[styles.miniRow]}>
      <Cell location={[...props.location, 0]} />
      <Cell location={[...props.location, 1]} />
      <Cell location={[...props.location, 2]} />
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
          active={turn === PLAYERS.PLAYER1}
          color={COLORS[0]}
        />
        <PlayerIndicator
          playerName="Player 2"
          active={turn === PLAYERS.PLAYER2}
          color={COLORS[1]}
        />
      </View>
      <Row location={[0]} />
      <Row location={[1]} />
      <Row location={[2]} />
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
  label: {
    textAlign: "center",
    fontSize: 25,
    // fontSize: 15,
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
