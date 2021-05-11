import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import colors from '../styles/colors'

export function CreateExpense() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text>Descrição</Text>
                    <TextInput placeholder="O que foi seu gasto?" />
                </View>
                <View style={styles.card}>
                    <Text>Valor</Text>
                    <TextInput placeholder="Qual o valor do gasto?" />
                </View>
                <View style={styles.card}>
                    <Text>Data da despesa</Text>
                    <TextInput placeholder="Em que dia você realizou esse gasto?" />
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '95%',
    },
    body: {
        width: '100%',
        padding: 20
    },
    card: {
        paddingVertical: 10,
        borderBottomColor: colors.gray,
        borderBottomWidth: .9
    }
})