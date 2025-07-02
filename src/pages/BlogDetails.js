import React from "react";
import { useParams } from "react-router-dom";
import { blogsData } from "../services/blogsData";

const BlogDetails = () => {
  const { id } = useParams();
  const blogDetails = blogsData.find((item) => item.id == id);

  return (
    <div>
      <div>
        <section className=" px-2 md:px-5 lg:px-5 py-10 rufina1">
          <div className="">
            <div className="image-container">
              <img src={blogDetails.image} className="m-auto w-full" alt="" />
            </div>
            <div className="post-dets flex text-black justify-between px-2">
              <div>
                <p>Post:</p>
                <p className="clash-font1 lg:text-2xl md:text-2xl text-sm">
                  Ramon Lian
                </p>
              </div>
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
                {blogDetails.title}
              </p>
              <p className="text-black text-xl">{blogDetails.content}</p>
              <br></br>
              <p className="text-black text-xl">{blogDetails.content}</p>
            </div>

            <blockquote className="bg-[#181818] text-white clash-font1 p-4 mb-14">
              "every spark ignites new Paths and every idea finds its perfect
              canvas. From brainstorming sessions that pulse with energy to
              collaborative efforts that redefine the status quo, we're driven
              by the relentless pursuit of innovation. Step into our world,
              where creativity doesn't just collide – it reshapes, redefines,
              and revolutionizes,"
            </blockquote>

            <div className="mb-14">
              <p className="text-black clash-font1 text-2xl sm:text-3xl md:text-5xl lg:text-5xl pt-14 pb-14">
                This the second heading
              </p>

              <p className="text-black text-xl">{blogDetails.content}</p>
              <br></br>
              <p className="text-black text-xl">{blogDetails.content}</p>
            </div>

            <div className="lg:flex-row md:flex-row gap-5 flex flex-col">
              <img
                src="https://cdn.prod.website-files.com/65fc3eb0d93abcc7a3387fcc/662d0c0e74811b48b7ab3dd8_blog-details-small-5.png"
                className="lg:h-[100%] lg:w-[100%]  md:w-[50%] "
              />
              <img
                src="https://cdn.prod.website-files.com/65fc3eb0d93abcc7a3387fcc/662d0c0e74811b48b7ab3dd8_blog-details-small-5.png"
                className="lg:h-[100%] lg:w-[100%] md:w-[50%]"
              />
            </div>
            <div>
              <p className="text-black clash-font1 text-2xl sm:text-3xl md:text-5xl lg:text-5xl pt-14 pb-14">
                Where Creativity Collides with Ideas Insights, and Innovation
              </p>

              <p className="text-black text-xl">
                Welcome to a realm where creativity finds its ultimate
                playground, where ideas intersect with insights and innovation
                knows no bounds. Here, at the nexus of imagination and
                ingenuity, we thrive on the collision of diverse perspectives
                and boundless
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetails;
