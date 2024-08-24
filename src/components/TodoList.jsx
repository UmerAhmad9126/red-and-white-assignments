import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { TodoCard } from './TodoCard';

const TodoList = ({ data, setData }) => {



    const updateTaskStatus = async (id, status) => {
        const response = await axios.patch(`http://localhost:8080/task/${id}`, { status });
        setData(data && data.map((task) => (task.id === id ? response.data : task)))
    }

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:8080/task/${id}`);
        setData(data.filter((task) => task.id !== id));
    };



    return (
        <Box>
            <Text fontWeight={"bold"} fontSize={"24px"} color={"teal"} margin={"20px"} textAlign={"center"}>Task List</Text>

            {data && data.map((task) => (
                <TodoCard key={task.id} {...task} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
            ))}

        </Box>
    )
}

export default TodoList