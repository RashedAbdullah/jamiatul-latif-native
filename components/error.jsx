import { View, Text } from "react-native";
import React from "react";

const ErrorComponent = ({ err }) => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg text-red-500">{err}</Text>
    </View>
  );
};

export default ErrorComponent;
