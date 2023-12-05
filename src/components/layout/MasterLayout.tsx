import { Stack } from "@mui/material";
import { Navbar } from "./Navbar";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { NAVIGATION } from "../../constants/routes";
import { AuthPage } from "../../pages/AuthPage";
import { HomePage } from "../../pages/HomePage";
import { DetailPage } from "../../pages/DetailPage";
import { CreatePage } from "../../pages/CreatePage";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { PrivateRoute } from "../common/PrivateRoute";
import { clear, setAuthToken, setEmail } from "../../redux/slices/authSlice";
import { parseJwt } from "../../utils/jwt";
import { useAppSelector } from "../../redux/hook";

interface MasterLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const MasterLayout = ({ children }: MasterLayoutProps) => {
  const [cookies] = useCookies(["authToken"]);
  const dispatch = useDispatch();
  if (cookies.authToken) {
    dispatch(setAuthToken(cookies.authToken));
    dispatch(setEmail(parseJwt(cookies.authToken).email));
  } else {
    dispatch(clear());
  }
  const { authToken } = useAppSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ width: "100%", maxWidth: "1200px", py: 1, px: 2 }}>
          <Routes>
            <Route
              path={NAVIGATION.home}
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path={`${NAVIGATION.blog}/:id`}
              element={
                <PrivateRoute>
                  <DetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path={`${NAVIGATION.create}`}
              element={
                <PrivateRoute>
                  <CreatePage />
                </PrivateRoute>
              }
            />
            {!authToken && <Route path={NAVIGATION.auth} element={<AuthPage />} />}
            <Route path="*" element={<Navigate to={{ pathname: "/" }} />} />
          </Routes>
          {children}
        </Stack>
      </Stack>
    </div>
  );
};
