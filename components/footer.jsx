import React from "react";
import { View, Text, Linking, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Footer = () => {
  return (
    <View style={styles.footer}>
      {/* Footer Top Section */}
      <View style={styles.footerTop}>
        {/* About Section */}
        <View style={styles.footerSection}>
          <Text style={styles.sectionTitle}>আমাদের সম্পর্কে</Text>
          <Text style={styles.sectionText}>
            জমিয়াতুল লতিফ রূপগঞ্জ মাদরাসা, ধর্মীয় শিক্ষার এক বিশ্বস্ত
            প্রতিষ্ঠান। এখানে আপনি পাবেন কুরআন, হাদিস ও অন্যান্য ইসলামী শিক্ষার
            পূর্ণাঙ্গ ব্যবস্থা।
          </Text>
        </View>

        {/* Quick Links Section */}
        <View style={styles.footerSection}>
          <Text style={styles.sectionTitle}>নেভিগেশনস</Text>
          <Button style={styles.linkButton} onPress={() => Linking.openURL("/")}>
            <Text style={styles.linkText}>হোম</Text>
          </Button>
          <Button style={styles.linkButton} onPress={() => Linking.openURL("/")}>
            <Text style={styles.linkText}>যোগাযোগ</Text>
          </Button>
          <Button style={styles.linkButton} onPress={() => Linking.openURL("/about-madrasha")}>
            <Text style={styles.linkText}>আমাদের সম্পর্কে</Text>
          </Button>
          <Button style={styles.linkButton} onPress={() => Linking.openURL("#")}>
            <Text style={styles.linkText}>প্রাইভেসি পলিসি</Text>
          </Button>
        </View>

        {/* Contact Info Section */}
        <View style={styles.footerSection}>
          <Text style={styles.sectionTitle}>যোগাযোগ</Text>
          <Text style={styles.sectionText}>
            জমিয়াতুল লতিফ রূপগঞ্জ মাদরাসা
            {"\n"}রূপগঞ্জ, নারায়ণগঞ্জ, বাংলাদেশ
            {"\n"}ফোন: +880 01810 445 445
            {"\n"}ইমেইল: info@jamiatul-latif.com
          </Text>

          {/* Social Media Icons */}
          <View style={styles.socialMediaContainer}>
            <Button
              icon="facebook"
              style={styles.socialMediaButton}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/jamiatullatifrupganj")
              }
            />
            <Button
              icon="instagram"
              style={styles.socialMediaButton}
              onPress={() => Linking.openURL("#")}
            />
            <Button
              icon="youtube"
              style={styles.socialMediaButton}
              onPress={() =>
                Linking.openURL("https://www.youtube.com/@alqasimbd")
              }
            />
          </View>
        </View>
      </View>

      {/* Footer Bottom Section */}
      <View style={styles.footerBottom}>
        <Text style={styles.footerText}>
          &copy; {new Date().getFullYear()} জমিয়াতুল লতিফ কর্তৃক স্বত্ত্ব
          সংরক্ষিত
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#1a202c", // bg-gray-900
    paddingVertical: 20,
    color: "#cbd5e0", // text-gray-400
  },
  footerTop: {
    borderBottomWidth: 1,
    borderBottomColor: "#2d3748", // border-gray-700
    paddingBottom: 20,
  },
  footerSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff", // text-white
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: "#e2e8f0", // text-gray-400
  },
  linkButton: {
    backgroundColor: "transparent",
    padding: 0,
    marginBottom: 5,
  },
  linkText: {
    fontSize: 14,
    color: "#ffffff",
    textDecorationLine: "underline",
  },
  socialMediaContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  socialMediaButton: {
    backgroundColor: "transparent",
    marginRight: 15,
  },
  footerBottom: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#e2e8f0", // text-gray-400
  },
});

export default Footer;
