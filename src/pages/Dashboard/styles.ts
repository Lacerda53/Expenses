import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    paddingTop: Platform.OS === "android" ? 60 : 40,
    padding: 15,
  },
  title: {
    fontSize: 32,
    color: colors.title,
    fontFamily: fonts.heading,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.base,
    fontSize: 17,
    marginTop: 5,
  },
  body: {
    flex: 1,
    padding: 15,
    marginBottom: 80,
  },
  textBody: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  mainCard: {
    top: 15,
    backgroundColor: colors.white,
    width: Dimensions.get("window").width / 1.2,
  },
  footer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 15,
    marginBottom: 15,
  },
});
