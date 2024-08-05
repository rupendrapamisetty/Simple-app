import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchUsers } from "../posts/PostRedux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector((state) => state.posts.posts);
    const users = useSelector((state) => state.posts.users);
  
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "username", direction: "asc" });
  
    useEffect(() => {
      dispatch(fetchPosts());
      dispatch(fetchUsers());
    }, [dispatch]);
  
    // Function to get username by userId
    const getUsernameById = (userId) => {
      const user = users.find((user) => user.id === userId);
      const name = user?.name;
      const apiData = {
        user: user?.username,
        name: name,
      };
      return apiData;
    };
  
    const enrichedPosts = posts.map((post, index) => ({
      slNo: index + 1,
      username: getUsernameById(post.userId),
      name: getUsernameById(post.userId),
      title: post.title,
      content: post.body,
      id: post.id,
    }));
  
    const handleButton = (id) => {
      console.log("post id->>", id);
      navigate("/post-details", { state: id });
    };
  
    // Filter posts based on search query
    const filteredPosts = enrichedPosts.filter((post) =>
      post.username.user.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Sort posts based on sortConfig
    const sortedPosts = filteredPosts.sort((a, b) => {
      const aValue = a[sortConfig.key].user.toLowerCase();
      const bValue = b[sortConfig.key].user.toLowerCase();
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  
    const handleSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    };
  
    return (
      <div>
        <TextField
          label="Search by Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SlNo</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "username"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("username")}
                >
                  UserName
                </TableSortLabel>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.slNo}</TableCell>
                <TableCell>{post.username.user}</TableCell>
                <TableCell>{post.name.name}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButton(post.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
export default Homepage
