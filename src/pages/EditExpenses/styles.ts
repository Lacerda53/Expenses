import { Dimensions, StatusBar } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: "95%",
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    textAlign: "left",
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.green,
    fontFamily: fonts.heading,
    width: "100%",
    fontSize: 22,
    marginTop: 20,
    padding: 10,
    textAlign: "left",
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
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  icon: {
    fontSize: 25,
    color: colors.white,
  },
  rowButtons: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  select: {
    width: Dimensions.get("window").width / 2.3,
    height: Dimensions.get("window").width / 6.5,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.gray,
  },
  textSelect: {
    color: colors.base,
    fontSize: 16,
  },
  editContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    borderColor: colors.green,
  },
  editText: {
    color: colors.green,
  },
});
