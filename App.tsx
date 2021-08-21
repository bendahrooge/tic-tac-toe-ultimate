import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Scenes, GlobalContext } from "./src/constants";
import Menu from "./src/menu";
import Game from "./src/game";

export default function App() {
  /**
   * Init the context for the scene
   */
  const [scene, setScene] = useState(Scenes.MENU);

  return (
    <View style={styles.container}>
      <GlobalContext.Provider
        value={{ scene, setScene: (newScene: Scenes) => setScene(newScene) }}
      >
        {scene === Scenes.MENU && <Menu />}
        {scene === Scenes.GAME && <Game />}

        <StatusBar style="auto" />
      </GlobalContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#eee",
    width: "100%",
    height: "100%",
  },
});
