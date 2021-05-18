import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { numberToReal } from "../utils/formatNumber";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { IExpense } from "../@types/interfaces";

interface IPros {
  data: IExpense;
  handleRemove: (id: string) => void;
}

export function ItemExpenses({ data, handleRemove }: IPros) {
  const newdate = data.date.split("T")[0];
  const navigation = useNavigation();

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <TouchableOpacity
              onPress={() => handleRemove(data._id)}
              style={styles.btnTrash}
            >
              <Feather name="trash" color={colors.white} size={26} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsExpense", { data })}
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>{data.item}</Text>
          <Text style={styles.subtitle}>
            {newdate.split("-").reverse().join("/")}
          </Text>
        </View>
        <Text
          style={[
            styles.textMoney,
            {
              color: data.additionalInfo?.type ? colors.green : colors.red,
            },
          ]}
        >
          {!data.additionalInfo?.type && "- "}
          {numberToReal(data.value)}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 0.8,
    backgroundColor: colors.white,
    borderBottomColor: colors.gray,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 17,
  },
  subtitle: {
    color: colors.base,
  },
  textMoney: {
    fontFamily: fonts.heading,
    fontSize: 15,
    color: colors.base,
  },
  textMoneyPlus: {
    color: colors.green,
  },
  btnTrash: {
    width: 70,
    height: 60,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
