import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCommentsByPostId, fetchUsers } from "../posts/PostRedux";
import {
  Grid,
  InputLabel,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const PostContent = () => {
  let location = useLocation();
  let dispatch = useDispatch();
  // console.log("location", location);

  let userDetails = useSelector((state) => state.posts.users);
  let postdetails = useSelector((state) => state.posts.comments);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCommentsByPostId(location.state?.id));
  }, [dispatch]);

  // console.log("userDetails", userDetails);
  // console.log("postDetails", postdetails);

  const userDetail = userDetails?.find(item=>item.id===location.state?.userId);


  return (
    <div style={{ padding: "20px" }}>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Grid item xs={3} md={6} lg={3}>
          <Stack spacing={1}>
            <InputLabel>USerName</InputLabel>
            <TextField disabled value={userDetail?.username} />
          </Stack>
        </Grid>
        <Grid item xs={3} md={6} lg={3}>
          <Stack spacing={1}>
            <InputLabel>Name</InputLabel>
            <TextField disabled value={userDetail?.name} />
          </Stack>
        </Grid>
        <Grid item xs={3} md={6} lg={3}>
          <Stack spacing={1}>
            <InputLabel>Email</InputLabel>
            <TextField disabled value={userDetail?.email} />
          </Stack>
        </Grid>
        <Grid item xs={3} md={6} lg={3}>
          <Stack spacing={1}>
            <InputLabel>Phone</InputLabel>
            <TextField disabled value={userDetail?.phone} />
          </Stack>
        </Grid>
        <Grid item xs={3} md={6} lg={3}>
          <Stack spacing={1}>
            <InputLabel>Company</InputLabel>
            <TextField
              disabled
              value={userDetail?.company["name"]}
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SlNo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postdetails[location.state?.id]?.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.name}</TableCell>
                <TableCell>{post.email}</TableCell>
                <TableCell>{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default PostContent;
