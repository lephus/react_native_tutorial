// BÀI TẬP 1: Counter App
// Tạo ứng dụng đếm số với 2 nút: Tăng và Giảm
// 
// Hướng dẫn:
// 1. Đổi tên App.js thành App.original.js (backup)
// 2. Đổi tên file này thành App.js
// 3. Chạy app và thử nghiệm!

import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  // TODO: Tạo state cho count với giá trị khởi tạo là 0
  // const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      {/* TODO: Hiển thị giá trị count */}
      {/* <Text style={styles.count}>{count}</Text> */}
      
      <View style={styles.buttonContainer}>
        {/* TODO: Tạo nút Tăng - khi nhấn sẽ tăng count lên 1 */}
        {/* <Button 
          title="Tăng" 
          onPress={() => setCount(count + 1)} 
        /> */}
        
        <View style={styles.space} />
        
        {/* TODO: Tạo nút Giảm - khi nhấn sẽ giảm count xuống 1 */}
        {/* <Button 
          title="Giảm" 
          onPress={() => setCount(count - 1)} 
        /> */}
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

