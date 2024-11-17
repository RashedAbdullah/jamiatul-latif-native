import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetResultsByYearAndClass } from "@/fetch/results";
import { getEngToBn } from "@/utils/get-eng-to-bn";
import { getMarksValue, getTotalMarks } from "../utils/get-mark-value";
import LoadingComponent from "../components/loading";
import ErrorComponent from "../components/error";

const ResultsScreen = () => {
  const { yearId, classId } = useLocalSearchParams();
  const { data, loading, error } = useGetResultsByYearAndClass(yearId, classId);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent err={error} />;
  }

  const sortedResults = data
    ?.map((student) => ({
      ...student,
      totalMarks: student.marks.reduce((total, mark) => total + mark.mark, 0),
    }))
    .sort((a, b) => b.totalMarks - a.totalMarks);

  return (
    <ScrollView className="bg-white">
      <View className="p-4">
        {/* Header */}
        <Text className="text-2xl font-bold text-center text-blue-800">
          {data[0].classId.class}
        </Text>
        <Text className="text-xl text-center">
          ({data[0].yearId.academicYear} শিক্ষাবর্ষ)
        </Text>
        <Text className="text-xl font-bold text-center text-blue-800">
          {data[0].examNameId.examName}
        </Text>

        {/* Results Display */}
        {sortedResults?.map((student, index) => (
          <View
            key={index}
            className={`my-4 p-4 border rounded-lg shadow ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            {/* Student Name and Dakhila */}
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-semibold text-blue-700">
                {student.studentId.name}
              </Text>
              <Text className="text-lg text-gray-600">
                {getEngToBn(student.studentId.dakhila)}
              </Text>
            </View>

            {/* Marks */}
            {student.marks.map((mark, idx) => (
              <View
                key={idx}
                className="flex-row justify-between items-center mb-2"
              >
                <Text className="text-gray-800">{mark.book}</Text>
                <Text
                  className={`text-lg font-medium ${
                    mark.mark < 40 && mark.mark !== 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {mark.mark === 0 ? "অনু." : getEngToBn(mark.mark)}
                </Text>
              </View>
            ))}

            {/* Total Marks and Average */}
            <View className="flex-row justify-between items-center mt-2">
              <Text className="font-semibold text-gray-800">মোট</Text>
              <Text className="text-lg font-medium">
                {student.totalMarks === 0
                  ? "অনু."
                  : getEngToBn(student.totalMarks.toString())}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="font-semibold text-gray-800">গড়</Text>
              <Text className="text-lg font-medium">
                {student.totalMarks === 0
                  ? "অনু."
                  : getEngToBn(
                      (student.totalMarks / student.marks.length).toFixed(2)
                    )}
              </Text>
            </View>
            {student.totalMarks > 0 && (
              <View className="flex-row justify-between items-center mt-2">
                <Text className="font-semibold text-gray-800">বিভাগ</Text>
                <Text className="text-lg font-medium">
                  {getMarksValue(student.marks)}
                </Text>
              </View>
            )}
            {student.totalMarks > 0 && (
              <View className="flex-row justify-between items-center mt-2">
                <Text className="font-semibold text-gray-800">সিরিয়াল</Text>
                <Text className="text-lg font-medium">
                  {getEngToBn((index + 1).toString())}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ResultsScreen;
