import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { DEFAULT_TABLE, PLAYERS } from "./constants";

export default function Board(props: any) {
  const [gameMoves, setGameMoves] = useState(DEFAULT_TABLE());
  const [turn, setTurn] = useState(PLAYERS.PLAYER1);

  const PlayerToSymbol = (Player: PLAYERS) => {
    if (Player === PLAYERS.NONE) {
      return "-";
    }
    if (Player === PLAYERS.PLAYER1) {
      return "X";
    }
    if (Player === PLAYERS.PLAYER2) {
      return "O";
    }
  };

  const onMove = (location: any) => {

    // TODO Determine if move is valid 

    // Move the player
    let gameBoard = gameMoves;

    gameBoard[location[0]][location[1]][location[2]][location[3]] = turn;

    setGameMoves(gameBoard);
    if(turn === PLAYERS.PLAYER1){
        setTurn(PLAYERS.PLAYER2)
    }else{
        setTurn(PLAYERS.PLAYER1)

    }


    // TODO Check if there is a winner

  }

  const Cell = (props: any) => {
    let board = props.location[0] * 3 + props.location[1];
    let cell = props.location[2] * 3 + props.location[3];

    return (
      <Pressable onPressIn={() => {
        onMove(props.location)
      }}>
        <View style={styles.miniItem}>
          <Text style={styles.label}>
            {PlayerToSymbol(
              gameMoves[props.location[0]][props.location[1]][
                props.location[2]
              ][props.location[3]]
            )}
            {/* B{board} C{cell} */}
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
    <View style={styles.item}>
      {/* <Text>{props.location[1]}</Text> */}

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
      <Row location={[0]} />
      <Row location={[1]} />
      <Row location={[2]} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    margin: 0,
    borderWidth: 2,
    // borderColor: "red",
  },
  miniItem: {
    height: 35,
    width: 35,
    backgroundColor: "#ddd",
    // margin: 5,
    borderWidth: 2,
    borderColor: "green",
  },
  label: {
    textAlign: "center",
    // fontSize: 25,
    fontSize: 15,
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
});
