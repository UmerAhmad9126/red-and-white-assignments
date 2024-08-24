import { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

function App() {
  const [data, setData] = useState([]);

  const getTaskData = () => {
    axios.get("http://localhost:8080/task")
      .then((res) => {
        console.log('res:', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };

  const addTask = (newTask) => {
    setData(prevData => [...prevData, newTask]);
  }

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <Box>
      <Todo addTask={addTask} />
      <TodoList data={data} setData={setData} />
    </Box>
  );
}

export default App;
