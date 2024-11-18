import { View, Text } from "react-native";
import React from "react";
import getInfo from "../fetch/info";
import { getEngToBn } from "@/utils/get-eng-to-bn";
const AboutMadrashaSection = () => {
  const info = getInfo();

  return (
    <View className="mt-20 px-2">
      {info.map((inf) => (
        <View key={inf._id} className="bg-[#d4f1f3] p-4 rounded-lg mb-2 shadow">
          <Text className="text-4xl">{getEngToBn(inf.count)} +</Text>
          <Text className="font-semibold text-gray-700 mb-1">{inf.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default AboutMadrashaSection;
