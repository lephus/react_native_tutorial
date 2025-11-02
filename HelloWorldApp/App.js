// LESSON 03: Component State & Props - Ví dụ hoàn chỉnh
// Todo List App - Minh họa các khái niệm:
// - useState hook để quản lý state
// - Props để truyền data và callbacks giữa components
// - Component composition
// - Controlled components
// - Callback functions qua props

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Component TodoItem - Nhận props: todo, onToggle, onDelete
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => onToggle(todo.id)}
      >
        <Text
          style={[styles.todoText, todo.completed && styles.completedText]}
        >
          {todo.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
}

// Component AddTodo - Nhận callback onAdd qua props
function AddTodo({ onAdd }) {
  const [text, setText] = useState(''); // State riêng để quản lý input

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim()); // Gọi callback từ component cha
      setText(''); // Clear input sau khi thêm
    }
  };

  return (
    <View style={styles.addContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nhập todo mới..."
        value={text} // Controlled component
        onChangeText={setText}
        onSubmitEditing={handleAdd}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
}

// Component chính - Quản lý state của todos
export default function App() {
  // State quản lý danh sách todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React Native', completed: false },
    { id: 2, text: 'Xây dựng Todo App', completed: false },
    { id: 3, text: 'Thực hành Props và State', completed: false },
  ]);
  const [nextId, setNextId] = useState(4);

  // Callback function để thêm todo mới
  const handleAdd = (text) => {
    const newTodo = {
      id: nextId,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]); // Thêm todo mới vào mảng
    setNextId(nextId + 1); // Tăng ID cho todo tiếp theo
  };

  // Callback function để toggle completed status
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Callback function để xóa todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      
      {/* Component AddTodo - Truyền callback qua props */}
      <AddTodo onAdd={handleAdd} />

      {/* Hiển thị danh sách todos */}
      <ScrollView style={styles.listContainer}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
        {todos.length === 0 && (
          <Text style={styles.emptyText}>Chưa có todo nào!</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  addContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 50,
  },
});