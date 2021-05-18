import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  RefreshControl,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { IExpense } from "../../@types/interfaces";
import { Button } from "../../components/Button";
import { CardExpenses } from "../../components/CardExpenses";
import { ItemExpenses } from "../../components/ItemExpenses";
import api from "../../services/api";
import { RootState } from "../../store";
import { styles } from "./styles";

export function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isRender = useSelector((state: RootState) => state.render.isRender);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [listExpenses, setListExpenses] = useState<IExpense[]>([]);

  async function loadExpenses() {
    setIsLoading(true);
    await api
      .get("expenses", {
        params: { page, perPage },
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((result) => {
        setListExpenses([...result.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        Alert.alert("Ops", "Ocorreu um erro na listagem");
        console.log(error.message);
      });
  }

  const expensesTotal = listExpenses.reduce(
    (acc, expense) => {
      if (expense.additionalInfo?.type) {
        acc.total += expense.value;
      } else {
        acc.total -= expense.value;
      }
      return acc;
    },
    {
      total: 0,
    }
  );

  async function handleDelete(id: string) {
    setIsLoading(true);
    api
      .delete(`expenses/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((result) => {
        if (result.status === 200) {
          loadExpenses();
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  useEffect(() => {
    loadExpenses();
  }, [isRender]);

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
            <RefreshControl refreshing={isLoading} onRefresh={loadExpenses} />
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
