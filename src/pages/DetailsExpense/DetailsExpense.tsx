import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import api from "../../services/api";
import { RootState } from "../../store";
import { setIsRender } from "../../store/Render.store";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { numberToReal } from "../../utils/formatNumber";

export function DetailsExpense() {
  const navigation = useNavigation();
  const isRender = useSelector((state: RootState) => state.render.isRender);
  const dispatch = useDispatch();
  const { params } = useRoute<any>();
  const { data } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const newdate = params.data.date.split("T")[0];
  const user = useSelector((state: RootState) => state.auth.user);

  async function handleDelete() {
    setIsLoading(true);
    api
      .delete(`expenses/${data._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((result) => {
        if (result.status === 200) {
          dispatch(setIsRender(!isRender));
          navigation.navigate("Dashboard");
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={colors.base}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>{data.item}</Text>
          <Text style={styles.money}>{numberToReal(data.value)}</Text>
          <Text style={styles.money}>{data.additionalInfo?.type?'Entrada': 'Saída'}</Text>
          <Text style={styles.date}>
            {newdate.split("-").reverse().join("/")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Feather name="trash" style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Button
          title="Alterar"
          disabled={isLoading}
          onPress={() => navigation.navigate("EditExpense", { data })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "95%",
    marginTop: StatusBar.currentHeight,
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  title: {
    fontSize: 30,
    color: colors.title,
    fontFamily: fonts.heading,
    fontWeight: "bold",
  },
  money: {
    fontSize: 25,
    color: colors.green,
    fontFamily: fonts.text,
  },
  date: {
    fontSize: 18,
    marginTop: 10,
    color: colors.base,
  },
  trashButton: {
    backgroundColor: colors.red,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    fontSize: 17,
    color: colors.white,
  },
  footer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 15,
    marginBottom: 15,
  },
});
