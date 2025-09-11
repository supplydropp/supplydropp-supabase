"use client";

import * as React from "react";
import { Platform, Pressable, Text, StyleSheet } from "react-native";

export interface ButtonProps {
  title: string;
  onPress?: () => void;
}

export function Button({ title, onPress }: ButtonProps) {
  if (Platform.OS === "web") {
    // Web: Use native <button>
    return (
      <button
        onClick={onPress}
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          backgroundColor: "#0070f3",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          border: "none",
        }}
      >
        {title}
      </button>
    );
  }

  // Mobile: Use Pressable + Text
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#0070f3",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
