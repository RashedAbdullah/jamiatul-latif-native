import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import getTeachers from "../fetch/teachers";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

const TeachersScreen = () => {
  const { data: teachers, loading, error } = getTeachers();

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1D4ED8" />
      </View>
    );
  if (error)
    return <Text className="text-center text-lg">Error loading teachers</Text>;

  return (
    <ScrollView className="bg-white p-4">
      <Text className="text-4xl font-extrabold text-center py-4 text-gray-800">
        শিক্ষক পরিচিতি
      </Text>
      <Text className="text-xl text-gray-600 text-center mb-6">
        আমাদের নিবেদিত শিক্ষকদের সাথে পরিচিত হোন।
      </Text>
      {teachers &&
        teachers
          .sort((a, b) => a.teacherSerial - b.teacherSerial)
          .filter((teacher) => !teacher.resignation.resigned)
          .map((teacher) => (
            <TeacherCard key={teacher._id} teacher={teacher} />
          ))}
    </ScrollView>
  );
};

const TeacherCard = ({ teacher }) => {
  return (
    <View className="bg-gray-50 shadow-lg p-6 mb-6 rounded-2xl border border-gray-200">
      <TeacherAvatar avatar={teacher.image} id={teacher._id} />
      <View className="mt-4">
        <TeacherInfo info={teacher} />
        <AboutTeacher aboutTeacher={teacher.about} />
        <TeachersSocialLinks socialLinks={teacher.socials} />
      </View>
    </View>
  );
};

const TeacherAvatar = ({ avatar, id }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log("Navigate to details for ID:", id)}
      className="self-center"
    >
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          className="h-40 w-40 rounded-full bg-cover bg-center border border-gray-200"
        />
      ) : (
        <FontAwesome name="user-circle" size={112} color="gray" />
      )}
    </TouchableOpacity>
  );
};

const TeacherInfo = ({ info }) => {
  return (
    <View className="mt-4 text-center">
      <Link
        href={{
          pathname: `/teachers/${info.name}`,
          params: { id: info._id },
        }}
      >
        <Text className="text-2xl font-bold text-gray-900 text-center">
          {info.name}
        </Text>
      </Link>
      <Text className="text-lg text-gray-700 text-center">{info.post}</Text>
      <Text className="text-gray-600">ঠিকানা: {info.address}</Text>
      <Text className="text-gray-600">ফারেগ: {info.masters}</Text>
      {info.degree && (
        <Text className="text-gray-600">তাখাস্সুস: {info.degree}</Text>
      )}
      <Text className="text-gray-600">ইমেইল: {info.email}</Text>
      <Text className="text-gray-600">মোবাইল: {info.number}</Text>
    </View>
  );
};

const AboutTeacher = ({ aboutTeacher }) => {
  return (
    <View className="mt-4">
      <Text className="text-xl font-semibold text-gray-800 text-center">
        শিক্ষক সম্পর্কে
      </Text>
      <Text className="text-base text-gray-700 mt-2 leading-relaxed">
        {aboutTeacher}
      </Text>
    </View>
  );
};

const TeachersSocialLinks = ({ socialLinks }) => {
  const icons = {
    facebook: "facebook-square",
    twitter: "twitter-square",
    telegram: "telegram",
  };

  return (
    <View className="flex-row justify-center mt-4">
      {socialLinks.map((link, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => Linking.openURL(link.link)}
          className="mx-3"
        >
          <FontAwesome name={icons[link.name]} size={36} color="#4a4a4a" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TeachersScreen;
