import { useCallback, useMemo } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { signin } from "../utils/extraApis";
import { SigninRequestDto } from "../redux/dto/auth";
import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "../constants/routes";

export const AuthPage = () => {
  const initUserData = {
    email: "",
    password: "",
  };

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),

        password: yup
          .string()
          .required("Password is required")
          .min(8, "Password should be 8 chars minimum")
          .matches(RegExp("(.*[a-z].*)"), "Password should contain lowercase")
          .matches(RegExp("(.*[A-Z].*)"), "Password should contain uppercase")
          .matches(RegExp("(.*\\d.*)"), "Password should contain number")
          .matches(
            RegExp('[!@#$%^&*(),.?":{}|<>]'),
            "Password should contain special character"
          ),
      }),
    []
  );

  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: initUserData,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;
  const [cookies, setCookies] = useCookies(["authToken"]);
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data: SigninRequestDto) => {
    toast.promise(
      new Promise((resolve, reject) =>
        signin(data)
          .then((res) => {
            setCookies("authToken", res.data.token, {
              domain: window.location.hostname,
              maxAge: 60 * 60 * 24, //  1 day
            });
            navigate(NAVIGATION.home);
            resolve(res);
          })
          .catch((error: AxiosError<{ message: string }>) =>
            reject(error.response?.data.message ?? "Failed")
          )
      ),
      {
        pending: "Authenticating...",
        success: "Success",
        error: {
          render: (error) => `${error.data}`,
        },
      }
    );
  }, []);

  return (
    <Stack flexDirection={"row"} justifyContent={"center"}>
      <Box
        component={"form"}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 320 }}
      >
        <Typography fontSize={32} textAlign={"center"}>
          Authentication
        </Typography>
        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...others } }) => (
            <TextField
              {...others}
              inputRef={ref}
              placeholder={"abc@example.com"}
              type="email"
              label="Email"
              error={!!errors.email}
              helperText={errors?.email?.message?.toString()}
              sx={{ height: "80px" }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { ref, ...others } }) => (
            <TextField
              {...others}
              inputRef={ref}
              type="password"
              label="Password"
              error={!!errors.password}
              helperText={errors?.password?.message?.toString()}
              sx={{ height: "80px" }}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Authenticate
        </Button>
      </Box>
    </Stack>
  );
};
