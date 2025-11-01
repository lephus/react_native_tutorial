# Bài Học 01: Getting Started & Architecture
**React Native Learning Journey - Week 1-2**

---

## Mục tiêu bài học
- Hiểu React Native là gì và khác gì với React web
- Thiết lập môi trường phát triển
- Tạo ứng dụng đầu tiên
- Hiểu kiến trúc React Native
- Làm việc với Metro bundler và Hot Reload

---

## Phần 1: Kiến thức cơ bản

### React Native là gì?
React Native là framework mã nguồn mở của Facebook để xây dựng ứng dụng mobile native (iOS và Android) bằng JavaScript và React.

### React Native vs React Web

| Đặc điểm | React Web | React Native |
|----------|-----------|--------------|
| Platform | Web Browser | iOS & Android |
| Components | `<div>`, `<span>`, `<p>` | `<View>`, `<Text>`, `<Image>` |
| Styling | CSS | JavaScript StyleSheet |
| DOM | Có | Không (Virtual DOM) |
| Native APIs | Limited | Full access |

---

## Phần 2: Thiết lập môi trường

### Yêu cầu hệ thống
- **Node.js**: v16 trở lên (kiểm tra: `node -v`)
- **npm** hoặc **yarn** (kiểm tra: `npm -v`)
- **Git** (kiểm tra: `git --version`)

### Chọn phương pháp: Expo vs React Native CLI

#### Expo (Khuyến nghị cho người mới)
✅ Ưu điểm:
- Dễ thiết lập
- Không cần Android Studio/Xcode
- Hot reload mượt mà
- Dễ test trên thiết bị thật

❌ Nhược điểm:
- Một số native modules hạn chế
- Bundle size lớn hơn

#### React Native CLI
✅ Ưu điểm:
- Toàn quyền truy cập native
- Bundle size nhỏ hơn
- Phù hợp cho production

❌ Nhược điểm:
- Cần Android Studio/Xcode
- Thiết lập phức tạp hơn
- Build chậm hơn

### Hướng dẫn cài đặt Expo

```bash
# Cài đặt Expo CLI toàn cục
npm install -g expo-cli

# Hoặc sử dụng npx (không cần cài toàn cục)
npx create-expo-app@latest MyFirstApp

# Di chuyển vào thư mục
cd MyFirstApp

# Chạy ứng dụng
npm start
```

### Hướng dẫn cài đặt React Native CLI (nâng cao)

```bash
# Cài đặt React Native CLI
npm install -g react-native-cli

# Tạo project mới
npx react-native@latest init MyFirstApp

# Chạy iOS (chỉ macOS)
cd MyFirstApp
npm run ios

# Chạy Android
npm run android
```

---

## Phần 3: Tạo ứng dụng đầu tiên

### Bước 1: Tạo project với Expo

Chúng ta sẽ tạo một ứng dụng đơn giản. Hãy chạy các lệnh sau:

```bash
npx create-expo-app@latest HelloWorldApp --template blank
cd HelloWorldApp
npm start
```

### Bước 2: Cấu trúc project

Sau khi tạo project, bạn sẽ thấy cấu trúc như sau:

```
HelloWorldApp/
├── App.js          # Component chính
├── app.json        # Cấu hình app
├── package.json    # Dependencies
└── node_modules/  # Thư viện đã cài
```

### Bước 3: Code ứng dụng đầu tiên

Mở file `App.js` và thay thế bằng code sau:

```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào React Native!</Text>
      <Text style={styles.subtitle}>Đây là ứng dụng đầu tiên của bạn</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
```

### Bước 4: Chạy ứng dụng

1. **Trên điện thoại thật:**
   - iOS: Cài Expo Go từ App Store
   - Android: Cài Expo Go từ Play Store
   - Quét QR code hiển thị trong terminal

2. **Trên máy ảo:**
   - iOS Simulator (macOS): Nhấn `i` trong terminal
   - Android Emulator: Nhấn `a` trong terminal

---

## Phần 4: Hiểu kiến trúc React Native

### React Native Architecture

```
┌─────────────────────────────────────────┐
│         JavaScript Thread               │
│  ┌───────────────────────────────────┐  │
│  │   React Components & Logic        │  │
│  │   JavaScript Code                 │  │
│  └───────────────────────────────────┘  │
└───────────────┬─────────────────────────┘
                │ Bridge
                │ (Serialized Messages)
┌───────────────┴─────────────────────────┐
│         Native Thread                    │
│  ┌───────────────────────────────────┐  │
│  │   Native Modules                  │  │
│  │   UI Components (iOS/Android)     │  │
│  │   Platform APIs                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Các thành phần chính:

1. **JavaScript Thread**
   - Chạy code JavaScript
   - Xử lý logic nghiệp vụ
   - Quản lý state và props

2. **Native Thread**
   - Render UI native
   - Truy cập platform APIs
   - Xử lý gestures và animations

3. **Bridge**
   - Giao tiếp giữa JS và Native
   - Serialize/Deserialize messages
   - Asynchronous communication

### Metro Bundler

Metro là bundler của React Native, tương tự webpack cho web:
- Bundles JavaScript code
- Transpiles code (ES6+ → ES5)
- Minifies cho production
- Cung cấp Hot Reloading

---

## Phần 5: Hot Reload và Fast Refresh

### Hot Reload
- Tự động reload khi code thay đổi
- Giữ nguyên state của app
- Tiết kiệm thời gian phát triển

### Fast Refresh (React Native mới)
- Chỉ reload component thay đổi
- Nhanh hơn Hot Reload
- Tốt hơn cho debugging

### Cách sử dụng:
1. Lưu file → Tự động reload
2. Shake device → Hiện menu developer
3. Enable/Disable Fast Refresh trong menu

---

## Bài tập thực hành

### Bài tập 1: Counter App
Tạo ứng dụng đếm số với 2 nút: Tăng và Giảm

<details>
<summary>💡 Gợi ý giải</summary>

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

</details>

### Bài tập 2: Profile Card
Tạo thẻ profile với ảnh, tên, và mô tả ngắn

<details>
<summary>💡 Gợi ý giải</summary>

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

</details>

---

## Những điều cần nhớ

✅ **Đã học:**
- React Native là gì và khác gì với React web
- Cách thiết lập môi trường (Expo vs CLI)
- Tạo ứng dụng đầu tiên
- Kiến trúc React Native (JS Thread, Native Thread, Bridge)
- Metro bundler và Hot Reload

📝 **Ghi chú quan trọng:**
- Luôn dùng `<View>` thay vì `<div>`
- Luôn dùng `<Text>` để hiển thị text (không thể text trực tiếp trong View)
- StyleSheet thay vì CSS
- Flexbox là default layout system

---

## Câu hỏi tự kiểm tra

1. React Native khác React web ở điểm nào?
2. Bridge trong React Native làm gì?
3. Metro bundler có vai trò gì?
4. Hot Reload giúp gì trong quá trình phát triển?

---

## Tài liệu tham khảo

- [React Native Docs - Getting Started](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Architecture](https://reactnative.dev/docs/intro-react-native-components)

---

## Bước tiếp theo

Sau khi hoàn thành bài này, bạn sẽ chuyển sang:
- **Lesson 02: Basic Components & Styling**
- Học về View, Text, Image, và các components cơ bản khác
- Làm quen với Flexbox layout system

---

**Chúc bạn học tốt!** 🚀
*Hãy làm bài tập và thử nghiệm để nắm vững kiến thức!*

