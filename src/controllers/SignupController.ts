import { useRef, useState } from "react";
import { Alert, Keyboard, TextInput as RNTextInput } from "react-native";

import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "@/src/common/Validators";
import { useAuthStore } from "@/src/store/globalStore";

const useSignupController = () => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const txtEmail = useRef<RNTextInput>(null);
  const txtPassword = useRef<RNTextInput>(null);

  const { signup, login } = useAuthStore();

  const onSignupPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (nameError || emailError || passwordError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    Keyboard.dismiss();

    const success = await signup(name.value, email.value, password.value);

    if (success) {
      login(email.value, password.value);
    } else {
      Alert.alert("Signup Failed", "Email is already registered with us.", [
        { text: "OK" },
      ]);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    txtEmail,
    txtPassword,
    onSignupPressed,
    passwordVisible,
    togglePasswordVisibility,
  };
};

export { useSignupController };
