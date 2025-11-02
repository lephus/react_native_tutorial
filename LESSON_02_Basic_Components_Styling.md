# Bài Học 02: Basic Components & Styling
**React Native Learning Journey - Week 2-3**

---

## Mục tiêu bài học
- Hiểu và sử dụng các component cơ bản (View, Text, Image, Button, TextInput)
- Làm chủ Flexbox layout system
- Styling với StyleSheet
- Hiểu responsive design cơ bản
- Xử lý platform-specific styling

---

## Phần 1: Core Components

### 1. View Component

`View` là component cơ bản nhất, tương đương `<div>` trong React web. Dùng để bao bọc và layout các components khác.

**Đặc điểm:**
- Không có style mặc định
- Hỗ trợ Flexbox
- Có thể lồng nhau
- Hỗ trợ touch events

**Ví dụ:**

```javascript
import { View } from 'react-native';

<View style={styles.container}>
  <View style={styles.box} />
</View>
```

### 2. Text Component

`Text` là component duy nhất để hiển thị text trong React Native. **Quan trọng:** Không thể hiển thị text trực tiếp trong View!

**Đặc điểm:**
- Bắt buộc phải dùng `<Text>` để hiển thị text
- Có thể lồng nhau
- Hỗ trợ styling phong phú
- Có thể wrap nội dung

**Ví dụ:**

```javascript
import { Text, View } from 'react-native';

<View>
  <Text>Text này sẽ hiển thị</Text>
  {/* ✅ Đúng */}
  
  <View>Text này sẽ LỖI!</View>
  {/* ❌ SAI - Không thể text trực tiếp trong View */}
</View>
```

**Lồng Text:**

```javascript
<Text style={styles.title}>
  Xin chào{' '}
  <Text style={styles.highlight}>React Native</Text>
  {' '}!
</Text>
```

### 3. Image Component

Dùng để hiển thị hình ảnh từ local hoặc remote URL.

**Đặc điểm:**
- Hỗ trợ local images (require)
- Hỗ trợ remote images (URI)
- Cần chỉ định width và height
- Hỗ trợ resize modes

**Cách sử dụng:**

```javascript
import { Image } from 'react-native';

// Local image
<Image 
  source={require('./assets/icon.png')}
  style={styles.image}
/>

// Remote image
<Image 
  source={{ 
    uri: 'https://example.com/image.jpg' 
  }}
  style={styles.image}
/>

// Với resize mode
<Image 
  source={{ uri: '...' }}
  style={styles.image}
  resizeMode="cover" // cover, contain, stretch, repeat, center
/>
```

**Lưu ý:**
- Remote images cần width và height
- Local images tự động lấy kích thước (nhưng vẫn nên set style)

### 4. Button Component

Component đơn giản để tạo nút bấm.

**Đặc điểm:**
- Ít tùy biến style
- Chỉ có title và onPress
- Style mặc định theo platform (iOS/Android khác nhau)

**Ví dụ:**

```javascript
import { Button } from 'react-native';

<Button 
  title="Nhấn tôi"
  onPress={() => alert('Đã nhấn!')}
/>
```

**Hạn chế:**
- Không thể tùy chỉnh màu sắc chi tiết
- Không thể có icon
- Style giới hạn

### 5. TextInput Component

Dùng để nhận input từ người dùng.

**Ví dụ cơ bản:**

```javascript
import { useState } from 'react';
import { TextInput, View } from 'react-native';

function MyComponent() {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nhập text..."
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}
```

**Props thường dùng:**

```javascript
<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Nhập gì đó..."
  placeholderTextColor="#999"
  keyboardType="default" // default, numeric, email-address, phone-pad
  secureTextEntry={true} // Cho password
  multiline={true} // Cho textarea
  numberOfLines={4}
  maxLength={100}
  editable={true}
  autoCapitalize="sentences" // none, sentences, words, characters
  autoCorrect={true}
/>
```

### 6. ScrollView Component

Cho phép scroll nội dung khi vượt quá màn hình.

**Ví dụ:**

```javascript
import { ScrollView, Text, View } from 'react-native';

<ScrollView 
  style={styles.scrollView}
  contentContainerStyle={styles.contentContainer}
>
  <View style={styles.item}>
    <Text>Item 1</Text>
  </View>
  <View style={styles.item}>
    <Text>Item 2</Text>
  </View>
  {/* ... nhiều items ... */}
</ScrollView>
```

**Lưu ý:**
- Không phù hợp cho danh sách lớn (dùng FlatList)
- Render tất cả children cùng lúc
- Phù hợp cho form dài, content scroll ngắn

### 7. FlatList Component (Giới thiệu sơ bộ)

Component hiệu quả để hiển thị danh sách lớn. Sẽ học chi tiết ở bài sau.

