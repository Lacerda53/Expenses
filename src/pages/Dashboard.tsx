import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import colors from '../styles/colors'
import { LinearGradient } from 'expo-linear-gradient';
import fonts from '../styles/fonts'

export function Dashboard() {
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient start={{ x: 1, y: 1 }} colors={['#4FD074', '#359951']} style={styles.header}>
                <Text style={styles.title}>Bem Vindo(a)</Text>
            </LinearGradient>
            <View>
                <View>
                    <Text>Despesas</Text>
                    <Text>R$</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    header: {
        backgroundColor: colors.green,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    title: {
        padding: 20,
        fontSize: 25,
        color: colors.white,
        fontFamily: fonts.heading,
        fontWeight: 'bold',
    }
})