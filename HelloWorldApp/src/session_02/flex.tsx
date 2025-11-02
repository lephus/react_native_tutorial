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