import * as yup from "yup";

const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),
});

export default taskSchema;