**Ví dụ cơ bản:**

```javascript
import { FlatList, Text, View } from 'react-native';

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
];

<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  )}
/>
```

---

## Phần 2: Touchable Components

### 8. TouchableOpacity

Component có thể nhấn với hiệu ứng làm mờ (opacity) khi nhấn.

**Ví dụ:**

```javascript
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity
  style={styles.button}
  onPress={() => alert('Đã nhấn!')}
  activeOpacity={0.7} // Opacity khi nhấn (0-1)
>
  <Text style={styles.buttonText}>Nhấn tôi</Text>
</TouchableOpacity>
```

**Ưu điểm so với Button:**
- Tùy chỉnh style hoàn toàn
- Có thể chứa nhiều children
- Hiệu ứng đẹp mắt
- Linh hoạt hơn

### 9. Pressable (React Native mới - Khuyến nghị)

Component mới nhất, linh hoạt nhất để xử lý touch events.

**Ví dụ:**

```javascript
import { Pressable, Text } from 'react-native';

<Pressable
  style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed
  ]}
  onPress={() => alert('Đã nhấn!')}
>
  <Text style={styles.buttonText}>Nhấn tôi</Text>
</Pressable>
```

**Ưu điểm:**
- Có thể detect nhiều loại press (onPress, onLongPress, onPressIn, onPressOut)
- Có thể style dựa trên state (pressed)
- Linh hoạt nhất

**So sánh:**

| Component | Tùy chỉnh | Hiệu ứng | Linh hoạt |
|-----------|-----------|----------|-----------|
| Button | Thấp | Platform default | Thấp |
| TouchableOpacity | Cao | Fade | Trung bình |
| Pressable | Rất cao | Tùy chỉnh | Rất cao |

---

## Phần 3: Flexbox Layout System

Flexbox là layout system mặc định và chính của React Native. Hiểu Flexbox là chìa khóa để layout thành công!

### Flexbox cơ bản

**Container (Parent) Properties:**

1. **flexDirection** - Hướng sắp xếp items
   - `row` (mặc định): Ngang (trái → phải)
   - `column` (mặc định màn hình): Dọc (trên → dưới)
   - `row-reverse`: Ngang (phải → trái)
   - `column-reverse`: Dọc (dưới → trên)

2. **justifyContent** - Căn chỉnh theo main axis
   - `flex-start`: Bắt đầu
   - `flex-end`: Kết thúc
   - `center`: Giữa
   - `space-between`: Cách đều giữa items
   - `space-around`: Cách đều quanh items
   - `space-evenly`: Cách đều hoàn toàn

3. **alignItems** - Căn chỉnh theo cross axis
   - `flex-start`: Bắt đầu
   - `flex-end`: Kết thúc
   - `center`: Giữa
   - `stretch`: Kéo dãn (mặc định)
   - `baseline`: Căn baseline

4. **flexWrap** - Cho phép wrap
   - `nowrap` (mặc định): Không wrap
   - `wrap`: Wrap khi cần

**Item (Child) Properties:**

1. **flex** - Tỷ lệ chia không gian
   - `flex: 1`: Chiếm toàn bộ không gian còn lại
   - `flex: 2`: Gấp đôi item có `flex: 1`
   - Số càng lớn = chiếm càng nhiều không gian

2. **alignSelf** - Override alignItems cho item riêng lẻ
   - Cùng các giá trị như alignItems

### Ví dụ thực hành

**Ví dụ 1: Layout cơ bản**

```javascript
<View style={styles.container}>
  <View style={styles.box1} />
  <View style={styles.box2} />
  <View style={styles.box3} />
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Dọc
    justifyContent: 'center', // Căn giữa dọc
    alignItems: 'center', // Căn giữa ngang
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  box3: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
});
```

**Ví dụ 2: Layout với flex**

```javascript
<View style={styles.container}>
  <View style={styles.header}>
    <Text>Header</Text>
  </View>
  <View style={styles.content}>
    <Text>Content</Text>
  </View>
  <View style={styles.footer}>
    <Text>Footer</Text>
  </View>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1, // Chiếm toàn bộ không gian còn lại
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

**Ví dụ 3: Layout ngang với space-between**

```javascript
<View style={styles.container}>
  <View style={styles.button}>
    <Text>Cancel</Text>
  </View>
  <View style={styles.button}>
    <Text>OK</Text>
  </View>
