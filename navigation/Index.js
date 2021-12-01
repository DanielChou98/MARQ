import React from "react";
import { SafeAreaProvider, SafeAreaView,Text } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./Stack";
import { AuthProvider } from "../src/Providers/AuthContext";
import { registerRootComponent } from 'expo';
import { EmailProvider ,HospitalProvider} from "../src/Providers/EmailContext";


export default function Index (){
    {console.disableYellowBox = true;}
    return(
    <SafeAreaProvider>
            <EmailProvider>
                <AuthProvider>
                    <NavigationContainer>
                        <Stack />
                    </NavigationContainer>
                </AuthProvider>
            </EmailProvider>
    </SafeAreaProvider>
    )
}

registerRootComponent(Index);