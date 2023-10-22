import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import taskSchema from "../validation/task.validation";
import { toast } from "react-toastify";
const initialState = {
  show: false,
  tasks: [],
  task: {
    title: "",
    description: "",
    assignedTo: "",
    createdBy: 1,
    status: "ToDo",
  },
  users: [
    { id: 1, name: "User 1", email: "user1@gmail.com" },
    { id: 2, name: "User 2", email: "user2@gmail.com" },
  ],
  loading: false,
  error: null,
};
export const setError = createAction("task/setError");

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error("Error fetching tasks");
  }
});
export const submitTask = createAsyncThunk(
  "task/submitTask",
  async (task, { rejectWithValue }) => {
    try {
      let { id, title, description } = task;
      await taskSchema.validate({ title, description });
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setErr: (state, action) => {
      state.error = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    resetTask: (state) => {
      state.task = initialState.task;
    },
    showModal: (state, action) => {
      state.show = true;
      if (action.payload) state.task = action.payload;
    },
    closeModal: (state) => {
      state.show = false;
      state.task = initialState.task;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(submitTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        toast.success("Submitted successfully!");
        state.show = false;
        state.error = null;
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        if (!state.task.id) state.tasks = [action.payload, ...state.tasks];
        state.task = initialState.task;
      });
  },
});

export const { setErr, setTask, resetTask, showModal, closeModal } =
  taskSlice.actions;
export const selectTasks = (state) => state.task.tasks;
export const selectTask = (state) => state.task.task;
export const selectUsers = (state) => state.task.users;
export const selectLoading = (state) => state.task.loading;
export const selectError = (state) => state.task.error;
export const selectShow = (state) => state.task.show;

export default taskSlice.reducer;
