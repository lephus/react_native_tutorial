# Bài Học 04: Navigation
**React Native Learning Journey - Week 4-6**

---

## Mục tiêu bài học
- Hiểu Navigation trong React Native là gì
- Cài đặt và cấu hình React Navigation
- Sử dụng Stack Navigator cho navigation chính
- Sử dụng Tab Navigator cho bottom/top tabs
- Sử dụng Drawer Navigator cho side menu
- Truyền và nhận parameters giữa các screens
- Hiểu navigation lifecycle
- Tìm hiểu deep linking cơ bản

---

## Phần 1: Giới thiệu Navigation

### 1. Navigation là gì?

**Navigation** là cách di chuyển giữa các màn hình (screens) trong ứng dụng mobile. Khác với web có URL, mobile app cần một hệ thống navigation riêng.

**Tại sao cần Navigation?**
- ✅ Điều hướng giữa các màn hình
- ✅ Quay lại màn hình trước
- ✅ Truyền data giữa các màn hình
- ✅ Quản lý navigation history

### 2. React Navigation

**React Navigation** là thư viện navigation chính thức và phổ biến nhất cho React Native.

**Các loại Navigator:**
- **Stack Navigator**: Điều hướng kiểu stack (push/pop) - phù hợp cho navigation chính
- **Tab Navigator**: Tab ở dưới hoặc trên - phù hợp cho các section chính
- **Drawer Navigator**: Menu bên - phù hợp cho settings, profile, etc.

---

## Phần 2: Cài đặt React Navigation

### 1. Cài đặt packages cần thiết

**Bước 1: Cài đặt React Navigation v6**

```bash
npm install @react-navigation/native
```

**Bước 2: Cài đặt dependencies**

React Navigation cần một số dependencies tùy thuộc vào Expo hay React Native CLI:

**Với Expo:**
```bash
npx expo install react-native-screens react-native-safe-area-context
```

**Với React Native CLI:**
```bash
npm install react-native-screens react-native-safe-area-context

# iOS
cd ios && pod install && cd ..
```

**Bước 3: Cài đặt Navigator cụ thể**

Tùy vào loại navigator bạn muốn sử dụng:

```bash
# Stack Navigator
npm install @react-navigation/native-stack

# Tab Navigator
npm install @react-navigation/bottom-tabs

# Drawer Navigator
npm install @react-navigation/drawer

# Với Expo, cài thêm:
npx expo install react-native-gesture-handler react-native-reanimated
```

### 2. Cấu trúc project sau khi cài đặt

```
HelloWorldApp/
├── App.js
├── package.json
├── src/
│   ├── screens/          # Các màn hình
│   │   ├── HomeScreen.js
│   │   ├── DetailsScreen.js
│   │   └── ProfileScreen.js
│   └── navigation/      # Cấu hình navigation
│       └── AppNavigator.js
```

---

## Phần 3: Stack Navigator

### 1. Stack Navigator là gì?

**Stack Navigator** quản lý navigation theo kiểu stack (ngăn xếp):
- **Push**: Thêm màn hình mới vào stack
- **Pop**: Xóa màn hình hiện tại, quay lại màn hình trước
- **Replace**: Thay thế màn hình hiện tại

**Khi nào dùng Stack Navigator?**
- ✅ Navigation chính của app
- ✅ Flow có thứ tự (Login → Home → Details)
- ✅ Cần nút "Back" tự động

### 2. Cài đặt Stack Navigator cơ bản

**Bước 1: Tạo các Screen components**

```javascript
// src/screens/HomeScreen.js
import { View, Text, StyleSheet, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
```

```javascript
// src/screens/DetailsScreen.js
import { View, Text, StyleSheet, Button } from 'react-native';

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
```

**Bước 2: Tạo Navigation Container**

```javascript
// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Trang chủ' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{ title: 'Chi tiết' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
```

**Bước 3: Sử dụng trong App.js**

```javascript
// App.js
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
```

### 3. Navigation Methods

**Các phương thức navigation cơ bản:**

