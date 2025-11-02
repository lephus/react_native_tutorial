// LESSON 04: Navigation - App Navigator Configuration
// Cấu hình Stack Navigator cho toàn bộ ứng dụng

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các screens
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Tạo Stack Navigator
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // Style cho header
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          // Shadow cho iOS
          headerShadowVisible: true,
          // Animation
          animation: 'slide_from_right',
        }}
      >
        {/* Home Screen - Screen đầu tiên */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Trang chủ',
          }}
        />

        {/* Products Screen - Danh sách sản phẩm */}
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            title: 'Sản phẩm',
          }}
        />

        {/* Product Details Screen - Chi tiết sản phẩm (nhận params) */}
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            title: 'Chi tiết Sản phẩm',
            // Có thể customize header động dựa trên params
            headerBackTitle: 'Quay lại',
          }}
        />

        {/* Profile Screen */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Hồ sơ',
          }}
        />

        {/* Settings Screen */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Cài đặt',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

