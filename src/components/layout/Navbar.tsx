import logo from "../../logo.svg";
import {
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "../../redux/hook";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "../../constants/routes";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const { authToken, email } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [cookies, setCookie, clearCookie] = useCookies(["authToken"]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{
        boxShadow: "inset 0px -1px 1px #ddd",
        px: onlySmallScreen ? 1 : 2,
        py: 1,
        flexDirection: "row",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <Stack
            onClick={() => navigate(NAVIGATION.home)}
            sx={{ flexDirection: "row", cursor: "pointer" }}
          >
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: onlySmallScreen ? 36 : 48 }}
            />
            <Typography fontSize={onlySmallScreen ? 24 : 32}>Hi</Typography>
          </Stack>

          {authToken && (
            <>
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ textTransform: "none" }}
                size="small"
              >
                {email}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate(`${NAVIGATION.create}`);
                    handleClose();
                  }}
                  sx={{ width: "156px" }}
                >
                  Create Blog
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    clearCookie("authToken");
                    handleClose();
                  }}
                  sx={{ width: "156px" }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
