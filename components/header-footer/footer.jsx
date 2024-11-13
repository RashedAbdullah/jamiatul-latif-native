import React from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Footer = () => {
  return (
    <ScrollView style={styles.footer}>
      {/* Footer Top Section */}
      <View style={styles.footerTop}>
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>আমাদের সম্পর্কে</Text>
          <Text style={styles.sectionText}>
            জমিয়াতুল লতিফ রূপগঞ্জ মাদরাসা, ধর্মীয় শিক্ষার এক বিশ্বস্ত
            প্রতিষ্ঠান। এখানে আপনি পাবেন কুরআন, হাদিস ও অন্যান্য ইসলামী শিক্ষার
            পূর্ণাঙ্গ ব্যবস্থা।
          </Text>
        </View>

        {/* Quick Links Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>নেভিগেশনস</Text>
          <TouchableOpacity
            onPress={() => {
              /* Handle navigation */
            }}
          >
            <Text style={styles.linkText}>হোম</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Handle navigation */
            }}
          >
            <Text style={styles.linkText}>যোগাযোগ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Handle navigation */
            }}
          >
            <Text style={styles.linkText}>আমাদের সম্পর্কে</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Handle navigation */
            }}
          >
            <Text style={styles.linkText}>প্রাইভেসি পলিসি</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>যোগাযোগ</Text>
          <Text style={styles.sectionText}>
            জমিয়াতুল লতিফ রূপগঞ্জ মাদরাসা{"\n"}
            রূপগঞ্জ, নারায়ণগঞ্জ, বাংলাদেশ{"\n"}
            ফোন: +880 01810 445 445{"\n"}
            ইমেইল: info@jamiatul-latif.com
          </Text>
          {/* Social Media Icons */}
          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.facebook.com/jamiatullatifrupganj")
              }
            >
              <FontAwesome
                name="facebook"
                size={24}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("#")}>
              <FontAwesome
                name="twitter"
                size={24}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.youtube.com/@alqasimbd")
              }
            >
              <FontAwesome
                name="youtube"
                size={24}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer Bottom Section */}
      <View style={styles.footerBottom}>
        <Text style={styles.bottomText}>
          &copy; {new Date().getFullYear()} জমিয়াতুল লতিফ কতৃক স্বত্ত্ব
          সংরক্ষিত
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  footerTop: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 10,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: "#aaa",
  },
  linkText: {
    fontSize: 14,
    color: "#4da6ff",
    marginVertical: 4,
  },
  socialIcons: {
    flexDirection: "row",
    marginTop: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  footerBottom: {
    marginTop: 16,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 12,
    color: "#666",
  },
});

export default Footer;
