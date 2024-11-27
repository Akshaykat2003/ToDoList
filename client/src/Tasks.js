import { Component } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/taskServices";  // Ensure these services use your backend API

class Tasks extends Component {
    state = { tasks: [], currentTask: "" };

    async componentDidMount() {
        try {
            // Fetch tasks from the backend API
            const { data } = await getTasks(); // Ensure getTasks calls your backend /tasks route
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const { data } = await addTask({ task: this.state.currentTask });
            const tasks = [...originalTasks, data];
            this.setState({ tasks, currentTask: "" });

            // You may want to handle response errors here as well
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index], completed: !tasks[index].completed };
            this.setState({ tasks });

            await updateTask(currentTask, { completed: tasks[index].completed });

        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter((task) => task._id !== currentTask);
            this.setState({ tasks });

            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    render() {
        // Render tasks in the component
        return (
            <div>
                {/* Your task rendering JSX goes here */}
            </div>
        );
    }
}

export default Tasks;
