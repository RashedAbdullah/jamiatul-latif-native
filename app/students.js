import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Importing Material Icons
import { useGetStudentsByYearAndClass } from "../fetch/students";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getEngToBn } from "@/utils/get-eng-to-bn";
import LoadingComponent from "../components/loading";
import ErrorComponent from "../components/error";

const StudentsScreen = () => {
  const router = useRouter();
  const { yearId, classId } = useLocalSearchParams();

  const { data, loading, error } = useGetStudentsByYearAndClass(
    yearId,
    classId
  );

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent err={error} />;
  }

  return (
    <ScrollView className="bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-blue-600 text-center py-2">
          {data[0].classNameId.class} শ্রেণি
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-6">
          ({data[0].academicYearId.academicYear} শিক্ষাবর্ষ)
        </Text>

        {data?.length > 0 ? (
          data.map((student) => (
            <TouchableOpacity
              key={student._id}
              style={[styles.card, styles.shadow]}
              onPress={() =>
                router.push({
                  pathname: "/student-details",
                  params: {
                    studentId: student._id,
                  },
                })
              }
            >
              {/* Student Profile */}
              <View className="flex-row items-center">
                {student.photo ? (
                  <Image
                    source={{ uri: student.photo }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="person" size={40} color="#1D4ED8" />
                  </View>
                )}
                <View className="ml-4 flex-1">
                  <Text className="text-lg font-bold text-gray-800">
                    {student.name}
                  </Text>
                  <Text className="text-md text-gray-700">
                    দাখিলা: {getEngToBn(student.dakhila)}
                  </Text>
                </View>
              </View>

              {/* Student Details */}
              <View className="mt-4 border-t border-gray-200 pt-4">
                <Text className="text-lg text-gray-600">
                  <Text className="font-bold">পিতার নাম:</Text> {student.father}
                </Text>
                <Text className="text-lg text-gray-600 mt-2">
                  <Text className="font-bold">ঠিকানা:</Text> {student.address}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="flex justify-center items-center">
            <Text className="text-gray-500 text-lg">
              এই শ্রেণির কোন শিক্ষার্থী পাওয়া যায়নি।
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default StudentsScreen;

// Styles for the page
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1D4ED8",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
  },
});
