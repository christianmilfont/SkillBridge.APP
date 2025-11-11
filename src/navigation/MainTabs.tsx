// src/navigation/MainTabs.tsx
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import  AuthContext  from "../context/AuthContext";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* Quando tiver outras telas: */}
      {/* <Tab.Screen name="Courses" component={CoursesScreen} /> */}
      {/* <Tab.Screen name="Jobs" component={JobsScreen} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Tab.Screen name="About" component={AboutScreen} /> */}
    </Tab.Navigator>
  );
}
