import React from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import getArticles from "../../fetch/articles";
import LoadingComponent from "../../components/loading";
import ErrorComponent from "../../components/error";

const ArticlesScreen = () => {
  const { data: articles, loading, error } = getArticles();

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent err={error} />;
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ArticleCard article={item} />}
      ListHeaderComponent={() => (
        <View className="p-4 bg-white">
          <Text className="text-2xl font-bold text-center my-4 text-gray-800">
            নিবন্ধসমূহ
          </Text>
        </View>
      )}
      contentContainerStyle={{ padding: 16, backgroundColor: "#f5f5f5" }}
    />
  );
};

const ArticleCard = ({ article }) => (
  <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
    <Image
      source={
        article.coverImage
          ? { uri: article.coverImage }
          : require("../../assets/images/ifta_book.png")
      }
      className="w-full h-48 rounded-md mb-3"
    />
    <Link href="/">
      <Text className="text-xl font-bold text-gray-900 mb-2">
        {article.title}
      </Text>
    </Link>
    <Text className="text-base text-gray-600 mb-1">লেখক: {article.author}</Text>
    <Text className="text-sm text-gray-500 mb-2">
      {new Date(article.publishedAt).toLocaleDateString("bn", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}{" "}
      ইং
    </Text>
    <Text className="text-base text-gray-700 leading-6">
      {article.description}
    </Text>
  </View>
);

export default ArticlesScreen;
