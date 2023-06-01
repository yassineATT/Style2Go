import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../../features/shops/screens/home-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SettingScreen } from "../../features/settings/screens/settings.screen";
import { ConfigProfileScreen } from "../../features/settings/screens/config-profile.screen";
import { ProfileContext } from "../../services/saveProfile/profile.context";
import { BasketScreen } from "../../features/baskets/screens/basket.screen";
import { FavoriteScreen } from "../../features/favorite/screens/favorite.screen";

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
        tabBarActiveTintColor: "#2EC4B6",
        tabBarInactiveTintColor: "grey",
        tabBarShowLabel: false,
        headerShown: false,
        shifting: false,
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoris"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={BasketScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
