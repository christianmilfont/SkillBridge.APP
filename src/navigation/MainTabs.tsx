// src/navigation/MainTabs.tsx
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Context
import AuthContext from "../context/AuthContext";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/CoursesScreen";
import JobsScreen from "../screens/JobsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VacancyDetails from "../screens/VacancyDetails";
import CourseDetails from "../screens/CourseDetails";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0B81FF",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";

          if (route.name === "Home") iconName = "home";
          if (route.name === "Courses") iconName = "book";
          if (route.name === "Jobs") iconName = "briefcase";
          if (route.name === "Profile") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="VacancyDetails" component={VacancyDetails} />
      <Tab.Screen name="CourseDetails" component={CourseDetails} />
    </Tab.Navigator>
  );
}
