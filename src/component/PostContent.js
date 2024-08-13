import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCommentsByPostId, fetchUsers } from "../posts/PostRedux";
import { Divider, Grid, InputLabel, Stack, TextField } from "@mui/material";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator.min.css";

const PostContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.posts.users);
  const postdetails = useSelector((state) => state.posts.comments);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCommentsByPostId(location.state?.id));
  }, [dispatch]);

  const userDetail = userDetails?.find(
    (item) => item.id === location.state?.userId
  );

  // Define columns for ReactTabulator
  const columns = [
    { title: "SlNo", field: "slNo", width: 90, sorter: "number" },
    { title: "Name", field: "name", sorter: "string" },
    { title: "Email", field: "email", sorter: "string" },
    { title: "Body", field: "body", sorter: "string" },
  ];

  // Prepare data for ReactTabulator
  const tabulatorData = postdetails[location.state?.id]?.map((post, index) => ({
    slNo: index + 1,
    name: post.name,
    email: post.email,
    body: post.body,
    id: post.id,
  }));

  return (
    <>
      <Grid
        container
        spacing={3}
      >
        {/* <Card>
          <Grid container spacing={3}> */}
            <Grid item xs={3} md={6} lg={3}>
              <Stack spacing={1}>
                <InputLabel>UserName</InputLabel>
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
                <TextField disabled value={userDetail?.company?.name} />
              </Stack>
            </Grid>
          {/* </Grid>
        </Card> */}
        <Grid container spacing={3} sx={{mt:1}}>
        <ReactTabulator
          width="200"
          data={tabulatorData || []}
          columns={columns}
          layout="fitColumns"
          // options={{
          //   pagination: "local",
          //   paginationSize: 10,
          // }}
        />
        </Grid>
      </Grid>
    </>
  );
};

export default PostContent;
