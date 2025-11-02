# Bài Học 03: Component State & Props
**React Native Learning Journey - Week 3-4**

---

## Mục tiêu bài học
- Hiểu Props là gì và cách truyền data từ component cha xuống component con
- Sử dụng useState hook để quản lý state
- Phân biệt controlled vs uncontrolled components
- Thực hành component composition
- Hiểu cách state updates gây re-render
- Thực hành state lifting và callback functions
- Tìm hiểu về PropTypes (optional)

---

## Phần 1: Props - Truyền Data Xuống Component Con

### 1. Props là gì?

**Props (Properties)** là cách React Native truyền data từ component cha xuống component con. Props là **read-only** và không thể thay đổi trực tiếp.

**Đặc điểm:**
- ✅ Read-only (chỉ đọc, không thể sửa)
- ✅ Truyền từ component cha → con
- ✅ Có thể là bất kỳ kiểu dữ liệu nào (string, number, object, function, etc.)
- ❌ Không thể thay đổi props từ component con

### 2. Cách sử dụng Props cơ bản

**Ví dụ 1: Props đơn giản**

```javascript
import { Text, View } from 'react-native';

// Component con - nhận props
function Greeting({ name, age }) {
  return (
    <View>
      <Text>Xin chào, {name}!</Text>
      <Text>Bạn {age} tuổi</Text>
    </View>
  );
}

// Component cha - truyền props
export default function App() {
  return (
    <View>
      <Greeting name="John" age={25} />
      <Greeting name="Jane" age={30} />
    </View>
  );
}
```

**Ví dụ 2: Props với object**

```javascript
import { Text, View } from 'react-native';

function UserCard({ user }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.role}>{user.role}</Text>
    </View>
  );
}

export default function App() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer'
  };

  return (
    <View>
      <UserCard user={user} />
    </View>
  );
}
```

**Ví dụ 3: Props với default values**

```javascript
function Button({ title, color = 'blue', onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

// Sử dụng
<Button title="Nhấn tôi" /> {/* color sẽ là 'blue' mặc định */}
<Button title="Xóa" color="red" onPress={() => alert('Deleted!')} />
```

### 3. Props với children

Component có thể nhận `children` prop để render nội dung bên trong:

```javascript
import { Text, View } from 'react-native';

function Card({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children} {/* Render nội dung được truyền vào */}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <Card title="Profile">
      <Text>Đây là nội dung của card</Text>
      <Text>Có thể có nhiều children</Text>
    </Card>
  );
}
```

**Với children đặc biệt:**

```javascript
function Container({ children }) {
  return <View style={styles.container}>{children}</View>;
}

// Có thể dùng nhiều cách
<Container>
  <Text>Child 1</Text>
  <Text>Child 2</Text>
</Container>

// Hoặc
<Container>
  {someCondition ? <Text>Condition 1</Text> : <Text>Condition 2</Text>}
</Container>
```

---

## Phần 2: State với useState Hook

### 1. State là gì?

**State** là data có thể thay đổi trong component. Khi state thay đổi, component sẽ tự động **re-render**.

**Sự khác biệt giữa Props và State:**

| Đặc điểm | Props | State |
|----------|-------|-------|
| Nguồn gốc | Component cha truyền xuống | Component tự quản lý |
| Có thể thay đổi? | ❌ Read-only | ✅ Có thể thay đổi |
| Khởi tạo | Từ bên ngoài | Trong component |
| Khi nào dùng? | Truyền data xuống con | Quản lý data nội bộ |

### 2. useState Hook cơ bản

**Cú pháp:**
```javascript
const [stateValue, setStateValue] = useState(initialValue);
```

**Ví dụ 1: Counter App**

```javascript
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0); // Khởi tạo state = 0

  const increment = () => {
    setCount(count + 1); // Cập nhật state
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
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

**Ví dụ 2: Text Input với State**

```javascript
import { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function NameInput() {
  const [name, setName] = useState(''); // Khởi tạo state rỗng
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    setName(inputValue); // Cập nhật name khi submit
    setInputValue(''); // Clear input
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập tên của bạn:</Text>
      
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue} // Cập nhật state mỗi khi gõ
        placeholder="Tên của bạn"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      
      {name ? (
        <Text style={styles.greeting}>Xin chào, {name}!</Text>
      ) : null}
    </View>
  );
}
```

### 3. useState với nhiều state variables

Mỗi state nên quản lý một giá trị riêng:

```javascript
import { useState } from 'react';

