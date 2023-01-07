import { View, Text, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/authApiSlice";
import { logout, selectCurrentUser } from "../../redux/slices/authSlice";
const SettingsScreen = () => {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const result = await logoutMutation({ id: user?.id }).unwrap();
      dispatch(logout());
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
