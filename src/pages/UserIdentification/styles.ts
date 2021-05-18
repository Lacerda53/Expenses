import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "space-around",
    },
    content: {
      flex: 1,
      width: "100%",
    },
    form: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 54,
      alignContent: "center",
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      color: colors.heading,
      fontFamily: fonts.heading,
      lineHeight: 32,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: colors.gray,
      color: colors.heading,
      width: "100%",
      fontSize: 18,
      marginTop: 50,
      padding: 10,
      textAlign: "center",
    },
    footer: {
      width: "100%",
      marginTop: 40,
    },
  });