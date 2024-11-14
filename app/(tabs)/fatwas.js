import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import getFatwas from "@/fetch/fatwas";
import { getEngToBn } from "@/utils/get-eng-to-bn";

// Main FatwasScreen Component
const FatwasScreen = () => {
  const { data: fatwas, loading, error } = getFatwas();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1D4ED8" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={fatwas}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <FatwaCard fatwa={item} />}
      ListHeaderComponent={() => (
        <View className="p-2 bg-white">
          <Text className="text-2xl font-bold text-center my-2">
            দারুল ইফতা
          </Text>
          <Text className="text-xl text-center mb-4 text-gray-600">
            আপনার প্রশ্নের উত্তর
          </Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <View className="flex justify-center items-center py-12">
          <Text className="text-gray-500">
            এই ক্যাটাগরির কোন ফতোয়া পাওয়া যায় নি।
          </Text>
        </View>
      )}
      contentContainerStyle={{ padding: 16, backgroundColor: "white" }}
    />
  );
};

// FatwaCard Component
const FatwaCard = ({ fatwa }) => (
  <View className="bg-white rounded-lg p-4 my-2 shadow-md">
    <View className="mb-2">
      {fatwa?.questionerId?.name && (
        <Text className="text-lg font-bold text-gray-900">
          {fatwa?.questionerId?.name}
        </Text>
      )}
      {fatwa?.questionerId?.address && (
        <Text className="text-sm text-gray-600">
          {fatwa?.questionerId?.address}
        </Text>
      )}
      {fatwa.createdAt && (
        <Text className="text-xs text-gray-500 mt-1">
          {new Date(fatwa?.createdAt).toLocaleDateString("bn-BD")}
        </Text>
      )}
    </View>
    <View>
      <Text className="text-lg font-bold text-blue-700 mb-1">
        {getEngToBn(fatwa?.fatwa_no)} নং. প্রশ্ন
      </Text>
      <Text className="text-lg">{fatwa?.questionerId?.question}</Text>
    </View>
    <View className="mt-2">
      <Text className="text-xl font-bold">উত্তর:</Text>
      <Text className="text-lg">{fatwa?.answer}</Text>
      <Text className="text-sm italic text-gray-500 mt-1">
        তথ্যসূত্র: {fatwa?.references}
      </Text>
    </View>
  </View>
);

export default FatwasScreen;
