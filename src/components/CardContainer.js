import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CardContainer = ({
  title,
  description,
  completed,
  onClickDone,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "0.5rem",
        border: "1px solid #e8e8e8",
        backgroundColor: "#f5f5f5",
        padding: "0.25rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            marginBottom: "0.1rem",
            fontWeight: 600,
            fontSize: "1.1rem",
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Tooltip title={completed ? "Mark as Incomplete" : "Mark as Done"}>
          <IconButton onClick={onClickDone}>
            {completed ? (
              <UndoOutlinedIcon color="primary" />
            ) : (
              <CheckCircleIcon color="success" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit Task">
          <IconButton onClick={onClickEdit}>
            <EditOutlinedIcon color="warning" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Task">
          <IconButton onClick={onClickDelete}>
            <DeleteOutlineOutlinedIcon color="error" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CardContainer;
