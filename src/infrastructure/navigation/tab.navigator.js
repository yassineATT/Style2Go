import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../../features/shops/screens/home-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SettingScreen } from "../../features/settings/screens/settings.screen";
import { ConfigProfileScreen } from "../../features/settings/screens/config-profile.screen";
import { ProfileContext } from "../../services/saveProfile/profile.context";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { isProfileRegistered } = useContext(ProfileContext);
  const [reload, setReload] = useState(false);

  const SettingsWrapper = () => {
    return isProfileRegistered ? <SettingScreen /> : <ConfigProfileScreen />;
  };

  useEffect(() => {
    setReload((prevReload) => !prevReload);
  }, [isProfileRegistered]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#FFBF69",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
        shifting: false,
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "Roboto",
        },
        tabBarStyle: {
          backgroundColor: "white",
          paddingTop: 1,
          border: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoris"
        component={HomeScreen}
        options={{
          tabBarLabel: "Favoris",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        options={{
          tabBarLabel: "Panier",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsWrapper}
        options={{
          tabBarLabel: "Paramètres",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
