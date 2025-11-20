import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Contexto
import AuthContext from '../context/AuthContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/CoursesScreen';
import JobsScreen from '../screens/JobsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CompetencyScreen from '../screens/CompetencyScreen';
import CourseDetailsScreen from '../screens/CourseDetails';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import VacancyDetailsScreen from '../screens/VacancyDetails';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DetailsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VacancyDetails" component={VacancyDetailsScreen} />
      <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0B81FF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Courses') iconName = 'book';
          if (route.name === 'Jobs') iconName = 'briefcase';
          if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="CompetencyScreen" component={CompetencyScreen} />
      <Tab.Screen name="CreateProfileScreen" component={CreateProfileScreen} />

    </Tab.Navigator>
  );
}
