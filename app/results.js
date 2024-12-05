import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetResultsByYearAndClass } from "@/fetch/results";
import { getEngToBn } from "@/utils/get-eng-to-bn";
import { getMarksValue } from "../utils/get-mark-value";
import LoadingComponent from "../components/loading";
import ErrorComponent from "../components/error";
import { useGetexams } from "../fetch/exams";

const ResultsScreen = () => {
  const { yearId, classId } = useLocalSearchParams();
  const {
    data: results,
    loading,
    error,
  } = useGetResultsByYearAndClass(yearId, classId);
  const { data: exams, loading: examLoading, error: examError } = useGetexams();

  if (loading || examLoading) {
    return <LoadingComponent />;
  }

  if (error || examError) {
    return <ErrorComponent err={error || examError} />;
  }

  return (
    <ScrollView className="bg-white">
      <View className="p-4">
        {/* Header */}
        <Text className="text-2xl font-bold text-center text-blue-800">
          {results[0]?.classId?.class || "ক্লাস"}
        </Text>
        <Text className="text-xl text-center">
          ({results[0]?.yearId?.academicYear || "শিক্ষাবর্ষ"} শিক্ষাবর্ষ)
        </Text>

        {/* Loop through each exam */}
        {exams.map((exam) => {
          const filteredResults = results.filter(
            (result) => result.examNameId.examName === exam.examName
          );

          return (
            <View key={exam.id} className="mt-8">
              {/* Exam Title */}
              <Text className="text-xl font-bold text-center text-blue-800 mb-4">
                {exam.examName}
              </Text>

              {/* Results Display */}
              {filteredResults.length > 0 ? (
                filteredResults
                  .map((student) => ({
                    ...student,
                    totalMarks: student.marks.reduce(
                      (total, mark) => total + mark.mark,
                      0
                    ),
                  }))
                  .sort((a, b) => b.totalMarks - a.totalMarks)
                  .map((student, index) => (
                    <View
                      key={student.studentId.id}
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
                        <Text className="font-semibold text-gray-800">
                          মোট
                        </Text>
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
                                (
                                  student.totalMarks / student.marks.length
                                ).toFixed(2)
                              )}
                        </Text>
                      </View>
                      {student.totalMarks > 0 && (
                        <View className="flex-row justify-between items-center mt-2">
                          <Text className="font-semibold text-gray-800">
                            বিভাগ
                          </Text>
                          <Text className="text-lg font-medium">
                            {getMarksValue(student.marks)}
                          </Text>
                        </View>
                      )}
                      {student.totalMarks > 0 && (
                        <View className="flex-row justify-between items-center mt-2">
                          <Text className="font-semibold text-gray-800">
                            সিরিয়াল
                          </Text>
                          <Text className="text-lg font-medium">
                            {getEngToBn((index + 1).toString())}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))
              ) : (
                <Text className="text-center text-gray-600">
                  {exam.examName} পরীক্ষার ফলাফল পাওয়া যায়নি।
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ResultsScreen;
