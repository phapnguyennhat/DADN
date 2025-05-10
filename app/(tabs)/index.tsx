import { ScrollView } from "react-native";

import Greeting from "@/components/Greeting";
import Yard from "../../components/Yard";
import Room from "../../components/Room";
import Sensor from "../../components/Sensor";
export default function Index() {
  return (
    <ScrollView className="flex-1 bg-[#EBECF2] ">
      <Greeting />

      <Yard />
      <Room />
      <Sensor />
    </ScrollView>
  );
}
