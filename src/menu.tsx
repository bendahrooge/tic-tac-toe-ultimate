import React, { useContext } from "react";
import { Animated, StyleSheet, Text, View, Pressable, Image } from "react-native";

import { Scenes, GlobalContext } from "./constants";

export default function Menu(props: any) {
  const { scene, setScene } = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Ultimate {"\n"} Tic Tac Toe</Text> */}
      <Image source={require("../assets/icon.png")} style={{width: 300, height: 300}} />
      <Pressable style={styles.btn} onPress={() => setScene(Scenes.GAME)}>
        <Text style={styles.text}>Start Game</Text>
      </Pressable>
      {/* <Pressable style={styles.btn} onPress={() => setScene(Scenes.GAME)}>
        <Text style={styles.text}>Multi-player</Text>
      </Pressable> */}
      {/* <Pressable style={styles.btn} onPress={() => setScene(Scenes.GAME)}>
        <Text style={styles.text}>Instructions</Text>
      </Pressable> */}
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
    textAlign: "center",
    fontFamily: ""
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
