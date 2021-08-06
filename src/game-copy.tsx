import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { PLAYERS, DEFAULT_BOARD } from "./constants";

export default function Game(props: any) {
  const [turn, setTurn] = useState(PLAYERS.PLAYER1);
  const [winner, setWinner] = useState(PLAYERS.NONE);

  const [board, setBoard] = useState(DEFAULT_BOARD());

  const onMove = (row: number, col: number) => {
    // Check if already a wiiner has been determined
    if (winner != PLAYERS.NONE) {
      return;
    }

    // Check if cell is occupied
    if (board[row][col] === PLAYERS.NONE) {
      let b = board;

      if (turn === PLAYERS.PLAYER1) {
        b[row][col] = PLAYERS.PLAYER1;
      } else {
        b[row][col] = PLAYERS.PLAYER2;
      }

      setBoard(b);

      // Flip turn

      if (turn === PLAYERS.PLAYER1) {
        setTurn(PLAYERS.PLAYER2);
      } else {
        setTurn(PLAYERS.PLAYER1);
      }
    } else {
      alert("Cell is occupied");
    }

    /**
     * Check if winner
     */

    // Horizontal
    for (let y = 0; y < 3; y++) {
      if (
        board[y][0] != PLAYERS.NONE &&
        board[y][0] === board[y][1] &&
        board[y][0] === board[y][2]
      ) {
        setWinner(board[y][0]);
      }
    }

    // Vertical
    for (let x = 0; x < 3; x++) {
      if (
        board[0][x] != PLAYERS.NONE &&
        board[0][x] === board[1][x] &&
        board[0][x] === board[2][x]
      ) {
        setWinner(board[0][x]);
      }
    }

    // Diagonal 1
    if (
      board[0][0] != PLAYERS.NONE &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
    }

    // Diagonal 2
    if (
      board[0][2] != PLAYERS.NONE &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
    }

    // Check if tie
    let movedTiles = 0;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (board[x][y] != PLAYERS.NONE) {
          movedTiles++;
        }
      }
    }

    if (movedTiles === 9) {
      setWinner(PLAYERS.TIE);
    }
  };

  const Cell = (props: any) => {
    return (
      <Pressable onPress={() => onMove(props.y, props.x)}>
        <View style={styles.item}>
          <Text style={styles.label}>
            {props.player === PLAYERS.PLAYER1 && "X"}
            {props.player === PLAYERS.PLAYER2 && "O"}
          </Text>
        </View>
        {/* <View style={styles.row}></View> */}
      </Pressable>
    );
  };

  const GameBoard = (props: any) => (
    <View style={styles.container}>
      <View style={styles.row}>{props.row[0]}</View>
      <View style={styles.row}>{props.row[1]}</View>
      <View style={styles.row}>{props.row[2]}</View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.miniRow}>
            <View style={styles.miniItem}>
              <Text>TopX</Text>
            </View>
            <View style={styles.miniItem}>
              <Text>X</Text>
            </View>
            <View style={styles.miniItem}>
              <Text>X</Text>
            </View>
          </View>
          <View style={styles.miniRow}>
            <View style={styles.miniItem}>
              <Text>X</Text>
            </View>
            <View style={styles.miniItem}>
              <Text>X</Text>
            </View>
            <View style={styles.miniItem}>
              <Text>X</Text>
            </View>
          </View>
          <View style={styles.miniRow}>
            <View style={styles.miniItem}>
              <Text>X</Text>
            </View>
            <View style={styles.miniItem}>
              <Text>X</Text>
            </View>
            <View style={styles.miniItem}>
              <Text>X</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
      </View>
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
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  miniRow: {
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  item: {
    // flex: 1,
    // flexDirection: "row",

    minHeight: 125,
    minWidth: 125,
    backgroundColor: "#ddd",
    margin: 0,
    borderWidth: 4,
    borderColor: "red",
  },
  miniItem: {
    height: 40,
    width: 40,
    backgroundColor: "#ddd",
    // margin: 5,
    borderWidth: 2,
    borderColor: "green",
  },
  label: {
    textAlign: "center",
    fontSize: 80,
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
