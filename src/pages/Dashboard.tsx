import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { CardExpenses } from "../components/CardExpenses";
import { RootState } from "../store";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá,</Text>
        <Text style={styles.subtitle}>guilhermeandrade2013@gmail.com</Text>
        <CardExpenses value={10000} />
      </View>
      <View style={styles.body}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    paddingTop: Platform.OS === "android" ? 60 : 40,
    padding: 15,
  },
  title: {
    fontSize: 32,
    color: colors.title,
    fontFamily: fonts.heading,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.base,
    fontSize: 17,
    marginTop: 5,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainCard: {
    top: 15,
    backgroundColor: colors.white,
    width: Dimensions.get("window").width / 1.2,
  },
});
