// BÀI TẬP 3: Todo List với Props và State
// Tạo ứng dụng Todo List với các tính năng:
// - Thêm todo mới
// - Đánh dấu todo đã hoàn thành
// - Xóa todo
//
// Hướng dẫn:
// 1. Đổi tên App.js thành App.exercise2.js (nếu đã làm bài 2)
// 2. Đổi tên file này thành App.js
// 3. Chạy app và xem kết quả!
//
// Kiến thức cần áp dụng:
// - useState hook để quản lý state
// - Props để truyền data và callbacks giữa components
// - Component composition
// - Controlled components

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

// TODO: Tạo component TodoItem
// Component này nhận props: todo, onToggle, onDelete
// - Hiển thị todo.text
// - Có style khác nếu todo.completed
// - Có nút để xóa todo
// function TodoItem({ todo, onToggle, onDelete }) {
//   return (
//     <View style={styles.todoItem}>
//       {/* TODO: Thêm TouchableOpacity để toggle completed */}
//       {/* TODO: Hiển thị todo.text với style phù hợp */}
//       {/* TODO: Thêm nút Xóa */}
//     </View>
//   );
// }

// TODO: Tạo component AddTodo
// Component này có state riêng để quản lý input text
// - Có TextInput để nhập todo mới
// - Có nút Thêm để gọi onAdd callback
// function AddTodo({ onAdd }) {
//   const [text, setText] = useState('');
//   
//   const handleAdd = () => {
//     // TODO: Gọi onAdd với text và clear input
//   };
//
//   return (
//     <View style={styles.addContainer}>
//       {/* TODO: Thêm TextInput */}
//       {/* TODO: Thêm TouchableOpacity với nút Thêm */}
//     </View>
//   );
// }

export default function App() {
  // TODO: Khởi tạo state cho todos
  // const [todos, setTodos] = useState([
  //   { id: 1, text: 'Học React Native', completed: false },
  //   { id: 2, text: 'Xây dựng Todo App', completed: false },
  // ]);
  // const [nextId, setNextId] = useState(3);

  // TODO: Tạo function handleAdd để thêm todo mới
  // const handleAdd = (text) => {
  //   // Tạo todo mới với id, text, completed: false
  //   // Thêm vào mảng todos
  //   // Tăng nextId
  // };

  // TODO: Tạo function handleToggle để đánh dấu completed
  // const handleToggle = (id) => {
  //   // Tìm todo với id và toggle completed
  // };

  // TODO: Tạo function handleDelete để xóa todo
  // const handleDelete = (id) => {
  //   // Filter để xóa todo với id
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      
      {/* TODO: Thêm component AddTodo */}
      {/* <AddTodo onAdd={handleAdd} /> */}

      {/* TODO: Thêm ScrollView để hiển thị danh sách todos */}
      {/* <ScrollView style={styles.listContainer}>
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
      </ScrollView> */}
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
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 50,
  },
});

