import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons
import { useGetSingleStudent } from "../fetch/students";
import { getEngToBn } from "@/utils/get-eng-to-bn";

const StudentDetailsScreen = () => {
  const { studentId } = useLocalSearchParams();
  const { data, loading, error } = useGetSingleStudent(studentId);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text className="text-gray-500 mt-4 text-lg">তথ্য লোড হচ্ছে...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-red-100">
        <Text className="text-red-600 text-lg text-center px-4">
          শিক্ষার্থীর তথ্য লোড করতে ব্যর্থ: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-white">
      <Stack.Screen options={{title: data.name}}/>
      {/* Header Section */}
      <View className="bg-blue-100 py-8 px-4 items-center">
        {/* Profile Image or Icon */}
        {data.image && (
          <View className="w-24 h-24 rounded-full bg-blue-300 flex items-center justify-center">
            <Image
              source={{ uri: data.image }}
              className="w-24 h-24 rounded-full"
            />
          </View>
        )}

        <Text className="text-2xl font-bold text-blue-800 mt-4">
          {data.name}
        </Text>
        <Text className="text-lg text-gray-600">
          দাখিলা: {getEngToBn(data.dakhila)}
        </Text>
      </View>

      {/* Details Section */}
      <View className="p-4 space-y-4">
        <View className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow">
          <Text className="text-lg font-bold text-gray-800">
            বিস্তারিত তথ্য
          </Text>
          <View className="mt-2 space-y-2">
            <Text className="text-gray-700">
              <Text className="font-bold">পিতার নাম:</Text> {data.father}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">ঠিকানা:</Text> {data.address}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">যোগাযোগ নম্বর:</Text> {data.contact}
            </Text>
          </View>
        </View>

        <View className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow mt-5">
          <Text className="text-lg font-bold text-gray-800">
            শিক্ষা সম্পর্কিত তথ্য
          </Text>
          <View className="mt-2 space-y-2">
            <Text className="text-gray-700">
              <Text className="font-bold">শ্রেণি:</Text>{" "}
              {data.classNameId.class}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">শিক্ষাবর্ষ:</Text>{" "}
              {data.academicYearId.academicYear} ইং
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentDetailsScreen;
