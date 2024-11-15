import { View, Text } from "react-native";
import React from "react";
import { useGetStudentsByYear } from "../fetch/students";

const StudentsScreen = () => {
  const { data, loading, error } = useGetStudentsByYear(
    "66f13d0337317a1fbb7e7ff7"
  );

  return (  
    <View>
      <Text>StudentsScreen</Text>
    </View>
  );
};

export default StudentsScreen;
