import { Stack, Typography } from "@mui/material";
import { BlogTable } from "../components/blog/BlogTable";

export const HomePage = () => {
  return (
    <Stack gap={2}>
      <Typography fontSize={32} textAlign={"center"}>
        Blogs
      </Typography>
      <BlogTable />
    </Stack>
  );
};
