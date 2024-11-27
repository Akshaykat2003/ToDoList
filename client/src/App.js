import React from "react";
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";
import "./App.css";

class App extends React.Component {
  state = { tasks: [], currentTask: "" };

  handleChange = (e) => {
    this.setState({ currentTask: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task: this.state.currentTask, completed: false, _id: Date.now() }; // Mock ID for now
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      currentTask: "",
    }));
  };

  handleUpdate = (id) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task._id === id ? { ...task, completed: !task.completed } : task
    );
    this.setState({ tasks: updatedTasks });
  };

  handleDelete = (id) => {
    const filteredTasks = this.state.tasks.filter((task) => task._id !== id);
    this.setState({ tasks: filteredTasks });
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="App flex">
        <Paper elevation={3} className="container">
          <div className="heading">TO-DO</div>
          <form
            onSubmit={this.handleSubmit}
            className="flex"
            style={{ margin: "15px 0" }}
          >
            <TextField
              variant="outlined"
              size="small"
              style={{ width: "80%" }}
              value={this.state.currentTask}
              required={true}
              onChange={this.handleChange}
              placeholder="Add New TO-DO"
            />
            <Button
              style={{ height: "40px" }}
              color="primary"
              variant="outlined"
              type="submit"
            >
              Add task
            </Button>
          </form>
          <div>
          {tasks.map((task) => (
    <Paper
        key={task._id}
        className={`flex task_container ${task.completed ? "completed" : "pending"}`} 
    >
        <Checkbox
            checked={task.completed}
            onClick={() => this.handleUpdate(task._id)}
            color="primary"
        />
        <div className={task.completed ? "task line_through" : "task"}>
            {task.task}
        </div>
        <Button
            onClick={() => this.handleDelete(task._id)}
            className="button"
        >
            delete
        </Button>
    </Paper>
))}
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;
