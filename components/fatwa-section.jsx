import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import ErrorComponent from "../components/error";
import LoadingComponent from "../components/loading";
import getFatwas from "@/fetch/fatwas";

const FatwaSection = () => {
  const {
    data: fatwaData,
    loading: fatwaLoading,
    error: fatwaError,
  } = getFatwas(3);
  return (
    <View className="mt-10 px-4">
      <Text className="text-2xl text-center font-bold text-gray-800 mb-4">
        ফতোয়া সমূহ
      </Text>
      {fatwaLoading ? (
        <LoadingComponent />
      ) : fatwaError ? (
        <ErrorComponent err={fatwaError} />
      ) : (
        fatwaData.map((fatwa) => (
          <View
            key={fatwa._id}
            className="bg-white p-5 rounded-lg mb-4 shadow-lg border border-gray-200"
          >
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              {fatwa.questionerId.name}
            </Text>
            <Text className="text-gray-800 mb-2 text-lg">
              প্রশ্ন: {fatwa.questionerId.question}
            </Text>
            <Text className="text-gray-600 leading-6 text-lg">
              উত্তর: {fatwa.answer.slice(0, 100)}...
            </Text>
            <TouchableOpacity className="mt-3">
              <Text className="text-sm font-medium text-green-600 underline">
                বিস্তারিত দেখুন
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
};

export default FatwaSection;
