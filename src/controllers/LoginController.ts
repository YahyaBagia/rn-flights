import { useRef, useState } from "react";
import { Keyboard, TextInput as RNTextInput } from "react-native";

import { emailValidator, passwordValidator } from "@/src/common/Validators";
import { useAuthStore } from "@/src/store/globalStore";

const useLoginController = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const txtPassword = useRef<RNTextInput>(null);

  const { login } = useAuthStore();

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    Keyboard.dismiss();

    const success = await login(email.value, password.value);
    if (!success) {
      alert("Login Failed");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    txtPassword,
    onLoginPressed,
    togglePasswordVisibility,
  };
};

export { useLoginController };
