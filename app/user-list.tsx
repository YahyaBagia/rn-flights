import { useAuthStore, User } from "@/src/store/globalStore";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Button, Card, Divider, List } from "react-native-paper";

const UserList = () => {
  const { userList } = useAuthStore();

  return (
    <FlatList
      data={userList}
      renderItem={({ item }) => <UserItem user={item} />}
      style={{ flex: 1, padding: 8 }}
    />
  );
};

export interface IconUserItemProps {
  user: User;
}

const UserItem: React.FC<IconUserItemProps> = (props) => {
  const { user } = props;
  const { id, name, email, password } = user;

  const { deleteUser } = useAuthStore();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const copyToClipboard = (text: string) => {
    Clipboard.setStringAsync(text);
  };

  const onDeleteUser = () => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Yes", onPress: () => deleteUser(id) },
      { text: "Cancel" },
    ]);
  };

  return (
    <Card style={styles.userItemCard}>
      <List.Item
        title={name}
        left={() => <List.Icon icon="account" style={styles.listLeftIcon} />}
        right={() => (
          <List.Icon icon={isExpanded ? "chevron-up" : "chevron-down"} />
        )}
        onPress={toggleExpand}
      />
      {isExpanded && (
        <View>
          <Divider />
          <List.Item
            title={"Email"}
            description={email}
            left={() => (
              <List.Icon icon="email-outline" style={styles.listLeftIcon} />
            )}
            right={() => <List.Icon icon="clipboard-outline" />}
            onPress={() => copyToClipboard(email)}
          />
          <List.Item
            title={"Password"}
            description={password}
            left={() => (
              <List.Icon icon="lock-outline" style={styles.listLeftIcon} />
            )}
            right={() => <List.Icon icon="clipboard-outline" />}
            onPress={() => copyToClipboard(password)}
          />
          <Divider />
          <Button
            mode="contained"
            icon={"delete"}
            style={styles.deleteButton}
            onPress={onDeleteUser}
            buttonColor="tomato"
            textColor="white"
          >
            Delete
          </Button>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  userItemCard: {
    marginVertical: 8,
    marginHorizontal: 2,
  },
  listLeftIcon: {
    marginLeft: 12,
  },
  deleteButton: {
    margin: 8,
  },
});

export default UserList;
