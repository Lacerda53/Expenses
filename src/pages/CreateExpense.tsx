import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import { TextInputMask } from 'react-native-masked-text'
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "@react-navigation/core";

export function CreateExpense() {
    const [date, setDate] = useState<string>('');
    const [money, setMoney] = useState<string>();
    const [item, setitem] = useState<string>('');
    const [isLoading, setIsloading] = useState<boolean>(false);
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.auth.user);

    async function createExpense() {
        if (item != '' && money != undefined && date != '') {
            setIsloading(true);
            const value = Number(money);
            await api.post(`expenses`, { date, item, value }, {
                headers: { Authorization: `Bearer ${user.token}` }
            }).then(result => {
                if (result.status === 201) {
                    navigation.goBack();
                }
                else {
                    Alert.alert('Ocorreu um erro com suas informações');
                }
            }).catch(error => {
                Alert.alert(error);
            });
            setIsloading(false);
        }
        else {
            Alert.alert("Ops", "Todos os campos são obrigatórios")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.titleInput}>Descrição</Text>
                    <TextInput value={item} onChangeText={(text) => setitem(text)} placeholder="O que foi seu gasto?" />
                </View>
                <View style={styles.card}>
                    <Text style={styles.titleInput}>Valor</Text>
                    <TextInputMask
                        placeholder="Qual o valor do gasto?"
                        type={'money'}
                        value={money}
                        includeRawValueInChangeText={true}
                        onChangeText={(_, rawText) => {
                            setMoney(rawText)
                        }}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.titleInput}>Data da despesa</Text>
                    <TextInputMask
                        placeholder="Em que dia você realizou esse gasto?"
                        type={'datetime'}
                        value={date}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        onChangeText={text => {
                            setDate(text)
                        }}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <Button title="Adicionar" onPress={createExpense} disabled={isLoading} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "95%",
    },
    row: {
        flexDirection: "row",
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
        paddingHorizontal: 15,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    titleInput: {
        fontSize: 15
    }
});
