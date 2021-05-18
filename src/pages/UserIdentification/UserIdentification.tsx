import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Button } from "../../components/Button";
import api from "../../services/api";
import colors from "../../styles/colors";
import { setUser } from "../../store/Auth.store";
import { useDispatch } from "react-redux";
import { styles } from "./styles";

interface ITokenResult {
  id: string;
  email: string;
  token: string;
}

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleInputBlur() {
    setIsFocused(false);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function validateEmail(text: string) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      Alert.alert("Email incorreto", "Favor verificar seu email");
      return false;
    } else {
      return true;
    }
  }

  async function handleSubmit() {
    setIsLoading(true);
    if (validateEmail(email)) {
      const response = await api.get<ITokenResult>(`start/${email}`);
      const user = response.data;
      if (user.token) {
        dispatch(setUser(user));
        navigation.navigate("Dashboard");
      }
    }
    setIsLoading(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <View>
              <Text style={styles.title}>
                Qual email poderiamos lhe associar?
              </Text>
              <TextInput
                onBlur={handleInputBlur}
                onSubmitEditing={handleSubmit}
                value={email}
                onChangeText={(text) => setEmail(text)}
                onFocus={handleInputFocus}
                keyboardType="email-address"
                placeholder="Digite seu email"
                style={[
                  styles.input,
                  isFocused && { borderColor: colors.green },
                ]}
              />
            </View>
            <View style={styles.footer}>
              {isLoading ? (
                <ActivityIndicator color={colors.green} size="large" />
              ) : (
                <Button
                  title="Confirmar"
                  disabled={isLoading}
                  onPress={handleSubmit}
                />
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


