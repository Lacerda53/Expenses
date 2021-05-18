import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../styles/colors";
import { TextInputMask } from "react-native-masked-text";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigation } from "@react-navigation/core";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { setIsRender } from "../../store/Render.store";
import { styles } from "./styles";

export function CreateExpense() {
  const [typeExpense, setTypeExpense] = useState<boolean>(true);
  const dispatch = useDispatch();
  const isRender = useSelector((state: RootState) => state.render.isRender);
  const user = useSelector((state: RootState) => state.auth.user);
  const [date, setDate] = useState<string>("");
  const [money, setMoney] = useState<number>(0);
  const [moneyString, setMoneyString] = useState<string>("0");
  const [item, setitem] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [currentPage, setcurrentPage] = useState<number>(0);
  const navigation = useNavigation();

  const titles = [
    "Como podemos categorizar?",
    `Qual é o valor de ${typeExpense ? 'entrada' : 'saída'}?`,
    `Qual o título da sua ${typeExpense ? 'entrada' : 'saída'}?`,
    "Quando ocorreu?",
  ];

  const inputs = [
    <View style={styles.rowButtons}>
      <TouchableOpacity
        style={[styles.select, typeExpense && { borderColor: colors.green }]}
        onPress={() => setTypeExpense(true)}
      >
        <Text
          style={[styles.textSelect, typeExpense && { color: colors.green }]}
        >
          Entrada
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.select, !typeExpense && { borderColor: colors.red }]}
        onPress={() => setTypeExpense(false)}
      >
        <Text
          style={[styles.textSelect, !typeExpense && { color: colors.red }]}
        >
          Saída
        </Text>
      </TouchableOpacity>
    </View>,
    <TextInputMask
      placeholder="Qual o valor?"
      style={styles.input}
      type={"money"}
      value={moneyString}
      includeRawValueInChangeText={true}
      onChangeText={(_, rawText: any) => {
        setMoney(Number(rawText));
        setMoneyString(rawText);
      }}
    />,
    <TextInput
      value={item}
      style={styles.input}
      onChangeText={(text) => setitem(text)}
      placeholder="O que é esse valor?"
    />,
    <TextInputMask
      placeholder="Ex: Dia-Mês-Ano"
      type={"datetime"}
      style={styles.input}
      value={date}
      options={{
        format: "DD/MM/YYYY",
      }}
      onChangeText={(text) => {
        setDate(text);
      }}
    />,
  ];

  async function createExpense() {
    if (item != "" && money != 0 && date != "") {
      setIsloading(true);
      const value = money;
      const newDate = date.split("/").reverse().join("-");
      await api
        .post(
          `expenses`,
          { date: newDate, item, value, additionalInfo: { type: typeExpense } },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((result) => {
          if (result.status === 201) {
            dispatch(setIsRender(!isRender));
            navigation.navigate("Dashboard");
          } else {
            Alert.alert("Ocorreu um erro com suas informações");
          }
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
      setIsloading(false);
    } else {
      Alert.alert("Ops", "Todos os campos são obrigatórios");
    }
  }

  function handleBack() {
    if (currentPage === 0) {
      navigation.goBack();
    } else {
      setcurrentPage((page) => page - 1);
    }
  }

  function handleNext() {
    if (currentPage != 3) {
      setcurrentPage((page) => page + 1);
    } else {
      createExpense();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialCommunityIcons
            name={currentPage == 0 ? "close" : "arrow-left"}
            size={30}
            color={colors.base}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{titles[currentPage]}</Text>
        {inputs[currentPage]}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Feather name="chevron-right" style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
