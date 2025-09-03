import { useLoginController } from "@/src/controllers/LoginController";
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    txtPassword,
    onLoginPressed,
    togglePasswordVisibility,
  } = useLoginController();
  return (
    <View style={styles.screen}>
      <View>
        <Text variant="headlineLarge" style={styles.headline}>
          Welcome
        </Text>
        <Image
          source={require("@/assets/images/travel_hero.png")}
          style={{ height: 200, width: "100%", marginBottom: 16 }}
        />
      </View>

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
        onSubmitEditing={onLoginPressed}
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

      <Button
        mode="contained"
        onPress={onLoginPressed}
        icon={"login"}
        style={styles.loginButton}
      >
        Login
      </Button>

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <Link href={"/signup"} asChild>
          <Text style={styles.link}>Sign up</Text>
        </Link>
      </View>
      <View style={styles.row}>
        <Link href={"/user-list"} asChild>
          <Text style={styles.link}>(User List)</Text>
        </Link>
      </View>
    </View>
  );
}

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
  loginButton: {
    marginTop: 12,
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
  btnUserList: {
    position: "absolute",
    top: 32,
    right: 8,
  },
});
