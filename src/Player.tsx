import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  Platform,
  PixelRatio,
} from "react-native"
import { PLAYERS, COLORS } from "./constants"

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
  )
}

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
  })

  return (
    <View
      style={[
        styles.default,
        props.active ? activePlayerStyle.active : null,
        props.winner ? styles.winner : null,
      ]}
    >
      <Text
        style={[
          styles.text,
          !props.active ? styles.inactive : null,
          props.winner ? styles.winner : null,
        ]}
      >
        {props.playerName || "Participant"}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  // Style used if player indicator is inactive (greyed out text)
  inactive: {
    color: "#C4BBC2",
  },
  // Gold background @TOOD: Trophy icon?
  winner: {
    backgroundColor: "#EDDE45",
    color: "black",
  },
  // Default player indicator styles
  text: {
    fontFamily: "AppleSDGothicNeo-Bold",
    textAlign: "center",
    color: "white",
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
})

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

/**
 * Source: https://stackoverflow.com/questions/33628677/react-native-responsive-font-size
 */

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320

export function normalize(size: number) {
  const newSize = size * scale
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const labelStyles = StyleSheet.create({
  label: {
    textAlign: "center",
    fontSize: normalize(26),
    fontFamily: "AppleSDGothicNeo-Bold",
    fontWeight: "bold",
  },
  player1: {
    color: COLORS[0],
  },
  player2: {
    color: COLORS[1],
  },
})
