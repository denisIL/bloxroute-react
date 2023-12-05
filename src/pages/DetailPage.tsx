import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBlogDetailQuery } from "../redux/blog/blogApi";

export const DetailPage = () => {

  const blogId = useParams();
  
  const {data: blogDetail, isLoading, isError} = useGetBlogDetailQuery({id: String(blogId.id)}, {skip: typeof blogId.id == 'undefined'});
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) navigate('/');
  }, [isError]);

  return (
    <Stack gap={2}>
      <Typography fontSize={32} textAlign={"center"}>
        {blogDetail?.title}
      </Typography>
      <Typography fontSize={22} textAlign={"center"}>
        {blogDetail?.content}
      </Typography>
    </Stack>
  );
};
