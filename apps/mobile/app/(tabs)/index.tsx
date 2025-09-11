import { View } from "react-native";
import { Button } from "@repo/ui/Button";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Tap Me" onPress={() => console.log("Mobile Button tapped")} />
    </View>
  );
}
