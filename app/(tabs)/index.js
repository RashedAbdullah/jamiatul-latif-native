import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import getInfo from "@/fetch/info";
import { getEngToBn } from "@/utils/get-eng-to-bn";
import { Link } from "expo-router";
import getArticles from "@/fetch/articles";
import getFatwas from "@/fetch/fatwas";
import FavComponent from "@/components/fab";

import ErrorComponent from "../../components/error";
import LoadingComponent from "../../components/loading";

const HomeScreen = () => {
  const info = getInfo();
  const {
    data: articleData,
    loading: articleLoading,
    error: articleError,
  } = getArticles(3);
  const {
    data: fatwaData,
    loading: fatwaLoading,
    error: fatwaError,
  } = getFatwas(3);

  return (
    <ScrollView className="bg-white">
      <FavComponent />
      <View className="flex-1 p-4">
        {/* Image Section */}
        <View className="items-center mt-5 h-[350px]">
          <Image
            source={require("@/assets/images/home_image.jpeg")}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Text Section */}
        <View className="flex-1 justify-center mb-4 pt-10">
          <Text className="text-2xl font-semibold text-gray-800 text-center py-2 leading-8">
            জ্ঞান কেবল সূচনা, জ্ঞানের পরেই রয়েছে প্রজ্ঞা{" "}
            <Text className="text-green-700 font-bold">জমিয়াতুল লতিফে</Text>{" "}
            আমরা মনকে করি আলোকিত এবং আত্মাকে করি প্রভুর পথে অনুপ্রাণিত।
          </Text>
          <Text className="text-gray-600 text-center leading-6">
            ইলম ও গবেষণার পথে আমাদের সাথে যোগ দিন। আমরা আলোকিত শিক্ষার্থীদের
            একটি সমৃদ্ধ সমাজ গড়তে প্রতিশ্রুতিবদ্ধ।
          </Text>

          {/* Buttons */}
          <View className="flex-row justify-center gap-2 mt-5">
            <TouchableOpacity className="flex-row items-center bg-green-600 py-2 px-4 rounded-lg mx-1">
              <Text className="text-white font-medium">মতামত দিন</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-transparent border border-green-600 py-2 px-4 rounded-lg mx-1">
              <Text className="text-green-600 font-medium">আরও জানুন</Text>
            </TouchableOpacity>
          </View>

          {/* About Madrasha - Info Cards */}
          <View className="mt-20 px-2">
            {info.map((inf) => (
              <View
                key={inf._id}
                className="bg-teal-50 p-4 rounded-lg mb-2 shadow"
              >
                <Text className="text-4xl">{getEngToBn(inf.count)} +</Text>
                <Text className="font-semibold text-gray-700 mb-1">
                  {inf.title}
                </Text>
              </View>
            ))}
          </View>

          {/* Darul Ifta Section */}
          <View className="bg-teal-100 p-5 rounded-lg mt-10 shadow">
            <Image
              source={require("@/assets/images/ifta_book.png")}
              className="w-full h-[150px] rounded-md mb-4"
              resizeMode="cover"
            />
            <Text className="text-3xl font-bold text-teal-800 text-center py-2">
              ফতোয়া বিভাগ
            </Text>
            <Text className="text-lg text-gray-800 text-center leading-6 mb-4">
              ইসলামের বিভিন্ন প্রশ্ন ও সমস্যার সমাধান প্রদানের জন্য আমাদের
              মাদ্রাসায় ফতোয়া বিভাগ রয়েছে। সাধারণ মানুষ তাদের দ্বীনি প্রশ্নের
              সমাধান পেতে পারেন। আমাদের অভিজ্ঞ উস্তাদগণ ইসলামিক শরীয়াহের আলোকে
              ফতোয়া প্রদান করেন।
            </Text>
            <View className="flex-row justify-center gap-4">
              <Link
                href="/question"
                className="text-lg text-teal-700 font-medium underline"
              >
                আপনার জিজ্ঞাসা
              </Link>
              <Link
                href="/fatwas"
                className="text-lg text-teal-700 font-medium underline"
              >
                ফতোয়া দেখুন
              </Link>
            </View>
          </View>

          {/* Articles Section */}
          <View className="mt-10 px-4">
            <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
              প্রবন্ধ সমূহ
            </Text>
            {articleLoading ? (
              <LoadingComponent />
            ) : articleError ? (
              <ErrorComponent err={articleError} />
            ) : (
              articleData.map((article) => (
                <View
                  key={article._id}
                  className="bg-white p-5 rounded-lg mb-4 shadow-lg border border-gray-200"
                >
                  <Text className="text-xl font-semibold text-gray-800 mb-2">
                    {article.title}
                  </Text>
                  <Text className="italic text-gray-600 mb-2">
                    লেখক: {article.author}
                  </Text>
                  <Text className="italic text-gray-600 mb-2">
                    তারিখ:{" "}
                    {new Date(article.publishedAt).toLocaleDateString("bn", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    ইং
                  </Text>
                  <Text className="text-gray-600 leading-6 text-lg">
                    {article.description}
                  </Text>
                  <TouchableOpacity className="mt-3">
                    <Text className="text-sm font-medium text-green-600 underline">
                      আরও পড়ুন
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>

          {/* Fatwas Section */}
          <View className="mt-10 px-4">
            <Text className="text-2xl text-center font-bold text-gray-800 mb-4">
              ফতোয়া সমূহ
            </Text>
            {fatwaLoading ? (
              <LoadingComponent />
            ) : fatwaError ? (
              <ErrorComponent err={fatwaError} />
            ) : (
              fatwaData.map((fatwa) => (
                <View
                  key={fatwa._id}
                  className="bg-white p-5 rounded-lg mb-4 shadow-lg border border-gray-200"
                >
                  <Text className="text-xl font-semibold text-gray-800 mb-2">
                    {fatwa.questionerId.name}
                  </Text>
                  <Text className="text-gray-800 mb-2 text-lg">
                    প্রশ্ন: {fatwa.questionerId.question}
                  </Text>
                  <Text className="text-gray-600 leading-6 text-lg">
                    উত্তর: {fatwa.answer.slice(0, 100)}...
                  </Text>
                  <TouchableOpacity className="mt-3">
                    <Text className="text-sm font-medium text-green-600 underline">
                      বিস্তারিত দেখুন
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
