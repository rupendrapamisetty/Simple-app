import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchUsers } from '../posts/PostRedux';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector((state) => state.posts.posts);
    const users = useSelector((state) => state.posts.users);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUsers());
    }, [dispatch]);

     // Function to get username by userId
  const getUsernameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : 'Unknown User';
  };

  const enrichedPosts = posts.map((post, index) => ({
    slNo: index + 1,
    username: getUsernameById(post.userId),
    title: post.title,
    content: post.body,
    id: post.id,
  }));

  const handlebutton =(id)=>{
    navigate("/post-details",{state:id})
  };
  

  
    return (
      <div>
       <Table>
            <TableHead>
                <TableRow>
                    <TableCell>SlNo</TableCell>
                    <TableCell>UserName</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
          {enrichedPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.slNo}</TableCell>
              <TableCell>{post.username}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.content}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>handlebutton(post.id)}
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

export default HomePage
