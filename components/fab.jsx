import { useRouter } from "expo-router";
import * as React from "react";
import { FAB, Portal } from "react-native-paper";

const MyComponent = () => {
  const router = useRouter(); // Correctly call useRouter to get the router object
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? "close" : "menu"}
        color="white"
        variant="surface"
        actions={[
          {
            icon: "school",
            label: "শিক্ষকবৃন্দ",
            onPress: () => router.push("/teachers"),
          },
          {
            icon: "account-group",
            label: "শিক্ষার্থী",
            onPress: () => router.push("/class-list"),
          },
          {
            icon: "clipboard-list",
            label: "ফলাফল",
            onPress: () => router.push("/results-list"),
          },
          {
            icon: "information",
            label: "পরিচিতি",
            onPress: () => router.push("/about"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
          }
        }}
        style={{
          position: "absolute",
          bottom: 40,
          right: 10,
        }}
      />
    </Portal>
  );
};

export default MyComponent;
