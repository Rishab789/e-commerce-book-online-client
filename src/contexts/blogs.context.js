import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const BlogsContext = createContext();

const BlogsContextProvider = ({ children }) => {
  const url = process.env.REACT_APP_URL;

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    try {
      console.log("this is the url ... ", url);
      let req = await axios.get(`${url}/api/v1/getBlogs`);

      console.log("this is blog context data", req);
      setBlogs(req.data.response);
    } catch (err) {
      console.log("Some Error coming while fetching!");
    }
  };

  const value = {
    blogs,
    getAllBlogs,
  };

  return (
    <BlogsContext.Provider value={value}>{children}</BlogsContext.Provider>
  );
};

export default BlogsContextProvider;
