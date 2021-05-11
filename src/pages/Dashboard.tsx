import { useNavigation } from "@react-navigation/core";
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
import { Button } from "../components/Button";
import { CardExpenses } from "../components/CardExpenses";
import { ItemExpenses } from "../components/ItemExpenses";
import { RootState } from "../store";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá,</Text>
        <Text style={styles.subtitle}>{user.email}</Text>
        <CardExpenses value={1111111} />
      </View>
      <View style={styles.body}>
        <Text style={styles.textBody}>Histórico</Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Adicionar despesa"
          onPress={() => navigation.navigate("CreateExpense")}
        />
      </View>
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
    padding: 15,
  },
  textBody: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  mainCard: {
    top: 15,
    backgroundColor: colors.white,
    width: Dimensions.get("window").width / 1.2,
  },
  footer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 15,
    marginBottom: 15,
  },
});
