import React from 'react';
import {findFocusedRoute, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderBackButton} from '@react-navigation/elements';

import {useAppLanguage, useAppTheme} from '../utils';
import {AppDrawerButton, AppHeaderLeftLogo} from '../elements';

import * as AppScreens from '../screens';

const Stack = createStackNavigator();

AllStackNavigator.getTabBarStyle = state => {
  const route = findFocusedRoute(state);
  if (
    [
      'DeviceRegister',
      'UserGuideDetail',
      'UserGuideList',
      'FuelPriceSetting',
      'ChangeEmail',
      'ChangeEmailSuccess',
      'ChangeEmailVerify',
      'ChangePassLogin',
      'ChangeRegisterInfo',
    ].includes(route.name)
  ) {
    return {display: 'none'};
  }
  return {};
};

export default function AllStackNavigator({navigation, route}) {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const {initialRouteName} = route.params;

  const _screenOptions = {
    deviceRegister: {
      title: Strings.Register_Product_Info,
      headerLeft: props => <HeaderBackButton tintColor={Colors.onPrimary} />,
    },
    topPage: {
      headerTitle: Strings.Products_list,
      headerLeft: AppHeaderLeftLogo,
    },
    FieldRegister: {
      headerTitle: Strings.Field_info_registration,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    ChangeFieldInfo: {
      headerTitle: Strings.Change_field_info,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    WarningHistory: {
      headerTitle: Strings.Waring_history,
    },
    WarningSolution: {
      headerTitle: Strings.Solution,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    TempUneven: {
      headerTitle: Strings.Temp_unevenness,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    TempUnevenSetting: {
      headerTitle: Strings.Temp_unevenness_setting,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    TempUnevenSensorName: {
      headerTitle: Strings.Change_sensor_name,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    ChangeUserInfo: {
      headerTitle: Strings.Change_user_info,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
      headerRight: null,
    },
    ChangeEmail: {
      headerTitle: Strings.Change_email,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
      headerRight: null,
    },
    ChangeEmailVerify: {
      headerTitle: Strings.Change_email_vertify,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
      headerRight: null,
    },
    ChangeEmailSuccess: {
      headerTitle: Strings.Change_email_success,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
      headerRight: null,
    },
    ChangePassLogin: {
      headerTitle: Strings.Change_password,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
      headerRight: null,
    },
    ChangeRegisterInfo: {
      headerTitle: Strings.Change_register_info,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
      headerRight: null,
    },
    // ProductDetail: {
    //   // headerTitle: Strings.Product_list,
    //   headerTitle: '',
    //   headerLeft: props => (
    //     <HeaderBackButton
    //       {...props}
    //       onPress={props.onPress}
    //       tintColor={Colors.onPrimary}
    //     />
    //   ),
    // },
    FuelPriceSetting: {
      headerTitle: Strings.Fuel_price_setting,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    FuelGraph: {
      headerTitle: Strings.FuelChart,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    OperationHistory: {
      headerTitle: Strings.Remote_operation_history,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    NotificationSetting: {
      headerTitle: Strings.Notification_settings,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    FieldList: {
      headerTitle: Strings.Field_list,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    UserGuideList: {
      headerTitle: Strings.How_to_use_the_app,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    UserGuideDetail: {
      display: 'none',
      headerRight: null,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    FieldEdit: {
      headerTitle: Strings.Field_info_change,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    RequestForRepair: {
      headerTitle: Strings.Request_for_repair_inspection,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    RequestRepairList: {
      headerTitle: Strings.Request_repair_by_phone,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
    ProductEdit: {
      headerTitle: Strings.Product_Name_Settings,
      headerLeft: props => (
        <HeaderBackButton
          onPress={props.onPress}
          tintColor={Colors.onPrimary}
        />
      ),
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: AppDrawerButton,

        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
          color: 'white',
        },
        headerTitleAlign: 'center',
      }}
      initialRouteName={initialRouteName}>
      <Stack.Screen
        options={_screenOptions.topPage}
        name="TopPage"
        component={AppScreens.TopPage}
      />
      <Stack.Screen
        options={_screenOptions.FieldRegister}
        name="FieldRegister"
        component={AppScreens.FieldRegister}
      />
      <Stack.Screen
        options={_screenOptions.ChangeFieldInfo}
        name="ChangeFieldInfo"
        component={AppScreens.ChangeFieldInfo}
      />
      <Stack.Screen
        name="WarningHistory"
        component={AppScreens.WarningHistory}
        options={_screenOptions.WarningHistory}
      />
      <Stack.Screen
        name="WarningSolution"
        component={AppScreens.WarningSolution}
        options={_screenOptions.WarningSolution}
      />
      <Stack.Screen
        options={_screenOptions.TempUneven}
        name="TempUneven"
        component={AppScreens.TempUneven}
      />
      <Stack.Screen
        options={_screenOptions.TempUnevenSetting}
        name="TempUnevenSetting"
        component={AppScreens.TempUnevenSetting}
      />
      <Stack.Screen
        options={_screenOptions.TempUnevenSensorName}
        name="TempUnevenSensorName"
        component={AppScreens.TempUnevenSensorName}
      />

      <Stack.Screen name="ComingSoon" component={AppScreens.ComingSoon} />
      <Stack.Screen
        options={_screenOptions.ChangeUserInfo}
        name={'ChangeUserInfo'}
        component={AppScreens.ChangeUserInfo}
      />
      <Stack.Screen
        options={_screenOptions.deviceRegister}
        name={'DeviceRegister'}
        component={AppScreens.DeviceRegister}
      />
      <Stack.Screen
        options={_screenOptions.ChangeEmail}
        name={'ChangeEmail'}
        component={AppScreens.ChangeEmail}
      />
      <Stack.Screen
        options={_screenOptions.ChangeEmailVerify}
        name={'ChangeEmailVerify'}
        component={AppScreens.ChangeEmailVerify}
      />
      <Stack.Screen
        options={_screenOptions.ChangeEmailSuccess}
        name={'ChangeEmailSuccess'}
        component={AppScreens.ChangeEmailSuccess}
      />
      <Stack.Screen
        options={_screenOptions.ChangePassLogin}
        name={'ChangePassLogin'}
        component={AppScreens.ChangePassLogin}
      />
      <Stack.Screen
        options={_screenOptions.ChangeRegisterInfo}
        name={'ChangeRegisterInfo'}
        component={AppScreens.ChangeRegisterInfo}
      />
      <Stack.Screen
        options={_screenOptions.ProductDetail}
        name={Strings.Product_Detail}
        component={AppScreens.ProductDetail}
      />
      <Stack.Screen
        options={_screenOptions.FuelPriceSetting}
        name={'FuelPriceSetting'}
        component={AppScreens.FuelPriceSetting}
      />
      <Stack.Screen
        options={_screenOptions.FuelGraph}
        name={'FuelGraph'}
        component={AppScreens.FuelGraph}
      />
      <Stack.Screen
        options={_screenOptions.NotificationSetting}
        name={'NotificationSetting'}
        component={AppScreens.NotificationSetting}
      />
      <Stack.Screen
        options={_screenOptions.UserGuideList}
        name={'UserGuideList'}
        component={AppScreens.UserGuideList}
      />
      <Stack.Screen
        options={_screenOptions.UserGuideDetail}
        name={'UserGuideDetail'}
        component={AppScreens.UserGuideDetail}
      />
      <Stack.Screen
        options={_screenOptions.OperationHistory}
        name={'OperationHistory'}
        component={AppScreens.OperationHistory}
      />
      <Stack.Screen
        options={_screenOptions.FieldList}
        name={'FieldList'}
        component={AppScreens.FieldList}
      />
      <Stack.Screen
        options={_screenOptions.FieldEdit}
        name={'FieldEdit'}
        component={AppScreens.FieldEdit}
      />
      <Stack.Screen
        options={_screenOptions.RequestForRepair}
        name={'RequestForRepair'}
        component={AppScreens.RequestForRepair}
      />
      <Stack.Screen
        options={_screenOptions.RequestRepairList}
        name={'RequestRepairList'}
        component={AppScreens.RequestRepairList}
      />
      <Stack.Screen
        options={_screenOptions.ProductEdit}
        name={'ProductEdit'}
        component={AppScreens.ProductEdit}
      />
    </Stack.Navigator>
  );
}
