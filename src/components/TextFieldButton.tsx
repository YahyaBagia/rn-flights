import { TextInput, TextInputProps, TouchableRipple } from "react-native-paper";

const TextFieldButton: React.FC<TextInputProps> = (props) => {
  const { onPress } = props;
  return (
    <TouchableRipple onPress={onPress} style={{ flex: 1 }}>
      <TextInput
        {...props}
        mode="outlined"
        editable={false}
        pointerEvents="none"
      />
    </TouchableRipple>
  );
};

export { TextFieldButton };
