// LESSON 04: Navigation - Demo App
// Ứng dụng demo minh họa React Navigation với Stack Navigator
//
// Tính năng demo:
// - Stack Navigator với nhiều screens
// - Truyền parameters giữa screens
// - Navigation methods (navigate, goBack)
// - Custom header styling
//
// ⚠️ LƯU Ý: Cần cài đặt React Navigation trước khi chạy:
//   1. npm install @react-navigation/native
//   2. npx expo install react-native-screens react-native-safe-area-context
//   3. npm install @react-navigation/native-stack

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}