import { View, Image } from "react-native";
import React from "react";

const HeroImageSection = () => {
  return (
    <View className="items-center mt-5 h-[350px]">
      <Image
        source={require("@/assets/images/home_image.jpeg")}
        className="w-full h-full rounded-lg"
        resizeMode="cover"
      />
    </View>
  );
};

export default HeroImageSection;
