import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
  RefreshControl,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Button } from "../components/Button";
import { CardExpenses } from "../components/CardExpenses";
import { ItemExpenses } from "../components/ItemExpenses";
import api from "../services/api";
import { RootState } from "../store";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface IExpense {
  _id: string;
  date: string;
  value: number;
  item: string;
}

export function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation();
  const [isRender, setIsRender] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [listExpenses, setListExpenses] = useState<IExpense[]>([])

  async function loadExpenses() {
    setIsLoading(true);
    await api.get("expenses", {
      params: { page, perPage },
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(result => {
      setListExpenses([...result.data])
      setIsLoading(false);
      setIsRender(!isRender);
    }).catch(() => {
      Alert.alert("Ops", "Ocorreu um erro na listagem")
    });
  }

  const expensesTotal = listExpenses.reduce((acc, expense) => {
    acc.total += expense.value
    return acc;
  }, {
    total: 0
  })

  async function handleDelete(id: string) {
    setIsLoading(true);
    api.delete(`expenses/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(result => {
      if (result.status === 200) {
        loadExpenses()
      }
    }).catch(error => {
      Alert.alert(error.message)
    })
  }

  useEffect(() => {
    loadExpenses()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá,</Text>
        <Text style={styles.subtitle}>{user.email}</Text>
        <CardExpenses value={expensesTotal.total} />
      </View>
      <View style={styles.body}>
        <Text style={styles.textBody}>Histórico</Text>
        <FlatList
          key={listExpenses.length}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadExpenses}
            />
          }
          data={listExpenses}
          extraData={isRender}
          showsVerticalScrollIndicator={false}
          onEndReached={loadExpenses}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <ItemExpenses handleRemove={handleDelete} key={item} data={item} />
          )}
        />
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
    marginBottom: 80
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
