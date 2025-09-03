import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // stored in plaintext for demo simplicity
};

export type PublicUser = Omit<User, "password">;

export const USER_STORAGE_KEY = "user" as const;
export const USER_LIST_STORAGE_KEY = "user_list" as const;

const initialUsers: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", password: "123456" },
  { id: "2", name: "Bob", email: "bob@example.com", password: "abcdef" },
];

// Zustand Store Type
interface AuthState {
  user: PublicUser | null;
  userList: User[];
  loading: boolean;

  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<boolean>;
}

// Zustand Store
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userList: [],
  loading: true,

  initialize: async () => {
    try {
      const [storedUser, storedUserList] = await Promise.all([
        AsyncStorage.getItem(USER_STORAGE_KEY),
        AsyncStorage.getItem(USER_LIST_STORAGE_KEY),
      ]);

      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }

      if (storedUserList) {
        set({ userList: JSON.parse(storedUserList) });
      } else {
        await AsyncStorage.setItem(
          USER_LIST_STORAGE_KEY,
          JSON.stringify(initialUsers)
        );
        set({ userList: initialUsers });
      }
    } catch (e) {
      console.error("AuthStore load error:", e);
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    const { userList } = get();
    const existingUser = userList.find(
      (u) => u.email === email && u.password === password
    );
    if (!existingUser) return false;

    const publicUser: PublicUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    set({ user: publicUser });
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(publicUser));
    return true;
  },

  signup: async (name, email, password) => {
    const { userList } = get();
    const existingUser = userList.find((u) => u.email === email);
    if (existingUser) return false;

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    const updatedUserList = [...userList, newUser];
    set({ userList: updatedUserList });
    await AsyncStorage.setItem(
      USER_LIST_STORAGE_KEY,
      JSON.stringify(updatedUserList)
    );

    const publicUser: PublicUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    set({ user: publicUser });
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(publicUser));
    return true;
  },

  logout: async () => {
    set({ user: null });
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  },

  deleteUser: async (id) => {
    const { userList } = get();
    const updatedUserList = userList.filter((u) => u.id !== id);
    set({ userList: updatedUserList });
    await AsyncStorage.setItem(
      USER_LIST_STORAGE_KEY,
      JSON.stringify(updatedUserList)
    );
  },

  changePassword: async (oldPassword, newPassword) => {
    const { user, userList } = get();
    const foundUser = userList.find(
      (u) => u.id === user?.id && u.password === oldPassword
    );

    if (!foundUser) return false;

    const updatedUserList = userList.map((u) =>
      u.id === user?.id ? { ...u, password: newPassword } : u
    );

    set({ userList: updatedUserList });
    await AsyncStorage.setItem(
      USER_LIST_STORAGE_KEY,
      JSON.stringify(updatedUserList)
    );
    return true;
  },
}));
