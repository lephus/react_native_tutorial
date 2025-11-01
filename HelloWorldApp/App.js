import { useState } from 'react';
import { Button, Image } from 'react-native';

import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Text>{count}</Text>
      <Button title="Increase Count" onPress={() => setCount(count + 1)} />
      <Button title="Decrease Count" onPress={() => setCount(count - 1)} />

      {/* CREATE PROFILE CARD */}
      <View style={styles.profileCard}>
        <Image style={styles.profileImage} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s' }} />
        <Text style={styles.profileCard.name}>John Doe</Text>
        <Text style={styles.profileCard.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
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

  profileCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    description: {
      fontSize: 16,
      marginTop: 10,
    },
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
