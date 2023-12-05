import { Stack, Typography, TextField, Button, Box } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { createBlog } from "../utils/extraApis";
import { CreateBlogRequestDto } from "../redux/dto/blog";
import { useAppSelector } from "../redux/hook";
import { basicApi } from "../redux/basicApi";

export const CreatePage = () => {

  const navigate = useNavigate();
  const { email } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initData = useMemo(() => ({
    title: "",
    content: "",
    creator: email
  }), [email]);

  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup
          .string()
          .required("Title is required"),
        content: yup
          .string()
          .required("Content is required"),
        creator: yup
          .string()
          .required("Creator is required"),
      }),
    []
  );

  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: initData,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = useCallback(async (data: CreateBlogRequestDto) => {
    toast.promise(
      new Promise((resolve, reject) =>
      createBlog(data)
          .then((res) => {
            resolve(res);
            dispatch(basicApi.util.invalidateTags([{ type: "Blog", id: "LIST" }]));
            navigate("/");
          })
          .catch((error: AxiosError<{ message: string }>) =>
            reject(error.response?.data.message ?? "Failed")
          )
      ),
      {
        pending: "Wait...",
        success: "Successfully created",
        error: {
          render: (error) => `${error.data}`,
        },
      }
    );
  }, []);
  
  return (
      <Box
        component={"form"}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap={2}>
          <Typography fontSize={32} textAlign={"center"}>
            Create Blog
          </Typography>
          <Controller
            name="title"
            control={control}
            render={({ field: { ref, ...others } }) => (
              <TextField
                {...others}
                inputRef={ref}
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors?.title?.message?.toString()}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field: { ref, ...others } }) => (
              <TextField
                {...others}
                inputRef={ref}
                label="Content"
                fullWidth
                multiline
                rows={10}
                error={!!errors.content}
                helperText={errors?.content?.message?.toString()}
              />
            )}
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Box>
  );
};