```javascript
function MyScreen({ navigation }) {
  return (
    <View>
      {/* Navigate đến screen khác */}
      <Button
        title="Navigate"
        onPress={() => navigation.navigate('Details')}
      />

      {/* Push màn hình mới (khác navigate là có thể push cùng một screen nhiều lần) */}
      <Button
        title="Push"
        onPress={() => navigation.push('Details')}
      />

      {/* Quay lại màn hình trước */}
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />

      {/* Quay lại màn hình đầu tiên trong stack */}
      <Button
        title="Go to Top"
        onPress={() => navigation.popToTop()}
      />

      {/* Replace màn hình hiện tại */}
      <Button
        title="Replace"
        onPress={() => navigation.replace('Login')}
      />
    </View>
  );
}
```

**Sự khác biệt giữa `navigate` và `push`:**
- `navigate`: Không thể navigate đến cùng một screen nếu đã có trong stack
- `push`: Luôn thêm screen mới vào stack, kể cả nếu đã có

### 4. Screen Options

**Cấu hình header và options:**

```javascript
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
>
  <Stack.Screen 
    name="Home" 
    component={HomeScreen}
    options={{
      title: 'Trang chủ',
      headerStyle: {
        backgroundColor: '#2196F3',
      },
      headerRight: () => (
        <Button
          onPress={() => alert('Settings!')}
          title="Settings"
          color="#fff"
        />
      ),
    }}
  />
</Stack.Navigator>
```

**Cấu hình header trong component:**

```javascript
import { useLayoutEffect } from 'react';

function DetailsScreen({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Custom Title',
      headerRight: () => (
        <Button onPress={() => alert('Help!')} title="Help" />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}
```

### 5. Ẩn/Hiện Header

```javascript
<Stack.Screen 
  name="Home" 
  component={HomeScreen}
  options={{ headerShown: false }} // Ẩn header
/>

// Hoặc cho tất cả screens
<Stack.Navigator screenOptions={{ headerShown: false }}>
```

---

## Phần 4: Passing Parameters

### 1. Truyền parameters

**Từ screen này sang screen khác:**

```javascript
// HomeScreen.js
function HomeScreen({ navigation }) {
  const user = { id: 1, name: 'John Doe' };

  return (
    <View>
      <Button
        title="View Details"
        onPress={() => 
          navigation.navigate('Details', {
            userId: user.id,
            userName: user.name,
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
    </View>
  );
}
```

### 2. Nhận parameters

**Trong screen đích:**

```javascript
// DetailsScreen.js
function DetailsScreen({ route, navigation }) {
  // Nhận params từ route
  const { userId, userName, itemId, otherParam } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text>User ID: {userId}</Text>
      <Text>User Name: {userName}</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Other Param: {otherParam}</Text>
    </View>
  );
}
```

**Với default params:**

```javascript
<Stack.Screen 
  name="Details" 
  component={DetailsScreen}
  initialParams={{ itemId: 42 }} // Default params
/>
```

```javascript
function DetailsScreen({ route }) {
  const { itemId } = route.params || {}; // Safe với default

  // Hoặc
  const itemId = route.params?.itemId ?? 'default';
}
```

### 3. Cập nhật parameters

```javascript
function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;

  return (
    <View>
      <Button
        title="Update Params"
        onPress={() =>
          navigation.setParams({
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
    </View>
  );
}
```

---

## Phần 5: Tab Navigator

### 1. Tab Navigator là gì?

**Tab Navigator** tạo navigation với tabs ở dưới hoặc trên màn hình. Phù hợp cho các section chính của app.

**Khi nào dùng Tab Navigator?**
- ✅ App có nhiều section chính (Home, Search, Profile, Settings)
- ✅ Cần chuyển đổi nhanh giữa các sections
- ✅ Tabs luôn visible

### 2. Cài đặt Tab Navigator

**Tạo các Tab Screens:**

```javascript
// src/screens/HomeScreen.js
import { View, Text, StyleSheet } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Tab</Text>
    </View>
  );
}
```

