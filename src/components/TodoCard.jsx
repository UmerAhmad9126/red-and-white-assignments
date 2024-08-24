import {
    Box,
    Button,
    Checkbox,
    Text,
    Badge,
    VStack,
    HStack,
} from '@chakra-ui/react';


export const TodoCard = ({ task, username, date, status, taskType, id, updateTaskStatus, deleteTask }) => {

    const handleStatusChange = (e) => {
        updateTaskStatus(id, e.target.checked ? 1 : 0);
    };

    const getBadgeColor = (taskType) => {
        switch (taskType) {
            case 'office':
                return 'red';
            case 'personal':
                return 'yellow';
            case 'family':
                return 'green';
            case 'friends':
                return 'cyan';
            case 'other':
                return 'gray';
            default:
                return 'gray';
        }
    };

    return (
        <Box
            p={4}
            borderWidth={1}
            borderRadius="lg"
            backgroundColor={status === 1 ? 'gray.100' : 'white'}
            boxShadow="md"
        >
            <HStack justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="lg">{task}</Text>
                <Badge
                    width={"100px"}
                    padding={"10px"}
                    borderRadius={"5px"}
                    textAlign={"center"}
                    colorScheme={getBadgeColor(taskType)}
                >
                    {taskType}
                </Badge>
            </HStack>
            <VStack align="start" spacing={2}>
                <Text>Username: {username}</Text>
                <Text>Date: {date}</Text>
                <Checkbox
                    isChecked={status === 1}
                    onChange={handleStatusChange}
                >
                    Completed
                </Checkbox>
                <Button colorScheme="red" size="sm"
                    onClick={() => deleteTask(id)}
                >
                    Delete
                </Button>
            </VStack>
        </Box>
    );
};