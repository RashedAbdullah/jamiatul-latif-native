import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons
import { useGetSingleStudent } from "../fetch/students";
import { getEngToBn } from "@/utils/get-eng-to-bn";
import { useGetSingleStudentsResult } from "../fetch/results";
import {
  getMarksValue,
  getTotalMarks,
  getAverageMarks,
} from "../utils/get-mark-value";
import LoadingComponent from "../components/loading";
import ErrorComponent from "../components/error";

const StudentDetailsScreen = () => {
  const { studentId } = useLocalSearchParams();
  const { data, loading, error } = useGetSingleStudent(studentId);
  const {
    data: resultData,
    loading: resultLoading,
    error: resultError,
  } = useGetSingleStudentsResult(studentId);

  if (loading || resultLoading) {
    return <LoadingComponent />;
  }

  if (error || resultError) {
    return <ErrorComponent err={error || resultError} />;
  }

  return (
    <ScrollView className="bg-white">
      <Stack.Screen options={{ title: data.name }} />
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

        {/* Results Section */}
        <View className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow mt-5">
          <Text className="text-lg font-bold text-gray-800">প্রাপ্ত ফলাফল</Text>
          <Text className="text-lg font-bold text-gray-800 text-center">
            {resultData.examNameId.examName}
          </Text>
          {resultData?.marks?.length > 0 ? (
            <View className="mt-2 space-y-2 shadow">
              {resultData.marks.map((result, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center bg-gray-100 p-3"
                >
                  <Text className="text-gray-700 font-medium">
                    {result.book}
                  </Text>
                  <Text
                    className={`font-bold ${
                      result.mark < 40 ? "text-red-600" : "text-gray-800"
                    }`}
                  >
                    {getEngToBn(result.mark)}
                  </Text>
                </View>
              ))}

              <View className="flex-row justify-between items-center bg-gray-100 p-3">
                <Text className="text-gray-700 font-bold">মোট</Text>
                <Text className="text-gray-800 font-bold">
                  {getEngToBn(getTotalMarks(resultData.marks))}
                </Text>
              </View>
              <View className="flex-row justify-between items-center bg-gray-100 p-3">
                <Text className="text-gray-700 font-bold">গড়</Text>
                <Text className="text-gray-800 font-bold">
                  {getEngToBn(getAverageMarks(resultData.marks))}
                </Text>
              </View>
              <View className="flex-row justify-between items-center bg-gray-100 p-3">
                <Text className="text-gray-700 font-bold">বিভাগ</Text>
                <Text className="text-gray-800 font-bold">
                  {getMarksValue(resultData.marks)}
                </Text>
              </View>
            </View>
          ) : (
            <Text className="text-gray-500 mt-2">ফলাফল পাওয়া যায়নি।</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentDetailsScreen;