function Form() {
  // Nhiều state riêng biệt
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  return (
    <View>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
    </View>
  );
}
```

**Hoặc dùng object (khi có nhiều fields liên quan):**

```javascript
function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  });

  // Cập nhật một field
  const updateField = (field, value) => {
    setFormData({
      ...formData, // Spread operator - giữ lại các field khác
      [field]: value // Cập nhật field cụ thể
    });
  };

  return (
    <View>
      <TextInput
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => updateField('firstName', value)}
      />
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => updateField('email', value)}
      />
      {/* ... */}
    </View>
  );
}
```

### 4. Functional Updates

Khi state mới phụ thuộc vào state cũ, nên dùng **functional update**:

```javascript
// ❌ SAI - Có thể gây bug khi có nhiều updates
const increment = () => {
  setCount(count + 1);
};

// ✅ ĐÚNG - Luôn dùng giá trị mới nhất
const increment = () => {
  setCount(prevCount => prevCount + 1);
};

// ✅ ĐÚNG - Nhiều lần cập nhật
const incrementMultiple = () => {
  setCount(prev => prev + 1); // 0 + 1 = 1
  setCount(prev => prev + 1); // 1 + 1 = 2
  setCount(prev => prev + 1); // 2 + 1 = 3
  // Kết quả: 3
};

// ❌ SAI - Có thể không đúng
const incrementMultipleWrong = () => {
  setCount(count + 1); // 0 + 1 = 1
  setCount(count + 1); // 0 + 1 = 1 (count chưa update)
  setCount(count + 1); // 0 + 1 = 1
  // Kết quả: 1 (SAI!)
};
```

---

## Phần 3: Controlled vs Uncontrolled Components

### 1. Controlled Components

**Controlled Component**: Component được kiểm soát hoàn toàn bởi state của React.

```javascript
import { useState } from 'react';
import { TextInput, View } from 'react-native';

function ControlledInput() {
  const [value, setValue] = useState(''); // State kiểm soát value

  return (
    <View>
      <TextInput
        value={value} // ✅ Luôn hiển thị giá trị từ state
        onChangeText={setValue} // ✅ Mọi thay đổi đều qua state
      />
      <Text>Giá trị hiện tại: {value}</Text>
    </View>
  );
}
```

**Đặc điểm:**
- ✅ Single source of truth (state là nguồn chân lý duy nhất)
- ✅ Dễ validate và format
- ✅ Có thể reset, clear dễ dàng
- ✅ Luôn sync với state

### 2. Uncontrolled Components

**Uncontrolled Component**: Component tự quản lý state nội bộ (dùng ref).

```javascript
import { useRef } from 'react';
import { TextInput, View, Button } from 'react-native';

function UncontrolledInput() {
  const inputRef = useRef(null); // Dùng ref thay vì state

  const handleSubmit = () => {
    // Lấy giá trị trực tiếp từ ref
    const value = inputRef.current.value;
    console.log('Giá trị:', value);
  };

  return (
    <View>
      <TextInput ref={inputRef} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
```

**Khi nào dùng:**
- Component đơn giản, không cần validate real-time
- Chỉ cần giá trị khi submit
- Form với nhiều inputs (để tối ưu performance)

**Khuyến nghị:** Thường nên dùng **Controlled Components** vì dễ quản lý và debug hơn.

---

## Phần 4: Component Composition

### 1. Component Composition là gì?

**Component Composition** là cách kết hợp các components nhỏ thành components lớn hơn.

### 2. Ví dụ: Card Component

```javascript
import { View, Text, StyleSheet } from 'react-native';

// Component con - Header
function CardHeader({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

// Component con - Body
function CardBody({ children }) {
  return <View style={styles.body}>{children}</View>;
}

// Component con - Footer
function CardFooter({ children }) {
  return <View style={styles.footer}>{children}</View>;
}

// Component chính - Card
function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

// Sử dụng
export default function App() {
  return (
    <Card>
      <CardHeader title="User Profile" subtitle="John Doe" />
      <CardBody>
        <Text>Email: john@example.com</Text>
        <Text>Role: Developer</Text>
      </CardBody>
      <CardFooter>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      </CardFooter>
    </Card>
  );
}
```

### 3. Ví dụ: List với Item Component

```javascript
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Component Item riêng biệt
function ListItem({ item, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => onPress(item)}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );
}

// Component List
function ItemList({ items, onItemPress }) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListItem item={item} onPress={onItemPress} />
      )}
    />
  );
}

