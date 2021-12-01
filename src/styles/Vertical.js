import { Dimensions } from "react-native"

export default {
    display: "flex", 
    flexDirection: "column", 
    justifyContent: 'space-around', 
    alignItems: "center",
    alignContent: "stretch",
    height: Dimensions.get("window").height,
    backgroundColor: "#d8f6ff"
}