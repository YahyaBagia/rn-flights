import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Menu, Text, TouchableRipple } from "react-native-paper";

export interface IMenuButtonItem {
  label: string;
  value: string;
}

export interface IMenuButtonProps {
  text: string;
  items: IMenuButtonItem[];
  onItemSelected: (item: IMenuButtonItem) => void;
  disabled?: boolean;
}

const MenuButton: React.FC<IMenuButtonProps> = ({
  text,
  items,
  onItemSelected,
  disabled = false,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleItemPress = (item: IMenuButtonItem) => {
    onItemSelected(item);
    setMenuVisible(false);
  };

  return (
    <TouchableRipple
      style={styles.container}
      onPress={() => setMenuVisible(true)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={text}
    >
      <>
        <View style={styles.labelContainer}>
          <Text>{text}</Text>
        </View>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              icon="chevron-down"
              size={24}
              style={styles.iconButton}
              disabled={disabled}
            />
          }
        >
          {items.map((item) => (
            <Menu.Item
              key={item.value}
              onPress={() => handleItemPress(item)}
              title={item.label}
            />
          ))}
        </Menu>
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#CBCBCB",
    alignItems: "center",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  iconButton: {
    margin: 0,
  },
});

export { MenuButton };
