import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import FavComponent from "@/components/fab";
import getNotices from "@/fetch/notices";
import NoticeModal from "@/components/notice-modal";
import AboutMadrashaSection from "@/components/about-madrasha";
import DarulIftaSection from "@/components/darul-ifta-section";
import ArticleSection from "@/components/article-section";
import FatwaSection from "@/components/fatwa-section";
import HeroImageSection from "@/components/hero-image-section";
import HeroTextsSection from "@/components/hero-text-section";
import { registerForPushNotificationsAsync } from "@/components/notification";
import * as Notifications from "expo-notifications";
import Footer from "@/components/footer";

const HomeScreen = () => {
  const { data: notices } = getNotices();
  const [isModalVisible, setIsModalVisible] = useState(true);
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  return (
    <ScrollView className="bg-white">
      <NoticeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        notice={notices[0]}
      />

      <FavComponent />
      <View className="flex-1 p-4">
        <HeroImageSection />
        <HeroTextsSection />
        <AboutMadrashaSection />
        <DarulIftaSection />
        <ArticleSection />
        <FatwaSection />
        {/* <Footer /> */}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
