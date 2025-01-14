import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { addTask, updateTask } from "../store/slices/taskSlice";
import { TextField, Modal, Button, Box, Autocomplete } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  padding: "2rem 1.5rem",
  boxShadow: 24,
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
};

const priorities = ["High", "Medium", "Low"];

// Validation Schema
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().required("Priority is required"),
});

const AddForm = ({ open, handleClose, formEdit }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
    },
  });

  // Update default values if editing
  useEffect(() => {
    if (formEdit) {
      setValue("title", formEdit.title);
      setValue("description", formEdit.description);
      setValue("priority", formEdit.priority);
    } else {
      reset();
    }
  }, [formEdit, reset]);

  const submitHandler = (data) => {
    if (formEdit) {
      dispatch(updateTask({ ...formEdit, ...data }));
    } else {
      dispatch(addTask(data));
    }
    reset();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box sx={style}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                size="small"
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={priorities}
                value={field.value || ""}
                onChange={(event, newValue) => setValue("priority", newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Priority"
                    variant="outlined"
                    size="small"
                    error={!!errors.priority}
                    helperText={errors.priority?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                size="small"
                label="Description"
                fullWidth
                multiline
                rows={5}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
          >
            <Button type="submit" variant="contained" color="success">
              {formEdit ? "Update" : "Save"}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                reset();
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default AddForm;
