import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGetSingleArticle } from "../../fetch/articles";
import { AntDesign } from "@expo/vector-icons"; // Replace FaUser, FaCalendarAlt with AntDesign
import RenderHtml from "react-native-render-html"; // Library for rendering HTML
import ErrorComponent from "../../components/error";
import LoadingComponent from "../../components/loading";

const defaultImage = require("../../assets/images/ifta_book.png");

const SingleArticleScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: article, loading, error } = useGetSingleArticle(id);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  const publishedAt = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "তারিখ পাওয়া যায়নি।";

  const { width } = Dimensions.get("window");

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: article?.title }} />
      {/* Cover Image */}
      <View style={styles.coverImageContainer}>
        <Image
          source={
            article?.coverImage ? { uri: article.coverImage } : defaultImage
          }
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.title}>{article?.title || ""}</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <AntDesign name="user" size={16} color="#fff" />
              <Text style={styles.infoText}>{article?.author || ""}</Text>
            </View>
            <View style={styles.infoItem}>
              <AntDesign name="calendar" size={16} color="#fff" />
              <Text style={styles.infoText}>{publishedAt}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Article Content */}
      <View style={styles.contentContainer}>
        {article?.content ? (
          <RenderHtml
            contentWidth={width}
            source={{ html: article.content }}
            tagsStyles={{
              p: {
                textAlign: "justify",
                color: "#333",
                fontSize: 16,
                marginVertical: 0,
              },
              h3: { fontWeight: "bold", fontSize: 18, marginVertical: 2 },
              em: { fontStyle: "italic", color: "#666", marginVertical: 2 },
            }}
          />
        ) : (
          <Text style={styles.noContentText}>বিষয়বস্তু পাওয়া যায়নি।</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverImageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  infoText: {
    color: "#fff",
    marginLeft: 8,
  },
  contentContainer: {
    padding: 16,
  },
  noContentText: {
    color: "#555",
    fontSize: 16,
  },
});

export default SingleArticleScreen;
