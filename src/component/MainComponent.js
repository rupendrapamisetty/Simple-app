import React, { useEffect ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchUsers } from "../posts/PostRedux";
import { ReactTabulator, reactFormatter} from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator.min.css";
// import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Card, Grid } from "@mui/material";

const MainComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.posts);
  const users = useSelector((state) => state.posts.users);
  const tabulatorRef = useRef(null);

  // const [search, setSearch] = useState("");
  // const [sorted, setSorted] = useState({ key: "username", direction: "asc" });

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const getUsernameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return {
      user: user?.username,
      name: user?.name,
    };
  };

  const enrichedPosts = posts.map((post, index) => ({
    // slNo: index + 1,
    username: getUsernameById(post.userId),
    name: getUsernameById(post.userId),
    title: post.title,
    content: post.body,
    id: post.id,
    userId: post.userId,
  }));

  // const filteredPosts = enrichedPosts.filter((post) =>
  //   post?.username?.user?.toLowerCase().includes(search.toLowerCase())
  // );

  // const sortedPosts = filteredPosts.sort((a, b) => {
  //   const aVal = a[sorted.key].user.toLowerCase();
  //   const bVal = b[sorted.key].user.toLowerCase();

  //   if (aVal < bVal) {
  //     return sorted.direction === "asc" ? -1 : 1;
  //   }
  //   if (aVal > bVal) {
  //     return sorted.direction === "asc" ? 1 : -1;
  //   }
  //   return 0;
  // });

  // const finalPosts = sortedPosts.map((post, index) => ({
  //   ...post,
  //   slNo: index + 1,
  // }));

  const handlebutton = (post) => {
    navigate("/post-details", { state: post });
  };

  // const handleSortClick = (key) => {
  //   let direction = "asc";
  //   if (sorted.key === key && sorted.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSorted({ key: key, direction: direction });
  // };

  const columns = [
    {
      title: "SlNo",
      formatter: function (cell) {
        // Calculate the global index by considering pagination
        let pageSize = cell.getTable().getPageSize();
        let pageIndex = cell.getTable().getPage() - 1;
        let rowIndex = cell.getRow().getPosition();
        return pageIndex * pageSize + rowIndex;
      }, // Automatically generates the row number
      headerSort: false,   // Disable sorting for this column
      sorter:"number",
      width: 100,
      resizable: true,
    },
    { title: "UserName", field: "username.user", sorter: "string", headerFilter: true,resizable: true, },
    { title: "Name", field: "name.name", sorter: "string",resizable: true, },
    { title: "Title", field: "title", sorter: "string",resizable: true, },
    { title: "Content", field: "content", sorter: "string",resizable: true, },
    {
      title: "Action",
      field: "id",
      formatter: () => {
        return "<button class='view-details-btn'>View Details</button>";
      },
      width: 150,
      resizable: true,
    },
  ];

  const rowFormatter = (row) => {
    const rowData = row.getData();
    const btn = row.getElement().querySelector(".view-details-btn");
    if (btn) {
      btn.addEventListener("click", () => handlebutton(rowData));
    }
  };

  return (
    <Grid container spacing={3}>
      {/* <TextField
        value={search}
        fullWidth
        placeholder="Search by Username"
        onChange={(e) => setSearch(e.target.value)}
      /> */}
      <ReactTabulator
        data={enrichedPosts}
        columns={columns}
        layout="fitColumns"
        // onRef={(ref) => (tabulatorRef.current = ref)}
        options={{
          // rowHeader: true,
          // responsiveLayout: true,
          pagination: "local",
          paginationSize: 10,
          paginationSizeSelector: [5, 25, 50, 100],
          paginationCounter: "rows",
          rowFormatter: rowFormatter,
          // movableRows: true,
          // movableColumns: true,
        }}
        initialSort={[
          { column: "username.user", dir: "asc" }, // Sort by username in alphabetical order
        ]}
      />
    </Grid>
  );
};

export default MainComponent;
