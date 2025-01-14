import {
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import AddForm from "./components/AddForm";
import { useSelector, useDispatch } from "react-redux";
import CardContainer from "./components/CardContainer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { removeTask, toggleTaskCompletion } from "./store/slices/taskSlice";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [open, setOpen] = useState(false);
  const [formEdit, setFormEdit] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("");

  const handleEditTask = (task) => {
    setFormEdit(task);
    setOpen(true);
  };

  const handleCloseForm = () => {
    setFormEdit(null);
    setOpen(false);
  };

  const handleClickFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlePriorityFilter = (priority) => {
    setSelectedPriority(priority);
    setAnchorEl(null);
  };

  const filteredTasks =
    selectedPriority === ""
      ? tasks
      : tasks.filter((task) => task.priority === selectedPriority);

  return (
    <Box
      sx={{
        padding: "3rem 7rem",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#282929" }}>
          Task Manager
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="Filter Tasks">
            <IconButton onClick={handleClickFilter}>
              <FilterListOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon />}
            onClick={() => setOpen(true)}
          >
            New Task
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handlePriorityFilter("")}>All</MenuItem>
        <MenuItem onClick={() => handlePriorityFilter("High")}>High</MenuItem>
        <MenuItem onClick={() => handlePriorityFilter("Medium")}>
          Medium
        </MenuItem>
        <MenuItem onClick={() => handlePriorityFilter("Low")}>Low</MenuItem>
      </Menu>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          marginLeft: "auto",
          marginTop: "1rem",
        }}
      >
        {filteredTasks.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#888",
              fontStyle: "italic",
              marginTop: "2rem",
            }}
          >
            No tasks available. Click "New Task" to add one.
          </Typography>
        ) : (
          filteredTasks.map((task) => (
            <CardContainer
              key={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onClickEdit={() => handleEditTask(task)}
              onClickDelete={() => dispatch(removeTask(task.id))}
              onClickDone={() => dispatch(toggleTaskCompletion(task.id))}
            />
          ))
        )}
      </Box>
      <AddForm open={open} handleClose={handleCloseForm} formEdit={formEdit} />
    </Box>
  );
}

export default App;
