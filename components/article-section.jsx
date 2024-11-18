import { View, Text } from "react-native";
import React from "react";
import ErrorComponent from "../components/error";
import LoadingComponent from "../components/loading";
import getArticles from "../fetch/articles";
import { TouchableOpacity } from "react-native";

const ArticleSection = () => {
  const {
    data: articleData,
    loading: articleLoading,
    error: articleError,
  } = getArticles(3);

  return (
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
  );
};

export default ArticleSection;
