import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

function Contact() {
  return (
    <section className="px-5 mt-10">
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4711782548684!2d78.44606377412507!3d17.437148101371815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91619a07c2f7%3A0x1dfdab3926922ef3!2sAAA%20Cinemas!5e0!3m2!1sen!2sin!4v1733151768761!5m2!1sen!2sin"
          width="600"
          height="450"
          allowfullscreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-[90%] m-auto"
        ></iframe>
      </div>
      <div className=" flex flex-col md:flex-row lg:flex-row justify-around my-20 gap-10 md:gap-0 lg:gap-0">
        {/* Contact info  */}
        <div className="">
          <div>
            <p className="border-b-2 font-bold">CONTACT INFO</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b-[1px]">
                <FaLocationDot />

                <p>Address: New Town, Kolkata</p>
              </div>
              <div className="flex items-center gap-2 border-b-[1px]">
                <FaPhoneAlt />
                <p>Phone: +(91)7008716985</p>
              </div>
              <div className="flex items-center gap-2 border-b-[1px]">
                <MdAlternateEmail />

                <p>Email: beraprakash456@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        {/* Leave a message  */}
        <div>
          <div className="">
            <div className="flex items-center gap-2 border-b-2 font-bold">
              <MdOutlineMail />

              <p>LEAVE A MESSAGE</p>
            </div>
            <div>
              <form className="flex flex-col gap-4 mt-5">
                <div className="flex flex-col md:flex-row  lg:flex-row   gap-2 ">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-input border border-black rufina1 h-10 px-1 w-full"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-input border border-black rufina1 px-1 h-10 w-full"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="form-input border border-black w-full rufina1 h-10 px-1"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    className="form-input border border-black w-full rufina1 px-1"
                    rows={10}
                  />
                </div>
                <button className=" bg-black text-white text-sm py-2 px-3">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
