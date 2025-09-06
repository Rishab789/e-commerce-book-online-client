import React from "react";

const About = () => {
  return (
    <section className="px-6 md:px-20 mt-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl shadow-lg md:w-1/2">
          <img
            src="https://htmldemo.net/koparion/koparion/img/banner/32.jpg"
            alt="About Us"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            About Our Company
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This is a placeholder paragraph. You can replace it with your own
            business story, values, and unique selling points. Talk about your
            journey, your expertise, and what makes your business stand out from
            the competition. Keep it engaging and client-focused.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Professional and modern
              design
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> SEO-friendly and
              well-optimized
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Easy-to-manage admin
              panel
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Built with the latest
              technologies
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Dedicated customer
              support
            </li>
          </ul>
        </div>
      </div>

      {/* Mission, Vision, Why Us Section */}
      <div className="grid md:grid-cols-3 gap-10 my-20">
        <div className="p-6 rounded-2xl shadow-md bg-gray-50 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Why We Do?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Add a short paragraph explaining why your company exists — the
            problem you solve and the value you bring to your customers.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-md bg-gray-50 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Share your mission statement here. This should be inspiring and
            reflect your company’s purpose and goals.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-md bg-gray-50 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Define your long-term vision here. Describe how you see your
            business evolving and impacting your industry or community.
          </p>
        </div>
      </div>

      {/* Stats / Achievements */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center my-20">
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition duration-300">
          <p className="text-4xl font-bold text-blue-600">100+</p>
          <p className="text-gray-700 mt-2">Projects Completed</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition duration-300">
          <p className="text-4xl font-bold text-green-600">80+</p>
          <p className="text-gray-700 mt-2">Happy Clients</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition duration-300">
          <p className="text-4xl font-bold text-purple-600">$50K+</p>
          <p className="text-gray-700 mt-2">Revenue Generated</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition duration-300">
          <p className="text-4xl font-bold text-red-600">95%</p>
          <p className="text-gray-700 mt-2">Client Retention</p>
        </div>
      </div>
    </section>
  );
};

export default About;
