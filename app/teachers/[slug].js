import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Stack } from "expo-router";

const SingleTeacherScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <Stack.Screen options={{ title: id }}>
      <View className="min-h-screen bg-white">
        <Text>{id}</Text>
      </View>
    </Stack.Screen>
  );
};

export default SingleTeacherScreen;
