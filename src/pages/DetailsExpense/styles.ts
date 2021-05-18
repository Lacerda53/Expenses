import { StatusBar } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: "95%",
    marginTop: StatusBar.currentHeight,
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  title: {
    fontSize: 30,
    color: colors.title,
    fontFamily: fonts.heading,
    fontWeight: "bold",
  },
  money: {
    fontSize: 25,
    color: colors.green,
    fontFamily: fonts.text,
  },
  date: {
    fontSize: 18,
    marginTop: 10,
    color: colors.base,
  },
  trashButton: {
    backgroundColor: colors.red,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    fontSize: 17,
    color: colors.white,
  },
  footer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 15,
    marginBottom: 15,
  },
});
