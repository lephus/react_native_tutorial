// LESSON 04: Navigation - Home Screen
// Screen đầu tiên trong ứng dụng

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏠 Trang chủ</Text>
      <Text style={styles.subtitle}>
        Đây là Home Screen - điểm bắt đầu của ứng dụng
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 Navigation Demo</Text>
        <Text style={styles.description}>
          Nhấn vào các nút bên dưới để điều hướng giữa các màn hình
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.buttonText}>📦 Xem Sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>👤 Hồ sơ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>⚙️ Cài đặt</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>💡 Hướng dẫn:</Text>
        <Text style={styles.infoText}>
          • Sử dụng navigation.navigate() để điều hướng
        </Text>
        <Text style={styles.infoText}>
          • Có thể truyền parameters qua route.params
        </Text>
        <Text style={styles.infoText}>
          • Nút Back tự động xuất hiện trên các screens con
        </Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#5AC8FA',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976D2',
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default HomeScreen;

