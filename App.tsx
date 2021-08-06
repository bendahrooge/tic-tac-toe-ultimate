import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { Scenes } from "./src/constants";
import Menu from "./src/menu";
import Game from "./src/game";

export default function App() {
  const [scene, setScene] = useState(Scenes.GAME);

  return (
    <View style={styles.container}>
    
      {scene === Scenes.MENU && <Menu sceneChanger={setScene} />}
      {scene === Scenes.GAME && <Game sceneChanger={setScene} />}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    width: "100%",
    height: "100%"
  }
});