</View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
});
```

### So sánh Flexbox: Web vs React Native

| Property | Web | React Native | Ghi chú |
|----------|-----|-------------|---------|
| flexDirection | row (default) | column (default) | ⚠️ Khác nhau! |
| flex | Có | Có | Giống nhau |
| justifyContent | Có | Có | Giống nhau |
| alignItems | Có | Có | Giống nhau |
| flexWrap | Có | Có | Giống nhau |
| display: flex | Cần set | Mặc định | React Native luôn flex |
| position: absolute | Có | Có | Giống nhau |

---

## Phần 4: Styling với StyleSheet

### StyleSheet.create()

Cách tốt nhất để tạo styles trong React Native.

**Lý do dùng StyleSheet.create():**
- ✅ Validate styles (báo lỗi sai property)
- ✅ Tối ưu performance
- ✅ Code organization tốt hơn
- ✅ Dễ maintain

**Ví dụ:**

```javascript
import { StyleSheet, View, Text } from 'react-native';

<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

### Các thuộc tính style thường dùng

**Layout:**
- `width`, `height`
- `margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
- `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
- `flex`, `flexDirection`, `justifyContent`, `alignItems`
- `position` (`absolute`, `relative`)
- `top`, `bottom`, `left`, `right`

**Visual:**
- `backgroundColor`
- `borderWidth`, `borderColor`, `borderRadius`
- `opacity`
- `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` (iOS)
- `elevation` (Android - cho shadow)

**Text (chỉ cho Text component):**
- `fontSize`, `fontWeight`, `fontFamily`
- `color`, `textAlign`
- `textDecorationLine` (underline, line-through)
- `lineHeight`, `letterSpacing`

### Kết hợp nhiều styles

**Cách 1: Mảng styles**

```javascript
<View style={[styles.container, styles.centered]}>
  <Text>Hello</Text>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

**Cách 2: Conditional styling**

```javascript
<View style={[
  styles.container,
  isActive && styles.active,
  error && styles.error
]}>
  <Text>Hello</Text>
</View>
```

**Cách 3: Inline style kết hợp**

```javascript
<View style={[
  styles.container,
  { padding: isLarge ? 20 : 10 }
]}>
  <Text>Hello</Text>
</View>
```

### Style Inheritance

⚠️ **Lưu ý quan trọng:** Styles KHÔNG tự động kế thừa trong React Native!

```javascript
// ❌ KHÔNG hoạt động như CSS
<View style={styles.parent}>
  <Text>Text này KHÔNG tự động kế thừa style từ parent</Text>
</View>

// ✅ Phải set style trực tiếp
<View style={styles.parent}>
  <Text style={styles.child}>Text này mới có style</Text>
</View>
```

---

## Phần 5: Responsive Design & Dimensions

### Dimensions API

Lấy kích thước màn hình thiết bị.

**Ví dụ:**

```javascript
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9, // 90% màn hình
    height: screenHeight * 0.5, // 50% màn hình
  },
});
```

### Listen to dimension changes

```javascript
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

function MyComponent() {
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window')
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }) => {
        setDimensions(window);
      }
    );

    return () => subscription?.remove();
  }, []);

  return (
    <View style={{
      width: dimensions.width * 0.9,
      height: dimensions.height * 0.5,
    }}>
      {/* Content */}
    </View>
  );
}
```

### Percentage-based sizing

React Native không hỏ trợ `width: '50%'` trực tiếp. Phải tính toán:

```javascript
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  halfWidth: {
    width: screenWidth * 0.5, // 50%
  },
  quarterWidth: {
    width: screenWidth * 0.25, // 25%
  },
});
```

---

## Phần 6: Platform-Specific Styling

### Platform.select()

Áp dụng style khác nhau cho iOS và Android.

**Ví dụ:**

```javascript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
      },
      android: {
        backgroundColor: '#fff',
        paddingTop: 10,
      },
    }),
  },
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
});
```

### Platform.OS

Kiểm tra platform hiện tại.

```javascript
import { Platform } from 'react-native';

const paddingTop = Platform.OS === 'ios' ? 20 : 10;
const fontFamily = Platform.OS === 'ios' ? 'Arial' : 'Roboto';
```

---

## Phần 7: Best Practices

### 1. Tổ chức styles

```javascript
// ✅ Tốt - Tách riêng styles
const styles = StyleSheet.create({
  // Layout styles
  container: { ... },
  row: { ... },
  
  // Component styles
  button: { ... },
  input: { ... },
  
  // Text styles
  title: { ... },
  subtitle: { ... },
});
```

### 2. Tái sử dụng styles

```javascript
// Tạo styles chung
const commonStyles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
});

// Sử dụng lại
<View style={[commonStyles.centered, commonStyles.card]}>
  ...
</View>
```

### 3. Tách styles ra file riêng (cho component lớn)

```javascript
// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { ... },
  title: { ... },
});