// Sử dụng
export default function App() {
  const items = [
    { id: '1', title: 'Item 1', subtitle: 'Description 1' },
    { id: '2', title: 'Item 2', subtitle: 'Description 2' },
  ];

  const handleItemPress = (item) => {
    console.log('Pressed:', item.title);
  };

  return <ItemList items={items} onItemPress={handleItemPress} />;
}
```

**Lợi ích của Composition:**
- ✅ Tái sử dụng code
- ✅ Dễ maintain
- ✅ Dễ test từng component riêng
- ✅ Code dễ đọc hơn

---

## Phần 5: State Lifting - Nâng State Lên Component Cha

### 1. State Lifting là gì?

Khi nhiều components cần chia sẻ state, ta "nâng" state lên component cha chung.

**Ví dụ: Nhiều components cần cùng một state**

```javascript
// ❌ SAI - Mỗi component có state riêng (không đồng bộ)
function TemperatureDisplay({ temperature }) {
  return <Text>Nhiệt độ: {temperature}°C</Text>;
}

function TemperatureInput() {
  const [temperature, setTemperature] = useState(20);
  return (
    <TextInput
      value={temperature.toString()}
      onChangeText={(text) => setTemperature(parseInt(text) || 0)}
    />
  );
}

// ✅ ĐÚNG - State được nâng lên component cha
function TemperatureDisplay({ temperature }) {
  return <Text>Nhiệt độ: {temperature}°C</Text>;
}

function TemperatureInput({ temperature, onTemperatureChange }) {
  return (
    <TextInput
      value={temperature.toString()}
      onChangeText={(text) => onTemperatureChange(parseInt(text) || 0)}
    />
  );
}

// Component cha quản lý state
export default function App() {
  const [temperature, setTemperature] = useState(20);

  return (
    <View>
      <TemperatureDisplay temperature={temperature} />
      <TemperatureInput
        temperature={temperature}
        onTemperatureChange={setTemperature}
      />
    </View>
  );
}
```

### 2. Ví dụ thực tế: Counter với nhiều components

```javascript
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Component hiển thị counter
function CounterDisplay({ count }) {
  return (
    <View style={styles.display}>
      <Text style={styles.countText}>{count}</Text>
    </View>
  );
}

// Component buttons
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

