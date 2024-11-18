import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Link } from 'expo-router'

const DarulIftaSection = () => {
  return (
    <View className="bg-[#d4f1f3] p-5 rounded-lg mt-10 shadow">
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
        className="text-lg text-[#1e656d] font-medium underline"
      >
        আপনার জিজ্ঞাসা
      </Link>
      <Link
        href="/fatwas"
        className="text-lg text-[#1e656d] font-medium underline"
      >
        ফতোয়া দেখুন
      </Link>
    </View>
  </View>
  )
}

export default DarulIftaSection