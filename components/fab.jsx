import * as React from "react";
import { Text } from "react-native";
import { FAB, Portal, PaperProvider } from "react-native-paper";

const FavComponent = () => {
  const [state, setState] = React.useState({ open: true });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          variant="secondary"
          open={open}
          visible
          icon={open ? "calendar-today" : "plus"}
          actions={[
            { icon: "plus", onPress: () => console.log("Pressed add") },
            {
              icon: "star",
              label: "Star",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "email",
              label: "Email",
              onPress: () => console.log("Pressed email"),
            },
            {
              icon: "bell",
              label: "Remind",
              onPress: () => console.log("Pressed notifications"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
              console.log("Openend");
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
};

export default FavComponent;
