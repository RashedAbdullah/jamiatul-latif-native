import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import getNotices from "@/fetch/notices";

const NoticesScreen = () => {
  const { data: notices, loading, error } = getNotices();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-lg text-gray-700">লোড হচ্ছে...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-xl font-semibold text-red-600">
          নোটিশ লোড করতে সমস্যা হয়েছে
        </Text>
        <Text className="text-base text-gray-700 mt-2">আবার চেষ্টা করুন।</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-gray-100 min-h-screen p-6">
      <Text className="text-3xl font-extrabold text-center text-blue-700 py-2 mb-6">
        নোটিশ বোর্ড
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

export default NoticesScreen;
