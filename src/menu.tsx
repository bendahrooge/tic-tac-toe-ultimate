import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { Scenes } from "./constants";

export default function Menu(props: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Pressable style={styles.btn} onPress={() => props.sceneChanger(Scenes.GAME)}>
        <Text style={styles.text}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
  },
  btn: {
    padding: 20,
    marginTop: 20,
    width: 225,
    borderRadius: 10,
    backgroundColor: "dodgerblue"
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign: "center"
  }
});
