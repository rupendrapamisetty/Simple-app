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

const MainComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector((state) => state.posts.posts);
    const users = useSelector((state) => state.posts.users);

    console.log("posts",posts);
  
    const [search, setSearch] = useState("");
    const[sorted,setSorted] = useState({key:"username",direction:"asc"});
  
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

    const filteredPosts = enrichedPosts.filter((post)=>
        post?.username?.user?.toLowerCase().includes(search.toLowerCase())
    );

    const sortedPosts = filteredPosts.sort((a,b)=>{
        const aVal = a[sorted.key].user.toLowerCase();
        const bVal = b[sorted.key].user.toLowerCase();

        if(aVal < bVal){
            return setSorted.direction==="asc"?1:-1;
        }
        if(aVal > bVal){
            return setSorted.direction==="asc"?-1:1;
        }
    });

    const finalPosts=sortedPosts.map((post,index)=>({
        ...post,
        slNo:index+1
    }));

    console.log("finalPosts---->",finalPosts);
  
    const handlebutton = (id) => {
      console.log("post id->>", id);
      navigate("/post-details", { state: id });
    };

    const handleSortClick=(key)=>{
        let direction = "asc";
        if(sorted.key===key && sorted.direction==="asc"){
            direction = "desc";
        }
        setSorted({key:key,direction:direction});
    }
  
    return (
      <div>
        <TextField value={search} fullWidth placeholder="Search by Username" onChange={(e)=>setSearch(e.target.value)}/>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SlNo</TableCell>
              <TableCell>
                <TableSortLabel 
                    active={sorted.key==="username"}
                    direction={sorted.direction}
                    onClick={(e)=>handleSortClick("username")}
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
            {finalPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.slNo}</TableCell>
                <TableCell>{post.username?.user}</TableCell>
                <TableCell>{post.name?.name}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlebutton(post.id)}
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

export default MainComponent
