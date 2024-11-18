import React from "react";
import { View, Text, ScrollView } from "react-native";
import getAbout from "../fetch/about";
import LoadingComponent from "../components/loading";
import ErrorComponent from "../components/error";

const AboutScreen = () => {
  const { data, loading, error } = getAbout();

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent err={error} />;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-lg p-6 shadow-md">
        <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
          মাদ্রাসা পরিচিতি
        </Text>
        {/* Mapping through data to display title and details dynamically */}
        {data.map((section, index) => (
          <View key={index} className="mb-4">
            <Text className="text-xl font-semibold text-gray-800">
              {section.title}:
            </Text>
            <Text className="text-lg text-gray-700">{section.details}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
