import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps, Text} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface IButtonProps extends TouchableOpacityProps{
    title: string;
}
export function Button({title, ...rest}: IButtonProps) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={.7} {...rest}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.green,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 16,
        height: 56,
    },
    text:{
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading,
    }
})