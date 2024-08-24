import React, { useState } from 'react'
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Button,
    Checkbox,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';

const initialState = {
    task: '',
    username: '',
    date: '',
    status: 0,
    taskType: 'office',
};

const Todo = ({ addTask }) => {

    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }));
    };

    const handlePostData = () => {

        axios.post(`http://localhost:8080/task`, formData)
            .then((res) => {
                console.log('res:', res);
                alert("Task Added Successfully");
                addTask(res.data);
            })
            .catch((err) => {
                console.log('err:', err);
                alert("Something went wrong while Adding Task");
            })
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        const { task, username, date } = formData;
        if (task.length < 3 || !username || !date) {
            alert('Please fill out all fields correctly.');
            return;
        }
        handlePostData();
        setFormData(initialState);
    };



    return (
        <Box width={"100%"} height={"100vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} marginTop={20}>

            <Text fontWeight={"bold"} fontSize={"24px"} color={"teal"}>Create Task</Text>


            <Box p={4} width="500px" borderWidth={1} borderRadius="lg" boxShadow="lg" margin="auto">
                <form>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Task</FormLabel>
                        <Textarea value={formData.task}
                            onChange={handleChange}
                            name="task"
                            placeholder="Enter task"
                        />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Username</FormLabel>
                        <Input value={formData.username}
                            onChange={handleChange}
                            name='username'
                            type="text"
                            placeholder="Enter username"
                        />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Date</FormLabel>
                        <Input value={formData.date}
                            onChange={handleChange}
                            name='date'
                            type="date"
                            placeholder="Enter date"
                        />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" mb={4}>
                        <Checkbox value={formData.status}
                            onChange={handleChange}
                            name='status'
                            isChecked={formData.status === 1}
                        />
                        <FormLabel mb="0" ml={2}>
                            Completed
                        </FormLabel>
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Task Type</FormLabel>
                        <Select name='taskType' onChange={handleChange} value={formData.taskType}>
                            <option value="office">Office</option>
                            <option value="personal">Personal</option>
                            <option value="family">Family</option>
                            <option value="friends">Friends</option>
                            <option value="other">Other</option>
                        </Select>
                    </FormControl>
                    <Button colorScheme="teal" type="submit" width="full" onClick={handleSubmit}>
                        Add Task
                    </Button>
                </form>
            </Box>
        </Box>

    )
}

export default Todo