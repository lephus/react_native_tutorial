# 🎯 Bài Học 04 - Hướng Dẫn Thực Hành: Navigation

## Mục tiêu thực hành
- Cài đặt React Navigation
- Tạo Stack Navigator
- Tạo Tab Navigator
- Tạo Drawer Navigator
- Truyền parameters giữa screens
- Xử lý navigation lifecycle

---

## Bước 1: Cài đặt React Navigation

### Yêu cầu
Cài đặt React Navigation và các dependencies cần thiết.

### Hướng dẫn

**Bước 1.1: Cài đặt React Navigation**

```bash
cd HelloWorldApp
npm install @react-navigation/native
```

**Bước 1.2: Cài đặt dependencies với Expo**

```bash
npx expo install react-native-screens react-native-safe-area-context
```

**Bước 1.3: Cài đặt Stack Navigator**

```bash
npm install @react-navigation/native-stack
```

**Bước 1.4: Cài đặt Tab Navigator (nếu cần)**

```bash
npm install @react-navigation/bottom-tabs
```

**Bước 1.5: Cài đặt Drawer Navigator (nếu cần)**

```bash
npm install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated
```

**Lưu ý:** Với Expo, sau khi cài `react-native-reanimated`, cần restart Metro bundler:
```bash
npm start -- --reset-cache
```

---

## Bài tập 1: Stack Navigator - Multi-Screen App

### Yêu cầu
Tạo ứng dụng với Stack Navigator có:
- Home Screen (trang chủ)
- Products Screen (danh sách sản phẩm)
- Product Details Screen (chi tiết sản phẩm)
- Cart Screen (giỏ hàng)

### Bước 1: Tạo cấu trúc thư mục

```bash
mkdir -p src/screens
mkdir -p src/navigation
```

### Bước 2: Tạo Home Screen

```javascript
// src/screens/HomeScreen.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>
      <Text style={styles.subtitle}>Chào mừng đến với ứng dụng!</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.buttonText}>Xem sản phẩm</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.buttonText}>Giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
```

### Bước 3: Tạo Products Screen

```javascript
// src/screens/ProductsScreen.js
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const products = [
  { id: 1, name: 'iPhone 14', price: '25.000.000đ' },
  { id: 2, name: 'Samsung Galaxy S23', price: '22.000.000đ' },
  { id: 3, name: 'MacBook Pro', price: '45.000.000đ' },
  { id: 4, name: 'iPad Air', price: '15.000.000đ' },
  { id: 5, name: 'AirPods Pro', price: '5.000.000đ' },
];

function ProductsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.id,
          productName: item.name,
          productPrice: item.price,
        })
      }
    >
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  productItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default ProductsScreen;
```

### Bước 4: Tạo Product Details Screen

```javascript
// src/screens/ProductDetailsScreen.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function ProductDetailsScreen({ route, navigation }) {
  // Nhận parameters từ route
  const { productId, productName, productPrice } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết sản phẩm</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{productId}</Text>
        
        <Text style={styles.label}>Tên sản phẩm:</Text>
        <Text style={styles.value}>{productName}</Text>
        
        <Text style={styles.label}>Giá:</Text>
        <Text style={styles.value}>{productPrice}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    marginTop: 15,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
```

### Bước 5: Tạo Cart Screen

```javascript
// src/screens/CartScreen.js
import { View, Text, StyleSheet } from 'react-native';

function CartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <Text style={styles.subtitle}>Chưa có sản phẩm nào trong giỏ hàng</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default CartScreen;
```

### Bước 6: Tạo Navigation Container

```javascript
// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
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
          options={{ title: 'Trang chủ' }}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{ title: 'Sản phẩm' }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: 'Chi tiết sản phẩm' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Giỏ hàng' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
```

### Bước 7: Cập nhật App.js

```javascript
// App.js
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
```

### Kết quả mong đợi
- App có navigation giữa các screens
- Có thể navigate từ Home → Products → Product Details
- Có thể truyền parameters (productId, name, price)
- Có nút back để quay lại

---

## Bài tập 2: Tab Navigator - Social Media Clone

### Yêu cầu
Tạo app với Bottom Tab Navigator có 5 tabs:
- Home (Feed)
- Search
- Post (Tạo bài viết)
- Notifications
- Profile

### Bước 1: Tạo Tab Screens

```javascript
// src/screens/FeedScreen.js
import { View, Text, StyleSheet } from 'react-native';

function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <Text style={styles.subtitle}>Danh sách bài viết sẽ hiển thị ở đây</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default FeedScreen;
```

```javascript
// src/screens/SearchScreen.js
import { View, Text, StyleSheet } from 'react-native';

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>Tìm kiếm người dùng và bài viết</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default SearchScreen;
```

