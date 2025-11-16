// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";

// Screens
import LoginScreen from "./src/screens/LoginScreen";
import MainTabs from "./src/navigation/MainTabs";
import CompetencyQuestionsScreen from "./src/screens/CompetencyQuestionsScreen";
import CourseDetails from "./src/screens/CourseDetails";      // opcional, se você quiser detalhes
import VacancyDetails from "./src/screens/VacancyDetails";  // opcional idem

import "react-native-reanimated";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            {/* TELA DE LOGIN */}
            <Stack.Screen name="Auth" component={LoginScreen} />

            {/* TABS PRINCIPAIS */}
            <Stack.Screen name="Main" component={MainTabs} />

            {/* TELAS (FORA DAS TABS) */}
            <Stack.Screen
              name="CompetencyQuestions"
              component={CompetencyQuestionsScreen}
            />

            {/* ROTAS OPCIONAIS DE DETALHE (se quiser usar depois) */}
            <Stack.Screen
              name="VacancyDetails"
              component={VacancyDetails}
            />
            <Stack.Screen
              name="CourseDetails"
              component={CourseDetails}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
