import { useRoutes } from "react-router-dom";
import HomePage from "../component/HomePage";
import PostContent from "../component/PostContent";

export default function Routes(){
    let routesArray=[
        {
            path:"",
            element:<HomePage/>
        },
        {
            path:"/post-details",
            element:<PostContent/>
        }
    ];

    return useRoutes(routesArray);
}