```javascript
// src/screens/SearchScreen.js
import { View, Text, StyleSheet } from 'react-native';

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Tab</Text>
    </View>
  );
}
```

```javascript
// src/screens/ProfileScreen.js
import { View, Text, StyleSheet } from 'react-native';

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Tab</Text>
    </View>
  );
}
```

**Tạo Tab Navigator:**

```javascript
// src/navigation/TabNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#999',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text>🏠</Text> // Hoặc dùng icon library
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Tìm kiếm',
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Text>🔍</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Hồ sơ',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
```

### 3. Kết hợp Tab với Stack

**Tab Navigator có thể chứa Stack Navigator:**

```javascript
// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
```

**Hoặc Stack trong Tab:**

```javascript
// Tab có thể chứa Stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

// Sau đó dùng HomeStackNavigator trong Tab
<Tab.Screen name="Home" component={HomeStackNavigator} />
```

### 4. Tab Options

```javascript
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: '#e91e63',
    tabBarInactiveTintColor: '#999',
    tabBarStyle: {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  }}
>
```

---

## Phần 6: Drawer Navigator

### 1. Drawer Navigator là gì?

**Drawer Navigator** tạo menu bên (side menu) có thể kéo ra/kéo vào. Phù hợp cho settings, profile, navigation chính.

**Khi nào dùng Drawer Navigator?**
- ✅ Menu settings/profile
- ✅ Navigation chính với nhiều options
- ✅ Side menu với nhiều mục

### 2. Cài đặt Drawer Navigator

**Bước 1: Cài đặt dependencies (với Expo):**

```bash
npx expo install react-native-gesture-handler react-native-reanimated
```

**Bước 2: Tạo Drawer Navigator:**

```javascript
// src/navigation/DrawerNavigator.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#e91e63',
        drawerInactiveTintColor: '#999',
        drawerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Text>🏠</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Hồ sơ',
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Text>👤</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Cài đặt',
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Text>⚙️</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
```

### 3. Mở/Đóng Drawer

```javascript
function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Open Drawer"
        onPress={() => navigation.openDrawer()}
      />
      <Button
        title="Close Drawer"
        onPress={() => navigation.closeDrawer()}
      />
      <Button
        title="Toggle Drawer"
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
}
```

---

## Phần 7: Navigation Lifecycle

### 1. Screen Listeners

**Lắng nghe các events navigation:**

```javascript
import { useEffect } from 'react';

function DetailsScreen({ navigation, route }) {
  useEffect(() => {
    // Khi screen được focus
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen focused!');
      // Refresh data, etc.
    });

    // Khi screen mất focus
    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('Screen blurred!');
    });

    // Cleanup
    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation]);

  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}
```

### 2. useFocusEffect Hook

**Hook tiện lợi hơn để handle focus:**

```javascript
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

function DetailsScreen() {
  useFocusEffect(
    useCallback(() => {
      // Screen được focus
      console.log('Screen focused');
      
      // Fetch data, etc.
      
      return () => {
        // Screen mất focus (cleanup)
        console.log('Screen blurred');
      };
    }, [])
  );

  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}
```

### 3. Navigation Lifecycle Methods

**Các events có sẵn:**
- `focus`: Screen được focus
- `blur`: Screen mất focus
- `beforeRemove`: Trước khi screen bị remove (có thể prevent)

```javascript
useEffect(() => {
  const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    // Prevent default behavior
    e.preventDefault();

    // Hiển thị confirm dialog
    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {} },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    );
  });

  return unsubscribe;
}, [navigation]);
```

---

## Phần 8: Deep Linking (Cơ bản)

### 1. Deep Linking là gì?

**Deep Linking** cho phép mở app và điều hướng đến một screen cụ thể từ URL.

### 2. Cấu hình Deep Linking

```javascript
// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';

const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: 'home',
      Details: 'details/:itemId',
      Profile: 'profile',
    },
  },
};

function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      {/* ... navigators ... */}
    </NavigationContainer>
  );
}
```

