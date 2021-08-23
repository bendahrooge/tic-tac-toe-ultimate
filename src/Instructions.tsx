import React, { useContext } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";

import { Scenes, GlobalContext } from "./constants";

export default function Menu(props: any) {
  const { scene, setScene } = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Play</Text>
      {/* <Image
        source={require("../assets/trophy.png")}
        style={{ width: 100, height: 100 }}
      /> */}
      <View style={styles.region}>
        <Text style={styles.text}>
          In Ultimate Tic Tac Toe, your move determines which local board your
          opponent is allowed to move in.
        </Text>
      </View>

      <Image
        source={require("../assets/instructions-1.gif")}
        style={{ width: 300, height: 300 }}
      />

      <View style={styles.region}>
        <Text style={styles.text}>
          This adds a significant degree of difficulty to the classic game,
          making it more akin to the likes of Chess, Go, or other table games
          requiring players to strategize ahead.
        </Text>
      </View>

      <Pressable style={styles.btn} onPress={() => setScene(Scenes.GAME)}>
        <Text style={styles.btnLabel}>Start Game</Text>
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
    textAlign: "center",
  },
  btn: {
    padding: 20,
    marginTop: 20,
    width: 225,
    borderRadius: 50,
    backgroundColor: "dodgerblue",
    color: "white",
  },
  btnLabel: {
    fontSize: 20,
    color: "white",
    fontFamily: "AppleSDGothicNeo-Bold",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    // color: "white",
    fontFamily: "AppleSDGothicNeo-Bold",
    textAlign: "center",
  },
  region: {
    maxWidth: "90%",
  },
});
