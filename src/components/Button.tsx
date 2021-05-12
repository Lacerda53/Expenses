import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface IButtonProps extends TouchableOpacityProps {
  title: string;
}
export function Button({ title, disabled = false, ...rest }: IButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      {disabled ? <ActivityIndicator color={colors.white} size="large" /> : <Text style={styles.text}>{title.toUpperCase()}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: 56,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading,
  },
});
