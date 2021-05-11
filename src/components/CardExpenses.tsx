import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Feather } from "@expo/vector-icons";

interface ICardExpenses {
  value: number;
}
export function CardExpenses({ value }: ICardExpenses) {
  const [visible, setVisible] = useState(true);

  function currencyFormat(num: number) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
  }
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>Despesas</Text>
        <Text style={styles.cardContent}>
          R$ {visible && currencyFormat(value)}
        </Text>
      </View>
      <Feather
        name={visible ? "eye" : "eye-off"}
        size={25}
        onPress={() => setVisible(!visible)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: colors.shape,
    borderLeftWidth: 8,
    borderLeftColor: colors.green,
    borderRadius: 10,
    padding: 15,
  },
  cardTitle: {
    color: colors.base,
    fontSize: 16,
  },
  cardContent: {
    marginTop: 5,
    fontSize: 18,
    fontFamily: fonts.heading,
  },
});
