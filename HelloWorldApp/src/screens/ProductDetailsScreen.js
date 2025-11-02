// LESSON 04: Navigation - Product Details Screen
// Nhận và hiển thị parameters từ navigation

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

function ProductDetailsScreen({ route, navigation }) {
  // Nhận parameters từ route.params
  const { productId, productName, productPrice, productCategory } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 Chi tiết Sản phẩm</Text>
        <Text style={styles.subtitle}>
          Dữ liệu được truyền qua navigation parameters
        </Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>ID sản phẩm:</Text>
          <Text style={styles.value}>{productId || 'N/A'}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.label}>Tên sản phẩm:</Text>
          <Text style={styles.value}>{productName || 'N/A'}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.label}>Danh mục:</Text>
          <Text style={styles.value}>{productCategory || 'N/A'}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.label}>Giá:</Text>
          <Text style={[styles.value, styles.priceValue]}>
            {productPrice || 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.codeExample}>
        <Text style={styles.codeTitle}>💻 Cách nhận parameters:</Text>
        <Text style={styles.codeText}>
          const {'{'} productId, productName, productPrice {'}'} = route.params;
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Quay lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.buttonText}>📦 Danh sách Sản phẩm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>🔍 Navigation Methods:</Text>
        <Text style={styles.infoText}>
          • navigation.goBack() - Quay lại screen trước
        </Text>
        <Text style={styles.infoText}>
          • navigation.navigate() - Điều hướng đến screen khác
        </Text>
        <Text style={styles.infoText}>
          • route.params - Nhận data từ screen trước
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  detailsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  priceValue: {
    color: '#007AFF',
    fontSize: 22,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  codeExample: {
    backgroundColor: '#263238',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  codeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 13,
    color: '#A5D6A7',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    marginBottom: 20,
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
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default ProductDetailsScreen;

