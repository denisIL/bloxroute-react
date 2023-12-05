import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Pagination from '@mui/material/Pagination';
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns'
import { IBlog } from "../../redux/model/IBlog";
import { useGetBlogsQuery } from "../../redux/blog/blogApi";
import {
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { NAVIGATION } from "../../constants/routes";
import { defaultCountPerPage } from "../../constants/config";

export type Order = "asc" | "desc";

export const BlogTable = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IBlog>("id");
  const [search, setSearch] = useState<string>("");
  const [searchWordTemp, setSearchWordTemp] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(defaultCountPerPage);
  
  const { data: blogsData, isLoading } = useGetBlogsQuery({
    search,
    orderBy,
    order,
    pageIndex,
    countPerPage
  });

  const blogs = useMemo(() => {
    if (blogsData?.data)
      return blogsData.data; 
    else
      return [];
  }, [blogsData?.data]);
  
  const pageCount = useMemo(() => {
    if (blogsData?.totalCount)
      return Math.ceil(blogsData?.totalCount / countPerPage); 
    else
      return 0;
  }, [blogsData?.totalCount, countPerPage]);  

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchWordTemp.toLowerCase());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchWordTemp]);

  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IBlog
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPageIndex(1);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    navigate(`${NAVIGATION.blog}/${id}`);
  };

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };
  
  const handleChangePageCount = (event: SelectChangeEvent) => {
    setPageIndex(1);
    setCountPerPage(Number(event.target.value));
  };

  return (
    <Box>
      <Stack flexDirection={"row"} justifyContent={"right"}>
        <TextField
          label="Search"
          value={searchWordTemp}
          size="small"
          onChange={(e) => setSearchWordTemp(e.target.value)}
          sx={{ width: onlySmallScreen ? "168px" : "256px" }}
        />
      </Stack>
      <Paper sx={{ width: "100%", my: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {blogs && blogs.length > 0 ? (
                blogs.map((blog, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, blog.id)}
                      tabIndex={-1}
                      key={blog.id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="right"
                      >
                        {blog.title}
                      </TableCell>
                      <TableCell align="right">
                        {format(new Date(blog.publicationDate), "MM/dd/yyyy")}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography textAlign={"center"} padding={4}>
                      {isLoading ? <CircularProgress /> : "No result"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }} 
          spacing={2}
        >
          <Pagination count={pageCount} page={pageIndex} onChange={handleChangePagination} />
          <div style={{marginTop: 0}}>
            <Select
              value={countPerPage.toString()}
              onChange={handleChangePageCount}
              size="small"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </div>
          
        </Stack>
      </Paper>
    </Box>
  );
};
