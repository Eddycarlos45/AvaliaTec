import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { HomeScreen } from './home.component';
import { FormScreen } from './form.component';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
    <Navigator
        headerMode='none'
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <Screen name='Home' component={HomeScreen} />
        <Screen name='Form' component={FormScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);
