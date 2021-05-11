import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function ItemExpenses() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Conta de Luz</Text>
                <Text style={styles.subtitle}>20/05/2021</Text>
            </View>
            <Text style={styles.textMoney}>R$ 450,00</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical: 20,
        borderBottomWidth: .8,
        borderBottomColor: colors.gray,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 17,
    },
    subtitle:{
        color: colors.base
    },
    textMoney:{
        fontFamily: fonts.heading,
        fontSize: 15,
        color: colors.base
    }
})