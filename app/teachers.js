import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import getTeachers from "../fetch/teachers";

const TeachersScreen = () => {
  const { data, loading, error } = getTeachers();
  console.log(data[0]);
  return (
    <>
      <Stack.Screen options={{ title: "খুঁজে পাওয়া যায় নি।" }} />
      <View>
        <Text>TeachersScreen</Text>
      </View>
    </>
  );
};

export default TeachersScreen;
