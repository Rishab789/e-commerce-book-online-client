import React, { useContext, useEffect } from "react";
import EBookProducts from "./EBookProducts";
import { booksData } from "../services/booksData";
import { ProductContext } from "../contexts/ProductsContext";

const EBookPage = () => {
  const { getAllEbooks, eBooks } = useContext(ProductContext);

  useEffect(() => {
    getAllEbooks();
  }, []);

  return (
    <section className="">
      <div className="py-10 px-5">
        <p className="rufina1 text-4xl ">e-Books</p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 my-14 gap-10 px-10">
          {eBooks.map((item) => (
            <EBookProducts product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EBookPage;
