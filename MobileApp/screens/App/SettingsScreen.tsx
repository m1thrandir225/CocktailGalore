import { View, Text, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/authApiSlice";
import { logout } from "../../redux/slices/authSlice";
import { selectUserId, logoutUser } from "../../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";
const SettingsScreen = () => {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const id = useSelector(selectUserId);
  const handleLogout = async () => {
    try {
      const result = await logoutMutation({ id }).unwrap();
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("accessToken");
      dispatch(logout());
      dispatch(logoutUser());
    } catch (erorr: any) {
      console.log(erorr);
    }
  };
  return (
    <View>
      <Text>SettingsScreen</Text>
      <Pressable
        onPress={() => handleLogout()}
        style={{
          borderWidth: 2,
          borderColor: "black",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