// Component.js
import { styles } from './styles';
```

### 4. Sử dụng constants cho colors/spacing

```javascript
// constants.js
export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#F2F2F7',
  text: '#000000',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Usage
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
});
```

---

## Bài tập thực hành

### Bài tập 1: Profile Card Component

Tạo component Profile Card với:
- Avatar (Image)
- Tên (Text)
- Chức danh (Text)
- Mô tả ngắn (Text)
- 2 nút: Follow và Message (TouchableOpacity)

<details>
<summary>💡 Gợi ý giải</summary>

```javascript
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/120' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Nguyễn Văn A</Text>
      <Text style={styles.title}>React Native Developer</Text>
      <Text style={styles.description}>
        Đam mê lập trình mobile và xây dựng ứng dụng đẹp
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.followButton]}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.messageButton]}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  followButton: {
    backgroundColor: '#007AFF',
  },
  messageButton: {
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  followButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  messageButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: '600',
  },
});
```

</details>

### Bài tập 2: Login Form

Tạo form đăng nhập với:
- Input email (TextInput)
- Input password (TextInput với secureTextEntry)
- Button đăng nhập (TouchableOpacity)
- Xử lý state cho inputs

<details>
<summary>💡 Gợi ý giải</summary>

```javascript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      alert(`Đăng nhập với:\nEmail: ${email}\nPassword: ${password}`);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.title}>Đăng nhập</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập email của bạn"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, (!email || !password) && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!email || !password}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
```

</details>

### Bài tập 3: Flexbox Layout Challenge

Tạo layout với Flexbox:
- Header cố định ở trên (height: 60)
- Content ở giữa (chiếm toàn bộ không gian còn lại)
- Footer cố định ở dưới (height: 60)
- Trong Content có 3 box:
  - Box 1: chiếm 1 phần
  - Box 2: chiếm 2 phần
  - Box 3: chiếm 1 phần

<details>
<summary>💡 Gợi ý giải</summary>

```javascript
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function FlexboxLayout() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={[styles.box, styles.box1]}>
          <Text style={styles.boxText}>Box 1 (flex: 1)</Text>
        </View>
        <View style={[styles.box, styles.box2]}>
          <Text style={styles.boxText}>Box 2 (flex: 2)</Text>
        </View>
        <View style={[styles.box, styles.box3]}>
          <Text style={styles.boxText}>Box 3 (flex: 1)</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 10,
      },
    }),
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  box1: {
    flex: 1,
    backgroundColor: '#FF3B30',
  },
  box2: {
    flex: 2,
    backgroundColor: '#34C759',
  },
  box3: {
    flex: 1,
    backgroundColor: '#5856D6',
  },
  boxText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    height: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

</details>

---

## Những điều cần nhớ

✅ **Đã học:**
- Core components: View, Text, Image, Button, TextInput, ScrollView
- Touchable components: TouchableOpacity, Pressable
- Flexbox layout system (flexDirection, justifyContent, alignItems, flex)
- StyleSheet.create() và styling best practices
- Dimensions API cho responsive design
- Platform-specific styling với Platform.select()

📝 **Ghi chú quan trọng:**
- **Luôn dùng `<Text>`** để hiển thị text (không thể text trực tiếp trong View)
- **Flexbox default direction là `column`** trong React Native (khác với web là `row`)
- **Styles không kế thừa** - phải set style cho từng component
- **Remote images cần width và height**
- **Dùng StyleSheet.create()** thay vì inline styles cho performance tốt hơn
- **Platform.select()** để xử lý iOS vs Android differences

⚠️ **Lỗi thường gặp:**
- Quên wrap text trong `<Text>` component
- Dùng CSS properties không tồn tại (như `display`, `float`)
- Quên set width/height cho remote images
- Flexbox direction confusion (column vs row)

---

## Câu hỏi tự kiểm tra

1. Component nào bắt buộc phải dùng để hiển thị text trong React Native?
2. FlexDirection mặc định trong React Native là gì? (so với web)
3. Sự khác biệt giữa TouchableOpacity và Pressable?
4. Tại sao nên dùng StyleSheet.create() thay vì inline styles?
5. Làm thế nào để có shadow trên Android? (khác với iOS)
6. Styles có tự động kế thừa trong React Native không?

---

## Tài liệu tham khảo

- [React Native Components](https://reactnative.dev/docs/components-and-apis)
- [Layout with Flexbox](https://reactnative.dev/docs/flexbox)
- [StyleSheet API](https://reactnative.dev/docs/stylesheet)
- [Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [Dimensions API](https://reactnative.dev/docs/dimensions)

---

## Bước tiếp theo

Sau khi hoàn thành bài này, bạn sẽ chuyển sang:
- **Lesson 03: Component State & Props**
- Học về useState hook chi tiết
- Quản lý state và props
- Component composition
- Controlled vs uncontrolled components

---

**Chúc bạn học tốt!** 🚀
*Hãy làm bài tập và thử nghiệm để nắm vững kiến thức!*

