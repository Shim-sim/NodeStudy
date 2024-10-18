import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TodoBoard from './components/TodoBoard';
import api from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);

  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const response = await api.get('/tasks');
    console.log('ffff', response);
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        setTodoValue('');
        getTasks();
      } else {
        throw new Error('task error');
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const updateComplete = async (id) => {
    try {
      const findTask = todoList.find((item) => item._id === id);

      const res = await api.put(`/tasks/${id}`, {
        isComplete: !findTask.isComplete,
      });

      if (res.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const findTask = todoList.find((item) => item._id === id);
      const res = await api.delete(`/tasks/${id}`);

      if (res.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteTask={deleteTask}
        updateComplete={updateComplete}
      />
    </Container>
  );
}

export default App;
