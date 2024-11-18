import { View, Text, ScrollView } from "react-native";
import React from "react";
import getNotices from "@/fetch/notices";
import LoadingComponent from "../../components/loading";
import ErrorComponent from "../../components/error";

const NotificationScreen = () => {
  const { data: notices, loading, error } = getNotices();

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent err={error} />;
  }

  return (
    <ScrollView className="bg-gray-100 min-h-screen p-6">
      <Text className="text-3xl font-extrabold text-center text-blue-700 py-2 mb-6">
        নোটিফিকেশন
      </Text>

      {notices.map((notice) => (
        <View
          key={notice._id}
          className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200"
        >
          <Text className="text-2xl font-bold text-blue-800 mb-2">
            {notice.title}
          </Text>

          <Text className="text-lg text-gray-700 leading-relaxed">
            {notice.details}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default NotificationScreen;
