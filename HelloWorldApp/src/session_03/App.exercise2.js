// BÀI TẬP 2: Profile Card
// Tạo thẻ profile với ảnh, tên, và mô tả
//
// Hướng dẫn:
// 1. Đổi tên App.js thành App.exercise1.js (nếu đã làm bài 1)
// 2. Đổi tên file này thành App.js
// 3. Chạy app và xem kết quả!

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* TODO: Thêm Image component để hiển thị avatar */}
      {/* Sử dụng placeholder image: 'https://via.placeholder.com/150' */}
      {/* <Image 
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.avatar}
      /> */}
      
      {/* TODO: Hiển thị tên của bạn */}
      {/* <Text style={styles.name}>Tên của bạn</Text> */}
      
      {/* TODO: Hiển thị title/nghề nghiệp */}
      {/* <Text style={styles.title}>React Native Developer</Text> */}
      
      {/* TODO: Hiển thị mô tả ngắn về bản thân */}
      {/* <Text style={styles.description}>
        Mô tả về bản thân của bạn
      </Text> */}
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
    borderRadius: 60,  // Tạo ảnh tròn (borderRadius = width/2)
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

