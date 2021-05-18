import React from "react";
import {
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import broImg from "../../assets/bro.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { styles } from "./styles";

export function Welcome() {
  const navigation = useNavigation();

  function handleState() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie suas{"\n"}
          despesas de forma{"\n"}
          fácil
        </Text>
        <Image source={broImg} style={styles.image} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Não se perca mais em seus gastos, nós ajudamos você a se organizar.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleState}
        >
          <Feather name="chevron-right" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

