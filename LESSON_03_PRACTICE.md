# 🎯 Bài Học 03 - Hướng Dẫn Thực Hành: Component State & Props

## Mục tiêu thực hành
- Tạo components với props
- Sử dụng useState hook
- Thực hành controlled components
- Thực hành component composition
- Thực hành state lifting và callbacks

---

## Bài tập 1: Counter App với Props và State

### Yêu cầu
Tạo một Counter App với:
- Component `Counter` hiển thị số đếm
- Component `CounterButtons` có các nút: -, Reset, +
- Sử dụng props để truyền callbacks
- State được quản lý ở component cha

### Bước 1: Tạo component Counter

```javascript
// Tạo component Counter hiển thị số
function CounterDisplay({ count }) {
  return (
    <View style={styles.display}>
      <Text style={styles.countText}>{count}</Text>
    </View>
  );
}
```

### Bước 2: Tạo component CounterButtons

```javascript
// Component nhận callbacks qua props
function CounterButtons({ onIncrement, onDecrement, onReset }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={onIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Bước 3: Kết hợp trong App component

```javascript
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => prev - 1);
  const handleReset = () => setCount(0);

  return (
    <View style={styles.container}>
      <CounterDisplay count={count} />
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
      />
    </View>
  );
}
```

### Bước 4: Thêm styles

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  display: {
    marginBottom: 30,
  },
  countText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### Kết quả mong đợi
- Hiển thị số đếm ở giữa màn hình
- 3 nút: -, Reset, +
- Nhấn + tăng số, - giảm số, Reset về 0

---

## Bài tập 2: Todo List với Props và State

### Yêu cầu
Tạo Todo List với:
- Component `TodoItem` hiển thị một todo
- Component `TodoList` hiển thị danh sách todos
- Component `AddTodo` để thêm todo mới
- State quản lý danh sách todos

### Bước 1: Tạo component TodoItem

```javascript
// Component hiển thị một todo item
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => onToggle(todo.id)}
      >
        <Text
          style={[
            styles.todoText,
            todo.completed && styles.completedText,
          ]}
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
```

### Bước 2: Tạo component TodoList

```javascript
// Component hiển thị danh sách todos
function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ScrollView style={styles.listContainer}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
      {todos.length === 0 && (
        <Text style={styles.emptyText}>Chưa có todo nào!</Text>
      )}
    </ScrollView>
  );
}
```

### Bước 3: Tạo component AddTodo

```javascript
// Component để thêm todo mới
function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText(''); // Clear input
    }
  };

  return (
    <View style={styles.addContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nhập todo mới..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Bước 4: Kết hợp trong App component

```javascript
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React Native', completed: false },
    { id: 2, text: 'Xây dựng app đầu tiên', completed: false },
  ]);
  const [nextId, setNextId] = useState(3);

  const handleAdd = (text) => {
    const newTodo = {
      id: nextId,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <AddTodo onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </View>
  );
}
```

### Bước 5: Thêm styles

```javascript
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
```

### Kết quả mong đợi
- Form thêm todo mới ở trên
- Danh sách todos ở dưới
- Click vào todo để đánh dấu hoàn thành
- Nút Xóa để xóa todo

---

## Bài tập 3: Form với Validation

### Yêu cầu
Tạo form đăng ký với:
- First Name và Last Name
- Email (với validation)
- Password (với validation)
- Confirm Password (phải khớp với Password)
- Hiển thị lỗi khi invalid
- Button Submit

### Bước 1: Tạo component InputField

```javascript
// Component input với validation
function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = null,
  keyboardType = 'default',
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
```

### Bước 2: Tạo validation functions

```javascript
// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email là bắt buộc';
  }
  if (!emailRegex.test(email)) {
    return 'Email không hợp lệ';
  }
  return null;
};

const validatePassword = (password) => {
  if (!password) {
    return 'Password là bắt buộc';
  }
  if (password.length < 6) {
    return 'Password phải có ít nhất 6 ký tự';
  }
  return null;
};
```

### Bước 3: Tạo App component với form

```javascript
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error khi user đang gõ
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate firstName
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name là bắt buộc';
    }

    // Validate lastName
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name là bắt buộc';
    }

    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Validate confirmPassword
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password là bắt buộc';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Thành công!', 'Form đã được submit thành công');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

      <InputField
        label="First Name"
        value={formData.firstName}
        onChangeText={(value) => updateField('firstName', value)}
        placeholder="Nhập First Name"
        error={errors.firstName}
      />

      <InputField
        label="Last Name"
        value={formData.lastName}
        onChangeText={(value) => updateField('lastName', value)}
        placeholder="Nhập Last Name"
        error={errors.lastName}
      />

      <InputField
        label="Email"
        value={formData.email}
        onChangeText={(value) => updateField('email', value)}
        placeholder="Nhập Email"
        keyboardType="email-address"
        error={errors.email}
      />

      <InputField
        label="Password"
        value={formData.password}
        onChangeText={(value) => updateField('password', value)}
        placeholder="Nhập Password"
        secureTextEntry
        error={errors.password}
      />

      <InputField
        label="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => updateField('confirmPassword', value)}
        placeholder="Nhập lại Password"
        secureTextEntry
        error={errors.confirmPassword}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Đăng ký</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
```

### Bước 4: Thêm styles

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: 'white',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### Kết quả mong đợi
- Form có 5 fields với labels
- Validation real-time khi gõ
- Hiển thị lỗi dưới mỗi field
- Submit button chỉ submit khi tất cả fields hợp lệ

---

## Bài tập 4: Calculator App

### Yêu cầu
Tạo máy tính đơn giản với:
- Màn hình hiển thị số hiện tại
- Các nút số (0-9)
- Các phép toán (+, -, *, /)
- Nút Clear
- Nút Equals (=)

### Hướng dẫn

```javascript
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleNumberPress = (number) => {
    if (display === '0') {
      setDisplay(number.toString());
    } else {
      setDisplay(display + number.toString());
    }
  };

  const handleOperationPress = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      let result = 0;

      switch (operation) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '*':
          result = previousValue * current;
          break;
        case '/':
          result = previousValue / current;
          break;
      }

      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOperationPress('/')}
        >
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOperationPress('*')}
        >
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOperationPress('-')}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(7)}
        >
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(8)}
        >
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(9)}
        >
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOperationPress('+')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(4)}
        >
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(5)}
        >
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(6)}
        >
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEquals} onPress={handleEquals}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(1)}
        >
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(2)}
        >
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(3)}
        >
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <View style={styles.button} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.zeroButton]}
          onPress={() => handleNumberPress(0)}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  display: {
    fontSize: 64,
    color: '#fff',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 32,
    color: '#fff',
  },
  buttonEquals: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zeroButton: {
    flex: 2,
  },
});
```

---

## Tips và Tricks

### 1. Functional Updates với useState

Khi state mới phụ thuộc vào state cũ:

```javascript
// ✅ ĐÚNG
const increment = () => {
  setCount(prev => prev + 1);
};

// ❌ SAI (có thể gây bug)
const increment = () => {
  setCount(count + 1);
};
```

### 2. Reset Form

```javascript
const resetForm = () => {
  setFormData({
    firstName: '',
    lastName: '',
    email: '',
  });
  setErrors({});
};
```

### 3. Conditional Rendering với Props

```javascript
function Button({ title, variant = 'primary', onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && styles.primaryButton,
        variant === 'danger' && styles.dangerButton,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
```

### 4. Default Props

```javascript
function Greeting({ name = 'Guest' }) {
  return <Text>Xin chào, {name}!</Text>;
}
```

---

## Checklist hoàn thành

Sau khi hoàn thành các bài tập, bạn nên:
- [ ] Hiểu cách truyền props giữa components
- [ ] Sử dụng thành thạo useState hook
- [ ] Tạo được controlled components
- [ ] Thực hành component composition
- [ ] Hiểu cách lift state lên component cha
- [ ] Sử dụng callback functions qua props
- [ ] Tạo được form với validation
- [ ] Xây dựng được ứng dụng đơn giản với state và props

---

**Chúc bạn thực hành thành công! 🎉**

