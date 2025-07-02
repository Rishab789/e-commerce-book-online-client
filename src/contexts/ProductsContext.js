import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const url = process.env.REACT_APP_URL;

  const [allBooks, setAllBooks] = useState([]);
  const [eBooks, setEBooks] = useState([]);

  useEffect(() => {
    getAllProducts();
    getAllEbooks();
  }, []);

  const getAllProducts = async () => {
    try {
      let req = await axios.get(`${url}/api/v1/getProducts`);

      setAllBooks(req.data.response);
    } catch (err) {
      console.log("Some Error coming while fetching!");
    }
  };

  const getAllEbooks = async () => {
    try {
      let req = await axios.get(`${url}/api/v1/posts`);
      setEBooks(req.data.posts);
    } catch (err) {
      console.log("Some Error coming while fetching!");
    }
  };

  const value = {
    allBooks,
    getAllProducts,
    eBooks,
    getAllEbooks,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
