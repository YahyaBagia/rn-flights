import { useSignupController } from "@/src/controllers/SignupController";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

const Signup = () => {
  const {
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
  } = useSignupController();
  return (
    <View style={styles.screen}>
      <Text variant="headlineLarge" style={styles.headline}>
        Signup
      </Text>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        autoComplete="name"
        autoCapitalize="words"
        textContentType="name"
        onSubmitEditing={() => txtEmail.current?.focus()}
        left={<TextInput.Icon icon="account-outline" />}
      />
      <HelperText type="error" visible={!!name.error}>
        {name.error}
      </HelperText>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        autoComplete="email"
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        ref={txtEmail}
        onSubmitEditing={() => txtPassword.current?.focus()}
        left={<TextInput.Icon icon="email-outline" />}
      />
      <HelperText type="error" visible={!!email.error}>
        {email.error}
      </HelperText>

      <TextInput
        label="Password"
        returnKeyType="go"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        ref={txtPassword}
        onSubmitEditing={onSignupPressed}
        left={<TextInput.Icon icon="lock-outline" />}
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye-outline" : "eye-off-outline"}
            onPress={togglePasswordVisibility}
          />
        }
        secureTextEntry={!passwordVisible}
      />
      <HelperText type="error" visible={!!password.error}>
        {password.error}
      </HelperText>

      <Button mode="contained" onPress={onSignupPressed}>
        Signup
      </Button>

      <View style={styles.row}>
        <Text>Have an account? </Text>
        <Link href={"/login"} asChild>
          <Text style={styles.link}>Login</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    flex: 1,
    padding: 12,
  },
  headline: {
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "center",
  },
  link: {
    fontWeight: "bold",
  },
});

export default Signup;
