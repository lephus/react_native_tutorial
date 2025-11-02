// LESSON 04: Navigation - Products Screen
// Danh sách sản phẩm với khả năng navigate đến chi tiết

import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: '25.000.000đ', category: 'Điện thoại' },
  { id: 2, name: 'Samsung Galaxy S24', price: '22.000.000đ', category: 'Điện thoại' },
  { id: 3, name: 'MacBook Pro M3', price: '45.000.000đ', category: 'Laptop' },
  { id: 4, name: 'iPad Air', price: '15.000.000đ', category: 'Tablet' },
  { id: 5, name: 'AirPods Pro', price: '5.000.000đ', category: 'Tai nghe' },
  { id: 6, name: 'Apple Watch', price: '10.000.000đ', category: 'Đồng hồ' },
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
          productCategory: item.category,
        })
      }
    >
      <View style={styles.productContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📦 Danh sách Sản phẩm</Text>
        <Text style={styles.subtitle}>
          Nhấn vào sản phẩm để xem chi tiết
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          💡 Đây là ví dụ về truyền parameters:
        </Text>
        <Text style={styles.noteText}>
          navigation.navigate('ProductDetails', {'{'}
          {' '}
          productId, productName, productPrice
          {' '}
          {'}'})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    padding: 15,
  },
  productItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productContent: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  arrow: {
    fontSize: 20,
    color: '#999',
  },
  noteContainer: {
    backgroundColor: '#FFF3E0',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  noteText: {
    fontSize: 13,
    color: '#E65100',
    lineHeight: 18,
    fontFamily: 'monospace',
  },
});

export default ProductsScreen;

