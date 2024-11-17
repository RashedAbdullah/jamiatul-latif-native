import { View, ActivityIndicator } from "react-native";
import React from "react";

const LoadingComponent = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#1D4ED8" />
    </View>
  );
};

export default LoadingComponent;
