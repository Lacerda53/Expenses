import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../components/Button";
import colors from "../styles/colors";

export function CreateExpense() {
  const [date, setDate] = useState<string>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text>Descrição</Text>
          <TextInput placeholder="O que foi seu gasto?" />
        </View>
        <View style={styles.card}>
          <Text>Valor</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Qual o valor do gasto?"
          />
        </View>
        <View style={styles.card}>
          <Text>Data da despesa</Text>
          {/* <TextInputMask
            placeholder="Em que dia você realizou esse gasto?"
            value={date}
            onChangeText={(formatted, extracted) => {
              setDate(formatted);
            }}
            mask={"[00]/[00]/[0000]"}
          /> */}
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="Adicionar" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "95%",
  },
  body: {
    width: "100%",
    padding: 20,
  },
  card: {
    paddingVertical: 10,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.9,
  },
  footer: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
