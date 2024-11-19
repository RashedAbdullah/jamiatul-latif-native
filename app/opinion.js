import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const GetOpinionScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [opinion, setOpinion] = useState("");

  const handleSubmit = async () => {
    if (!name || !opinion) {
      Alert.alert("Error", "নাম এবং মতামত পূরণ করা আবশ্যক।");
      return;
    }

    try {
      const response = await fetch("https://jamiatullatif.com/api/opinion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          phone,
          opinion,
        }),
      });

      if (response.ok) {
        Alert.alert("সফল", "আপনার মতামত জমা হয়েছে।");
        setName("");
        setAddress("");
        setPhone("");
        setOpinion("");
      } else {
        Alert.alert(
          "ত্রুটি",
          "কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("ত্রুটি", "সার্ভারে সংযোগ করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <ScrollView className="flex-1 p-4 pt-20 bg-gray-100">
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Text className="text-lg font-bold text-center mb-4 text-gray-800">
          আপনার মতামত দিন
        </Text>

        {/* Name Field */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">আপনার নাম:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="আপনার নাম . . ."
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Address Field */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">আপনার ঠিকানা:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="আপনার ঠিকানা . . ."
            placeholderTextColor="#9CA3AF"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Phone Number Field */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">মোবাইল নাম্বার:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="মোবাইল নাম্বার . . ."
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Opinion Field */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">আপনার মতামত:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 h-32 text-start"
            placeholder="আপনার মতামত দিন . . ."
            placeholderTextColor="#9CA3AF"
            multiline={true}
            value={opinion}
            onChangeText={setOpinion}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-lg"
          onPress={handleSubmit}
        >
          <Text className="text-center text-white font-bold">জমা দিন</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default GetOpinionScreen;
