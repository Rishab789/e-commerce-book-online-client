import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogsData } from "../services/blogsData";
import { BlogsContext } from "../contexts/blogs.context";

const Blogs = () => {
  const { blogs } = useContext(BlogsContext);
  console.log("this is the blogs data ", blogs);

  return (
    <div>
      <div>
        <section className="md:pt-20 lg:pt-20 sm:pt-16 pt-16" id="blogs">
          <div className="">
            <p className="text-black clash-font1 text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-center mb-10">
              Blogs
            </p>
            <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  mb-10 px-3 sm:px-5 md:px-5 lg:px-5">
                {blogs.map((item, index) => (
                  <Link to={`/blogs/${item._id}`}>
                    <div
                      key={index}
                      className="border border-orange-300 rounded-md overflow-hidden"
                    >
                      <div className="overflow-hidden ">
                        <img
                          src={item.cover}
                          className="hover:scale-110 duration-200 "
                        />
                      </div>
                      <div className=" px-3 bg-[#222222] text-white">
                        <p className="py-3 rufina1 text-2xl">{item.title}</p>
                        <div className="flex justify-between rufina1 pb-3">
                          {/* <p>{item.author}</p>
                          <p>{item.date}</p> */}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
