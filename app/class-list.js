import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useGetClasses } from "../fetch/classes";
import { useGetYears } from "../fetch/years";
import { Picker } from "@react-native-picker/picker"; // Import from the new package
import { useRouter } from "expo-router";
import LoadingComponent from "../components/loading";
import ErrorComponent from "../components/error";

const ClassListByYear = () => {
  const router = useRouter();

  const {
    data: classesData,
    loading: classesLoading,
    error: classesError,
  } = useGetClasses();
  const {
    data: yearsData,
    loading: yearsLoading,
    error: yearsError,
  } = useGetYears();

  const [selectedYear, setSelectedYear] = useState(null);

  if (classesLoading || yearsLoading) {
    return <LoadingComponent />;
  }

  if (classesError || yearsError) {
    return <ErrorComponent err={classesError || yearsError} />;
  }

  return (
    <ScrollView className="bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-blue-600 text-center py-4">
          ২০২৪-২০২৫ শিক্ষাবর্ষ
        </Text>

        {classesData.map((cls) => (
          <TouchableOpacity
            key={cls._id}
            style={[styles.card, styles.shadow]}
            onPress={() =>
              router.push({
                pathname: "/students",
                params: {
                  yearId: "66f13d0337317a1fbb7e7ff7",
                  classId: cls._id,
                },
              })
            }
          >
            <Text className="text-lg font-medium text-blue-900">
              {cls.class}
            </Text>
          </TouchableOpacity>
        ))}

        <Text className="text-2xl font-bold text-blue-600 text-center py-4 mt-10">
          বিগত শিক্ষাবর্ষের ছাত্রদের তথ্য দেখুন
        </Text>

        {/* Year selection dropdown */}
        <View className="mb-4">
          <Text className="text-lg font-medium text-gray-700 mb-2">
            শিক্ষাবর্ষ সিলেক্ট করুন:
          </Text>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            style={{
              height: 50,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: "#f0f0f0",
            }}
          >
            <Picker.Item label="শিক্ষাবর্ষ সিলেক্ট করুন" value={null} />
            {yearsData?.map((year) => (
              <Picker.Item
                key={year._id}
                label={year.academicYear} // Assuming year name is user-friendly
                value={year._id}
              />
            ))}
          </Picker>
        </View>

        {/* Class list */}
        {selectedYear ? (
          classesData?.length > 0 ? (
            classesData.map((cls) => (
              <TouchableOpacity
                key={cls._id}
                style={[styles.card, styles.shadow]}
                onPress={() =>
                  router.push({
                    pathname: "/students",
                    params: {
                      yearId: selectedYear,
                      classId: cls._id,
                    },
                  })
                }
              >
                <Text className="text-lg font-medium text-blue-900">
                  {cls.class}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View className="flex justify-center items-center">
              <Text className="text-gray-500">কোন ক্লাস পাওয়া যায়নি।</Text>
            </View>
          )
        ) : (
          <View className="flex justify-center items-center py-20">
            <Text className="text-gray-500 text-lg">
              অনুগ্রহ করে শিক্ষাবর্ষ সিলেক্ট করুন।
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ClassListByYear;

// Custom styles for shadow
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
});