// Component cha quản lý state
export default function CounterApp() {
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

---

## Phần 6: Callback Functions as Props

### 1. Truyền functions qua props

Functions có thể được truyền qua props để component con có thể giao tiếp với component cha.

```javascript
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Component con - nhận callback function
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => onToggle(todo.id)}>
        <Text style={todo.completed ? styles.completed : styles.normal}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text style={styles.deleteButton}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
}

// Component cha - định nghĩa callbacks
export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React Native', completed: false },
    { id: 2, text: 'Xây dựng app', completed: false },
  ]);

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </View>
  );
}
```

### 2. Tạo custom components với callbacks

```javascript
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

// Custom Search Component
function SearchBar({ onSearch, placeholder = 'Tìm kiếm...' }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query); // Gọi callback từ component cha
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Tìm</Text>
      </TouchableOpacity>
    </View>
  );
}

// Component cha sử dụng
export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    // Logic tìm kiếm
    console.log('Đang tìm kiếm:', query);
    // Giả sử có kết quả
    setSearchResults([
      `Kết quả 1 cho "${query}"`,
      `Kết quả 2 cho "${query}"`,
    ]);
  };

  return (
    <View>
      <SearchBar onSearch={handleSearch} placeholder="Tìm kiếm..." />
      {/* Hiển thị kết quả */}
    </View>
  );
}
```

---

## Phần 7: State Updates và Re-renders

### 1. Khi nào component re-render?

Component sẽ re-render khi:
- ✅ State thay đổi (setState được gọi)
- ✅ Props thay đổi (từ component cha)
- ✅ Component cha re-render (con cũng re-render)

### 2. Batch Updates

React tự động batch (gom nhóm) nhiều state updates trong một lần re-render:

```javascript
function Example() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleClick = () => {
    setCount(count + 1);
    setName('New Name');
    // Chỉ re-render 1 lần, không phải 2 lần
  };

  // ...
}
```

### 3. Preventing Unnecessary Re-renders

```javascript
import { useState, useMemo } from 'react';

function ExpensiveComponent({ items }) {
  // Tính toán tốn kém
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]); // Chỉ tính lại khi items thay đổi

  return <Text>{expensiveValue}</Text>;
}
```

---

## Phần 8: Props Validation với PropTypes (Optional)

### 1. PropTypes là gì?

PropTypes giúp kiểm tra kiểu dữ liệu của props (development mode). Cần cài đặt package riêng.

**Cài đặt:**
```bash
npm install prop-types
```

**Sử dụng:**

```javascript
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

function UserCard({ name, age, email }) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{age} tuổi</Text>
      <Text>{email}</Text>
    </View>
  );
}

// Định nghĩa PropTypes
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string,
};

// Default props
UserCard.defaultProps = {
  email: 'No email provided',
};

export default UserCard;
```

**Các kiểu PropTypes phổ biến:**

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Basic types
  name: PropTypes.string,
  age: PropTypes.number,
  isActive: PropTypes.bool,
  
  // Objects & Arrays
  user: PropTypes.object,
  items: PropTypes.array,
  
  // Specific shapes
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
  }),
  
  items: PropTypes.arrayOf(PropTypes.string),
  
  // Functions
  onPress: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  
  // Any
  data: PropTypes.any,
};
```

**Lưu ý:** PropTypes chỉ hoạt động trong development mode và giúp phát hiện bugs sớm.

---

## Phần 9: Thực hành - Bài tập

### Bài tập 1: Todo List Component

Tạo một Todo List component với các tính năng:
- Hiển thị danh sách todos
- Thêm todo mới
- Đánh dấu todo đã hoàn thành
- Xóa todo

**Gợi ý:**
```javascript
// Tạo component TodoItem riêng
// Sử dụng state để quản lý danh sách todos
// Sử dụng callback functions để xử lý actions
```

### Bài tập 2: Form với Validation

Tạo form đăng ký với:
- First Name
- Last Name
- Email (với validation)
- Password (với validation)
- Confirm Password
- Hiển thị lỗi khi invalid

### Bài tập 3: Calculator App

Tạo một máy tính đơn giản:
- Hiển thị số hiện tại
- Các nút số (0-9)
- Các phép toán (+, -, *, /)
- Nút Clear
- Nút Equals (=)

---

## Phần 10: Best Practices

### 1. State Management Rules

✅ **Nên làm:**
- Đặt state ở component thấp nhất cần thiết
- Sử dụng functional updates khi state phụ thuộc vào state cũ
- Tách state riêng biệt khi không liên quan
- Đặt tên state và setter rõ ràng

❌ **Không nên:**
- Đặt state ở component cao không cần thiết
- Mutate state trực tiếp (dùng spread operator)
- Dùng quá nhiều useState (có thể dùng useReducer)
- Forget dependencies trong useEffect (sẽ học sau)

### 2. Props Best Practices

✅ **Nên làm:**
- Đặt tên props mô tả rõ ràng
- Sử dụng default props khi cần
- Validate props với PropTypes
- Destructure props khi có nhiều props

❌ **Không nên:**
- Truyền quá nhiều props (xem xét composition)
- Mutate props
- Đặt tên props mơ hồ

### 3. Component Composition Best Practices

✅ **Nên làm:**
- Tạo components nhỏ, tái sử dụng được
- Sử dụng children prop khi cần
- Tách logic và presentation
- Giữ components đơn giản

❌ **Không nên:**
- Tạo component quá lớn và phức tạp
- Đặt tất cả logic trong một component
- Hardcode data trong components

---

## Tóm tắt bài học

### Key Concepts

1. **Props:**
   - Truyền data từ cha → con
   - Read-only
   - Có thể là bất kỳ kiểu dữ liệu nào

2. **State:**
   - Data có thể thay đổi trong component
   - Sử dụng useState hook
   - State change → re-render

3. **Controlled Components:**
   - Controlled bởi React state
   - Single source of truth

4. **State Lifting:**
   - Nâng state lên component cha
   - Khi nhiều components cần share state

5. **Callback Functions:**
   - Truyền functions qua props
   - Để component con giao tiếp với cha

6. **Component Composition:**
   - Kết hợp components nhỏ thành lớn
   - Tái sử dụng code

### Checklist kiến thức

Sau bài học này, bạn nên:
- [ ] Hiểu được sự khác biệt giữa Props và State
- [ ] Sử dụng được useState hook
- [ ] Tạo được controlled components
- [ ] Thực hành component composition
- [ ] Biết cách lift state lên component cha
- [ ] Sử dụng callback functions qua props
- [ ] Hiểu khi nào component re-render
- [ ] (Optional) Sử dụng PropTypes

---

## Tài liệu tham khảo

- [React Native - Components and APIs](https://reactnative.dev/docs/components-and-apis)
- [React - State and Lifecycle](https://react.dev/learn/state-a-components-memory)
- [React - Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React Hooks - useState](https://react.dev/reference/react/useState)

---

## Bài học tiếp theo

**Lesson 04: Navigation**
- React Navigation setup
- Stack Navigator
- Tab Navigator
- Navigation parameters

---

**Happy Coding! 🚀**