### 3. Sử dụng Deep Links

```javascript
// Navigate với URL
navigation.navigate('Details', { itemId: 123 });

// URL sẽ là: myapp://details/123
// Hoặc: https://myapp.com/details/123
```

---

## Phần 9: Best Practices

### 1. Tổ chức Navigation

✅ **Nên:**
- Tách navigation config ra file riêng
- Đặt tên screens rõ ràng, có ý nghĩa
- Sử dụng TypeScript cho type safety (nếu có)
- Group related screens lại với nhau

❌ **Không nên:**
- Đặt tất cả navigation trong App.js
- Đặt tên screens khó hiểu
- Nested navigators quá sâu

### 2. Performance

✅ **Nên:**
- Lazy load screens khi cần
- Sử dụng React.memo cho screen components
- Tránh re-render không cần thiết

```javascript
// Lazy loading
const DetailsScreen = React.lazy(() => import('./screens/DetailsScreen'));

// Memoization
const HomeScreen = React.memo(function HomeScreen() {
  // ...
});
```

### 3. Error Handling

```javascript
// Safe navigation
function navigateSafely(navigation, screen, params) {
  if (navigation) {
    navigation.navigate(screen, params);
  }
}
```

---

## Phần 10: Thực hành - Bài tập

### Bài tập 1: Multi-Screen App với Stack Navigator

Tạo app với:
- Home Screen
- Products Screen (danh sách sản phẩm)
- Product Details Screen (chi tiết sản phẩm)
- Cart Screen

**Yêu cầu:**
- Sử dụng Stack Navigator
- Truyền product data qua params
- Có nút back ở tất cả screens

### Bài tập 2: Tab-Based Social Media Clone

Tạo app với tabs:
- Home (feed)
- Search
- Post (create new post)
- Notifications
- Profile

**Yêu cầu:**
- Sử dụng Bottom Tab Navigator
- Mỗi tab có icon và label
- Tab active có màu khác

### Bài tập 3: App với Drawer Menu

Tạo app với:
- Home Screen
- Drawer menu với: Home, Profile, Settings, About
- Mở drawer từ button hoặc swipe

---

## Tóm tắt bài học

### Key Concepts

1. **Navigation:**
   - Điều hướng giữa các screens
   - React Navigation là thư viện phổ biến nhất

2. **Stack Navigator:**
   - Push/pop screens
   - Phù hợp cho navigation chính
   - Có nút back tự động

3. **Tab Navigator:**
   - Bottom/top tabs
   - Phù hợp cho các sections chính
   - Tabs luôn visible

4. **Drawer Navigator:**
   - Side menu
   - Phù hợp cho settings/profile
   - Có thể kéo ra/kéo vào

5. **Parameters:**
   - Truyền data qua `navigation.navigate()`
   - Nhận data từ `route.params`

6. **Lifecycle:**
   - `focus` và `blur` events
   - `useFocusEffect` hook

### Checklist kiến thức

Sau bài học này, bạn nên:
- [ ] Hiểu cách cài đặt React Navigation
- [ ] Sử dụng được Stack Navigator
- [ ] Sử dụng được Tab Navigator
- [ ] Sử dụng được Drawer Navigator
- [ ] Truyền và nhận parameters
- [ ] Hiểu navigation lifecycle
- [ ] Cấu hình được deep linking cơ bản

---

## Tài liệu tham khảo

- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [React Navigation - Stack Navigator](https://reactnavigation.org/docs/stack-navigator)
- [React Navigation - Tab Navigator](https://reactnavigation.org/docs/bottom-tab-navigator)
- [React Navigation - Drawer Navigator](https://reactnavigation.org/docs/drawer-navigator)
- [React Navigation - Passing Parameters](https://reactnavigation.org/docs/params)

---

## Bài học tiếp theo

**Lesson 05: Event Handling & User Input**
- Touch events
- Gesture handling
- Form validation
- Keyboard handling

---

**Happy Coding! 🚀**

