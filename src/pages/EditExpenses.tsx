import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Alert, StatusBar, TextInput, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../styles/colors";
import { TextInputMask } from 'react-native-masked-text'
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "@react-navigation/core";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import fonts from "../styles/fonts";
import { useRoute } from "@react-navigation/native";

export function EditExpense() {
    const { params } = useRoute<any>();
    const [typeExpense, setTypeExpense] = useState<boolean>(false);
    const [date, setDate] = useState<string>(params.data.date);
    const [money, setMoney] = useState<number>(params.data.value);
    const [moneyString, setMoneyString] = useState<string>(params.data.value);
    const [item, setitem] = useState<string>(params.data.item);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [currentPage, setcurrentPage] = useState<number>(0)
    const navigation = useNavigation();

    const user = useSelector((state: RootState) => state.auth.user);

    const titles = [
        'Qual é o valor da despesa?',
        'Qual o título para sua despesa?',
        'Quando ocorreu o sua despesa?'
    ]

    const inputs = [
        <TextInputMask
            placeholder="Qual o valor do gasto?"
            style={styles.input}
            type={'money'}
            value={moneyString}
            includeRawValueInChangeText={true}
            onChangeText={(_, rawText: any) => {
                setMoney(Number(rawText))
                setMoneyString(rawText)
            }}
        />,
        <TextInput
            value={item}
            style={styles.input}
            onChangeText={(text) => setitem(text)}
            placeholder="O que foi seu gasto?"
        />,
        <TextInputMask
            placeholder="Ex: Dia-Mês-Ano"
            type={'datetime'}
            style={styles.input}
            value={date}
            options={{
                format: 'DD/MM/YYYY',
            }}
            onChangeText={text => {
                setDate(text)
            }}
        />
    ]

    async function EditExpense() {
        if (item != '' && money != 0 && date != '') {
            setIsloading(true);
            const value = money;
            const newDate = date.split('/').reverse().join('-');
            await api.put(`expenses`, { date: newDate, item, value }, {
                headers: { Authorization: `Bearer ${user.token}` }
            }).then(result => {
                if (result.status === 201) {
                    navigation.navigate('Dashboard')
                }
                else {
                    Alert.alert('Ocorreu um erro com suas informações');
                }
            }).catch(error => {
                Alert.alert(error.message);
            });
            setIsloading(false);
        }
        else {
            Alert.alert("Ops", "Todos os campos são obrigatórios")
        }
    }

    function handleBack() {
        if (currentPage === 0) {
            navigation.goBack();
        }
        else {
            setcurrentPage(page => page - 1)
        }
    }

    function handleNext() {
        if (currentPage != 2) {
            setcurrentPage(page => page + 1);
        }
        else {
            EditExpense()
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <MaterialCommunityIcons name={currentPage == 0 ? 'close' : 'arrow-left'} size={30} color={colors.base} />
                </TouchableOpacity>
                <View style={styles.editContainer}>
                    <Text style={styles.editText}>Edição</Text>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>{titles[currentPage]}</Text>
                {inputs[currentPage]}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleNext} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator size="small" color={colors.white} /> : <Feather name="chevron-right" style={styles.icon} />}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "95%",
        marginTop: StatusBar.currentHeight
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
    },
    title: {
        marginTop: 10,
        fontSize: 30,
        textAlign: 'left',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.green,
        fontFamily: fonts.heading,
        width: '100%',
        fontSize: 22,
        marginTop: 20,
        padding: 10,
        textAlign: 'left'
    },
    body: {
        padding: 20,
        width: "100%",
    },
    footer: {
        paddingHorizontal: 15,
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: 15
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    icon: {
        fontSize: 25,
        color: colors.white
    },
    editContainer:{
        borderWidth: 1,
        borderRadius: 5,
        padding: 4,
        borderColor: colors.green
    },
    editText:{
        color: colors.green
    }
});
