import { StyleSheet, View } from 'react-native';
import LoginForm from './src/login';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },

  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  avatar: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: 'gray',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
  },
});