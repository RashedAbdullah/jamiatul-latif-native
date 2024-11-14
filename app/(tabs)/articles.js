import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import getArticles from "../../fetch/articles";

const ArticlesScreen = () => {
  const articles = getArticles();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>নিবন্ধসমূহ</Text>
      {articles.map((article, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={
              article.coverImage
                ? { uri: article.coverImage }
                : require("../../assets/images/ifta_book.png")
            }
            style={styles.image}
          />
          <Link href="/">
            <Text style={styles.title}>{article.title}</Text>
          </Link>
          <Text style={styles.author}>লেখক: {article.author}</Text>
          <Text style={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString("bn", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            ইং
          </Text>
          <Text style={styles.description}>{article.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
    color: "#0f172a",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 22,
  },
});

export default ArticlesScreen;
