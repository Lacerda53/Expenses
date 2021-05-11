import React from 'react'
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, View } from 'react-native'
import broImg from '../assets/bro.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
    const navigation = useNavigation();

    function handleState(){
        navigation.navigate("UserIdentification")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Gerencie suas{'\n'}
             despesas de forma{'\n'}
             fácil</Text>
                <Image source={broImg} style={styles.image} resizeMode="contain" />
                <Text style={styles.subtitle}>Não se perca mais em seus gastos, nós ajudamos você a se organizar.</Text>
                <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={handleState}>
                    <Feather name="chevron-right" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 0
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 38
    },
    subtitle: {
        textAlign: "center",
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * .7,
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
    }
})