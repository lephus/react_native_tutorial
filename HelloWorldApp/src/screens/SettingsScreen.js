// LESSON 04: Navigation - Settings Screen
// Ví dụ về screen với các options

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

function SettingsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️ Cài đặt</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông báo</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Thông báo Push</Text>
          <Text style={styles.optionValue}>Bật</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Thông báo Email</Text>
          <Text style={styles.optionValue}>Tắt</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bảo mật</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Xác thực 2 yếu tố</Text>
          <Text style={styles.optionValue}>Bật</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Khóa màn hình</Text>
          <Text style={styles.optionValue}>Tắt</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ứng dụng</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Ngôn ngữ</Text>
          <Text style={styles.optionValue}>Tiếng Việt →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Theme</Text>
          <Text style={styles.optionValue}>Sáng →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationDemo}>
        <Text style={styles.demoTitle}>🧭 Navigation Demo</Text>
        <Text style={styles.demoText}>
          Bạn có thể điều hướng giữa các screens bằng nhiều cách:
        </Text>
        <View style={styles.methodList}>
          <Text style={styles.methodItem}>• navigation.navigate('ScreenName')</Text>
          <Text style={styles.methodItem}>• navigation.goBack()</Text>
          <Text style={styles.methodItem}>• navigation.push('ScreenName')</Text>
          <Text style={styles.methodItem}>• navigation.replace('ScreenName')</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Quay lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.homeButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>🏠 Về Trang chủ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#f8f8f8',
    color: '#666',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionValue: {
    fontSize: 14,
    color: '#666',
  },
  navigationDemo: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  demoText: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 15,
    lineHeight: 20,
  },
  methodList: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  methodItem: {
    fontSize: 13,
    color: '#424242',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  homeButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

