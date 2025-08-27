import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogsData } from "../services/blogsData";
import { BlogsContext } from "../contexts/blogs.context";

const BlogDetails = () => {
  const { id } = useParams();

  const { blogs } = useContext(BlogsContext);

  const blogDetails = blogs.find((item) => item._id == id);

  const htmlContent = blogDetails.content;
  return (
    <div>
      <div>
        <section className=" px-2 md:px-5 lg:px-5 py-10 rufina1">
          <div className="">
            <div className="image-container">
              <img src={blogDetails?.cover} className="m-auto w-full" alt="" />
            </div>
            <div className="post-dets flex text-black justify-between px-2">
              {/* <div>
                <p>Post:</p>
                <p className="clash-font1 lg:text-2xl md:text-2xl text-sm">
                  Ramon Lian
                </p>
              </div> */}
              <div>
                <p>Date:</p>
                <p className="clash-font1 lg:text-2xl md:text-2xl text-sm ">
                  Demo
                </p>
              </div>
              <div>
                <p>Category:</p>
                <p className="clash-font1 lg:text-2xl md:text-2xl text-sm">
                  Demo1
                </p>
              </div>
            </div>
            <div className="mb-14">
              <p className="text-black clash-font1 text-2xl sm:text-3xl md:text-5xl lg:text-5xl   pt-14 pb-14">
                {blogDetails?.title}
              </p>
              {/* <p className="text-black text-xl">{blogDetails.content}</p>
              <br></br>
              <p className="text-black text-xl">{blogDetails.content}</p> */}
            </div>

            <blockquote className="bg-[#181818] text-white clash-font1 p-4 mb-14">
              {blogDetails?.desc}
            </blockquote>

            <div
              className="text-black text-lg"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetails;
