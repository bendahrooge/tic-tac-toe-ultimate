import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { PLAYERS, DEFAULT_BOARD } from "./constants";
import Board from "./board"

export default function Game(props: any) {

  return (
    <Board />
  );
}
