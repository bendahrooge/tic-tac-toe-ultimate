import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { PLAYERS, COLORS } from "./constants";

/**
 * Shows the label for the player on the board or
 * in the indicator (e.g., X, O, colored square)
 * @param props
 */
export const PlayerLabel = (props: any) => {
  return (
    <View>
      {props.data === PLAYERS.PLAYER1 && (
        <Text style={[labelStyles.label, labelStyles.player1]}>X</Text>
      )}
      {props.data === PLAYERS.PLAYER2 && (
        <Text style={[labelStyles.label, labelStyles.player2]}>O</Text>
      )}
    </View>
  );
};

/**
 * Displays an indicator at the top for current move, winner, loser, etc.
 * @param props
 * @returns
 */
export const PlayerIndicator = (props: any) => {
  const activePlayerStyle = StyleSheet.create({
    active: {
      backgroundColor: props.color,
    },
  });

  return (
    <View
      style={[styles.default, props.active ? activePlayerStyle.active : null]}
    >
      <Text style={[styles.text, !props.active ? styles.inactive : null]}>
        {props.playerName || "Participant"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Style used if player indicator is inactive (greyed out text)
  inactive: {
    color: "#C4BBC2",
  },
  // Gold background @TOOD: Trophy icon?
  winner: {
    backgroundColor: "#EDDE45",
  },
  // Default player indicator styles
  text: {
    textAlign: "center",
    fontSize: 25,
  },
  default: {
    borderRadius: 25,
    // backgroundColor: "red",
    marginBottom: 15,
    width: 335,
    // borderRadius: 25,
    padding: 10,
  },
});

const labelStyles = StyleSheet.create({
  label: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    // fontSize: 15,
  },
  player1: {
    color: COLORS[0],
  },
  player2: {
    color: COLORS[1],
  },
});
