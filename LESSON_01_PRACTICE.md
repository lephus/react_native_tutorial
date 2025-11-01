# 🎯 Bài Học 01 - Hướng Dẫn Thực Hành

## Bước 1: Kiểm tra project đã tạo

Project `HelloWorldApp` đã được tạo thành công! Hãy kiểm tra:

```bash
cd HelloWorldApp
ls -la
```

Bạn sẽ thấy:
- `App.js` - File code chính
- `package.json` - Dependencies
- `node_modules/` - Thư viện đã cài
- `app.json` - Cấu hình app

## Bước 2: Chạy ứng dụng

### Cách 1: Chạy trên điện thoại thật (Khuyến nghị cho người mới)

1. **Cài Expo Go:**
   - iOS: Tải từ App Store
   - Android: Tải từ Play Store

2. **Chạy project:**
   ```bash
   npm start
   ```

3. **Quét QR code:**
   - Terminal sẽ hiển thị QR code
   - Mở Expo Go trên điện thoại
   - Quét QR code để xem app

### Cách 2: Chạy trên máy ảo

**iOS Simulator (chỉ macOS):**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

## Bước 3: Thử nghiệm code

### 3.1: Xem code hiện tại

Mở file `App.js`, bạn sẽ thấy code mẫu đã được cập nhật với:
- Component `App` hiển thị text chào mừng
- StyleSheet với styles cho title và subtitle

### 3.2: Thử chỉnh sửa

Hãy thử thay đổi text và màu sắc:

```javascript
<Text style={styles.title}>Chào mừng đến với React Native!</Text>
```

Sau khi lưu file, app sẽ tự động reload (Hot Reload)!

### 3.3: Thử thêm component

Thêm một Text component mới:

```javascript
<Text style={styles.subtitle}>Hôm nay là ngày đầu tiên học!</Text>
<Text style={styles.date}>Ngày: {new Date().toLocaleDateString()}</Text>
```

Và thêm style mới:

```javascript
date: {
  fontSize: 14,
  color: '#999',
  marginTop: 10,
},
```

## Bước 4: Bài tập thực hành

### Bài tập 1: Counter App (Cơ bản)

Tạo ứng dụng đếm số với 2 nút: Tăng và Giảm

**Gợi ý:**
- Sử dụng `useState` hook
- Import `Button` từ `react-native`
- Thêm state cho count

**Code mẫu:**

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Tăng" 
          onPress={() => setCount(count + 1)} 
        />
        <View style={styles.space} />
        <Button 
          title="Giảm" 
          onPress={() => setCount(count - 1)} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  space: {
    width: 20,
  },
});
```

### Bài tập 2: Profile Card

Tạo thẻ profile với ảnh, tên, và mô tả

**Gợi ý:**
- Sử dụng `Image` component
- Sử dụng placeholder image hoặc image từ internet
- Styling với border radius cho ảnh tròn

**Code mẫu:**

```javascript
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Nguyễn Văn A</Text>
      <Text style={styles.title}>React Native Developer</Text>
      <Text style={styles.description}>
        Đam mê lập trình mobile và xây dựng ứng dụng đẹp
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 30,
  },
});
```

## Bước 5: Hiểu các khái niệm quan trọng

### 5.1: Component Structure

```javascript
import React from 'react';                    // Import React
import { View, Text } from 'react-native';    // Import components

export default function App() {              // Component function
  return (                                    // Return JSX
    <View>                                    // Container component
      <Text>Hello</Text>                      // Text component
    </View>
  );
}
```

### 5.2: StyleSheet

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,              // Chiếm toàn bộ không gian
    backgroundColor: '#fff',  // Màu nền
    alignItems: 'center',     // Căn giữa theo trục ngang
    justifyContent: 'center', // Căn giữa theo trục dọc
  },
});
```

### 5.3: useState Hook

```javascript
import { useState } from 'react';

const [count, setCount] = useState(0);
// count: giá trị hiện tại
// setCount: function để cập nhật giá trị
// useState(0): giá trị khởi tạo là 0
```

## Bước 6: Thử nghiệm Hot Reload

1. Mở app trên điện thoại
2. Sửa code trong `App.js`
3. Lưu file (Cmd+S / Ctrl+S)
4. Xem app tự động reload!

**Thử nghiệm:**
- Đổi màu text
- Đổi kích thước font
- Thêm components mới
- Xóa components

## Bước 7: Debug và Troubleshooting

### Lỗi thường gặp:

**1. Lỗi: "Text strings must be rendered within a <Text> component"**
```javascript
// ❌ SAI
<View>Hello</View>

// ✅ ĐÚNG
<View><Text>Hello</Text></View>
```

**2. Lỗi: "Cannot read property 'map' of undefined"**
- Kiểm tra data có tồn tại trước khi map
- Sử dụng optional chaining: `data?.map()`

**3. App không reload:**
- Shake device → Reload
- Hoặc nhấn `r` trong terminal

### Debug Tips:

1. **Console.log:**
```javascript
console.log('Debug info:', variable);
```

2. **React DevTools:**
- Cài React Native Debugger
- Hoặc sử dụng Chrome DevTools

## Bước 8: Next Steps

Sau khi hoàn thành bài này, bạn nên:

1. ✅ Hoàn thành 2 bài tập
2. ✅ Hiểu cách hoạt động của Hot Reload
3. ✅ Biết cách debug cơ bản
4. 📖 Đọc thêm: [React Native Docs](https://reactnative.dev/docs/getting-started)
5. 🎯 Chuyển sang Lesson 02: Basic Components & Styling

## Câu hỏi tự kiểm tra

1. Làm thế nào để tạo state trong component?
2. Tại sao phải bọc text trong `<Text>` component?
3. Hot Reload hoạt động như thế nào?
4. StyleSheet.create() có ưu điểm gì so với inline styles?

---

**Chúc bạn học tốt!** 🚀

*Hãy thử nghiệm và đừng ngại thử các thay đổi khác nhau!*

