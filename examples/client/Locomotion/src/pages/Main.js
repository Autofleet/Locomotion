import React, { useContext, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerContentComponent, DrawerLabel } from '../Components/Menu';
import { Context as ThemeContext } from '../context/theme';
import { ROUTES_COMPS } from './routeConsts';
import { MAIN_ROUTES } from './routes';
import BottomSheet from '../Components/BottomSheet';
import BottomSheetContextProvider, { BottomSheetContext } from '../context/bottomSheetContext';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const InnerHome = () => {
  const theme = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName="innerHome"
      drawerContent={props => (<DrawerContentComponent {...props} />)}
      screenOptions={{
        inactiveBackgroundColor: '#ffffff',
        activeBackgroundColor: '#ffffff',
        headerShown: false,
        drawerStyle: {
          width: '80%',
          margin: 0,
          backgroundColor: theme.pageBackgroundColor,
        },
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name="innerHome"
        component={ROUTES_COMPS[MAIN_ROUTES.HOME]}
      />
    </Drawer.Navigator>
  );
};

const Main = () => {
  const { childrenState, bottomSheetRef } = useContext(BottomSheetContext);
  return (
    <>
      <Stack.Navigator
        initialRouteName={MAIN_ROUTES.HOME}
        screenOptions={{
          inactiveBackgroundColor: '#ffffff',
          activeBackgroundColor: '#ffffff',
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={MAIN_ROUTES.HOME}
          component={InnerHome}
        />
        <Stack.Screen
          name={MAIN_ROUTES.COMPLETED_RIDE_OVERVIEW_PAGE}
          component={ROUTES_COMPS[MAIN_ROUTES.COMPLETED_RIDE_OVERVIEW_PAGE]}
        />
        <Stack.Screen
          name={MAIN_ROUTES.RIDE_HISTORY}
          component={ROUTES_COMPS[MAIN_ROUTES.RIDE_HISTORY]}
        />
        <Stack.Screen
          name={MAIN_ROUTES.PAYMENT}
          component={ROUTES_COMPS[MAIN_ROUTES.PAYMENT]}
        />
        <Stack.Screen
          name={MAIN_ROUTES.ACCOUNT}
          component={ROUTES_COMPS[MAIN_ROUTES.ACCOUNT]}
        />
        <Stack.Screen
          name={MAIN_ROUTES.CONTACT_US}
          component={ROUTES_COMPS[MAIN_ROUTES.CONTACT_US]}
        />
        <Stack.Screen
          name={MAIN_ROUTES.WEBVIEW}
          component={ROUTES_COMPS[MAIN_ROUTES.WEBVIEW]}
        />
        <Stack.Screen
          name={MAIN_ROUTES.POST_RIDE}
          component={ROUTES_COMPS[MAIN_ROUTES.POST_RIDE]}
        />
        <Stack.Screen
          name={MAIN_ROUTES.LOGOUT}
          component={ROUTES_COMPS[MAIN_ROUTES.LOGOUT]}
        />
      </Stack.Navigator>
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        index={1}
        childComponent={childrenState}
      />
    </>
  );
};

export default Main;
