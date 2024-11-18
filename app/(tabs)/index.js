import React, { useState } from "react";
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
import NotificationComponent from "../../components/notification";

const HomeScreen = () => {
  const { data: notices } = getNotices();
  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <ScrollView className="bg-white">
      <NotificationComponent />
      {notices.length && (
        <NoticeModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          notice={notices[0]}
        />
      )}
      <FavComponent />
      <View className="flex-1 p-4">
        <HeroImageSection />
        <HeroTextsSection />
        <AboutMadrashaSection />
        <DarulIftaSection />
        <ArticleSection />
        <FatwaSection />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
