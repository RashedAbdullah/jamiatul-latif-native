import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import getInfo from "@/fetch/info";
import {getEngToBn} from "@/utils/get-eng-to-bn"
import { Link } from 'expo-router';
const HomeScreen = () => {
  const info = getInfo();


  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/home_image.jpeg')}
            style={styles.homeImage}
            resizeMode="cover"
          />
        </View>

        {/* Text Section */}
        <View style={styles.textSection}>
          <Text style={styles.title}>
            জ্ঞান কেবল সূচনা, জ্ঞানের পরেই রয়েছে প্রজ্ঞা{" "}
            <Text style={styles.highlight}>জমিয়াতুল লতিফে</Text> আমরা মনকে করি
            আলোকিত এবং আত্মাকে করি প্রভুর পথে অনুপ্রাণিত।
          </Text>
          <Text style={styles.subtitle}>
            ইলম ও গবেষণার পথে আমাদের সাথে যোগ দিন। আমরা আলোকিত শিক্ষার্থীদের একটি
            সমৃদ্ধ সমাজ গড়তে প্রতিশ্রুতিবদ্ধ।
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>মতামত দিন</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.outlineButton]}>
              <Text style={[styles.buttonText, styles.outlineButtonText]}>
                আরও জানুন
              </Text>
            </TouchableOpacity>
          </View>

          {/* About Madrasha - Info Cards */}
          <View style={styles.infoContainer}>
            {info.map((inf) => (
              <View key={inf._id} style={styles.infoCard}>
                <Text style={styles.infoCount}>{getEngToBn(inf.count)}</Text>
                <Text style={styles.infoTitle}>{inf.title}</Text>
              </View>
            ))}
          </View>

           {/* Darul ifta */}
           <View >
           <Image
            source={require('@/assets/images/ifta_book.png')}

          />
          <Text>ফতোয়া বিভাগ</Text>
          <Text>ইসলামের বিভিন্ন প্রশ্ন ও সমস্যার সমাধান প্রদানের জন্য আমাদের মাদ্রাসায় ফতোয়া বিভাগ রয়েছে। সাধারণ মানুষ তাদের দ্বীনি প্রশ্নের সমাধান পেতে পারেন। আমাদের অভিজ্ঞ উস্তাদগণ ইসলামিক শরীয়াহের আলোকে ফতোয়া প্রদান করেন।</Text>
          </View>
          <View>
            <Link href="/question">আপনার জিজ্ঞাসা</Link>
            <Link href="/fatwas">
            ফতোয়া দেখুন</Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  highlight: {
    color: '#388e3c',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  outlineButtonText: {
    color: '#4CAF50',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    height: 350,

  },
  homeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 80,
    paddingHorizontal: 8,
  },
  infoCard: {
    backgroundColor: '#f0f8f7',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  infoCount: {
    fontSize: 28,
  },
});

export default HomeScreen;
