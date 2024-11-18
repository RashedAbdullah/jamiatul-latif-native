import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const HeroTextsSection = () => {
  return (
    <View className="flex-1 justify-center mb-4 pt-10">
      <Text className="text-2xl font-semibold text-gray-800 text-center py-2 leading-8">
        জ্ঞান কেবল সূচনা, জ্ঞানের পরেই রয়েছে প্রজ্ঞা{" "}
        <Text className="text-[#1e656d] font-bold">জমিয়াতুল লতিফে</Text> আমরা
        মনকে করি আলোকিত এবং আত্মাকে করি প্রভুর পথে অনুপ্রাণিত।
      </Text>
      <Text className="text-gray-600 text-center leading-6">
        ইলম ও গবেষণার পথে আমাদের সাথে যোগ দিন। আমরা আলোকিত শিক্ষার্থীদের একটি
        সমৃদ্ধ সমাজ গড়তে প্রতিশ্রুতিবদ্ধ।
      </Text>

      {/* Buttons */}
      <View className="flex-row justify-center gap-2 mt-5">
        <TouchableOpacity className="flex-row items-center bg-[#1e656d] py-2 px-4 rounded-lg mx-1">
          <Text className="text-white font-medium">মতামত দিন</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-transparent border border-[#1e656d] py-2 px-4 rounded-lg mx-1">
          <Text className="text-[#1e656d] font-medium">আরও জানুন</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeroTextsSection;