```javascript
// src/screens/PostScreen.js
import { View, Text, StyleSheet } from 'react-native';

function PostScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <Text style={styles.subtitle}>Tạo bài viết mới</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default PostScreen;
```

```javascript
// src/screens/NotificationsScreen.js
import { View, Text, StyleSheet } from 'react-native';

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Thông báo mới</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default NotificationsScreen;
```

```javascript
// src/screens/ProfileScreen.js
import { View, Text, StyleSheet } from 'react-native';

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Thông tin cá nhân</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default ProfileScreen;
```

### Bước 2: Tạo Tab Navigator

```javascript
// src/navigation/TabNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';
import PostScreen from '../screens/PostScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: '#e91e63',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Feed',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
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
            <Text style={{ fontSize: size, color }}>🔍</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          title: 'Tạo bài viết',
          tabBarLabel: 'Post',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>➕</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Thông báo',
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🔔</Text>
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
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
```

### Bước 3: Cập nhật App.js

```javascript
// App.js
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
```

### Kết quả mong đợi
- App có 5 tabs ở bottom
- Mỗi tab có icon và label
- Tab active có màu khác
- Có thể chuyển đổi giữa các tabs

---

## Bài tập 3: Drawer Navigator - App với Side Menu

### Yêu cầu
Tạo app với Drawer Navigator có:
- Home Screen
- Profile Screen
- Settings Screen
- About Screen
- Menu bên có thể kéo ra/kéo vào

### Bước 1: Tạo Drawer Screens

```javascript
// src/screens/HomeScreen.js (dùng lại hoặc tạo mới)
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.buttonText}>Mở Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
```

```javascript
// src/screens/SettingsScreen.js
import { View, Text, StyleSheet } from 'react-native';

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Cài đặt ứng dụng</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default SettingsScreen;
```

```javascript
// src/screens/AboutScreen.js
import { View, Text, StyleSheet } from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.subtitle}>Thông tin về ứng dụng</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default AboutScreen;
```

### Bước 2: Tạo Drawer Navigator

```javascript
// src/navigation/DrawerNavigator.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#e91e63',
        drawerInactiveTintColor: '#999',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 250,
        },
        headerStyle: {
          backgroundColor: '#e91e63',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
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
            <Text style={{ fontSize: size, color }}>🏠</Text>
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
            <Text style={{ fontSize: size, color }}>👤</Text>
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
            <Text style={{ fontSize: size, color }}>⚙️</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'Về chúng tôi',
          drawerLabel: 'About',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>ℹ️</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
```

### Bước 3: Cập nhật App.js

```javascript
// App.js
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
```

### Kết quả mong đợi
- App có drawer menu bên trái
- Có thể kéo menu ra từ cạnh trái
- Có nút menu trên header
- Có thể navigate giữa các screens qua drawer

---

## Bài tập nâng cao: Kết hợp Stack và Tab

### Yêu cầu
Tạo app có:
- Tab Navigator với các tabs chính
- Mỗi tab có thể chứa Stack Navigator
- Navigate từ tab vào các screen chi tiết

### Hướng dẫn

```javascript
// Tạo Stack cho Home Tab
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '../screens/FeedScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Feed" component={FeedScreen} />
      <HomeStack.Screen name="PostDetails" component={PostDetailsScreen} />
    </HomeStack.Navigator>
  );
}

// Sử dụng trong Tab Navigator
<Tab.Screen name="Home" component={HomeStackNavigator} />
```

---

## Tips và Tricks

### 1. Custom Header

```javascript
// Trong screen component
useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => alert('Settings!')} title="Settings" />
    ),
  });
}, [navigation]);
```

### 2. Navigation Listeners

```javascript
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // Screen được focus
    console.log('Screen focused');
  });

  return unsubscribe;
}, [navigation]);
```

### 3. Safe Navigation

```javascript
// Luôn check navigation trước khi dùng
if (navigation && navigation.navigate) {
  navigation.navigate('Details', { id: 123 });
}
```

### 4. TypeScript Support (Optional)

```bash
npm install @react-navigation/native @types/react-navigation
```

---

## Checklist hoàn thành

Sau khi hoàn thành các bài tập, bạn nên:
- [ ] Hiểu cách cài đặt React Navigation
- [ ] Tạo được Stack Navigator
- [ ] Tạo được Tab Navigator
- [ ] Tạo được Drawer Navigator
- [ ] Truyền parameters giữa screens
- [ ] Nhận parameters từ route
- [ ] Sử dụng navigation methods (navigate, goBack, push)
- [ ] Cấu hình được header options
- [ ] Xử lý được navigation lifecycle
- [ ] Kết hợp được nhiều navigators

---

**Chúc bạn thực hành thành công! 🎉**

